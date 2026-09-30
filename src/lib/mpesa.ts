"use server";

import { createClient } from "@supabase/supabase-js";

// Toggle between sandbox and production URLs based on a specific MPESA environment variable
// (Using NODE_ENV="production" automatically breaks sandbox credentials on Render.com)
const isProduction = process.env.MPESA_ENVIRONMENT === "production";
const mpesaBaseUrl = isProduction 
  ? "https://api.safaricom.co.ke" 
  : "https://sandbox.safaricom.co.ke";

function getMpesaCredentials() {
  const mpesaConsumerKey = process.env.MPESA_CONSUMER_KEY;
  const mpesaConsumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const mpesaPasskey = process.env.MPESA_PASSKEY;
  const mpesaShortcode = process.env.MPESA_SHORTCODE;

  if (!mpesaConsumerKey || !mpesaConsumerSecret || !mpesaPasskey || !mpesaShortcode) {
    throw new Error("Server configuration error: Missing M-Pesa credentials.");
  }

  return { mpesaConsumerKey, mpesaConsumerSecret, mpesaPasskey, mpesaShortcode };
}

/**
 * Generates an OAuth Access Token from the Safaricom Daraja API
 */
export async function getMpesaToken(): Promise<string> {
  const { mpesaConsumerKey, mpesaConsumerSecret } = getMpesaCredentials();
  const credentials = Buffer.from(`${mpesaConsumerKey}:${mpesaConsumerSecret}`).toString('base64');
  
  try {
    const response = await fetch(`${mpesaBaseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      cache: "no-store", // Ensure we always get a fresh token if it expired
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("M-Pesa Token Error:", errorText);
      throw new Error(`Safaricom Auth Failed: ${errorText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error: any) {
    console.error("M-Pesa Token Error:", error);
    throw new Error(error.message || "Failed to authenticate with Safaricom.");
  }
}

/**
 * Initiates an M-Pesa Express (STK Push) request to the user's phone.
 * @param phoneNumber The user's Safaricom number
 * @param amount The total amount to be paid
 * @param orderId The UUID of the order in our Supabase database
 */
export async function initiateSTKPush(phoneNumber: string, amount: number, orderId: string) {
  const { mpesaShortcode, mpesaPasskey } = getMpesaCredentials();
  const token = await getMpesaToken();
  if (!token) throw new Error("Authentication with Safaricom failed");

  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -3);
  const password = Buffer.from(`${mpesaShortcode}${mpesaPasskey}${timestamp}`).toString('base64');

  // Format phone number to start with 254
  const formattedPhone = phoneNumber.startsWith("0") 
    ? `254${phoneNumber.slice(1)}` 
    : phoneNumber.startsWith("+") ? phoneNumber.slice(1) : phoneNumber;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://premium-shoes.vercel.app";
  const callbackUrl = appUrl.includes("localhost") 
    ? "https://premium-shoes.vercel.app/api/mpesa/callback" 
    : `${appUrl}/api/mpesa/callback`;

  const payload = {
    BusinessShortCode: mpesaShortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline", // Use 'CustomerBuyGoodsOnline' if using a till number
    Amount: Math.ceil(amount), // Safaricom does not accept decimals
    PartyA: formattedPhone,
    PartyB: mpesaShortcode,
    PhoneNumber: formattedPhone,
    // The endpoint in our app that Safaricom will hit once the user enters their PIN
    // Safaricom requires a public HTTPS URL. If we are on localhost, we pass a dummy URL so the STK prompt still works.
    CallBackURL: callbackUrl,
    AccountReference: "Premium Shoes", // This shows on the user's M-Pesa prompt
    TransactionDesc: `Payment for Order ${orderId.slice(0, 8)}`,
  };

  try {
    const response = await fetch(`${mpesaBaseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.ResponseCode === "0") {
      // The request was successfully accepted by Safaricom.
      // We must store the CheckoutRequestID to match it with the callback later.
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      await supabase
        .from("orders")
        .update({ checkout_request_id: data.CheckoutRequestID })
        .eq("id", orderId);

      return { success: true, message: "STK Push sent successfully to your phone." };
    } else {
      console.error("STK Push failed:", data);
      return { success: false, message: data.errorMessage || "Failed to initiate STK Push." };
    }
  } catch (error) {
    console.error("STK Push Network Error:", error);
    return { success: false, message: "A network error occurred while initiating payment." };
  }
}

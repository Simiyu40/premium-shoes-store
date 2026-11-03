"use server";

import { updateOrderInSheet } from "@/lib/google-sheets";

// Sandbox credentials for Daraja test PayBill (Shortcode: 174379)
const DEFAULT_MPESA_CONSUMER_KEY = "Hkm0Q8tU43mY7yM91XwyRGL5dAwZO1WxQUcfEDOppq855Mab";
const DEFAULT_MPESA_CONSUMER_SECRET = "r7SbAA2QA0b4Ltded31w17XlmAnObB67EzfXrBHoDZfOZ6te87NkLbDlDvgYxnk6";
const DEFAULT_MPESA_PASSKEY = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
const DEFAULT_MPESA_SHORTCODE = "174379";

const isProduction = process.env.MPESA_ENVIRONMENT === "production";
const mpesaBaseUrl = isProduction 
  ? "https://api.safaricom.co.ke" 
  : "https://sandbox.safaricom.co.ke";

function getMpesaCredentials() {
  const mpesaConsumerKey = process.env.MPESA_CONSUMER_KEY || DEFAULT_MPESA_CONSUMER_KEY;
  const mpesaConsumerSecret = process.env.MPESA_CONSUMER_SECRET || DEFAULT_MPESA_CONSUMER_SECRET;
  const mpesaPasskey = process.env.MPESA_PASSKEY || DEFAULT_MPESA_PASSKEY;
  const mpesaShortcode = process.env.MPESA_SHORTCODE || DEFAULT_MPESA_SHORTCODE;

  return { mpesaConsumerKey, mpesaConsumerSecret, mpesaPasskey, mpesaShortcode };
}

/**
 * Generates an East Africa Time (EAT, UTC+3) timestamp in YYYYMMDDHHmmss format.
 * Safaricom Daraja strictly requires a 14-digit timestamp matching Kenyan time.
 */
function getMpesaTimestamp(): string {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value || "";
  return `${get("year")}${get("month")}${get("day")}${get("hour")}${get("minute")}${get("second")}`;
}

/**
 * Normalizes phone numbers to standard Safaricom format: 2547XXXXXXXX or 2541XXXXXXXX
 */
export async function normalizeMpesaPhone(phoneNumber: string): Promise<string> {
  const digits = phoneNumber.replace(/[^0-9]/g, "");

  if (digits.startsWith("0") && digits.length === 10) {
    return `254${digits.slice(1)}`;
  }
  if (digits.startsWith("254") && digits.length === 12) {
    return digits;
  }
  if ((digits.startsWith("7") || digits.startsWith("1")) && digits.length === 9) {
    return `254${digits}`;
  }
  if (digits.startsWith("254")) {
    return digits;
  }

  return `254${digits}`;
}

/**
 * Generates an OAuth Access Token from the Safaricom Daraja API
 */
export async function getMpesaToken(): Promise<string> {
  const { mpesaConsumerKey, mpesaConsumerSecret } = getMpesaCredentials();
  const credentials = Buffer.from(`${mpesaConsumerKey}:${mpesaConsumerSecret}`).toString("base64");
  
  try {
    const response = await fetch(`${mpesaBaseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[M-Pesa] Auth Failed:", errorText);
      throw new Error(`Safaricom Auth Failed: ${errorText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error: unknown) {
    console.error("[M-Pesa] Token Error:", error);
    const msg = error instanceof Error ? error.message : "Failed to authenticate with Safaricom.";
    throw new Error(msg);
  }
}

/**
 * Initiates an M-Pesa Express (STK Push) request to the user's phone.
 * @param phoneNumber The user's Safaricom number (e.g. 0712345678)
 * @param amount The total amount to be paid
 * @param orderId The UUID or reference of the order
 */
export async function initiateSTKPush(phoneNumber: string, amount: number, orderId: string) {
  try {
    const { mpesaShortcode, mpesaPasskey } = getMpesaCredentials();
    const token = await getMpesaToken();
    if (!token) {
      return { success: false, message: "Authentication with Safaricom Daraja failed." };
    }

    const timestamp = getMpesaTimestamp();
    const password = Buffer.from(`${mpesaShortcode}${mpesaPasskey}${timestamp}`).toString("base64");
    const formattedPhone = await normalizeMpesaPhone(phoneNumber);

    if (!/^254(7|1)[0-9]{8}$/.test(formattedPhone)) {
      return {
        success: false,
        message: `Invalid Safaricom number '${phoneNumber}'. Please enter a valid number (e.g. 0712345678 or 0112345678).`,
      };
    }

    // Determine public callback URL (handles custom domain or Vercel preview/production URLs)
    const rawAppUrl = process.env.NEXT_PUBLIC_APP_URL 
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://premium-shoes.vercel.app");
    const callbackUrl = rawAppUrl.includes("localhost")
      ? "https://premium-shoes.vercel.app/api/mpesa/callback"
      : `${rawAppUrl.replace(/\/$/, "")}/api/mpesa/callback`;

    // Safaricom parameter constraints:
    // - AccountReference: Alphanumeric, max 12 characters, no spaces
    // - TransactionDesc: String, max 13 characters
    const accountRef = "LuxeShoes";
    const transactionDesc = "OrderPayment";

    const payload = {
      BusinessShortCode: mpesaShortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.max(1, Math.ceil(amount)),
      PartyA: formattedPhone,
      PartyB: mpesaShortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: accountRef,
      TransactionDesc: transactionDesc,
    };

    console.log(`[M-Pesa] Sending STK Push to ${formattedPhone} for KES ${payload.Amount}...`);

    const response = await fetch(`${mpesaBaseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("[M-Pesa] STK Push Response:", data);

    if (data.ResponseCode === "0") {
      // Safaricom accepted the request and prompted the user's handset
      try {
        await updateOrderInSheet(
          { id: orderId },
          { checkout_request_id: data.CheckoutRequestID }
        );
      } catch (dbErr) {
        console.warn("[M-Pesa] Google Sheets order tracking skipped:", dbErr);
      }

      return {
        success: true,
        checkoutRequestId: data.CheckoutRequestID,
        message: `M-Pesa prompt sent to ${formattedPhone}. Please check your phone and enter your PIN to complete payment.`,
      };
    } else {
      const errorMsg = data.errorMessage || data.ResponseDescription || "Safaricom rejected the payment request.";
      console.error("[M-Pesa] STK Push Error:", errorMsg);
      return { success: false, message: errorMsg };
    }
  } catch (error: unknown) {
    console.error("[M-Pesa] Network or Processing Error:", error);
    const msg = error instanceof Error 
      ? error.message 
      : "Failed to initiate M-Pesa STK Push. Please verify your phone number and try again.";
    return {
      success: false,
      message: msg,
    };
  }
}

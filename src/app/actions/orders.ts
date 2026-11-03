"use server";

import { insertOrderToSheet, fetchOrderFromSheet } from "@/lib/google-sheets";
import { initiateSTKPush } from "@/lib/mpesa";

export interface ProcessCheckoutResult {
  success: boolean;
  message: string;
  orderId?: string;
  checkoutRequestId?: string;
}

export async function processCheckout(
  phone: string, 
  address: string, 
  items: { id: string; quantity: number; price: number; size?: string; name?: string }[],
  customerName?: string,
  city?: string,
  notes?: string
): Promise<ProcessCheckoutResult> {
  const fallbackOrderId = `ord-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  let orderId = fallbackOrderId;

  try {
    if (!items || items.length === 0) {
      return { success: false, message: "Your cart is empty.", orderId };
    }

    if (!phone || phone.trim().length < 9) {
      return { success: false, message: "Please provide a valid Safaricom phone number.", orderId };
    }

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const deliveryFullAddress = [
      customerName ? `Name: ${customerName}` : "",
      address ? `Address: ${address}` : "",
      city ? `City/County: ${city}` : "",
      notes ? `Notes: ${notes}` : ""
    ].filter(Boolean).join(" | ");

    // Record order in Google Sheets database
    try {
      const sheetResult = await insertOrderToSheet({
        id: orderId,
        total_amount: totalAmount,
        status: "PENDING",
        delivery_address: deliveryFullAddress || address,
        phone_number: phone,
        items: items,
      });
      if (sheetResult.orderId) {
        orderId = sheetResult.orderId;
      }
    } catch (dbErr: unknown) {
      const msg = dbErr instanceof Error ? dbErr.message : String(dbErr);
      console.warn("[processCheckout] Google Sheets warning:", msg);
    }

    // Directly trigger Safaricom Daraja STK Push
    try {
      const stkResponse = await initiateSTKPush(phone, totalAmount, orderId);
      return {
        ...stkResponse,
        orderId,
      };
    } catch (mpesaErr: unknown) {
      const msg = mpesaErr instanceof Error ? mpesaErr.message : String(mpesaErr);
      console.error("[processCheckout] Safaricom Daraja STK Push error:", msg);
      return {
        success: false,
        orderId,
        message: `Safaricom M-Pesa error: ${msg}`,
      };
    }
  } catch (error: unknown) {
    console.error("Checkout error:", error);
    const msg = error instanceof Error ? error.message : "An unexpected error occurred during checkout.";
    return { 
      success: false, 
      orderId,
      message: msg 
    };
  }
}

/**
 * Checks the live payment status of an order from Google Sheets
 */
export async function checkOrderStatus(orderId: string) {
  try {
    const order = await fetchOrderFromSheet(orderId);
    if (!order) {
      return { status: "PENDING" };
    }
    return {
      status: order.status || "PENDING",
      receipt: order.mpesa_receipt_number || "",
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[checkOrderStatus] Error querying order status (${msg})`);
    return { status: "PENDING" };
  }
}

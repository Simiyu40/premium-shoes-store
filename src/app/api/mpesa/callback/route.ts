import { NextResponse } from "next/server";
import { updateOrderInSheet } from "@/lib/google-sheets";

/**
 * Safaricom hits this endpoint after the user completes or cancels the STK prompt.
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("[M-Pesa Webhook] Received callback:", JSON.stringify(data, null, 2));

    const result = data?.Body?.stkCallback;
    if (!result) {
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const checkoutRequestId = result.CheckoutRequestID;
    const resultCode = result.ResultCode; // 0 means success

    if (checkoutRequestId) {
      try {
        if (resultCode === 0) {
          // Transaction was successful
          interface CallbackMetadataItem {
            Name: string;
            Value?: string | number;
          }
          const metadataItems: CallbackMetadataItem[] = result.CallbackMetadata?.Item || [];
          const mpesaReceiptItem = metadataItems.find(
            (item: CallbackMetadataItem) => item.Name === "MpesaReceiptNumber"
          );
          const receiptNumber = String(mpesaReceiptItem?.Value || "SIMULATED_RECEIPT");

          await updateOrderInSheet(
            { checkoutRequestId },
            {
              status: "PAID",
              mpesa_receipt_number: receiptNumber,
            }
          );

          console.log(`[M-Pesa Webhook] Order marked PAID in Google Sheets. Receipt: ${receiptNumber}`);
        } else {
          // Transaction failed or cancelled by user
          await updateOrderInSheet(
            { checkoutRequestId },
            { status: "FAILED" }
          );

          console.log(`[M-Pesa Webhook] Order marked FAILED in Google Sheets: ${result.ResultDesc}`);
        }
      } catch (dbErr) {
        console.warn("[M-Pesa Webhook] Database update error:", dbErr);
      }
    }

    // Always acknowledge Safaricom so they stop retrying
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error) {
    console.error("[M-Pesa Webhook] Error processing callback:", error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}

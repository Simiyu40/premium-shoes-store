import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey && checkoutRequestId) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        if (resultCode === 0) {
          // Transaction was successful
          const metadataItems = result.CallbackMetadata?.Item || [];
          const mpesaReceiptItem = metadataItems.find(
            (item: any) => item.Name === "MpesaReceiptNumber"
          );
          const receiptNumber = mpesaReceiptItem?.Value || "SIMULATED_RECEIPT";

          await supabase
            .from("orders")
            .update({ 
              status: "PAID", 
              mpesa_receipt_number: receiptNumber 
            })
            .eq("checkout_request_id", checkoutRequestId);

          console.log(`[M-Pesa Webhook] Order marked PAID. Receipt: ${receiptNumber}`);
        } else {
          // Transaction failed or cancelled by user
          await supabase
            .from("orders")
            .update({ status: "FAILED" })
            .eq("checkout_request_id", checkoutRequestId);

          console.log(`[M-Pesa Webhook] Order marked FAILED: ${result.ResultDesc}`);
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

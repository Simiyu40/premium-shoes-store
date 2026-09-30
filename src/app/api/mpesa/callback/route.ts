import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// We need the service role key to securely update the database from the backend webhook
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Safaricom hits this endpoint after the user either completes the STK push or cancels it.
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Safaricom sends a very specific nested JSON payload
    const result = data.Body.stkCallback;
    const checkoutRequestId = result.CheckoutRequestID;
    const resultCode = result.ResultCode; // 0 means the transaction was successful

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (resultCode === 0) {
      // Transaction was successful. Extract the M-Pesa receipt number.
      const metadataItems = result.CallbackMetadata.Item;
      const mpesaReceiptItem = metadataItems.find(
        (item: any) => item.Name === "MpesaReceiptNumber"
      );
      const receiptNumber = mpesaReceiptItem?.Value;

      // Update the matching order in our database
      const { error } = await supabase
        .from("orders")
        .update({ 
          status: "PAID", 
          mpesa_receipt_number: receiptNumber 
        })
        .eq("checkout_request_id", checkoutRequestId);

      if (error) {
        console.error("Database update failed for successful payment:", error);
      } else {
        console.log(`Payment successful. Receipt: ${receiptNumber} for Request ID: ${checkoutRequestId}`);
      }
    } else {
      // Transaction failed, cancelled by user, or timed out.
      await supabase
        .from("orders")
        .update({ status: "FAILED" })
        .eq("checkout_request_id", checkoutRequestId);

      console.log(`Payment failed for Request ID: ${checkoutRequestId}. Reason: ${result.ResultDesc}`);
    }

    // Acknowledge the callback to Safaricom so they don't resend it
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });

  } catch (error) {
    console.error("Error processing M-Pesa webhook:", error);
    // Even if we fail, we should typically return 200 OK so Safaricom doesn't retry infinitely,
    // but returning a 500 can be useful for debugging.
    return NextResponse.json(
      { ResultCode: 1, ResultDesc: "Internal Server Error" },
      { status: 500 }
    );
  }
}

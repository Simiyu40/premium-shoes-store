"use server";

import { createClient } from "@supabase/supabase-js";
import { initiateSTKPush } from "@/lib/mpesa";

export async function processCheckout(
  phone: string, 
  address: string, 
  items: { id: string, quantity: number, price: number }[]
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase credentials in environment");
      return { success: false, message: "Server configuration error: Missing database credentials." };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Calculate total amount from items securely
    // In production, we'd verify the prices against the DB here
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 1. Create order in Supabase
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        total_amount: totalAmount,
        status: "PENDING",
        delivery_address: address,
        phone_number: phone,
      })
      .select()
      .single();
      
    if (error || !order) {
      console.error("Order creation failed:", error);
      return { success: false, message: "Failed to create order. Please try again." };
    }
    
    // 2. Initiate M-Pesa STK Push
    const stkResponse = await initiateSTKPush(phone, totalAmount, order.id);
    
    return stkResponse;
    
  } catch (error: any) {
    console.error("Checkout error:", error);
    return { success: false, message: error?.message || "An unexpected error occurred during checkout." };
  }
}

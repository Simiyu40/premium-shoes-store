"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { processCheckout } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/store/useCart";
import { useRouter } from "@/i18n/routing";

export function CheckoutForm() {
  const t = useTranslations("Checkout");
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }
    
    setLoading(true);
    setMessage("");

    // Map items for the server action
    const orderItems = items.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    // Call the unified server action to create the order AND push STK
    const response = await processCheckout(phone, address, orderItems);
    
    setMessage(response.message);
    setLoading(false);

    if (response.success) {
      clearCart();
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleCheckout} className="space-y-6 bg-card p-8 rounded-none border shadow-sm max-w-lg mx-auto">
      <div className="space-y-3">
        <Label htmlFor="phone" className="uppercase tracking-wider text-xs font-semibold">{t("phone")}</Label>
        <Input 
          id="phone" 
          type="tel" 
          placeholder="e.g. 254712345678" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="h-12 rounded-none border-zinc-300 focus-visible:ring-zinc-900"
        />
      </div>
      <div className="space-y-3">
        <Label htmlFor="address" className="uppercase tracking-wider text-xs font-semibold">{t("address")}</Label>
        <Input 
          id="address" 
          type="text" 
          placeholder="Nairobi, CBD" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="h-12 rounded-none border-zinc-300 focus-visible:ring-zinc-900"
        />
      </div>
      
      <div className="pt-4 border-t mt-6">
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>KES {getTotal().toLocaleString()}</span>
        </div>
      </div>

      <Button type="submit" disabled={loading || items.length === 0} className="w-full h-14 text-sm font-bold rounded-full uppercase tracking-widest mt-4 bg-primary text-primary-foreground hover:bg-green-600 hover:text-white hover:scale-105 transition-all duration-300 shadow-lg">
        {loading ? "Processing..." : "CHECKOUT WITH M-PESA"}
      </Button>
      {message && (
        <p className={`text-sm mt-4 text-center p-3 border ${message.includes("success") ? "text-green-700 border-green-200 bg-green-50" : "text-destructive border-destructive/20 bg-destructive/10"}`}>
          {message}
        </p>
      )}
    </form>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { processCheckout } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/store/useCart";
import { useRouter } from "@/i18n/routing";
import { Smartphone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export function CheckoutForm() {
  const t = useTranslations("Checkout");
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const total = getTotal();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setStatus("error");
      setMessage("Your cart is empty. Please add items before checking out.");
      return;
    }
    
    setLoading(true);
    setStatus("idle");
    setMessage("");

    const orderItems = items.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const response = await processCheckout(phone, address, orderItems);
    
    setLoading(false);
    setMessage(response.message);

    if (response.success) {
      setStatus("success");
      clearCart();
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-card p-8 rounded-2xl border shadow-sm max-w-lg mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="size-16 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center text-green-600">
            <CheckCircle className="size-10" />
          </div>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider">M-Pesa STK Push Sent!</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {message}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-muted/50 border text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Recipient Number:</span>
            <span className="font-semibold">{phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Payable:</span>
            <span className="font-semibold text-primary">KES {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Address:</span>
            <span className="font-semibold truncate max-w-[200px]">{address}</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Button
            onClick={() => router.push("/")}
            className="w-full h-12 rounded-full font-bold uppercase tracking-wider text-xs"
          >
            Return to Homepage
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/shop")}
            className="w-full h-12 rounded-full font-bold uppercase tracking-wider text-xs"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleCheckout} className="space-y-6 bg-card p-8 rounded-2xl border shadow-sm max-w-lg mx-auto">
      <div className="flex items-center gap-3 pb-2 border-b">
        <div className="size-10 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center text-green-600">
          <Smartphone className="size-5" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-lg leading-none">M-Pesa Express</h3>
          <p className="text-xs text-muted-foreground mt-1">Instant STK push notification to your phone</p>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="phone" className="uppercase tracking-wider text-xs font-semibold">
          {t("phone")}
        </Label>
        <Input 
          id="phone" 
          type="tel" 
          placeholder="e.g. 0712345678 or 254712345678" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="h-12 rounded-xl border-zinc-300 dark:border-zinc-700"
        />
        <p className="text-[11px] text-muted-foreground">Enter your active Safaricom number to receive the PIN prompt.</p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="address" className="uppercase tracking-wider text-xs font-semibold">
          {t("address")}
        </Label>
        <Input 
          id="address" 
          type="text" 
          placeholder="e.g. Westlands, Nairobi / Apt 4B" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="h-12 rounded-xl border-zinc-300 dark:border-zinc-700"
        />
      </div>
      
      <div className="pt-4 border-t mt-6">
        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount:</span>
          <span className="text-primary font-black">KES {total.toLocaleString()}</span>
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={loading || items.length === 0} 
        className="w-full h-14 text-sm font-bold rounded-full uppercase tracking-widest mt-4 bg-green-600 text-white hover:bg-green-700 hover:scale-[1.02] transition-all duration-300 shadow-md gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Initiating STK Push...
          </>
        ) : (
          "Pay with M-Pesa"
        )}
      </Button>

      {status === "error" && message && (
        <div className="flex items-start gap-3 p-4 rounded-xl text-xs bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{message}</p>
        </div>
      )}
    </form>
  );
}

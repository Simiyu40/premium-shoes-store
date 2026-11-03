"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useCart } from "@/store/useCart";
import { processCheckout, checkOrderStatus } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Smartphone, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  ShoppingBag, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Printer, 
  ArrowRight,
  Clock
} from "lucide-react";
import { toast } from "sonner";

const KENYA_COUNTIES = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret (Uasin Gishu)",
  "Kiambu",
  "Machakos",
  "Kajiado",
  "Kilifi",
  "Other County",
];

export function CheckoutForm() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();

  // Hydration fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Nairobi");
  const [notes, setNotes] = useState("");

  // Promo Code
  const [promoInput, setPromoInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Checkout & Polling State
  const [loading, setLoading] = useState(false);
  const [pollingActive, setPollingActive] = useState(false);
  const [status, setStatus] = useState<"idle" | "awaiting_pin" | "paid" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [receiptNumber, setReceiptNumber] = useState<string | null>(null);

  const rawTotal = getTotal();
  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalTotal = Math.max(1, rawTotal - discountAmount);

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    if (promoInput.trim().toUpperCase() === "LUXE10") {
      setDiscountPercent(10);
      setAppliedPromo("LUXE10");
      setPromoInput("");
      toast.success("Promo code applied!", { description: "10% VIP discount deducted from your total." });
    } else {
      toast.error("Invalid Promo Code", { description: "Code not recognized or expired." });
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setStatusMessage("");

    const orderItems = items.map((item) => ({
      id: item.id,
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      const response = await processCheckout(
        phone,
        address,
        orderItems,
        fullName,
        city,
        notes
      );

      setLoading(false);

      if (response.success) {
        setStatus("awaiting_pin");
        setActiveOrderId(response.orderId || null);
        setStatusMessage(
          response.message || `M-Pesa prompt sent to ${phone}. Please enter your PIN on your handset.`
        );

        // Start live polling to check when payment status turns to PAID
        if (response.orderId) {
          startPollingOrderStatus(response.orderId);
        }
      } else {
        setStatus("error");
        setStatusMessage(response.message || "Failed to initiate M-Pesa STK push. Please check your phone number.");
      }
    } catch (err: unknown) {
      setLoading(false);
      setStatus("error");
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setStatusMessage(msg);
    }
  };

  const startPollingOrderStatus = (orderId: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    setPollingActive(true);

    let attempts = 0;
    const maxAttempts = 20; // 20 * 3s = 60s max polling window

    pollingRef.current = setInterval(async () => {
      attempts++;
      try {
        const result = await checkOrderStatus(orderId);
        if (result.status === "PAID") {
          if (pollingRef.current) clearInterval(pollingRef.current);
          setPollingActive(false);
          setStatus("paid");
          setReceiptNumber(result.receipt || "CONFIRMED");
          clearCart();
          toast.success("Payment Received!", { description: "Your order is confirmed and being prepared." });
        } else if (result.status === "FAILED") {
          if (pollingRef.current) clearInterval(pollingRef.current);
          setPollingActive(false);
          setStatus("error");
          setStatusMessage("The M-Pesa transaction was cancelled or declined on your phone.");
        }
      } catch {
        // Continue polling silently
      }

      if (attempts >= maxAttempts) {
        if (pollingRef.current) clearInterval(pollingRef.current);
        setPollingActive(false);
      }
    }, 3000);
  };

  // --- EMPTY CART STATE ---
  if (mounted && items.length === 0 && status !== "paid") {
    return (
      <div className="text-center py-24 px-4 bg-muted/20 border border-dashed rounded-3xl max-w-lg mx-auto">
        <div className="size-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4 text-muted-foreground">
          <ShoppingBag className="size-10 opacity-40" />
        </div>
        <h2 className="font-serif text-2xl font-bold uppercase tracking-wider mb-2">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-muted-foreground max-w-xs mx-auto mb-8">
          Explore our collection of authentic luxury sneakers, boots, and hype grails.
        </p>
        <Button
          onClick={() => router.push("/shop")}
          className="rounded-full h-12 px-8 uppercase tracking-widest text-xs font-bold gap-2"
        >
          Explore Collection <ArrowRight className="size-4" />
        </Button>
      </div>
    );
  }

  // --- ORDER SUCCESS / VERIFIED RECEIPT STATE ---
  if (status === "paid") {
    return (
      <div className="bg-card border border-border/80 shadow-2xl rounded-3xl p-8 md:p-12 max-w-2xl mx-auto text-center space-y-8 animate-in fade-in duration-500">
        <div className="size-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto ring-8 ring-green-500/5">
          <CheckCircle className="size-10" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-green-600 dark:text-green-400">
            Payment Confirmed
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black uppercase tracking-wider mt-1">
            Order Confirmed!
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm mt-2 max-w-md mx-auto">
            Your transaction has been verified with Safaricom M-Pesa. Your curated footwear is being prepared for dispatch.
          </p>
        </div>

        {/* Digital Receipt Card */}
        <div className="bg-muted/40 border border-border/60 rounded-2xl p-6 text-left space-y-4 text-xs">
          <div className="flex justify-between border-b pb-3 font-mono">
            <span className="text-muted-foreground">Order Reference:</span>
            <span className="font-bold text-foreground">{activeOrderId?.toUpperCase()}</span>
          </div>

          <div className="flex justify-between border-b pb-3 font-mono">
            <span className="text-muted-foreground">M-Pesa Receipt:</span>
            <span className="font-bold text-green-600 dark:text-green-400">{receiptNumber}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-muted-foreground">Amount Paid:</span>
            <span className="font-bold text-foreground text-sm">KES {finalTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-muted-foreground">Customer Phone:</span>
            <span className="font-semibold text-foreground">{phone}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Destination:</span>
            <span className="font-semibold text-foreground text-right">{address}, {city}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="flex-1 h-12 rounded-full font-bold uppercase tracking-wider text-xs gap-2"
          >
            <Printer className="size-4" /> Print Receipt
          </Button>
          <Button
            onClick={() => router.push("/shop")}
            className="flex-1 h-12 rounded-full font-bold uppercase tracking-wider text-xs gap-2"
          >
            Continue Shopping <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  // --- TWO-COLUMN CHECKOUT LAYOUT ---
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* LEFT COLUMN: Customer Information & M-Pesa Trigger */}
      <div className="lg:col-span-7 bg-card border border-border/70 shadow-sm rounded-3xl p-6 md:p-8 space-y-6">
        <div className="border-b pb-5">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-green-500/10 text-green-600 flex items-center justify-center font-bold">
              <Smartphone className="size-5" />
            </div>
            <div>
              <h2 className="font-serif font-black text-xl md:text-2xl uppercase tracking-wide">
                Delivery & M-Pesa Express
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Direct Safaricom Daraja STK Push to your handset
              </p>
            </div>
          </div>
        </div>

        {status === "awaiting_pin" && (
          <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-sm uppercase tracking-wider">
              {pollingActive ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Waiting for M-Pesa PIN...
                </>
              ) : (
                <>
                  <Clock className="size-4" /> STK Push Initiated
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
              {statusMessage}
            </p>
            <div className="text-[11px] text-muted-foreground bg-background/80 rounded-xl p-3 border">
              Order Ref: <strong>{activeOrderId?.toUpperCase()}</strong> • Total: <strong>KES {finalTotal.toLocaleString()}</strong>
            </div>
          </div>
        )}

        <form onSubmit={handleCheckout} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-xs uppercase tracking-wider font-semibold">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="e.g. Hiram Simiyu"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs uppercase tracking-wider font-semibold">
              Safaricom Mobile Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="e.g. 0712345678 or 254712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="h-12 rounded-xl font-mono text-sm"
            />
            <p className="text-[11px] text-muted-foreground">
              You will receive a prompt on this Safaricom line asking for your M-Pesa PIN.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-xs uppercase tracking-wider font-semibold">
                County / City
              </Label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {KENYA_COUNTIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-xs uppercase tracking-wider font-semibold">
                Delivery Address
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="e.g. Kilimani, Argwings Kodhek Rd, Apt 4B"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="h-12 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-xs uppercase tracking-wider font-semibold">
              Delivery Notes (Optional)
            </Label>
            <Input
              id="notes"
              type="text"
              placeholder="e.g. Leave with building security or call on arrival"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-12 rounded-xl text-sm"
            />
          </div>

          {status === "error" && statusMessage && (
            <div className="flex items-start gap-3 p-4 rounded-xl text-xs bg-destructive/10 text-destructive border border-destructive/20">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{statusMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || items.length === 0}
            className="w-full h-14 rounded-full font-bold uppercase tracking-widest text-xs mt-6 bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" /> Connecting to Safaricom...
              </>
            ) : (
              `Pay KES ${finalTotal.toLocaleString()} with M-Pesa`
            )}
          </Button>
        </form>
      </div>

      {/* RIGHT COLUMN: Sticky Order Summary & Promo Code */}
      <div className="lg:col-span-5 sticky top-24 space-y-6">
        <div className="bg-card border border-border/70 shadow-sm rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="font-serif font-black text-xl uppercase tracking-wider border-b pb-4">
            Order Summary ({items.reduce((s, i) => s + i.quantity, 0)})
          </h3>

          {/* Item List */}
          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.cartItemId} className="flex gap-3.5 items-center">
                <div className="relative size-16 bg-muted/60 rounded-xl overflow-hidden shrink-0 border">
                  <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-bold truncate text-foreground">{item.name}</h4>
                  <div className="flex items-center gap-2 text-muted-foreground mt-0.5">
                    <span className="font-semibold text-primary">EU {item.size}</span>
                    <span>•</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <p className="font-semibold text-foreground mt-1">KES {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code Input */}
          <form onSubmit={handleApplyPromo} className="pt-2 border-t flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Promo code (e.g. LUXE10)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="pl-9 h-10 text-xs uppercase rounded-full"
              />
            </div>
            <Button type="submit" variant="outline" className="h-10 rounded-full text-xs font-bold uppercase tracking-wider px-4">
              Apply
            </Button>
          </form>

          {appliedPromo && (
            <div className="flex items-center justify-between text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium">
              <span>Code {appliedPromo} Applied (10% Off)</span>
              <button
                type="button"
                onClick={() => {
                  setAppliedPromo(null);
                  setDiscountPercent(0);
                }}
                className="text-xs hover:underline text-destructive font-bold"
              >
                Remove
              </button>
            </div>
          )}

          {/* Pricing Totals */}
          <div className="space-y-2.5 pt-4 border-t text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal:</span>
              <span className="font-semibold text-foreground">KES {rawTotal.toLocaleString()}</span>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400 font-semibold">
                <span>VIP Discount (10%):</span>
                <span>- KES {discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Truck className="size-3.5 text-primary" /> Delivery:
              </span>
              <span className="font-bold text-green-600 dark:text-green-400">FREE PROMOTION</span>
            </div>

            <div className="flex justify-between text-base font-bold pt-3 border-t">
              <span>Total Payable:</span>
              <span className="font-black text-primary text-xl">KES {finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Security & Authenticity Footnote */}
        <div className="grid grid-cols-2 gap-3 text-muted-foreground text-[11px] px-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary shrink-0" />
            <span>100% Genuine Luxury Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="size-4 text-green-600 shrink-0" />
            <span>Safaricom Daraja SSL 256-bit</span>
          </div>
        </div>
      </div>
    </div>
  );
}

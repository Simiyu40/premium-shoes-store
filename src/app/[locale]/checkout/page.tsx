import { Navbar } from "@/components/layout/Navbar";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 container mx-auto px-4 max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-2">
            M-Pesa Express Payment
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-black uppercase tracking-wider">
            Secure Checkout
          </h1>
        </div>
        <CheckoutForm />
      </main>
    </>
  );
}

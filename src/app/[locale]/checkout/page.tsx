import { Navbar } from "@/components/layout/Navbar";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 container mx-auto px-4">
        <h1 className="font-serif text-4xl font-black uppercase tracking-wider mb-8 text-center">Secure Checkout</h1>
        <CheckoutForm />
      </main>
    </>
  );
}

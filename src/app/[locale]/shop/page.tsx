import { Navbar } from "@/components/layout/Navbar";
import { ProductCard } from "@/components/shop/ProductCard";
import { createClient } from "@/lib/supabase/server";

export default async function ShopPage() {
  // Fetch ALL products from Supabase
  const supabase = await createClient();
  const { data: products } = await supabase.from('products').select('*');

  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 container mx-auto px-4">
        <h1 className="font-serif text-4xl font-black uppercase tracking-wider mb-8">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProductCard } from "@/components/shop/ProductCard";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  // Fetch products directly from Supabase!
  const supabase = await createClient();
  const { data: products } = await supabase.from('products').select('*').limit(3);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <section className="py-24 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl font-black uppercase tracking-wider mb-2">Featured Collection</h2>
              <p className="text-muted-foreground">The most exclusive releases of the season.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

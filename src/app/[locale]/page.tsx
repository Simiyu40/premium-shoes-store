import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProductCard } from "@/components/shop/ProductCard";
import { getProducts } from "@/lib/products";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const products = await getProducts({ limit: 3 });

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <section className="py-24 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-2">Curated Drops</p>
              <h2 className="font-serif text-3xl md:text-4xl font-black uppercase tracking-wider">Featured Collection</h2>
              <p className="text-muted-foreground mt-1">The most exclusive releases of the season.</p>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="rounded-full gap-2 text-xs uppercase tracking-widest font-bold">
                View All Shoes <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

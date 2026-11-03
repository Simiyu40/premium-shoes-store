import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProductCard } from "@/components/shop/ProductCard";
import { getProducts } from "@/lib/products";
import { Link } from "@/i18n/routing";
import { ArrowRight, Sparkles, Layers, ShieldCheck, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const products = await getProducts({ featuredOnly: true, limit: 6 });

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Category Spotlights */}
        <section className="py-12 border-b bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/shop?category=Designer" className="group p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/50 transition-all hover:shadow-md">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider">Luxury Designer</h3>
                <p className="text-xs text-muted-foreground mt-1">Balenciaga, Margiela & Rick</p>
              </Link>

              <Link href="/shop?category=Sneakers" className="group p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/50 transition-all hover:shadow-md">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Flame className="size-5" />
                </div>
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider">Grails & Hype</h3>
                <p className="text-xs text-muted-foreground mt-1">Travis Scott, Jordan & Off-White</p>
              </Link>

              <Link href="/shop?category=Boots" className="group p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/50 transition-all hover:shadow-md">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Layers className="size-5" />
                </div>
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider">Boots & Formals</h3>
                <p className="text-xs text-muted-foreground mt-1">Saint Laurent, Bottega & Timbs</p>
              </Link>

              <Link href="/shop?category=Running" className="group p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/50 transition-all hover:shadow-md">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider">Performance Elite</h3>
                <p className="text-xs text-muted-foreground mt-1">Salomon, On & Alphafly</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Collection Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-2">
                Handpicked Drops
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-black uppercase tracking-wider">
                Featured Grails
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                The most sought-after silhouettes of the season, verified and ready for immediate delivery.
              </p>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="rounded-full gap-2 text-xs uppercase tracking-widest font-bold h-11 px-6">
                View All 36 Pairs <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/shop">
              <Button size="lg" className="rounded-full h-14 px-10 uppercase tracking-widest text-xs font-bold gap-2">
                Browse Complete Catalogue <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { ProductCard } from "@/components/shop/ProductCard";
import { getProducts } from "@/lib/products";
import { Link } from "@/i18n/routing";

interface ShopPageProps {
  searchParams?: Promise<{ category?: string }>;
}

const CATEGORIES = ["All", "Sneakers", "Running", "Lifestyle", "Boots", "Skateboarding"];

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const activeCategory = resolvedParams?.category || "All";

  const products = await getProducts({
    category: activeCategory === "All" ? undefined : activeCategory,
  });

  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-2">Catalogue</p>
            <h1 className="font-serif text-4xl md:text-5xl font-black uppercase tracking-wider">All Footwear</h1>
            <p className="text-muted-foreground mt-2">
              Showing {products.length} {products.length === 1 ? "pair" : "pairs"} crafted with uncompromising attention to detail.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/shop" : `/shop?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all ${
                    isSelected
                      ? "bg-foreground text-background shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-xl font-medium">No shoes found in this category.</p>
            <Link
              href="/shop"
              className="mt-4 inline-block text-xs uppercase tracking-widest font-bold underline underline-offset-4"
            >
              Reset Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

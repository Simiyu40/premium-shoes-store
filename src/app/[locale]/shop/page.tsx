import { Navbar } from "@/components/layout/Navbar";
import { getProducts } from "@/lib/products";
import { ShopCatalogView } from "@/components/shop/ShopCatalogView";

interface ShopPageProps {
  searchParams?: Promise<{ category?: string; search?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const activeCategory = resolvedParams?.category || "All";
  const initialSearch = resolvedParams?.search || "";

  // Fetch complete product catalogue
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 container mx-auto px-4">
        {/* Editorial Header */}
        <div className="mb-8 border-b pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-2">
            Curated Luxury Footwear
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-black uppercase tracking-wider">
            The Collection
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
            36 master-crafted silhouettes spanning high-fashion European designers, iconic retro hype grails, artisan leather boots, and marathon-tier runners.
          </p>
        </div>

        {/* Dynamic Interactive Filter & Catalog Grid */}
        <ShopCatalogView 
          initialProducts={products} 
          initialCategory={activeCategory} 
          initialSearch={initialSearch}
        />
      </main>
    </>
  );
}

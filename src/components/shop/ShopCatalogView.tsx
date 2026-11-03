"use client";

import { useState, useMemo } from "react";
import { Product } from "@/store/useCart";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopFilterBar } from "@/components/shop/ShopFilterBar";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["All", "Designer", "Sneakers", "Boots", "Running", "Lifestyle", "Skateboarding"];

interface ShopCatalogViewProps {
  initialProducts: Product[];
  initialCategory?: string;
}

export function ShopCatalogView({
  initialProducts,
  initialCategory = "All",
}: ShopCatalogViewProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by Category
    if (activeCategory && activeCategory.toLowerCase() !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort Products
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "brand") {
      result.sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "featured") {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [initialProducts, activeCategory, searchQuery, sortBy]);

  return (
    <div>
      <ShopFilterBar
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        itemCount={filteredProducts.length}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 px-4 bg-muted/20 border border-dashed rounded-3xl max-w-lg mx-auto">
          <p className="text-lg font-semibold">No footwear matched your search</p>
          <p className="text-xs text-muted-foreground mt-1 mb-6">
            Try adjusting your search keywords or switching category filters.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="rounded-full gap-2 text-xs font-bold uppercase tracking-wider"
          >
            <RotateCcw className="size-3.5" /> Reset All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ShopFilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  itemCount: number;
}

export function ShopFilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  itemCount,
}: ShopFilterBarProps) {
  return (
    <div className="space-y-6 mb-10">
      {/* Top Bar: Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by model or brand (e.g. Balenciaga, Jordan, Boot)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-9 h-12 rounded-full border-border/80 bg-background/80 backdrop-blur-sm text-sm focus-visible:ring-primary"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Sort Selector & Results Indicator */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-muted-foreground font-medium hidden md:inline">
            Showing <strong className="text-foreground font-bold">{itemCount}</strong> {itemCount === 1 ? "pair" : "pairs"}
          </span>

          <div className="flex items-center gap-2 bg-muted/40 border border-border/60 rounded-full px-3.5 py-1.5 text-xs font-semibold">
            <ArrowUpDown className="size-3.5 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs font-semibold cursor-pointer focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="brand">Brand: A to Z</option>
              <option value="name">Model: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <SlidersHorizontal className="size-4 text-muted-foreground shrink-0 mr-1 hidden sm:block" />
        {categories.map((cat) => {
          const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all shrink-0 ${
                isSelected
                  ? "bg-foreground text-background shadow-sm scale-102"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
              }`}
            >
              {cat}
            </button>
          );
        })}

        {/* Active Filters Reset */}
        {(activeCategory !== "All" || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              onCategoryChange("All");
              onSearchChange("");
            }}
            className="text-[11px] uppercase tracking-wider font-bold text-destructive hover:underline ml-2 shrink-0 flex items-center gap-1"
          >
            <X className="size-3" /> Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

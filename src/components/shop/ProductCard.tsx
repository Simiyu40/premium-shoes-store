"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Check, Eye } from "lucide-react";
import Image from "next/image";
import { useCart, Product } from "@/store/useCart";
import { useState } from "react";
import { toast } from "sonner";
import { ProductDetailModal } from "@/components/shop/ProductDetailModal";

const SIZES = ["40", "41", "42", "43", "44"];

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedSize) {
      toast.error("Please select a size first.", {
        description: "Choose a size or click the shoe to inspect craftsmanship details.",
      });
      return;
    }
    
    addItem(product, selectedSize);
    setAdded(true);
    toast.success(`${product.name} added to cart`, {
      description: `Size: EU ${selectedSize}`,
      action: {
        label: "View Cart",
        onClick: () => document.getElementById("cart-drawer-trigger")?.click(),
      },
    });
    
    setTimeout(() => setAdded(false), 2000);
    setSelectedSize(null);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card 
          onClick={() => setModalOpen(true)}
          className="overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm rounded-2xl group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* Product Image & Quick View Badge */}
          <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900/80">
            <Image 
              src={product.images?.[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=1200&auto=format&fit=crop"} 
              alt={product.name} 
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            
            {/* Category Pill Tag */}
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md text-foreground shadow-xs">
                {product.category}
              </span>
            </div>

            {/* Quick View Hover Prompt */}
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-background/90 text-foreground text-xs font-bold tracking-wider uppercase shadow-lg backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="size-3.5" /> Quick View
              </span>
            </div>
          </div>

          <CardContent className="p-5 pb-3">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-semibold">{product.brand}</p>
              <h3 className="font-serif font-bold text-base md:text-lg leading-tight truncate group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="font-bold text-primary mt-1.5 text-base">
                KES {product.price.toLocaleString()}
              </p>
            </div>
          </CardContent>

          {/* Direct Size Selection on Card */}
          <div className="px-5 pb-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-1.5 justify-start">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 h-8 text-[11px] font-semibold border rounded-lg transition-all ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground shadow-xs scale-105"
                      : "border-border hover:border-primary/50 bg-background/50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <CardFooter className="p-5 pt-0">
            <Button 
              className={`w-full gap-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all h-11 ${
                added 
                  ? "bg-green-600 text-white hover:bg-green-700" 
                  : "bg-primary text-primary-foreground hover:bg-foreground hover:text-background"
              }`} 
              onClick={handleAddToCart}
            >
              {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
              {added ? "Added to Cart" : selectedSize ? `Add EU ${selectedSize}` : "Add to Cart"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Interactive Modal */}
      <ProductDetailModal 
        key={product.id}
        product={product} 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
      />
    </>
  );
}

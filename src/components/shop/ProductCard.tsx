"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Check } from "lucide-react";
import Image from "next/image";
import { useCart, Product } from "@/store/useCart";
import { useState } from "react";
import { toast } from "sonner";

const SIZES = ["40", "41", "42", "43", "44"];

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first.", {
        description: "A size is required to add this item to your cart.",
      });
      return;
    }
    
    addItem(product, selectedSize);
    setAdded(true);
    toast.success(`${product.name} added to cart`, {
      description: `Size: ${selectedSize}`,
      action: {
        label: "View Cart",
        onClick: () => document.querySelector<HTMLButtonElement>("[data-state]")?.click(), // simplistic way to open drawer if needed
      },
    });
    
    setTimeout(() => setAdded(false), 2000);
    setSelectedSize(null);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden border-none bg-muted/30 rounded-xl group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image 
            src={product.images[0]} 
            alt={product.name} 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-5 pb-3">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{product.brand}</p>
            <h3 className="font-serif font-medium text-lg leading-tight truncate">{product.name}</h3>
            <p className="font-semibold text-primary mt-2">KES {product.price.toLocaleString()}</p>
          </div>
        </CardContent>
        <div className="px-5 pb-4">
          <div className="flex gap-2 justify-start">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 h-8 text-xs font-medium border rounded transition-colors ${
                  selectedSize === size
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <CardFooter className="p-5 pt-0">
          <Button 
            className={`w-full gap-2 transition-all ${added ? "bg-green-600 text-white hover:bg-green-700" : "group-hover:bg-primary group-hover:text-primary-foreground"}`} 
            variant={added ? "default" : "outline"}
            onClick={handleAddToCart}
          >
            {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
            {added ? "Added to Cart" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

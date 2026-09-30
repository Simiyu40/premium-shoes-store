"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Check } from "lucide-react";
import Image from "next/image";
import { useCart, Product } from "@/store/useCart";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
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
        <CardContent className="p-5">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{product.brand}</p>
            <h3 className="font-medium text-lg leading-tight truncate">{product.name}</h3>
            <p className="font-semibold text-primary mt-2">KES {product.price.toLocaleString()}</p>
          </div>
        </CardContent>
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

"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, useCart } from "@/store/useCart";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ShoppingBag, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const AVAILABLE_SIZES = ["39", "40", "41", "42", "43", "44", "45", "46"];

interface ProductDetailModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailModal({
  product,
  open,
  onOpenChange,
}: ProductDetailModalProps) {
  const addItem = useCart((state) => state.addItem);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=1200&auto=format&fit=crop"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a shoe size", {
        description: "Choose an EU size to add this pair to your cart.",
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

    setTimeout(() => {
      setAdded(false);
      onOpenChange(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-border/60 bg-background/95 backdrop-blur-xl">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Gallery */}
          <div className="bg-zinc-100 dark:bg-zinc-900/60 p-6 flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-background/50 shadow-inner">
              <Image
                src={images[selectedImage] || images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-500"
                priority
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`relative size-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === idx
                        ? "border-primary scale-105 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} angle ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Size Selection */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-muted-foreground">
                  {product.brand}
                </span>
                <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                  {product.category}
                </span>
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
                {product.name}
              </h2>

              <p className="text-2xl font-bold text-primary mt-3">
                KES {product.price.toLocaleString()}
              </p>

              <div className="mt-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                {product.description || "Masterfully constructed with premium grade leathers, ergonomic soles, and luxury finishing."}
              </div>

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Select Size (EU)
                  </span>
                  <span className="text-[11px] text-muted-foreground">True to size</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {AVAILABLE_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 text-xs font-semibold rounded-lg border transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground shadow-sm scale-105"
                          : "border-border hover:border-primary/60 bg-muted/30"
                      }`}
                    >
                      EU {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons & Guarantees */}
            <div className="mt-8 pt-6 border-t space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full h-13 rounded-full font-bold uppercase tracking-widest text-xs gap-2 transition-all ${
                  added 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-primary text-primary-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {added ? (
                  <>
                    <Check className="size-4" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    {selectedSize ? `Add Size EU ${selectedSize} • KES ${product.price.toLocaleString()}` : "Select Size to Add"}
                  </>
                )}
              </Button>

              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-muted-foreground text-center">
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/40">
                  <ShieldCheck className="size-4 text-primary" />
                  <span>100% Authentic</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/40">
                  <Truck className="size-4 text-primary" />
                  <span>Express Nairobi</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/40">
                  <RotateCcw className="size-4 text-primary" />
                  <span>7-Day Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

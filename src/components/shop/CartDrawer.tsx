"use client";

import { useTranslations } from "next-intl";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/store/useCart";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";

export function CartDrawer() {
  const t = useTranslations("Navigation");
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCart();
  
  // Hydration fix for Zustand + Next.js
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const total = getTotal();
  const itemCount = getItemCount();

  return (
    <Sheet>
      <SheetTrigger 
        render={<Button variant="ghost" size="icon" className="relative" />}
      >
        <ShoppingBag className="size-5" />
        {mounted && itemCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center size-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {itemCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-[100dvh] border-l-0 shadow-2xl p-0">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="font-serif text-3xl uppercase tracking-wider">{t("cart")}</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0 custom-scrollbar">
          {!mounted || items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
              <ShoppingBag className="size-16 opacity-10" />
              <p className="text-lg">Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 items-center">
                  <div className="relative w-20 h-20 bg-muted rounded-md overflow-hidden shrink-0">
                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground mb-1">Size: {item.size}</p>
                    <p className="text-xs font-semibold mb-2">KES {item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>
                        <Minus className="size-3" />
                      </Button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>
                        <Plus className="size-3" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive shrink-0 hover:bg-destructive/10" onClick={() => removeItem(item.cartItemId)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        <div className="border-t px-6 pt-4 pb-[max(env(safe-area-inset-bottom),1.5rem)] mt-auto bg-background">
          <div className="flex justify-between font-medium text-xl mb-4">
            <span>Total</span>
            <span>KES {mounted ? total.toLocaleString() : 0}</span>
          </div>
          <Button 
            className="w-full h-14 text-lg rounded-full uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:border hover:border-primary transition-all duration-300"
            disabled={!mounted || items.length === 0}
            onClick={() => router.push("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

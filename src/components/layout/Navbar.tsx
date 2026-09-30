"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const t = useTranslations("Navigation");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col h-full bg-background/95 backdrop-blur-xl border-r-0">
              <div className="flex flex-col mt-12 gap-8 flex-1">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-3xl font-serif font-black tracking-widest uppercase">
                  Luxe.
                </Link>
                <nav className="flex flex-col gap-6">
                  <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-medium tracking-wide hover:text-primary/80 transition-colors">{t("home")}</Link>
                  <Link href="/shop" onClick={() => setIsOpen(false)} className="text-2xl font-medium tracking-wide hover:text-primary/80 transition-colors">{t("shop")}</Link>
                </nav>
              </div>
              <div className="mt-auto pb-safe pb-8">
                <p className="text-[10px] text-muted-foreground/60 font-medium uppercase tracking-[0.2em] leading-relaxed">
                  by Hiram Simiyu (COM/1004/23)<br />&amp; Frankline Ombati (COM/091/23)
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-baseline gap-3">
            <Link href="/" className="font-serif text-3xl font-black tracking-widest uppercase">
              Luxe.
            </Link>
            <span className="hidden lg:inline-block text-[10px] text-muted-foreground/60 font-medium uppercase tracking-[0.2em]">
              by Hiram Simiyu (COM/1004/23) &amp; Frankline Ombati (COM/091/23)
            </span>
          </div>
        </div>

        <nav className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-sm font-medium hover:text-primary/80 transition-colors">{t("home")}</Link>
          <Link href="/shop" className="text-sm font-medium hover:text-primary/80 transition-colors">{t("shop")}</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <LanguageToggle />
          <CartDrawer />
        </div>
      </div>
    </motion.header>
  );
}

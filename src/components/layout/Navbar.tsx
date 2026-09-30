"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { motion } from "framer-motion";

export function Navbar() {
  const t = useTranslations("Navigation");

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-serif text-3xl font-black tracking-widest uppercase">
          Luxe.
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary/80 transition-colors">{t("home")}</Link>
          <Link href="/shop" className="text-sm font-medium hover:text-primary/80 transition-colors">{t("shop")}</Link>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <CartDrawer />
        </div>
      </div>
    </motion.header>
  );
}

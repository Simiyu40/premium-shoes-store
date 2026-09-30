"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations("HomePage");

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2000&auto=format&fit=crop" 
          alt="Premium Sneaker" 
          fill
          className="object-cover opacity-30 grayscale"
          priority
        />
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6"
        >
          {t("title")}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl max-w-2xl mx-auto text-zinc-300 mb-8"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/shop">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 hover:text-black uppercase tracking-widest px-10 h-14 rounded-full">
              Shop Collection
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

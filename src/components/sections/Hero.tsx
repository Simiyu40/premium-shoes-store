"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Zap } from "lucide-react";

const BRANDS_TICKER = [
  "BALENCIAGA",
  "SAINT LAURENT",
  "BOTTEGA VENETA",
  "RICK OWENS",
  "AIR JORDAN",
  "MAISON MARGIELA",
  "SALOMON",
  "PRADA",
  "OFF-WHITE",
  "GUCCI",
  "NEW BALANCE",
];

export function Hero() {
  const t = useTranslations("HomePage");

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden bg-zinc-950 text-white">
      {/* Background Editorial Image with Luxury Vignette */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=90&w=2000&auto=format&fit=crop" 
          alt="Luxe Designer Footwear" 
          fill
          className="object-cover opacity-25 grayscale scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
      </div>

      {/* Main Hero Content */}
      <div className="container relative z-10 mx-auto px-4 my-auto pt-24 pb-16 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-md text-xs uppercase tracking-[0.25em] text-zinc-300 mb-8"
        >
          <Sparkles className="size-3.5 text-amber-400" />
          <span>Curated Footwear & Hype Grails</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase leading-[0.95] mb-6"
        >
          {t("title")}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-zinc-300 font-light mb-10 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/shop">
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 hover:text-black uppercase tracking-widest text-xs font-bold px-9 h-14 rounded-full shadow-2xl gap-2 w-full sm:w-auto">
              Explore Collection <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="/shop?category=Designer">
            <button 
              type="button"
              className="border border-zinc-700/80 bg-zinc-900/80 hover:bg-zinc-800 text-white uppercase tracking-widest text-xs font-bold px-8 h-14 rounded-full w-full sm:w-auto transition-all backdrop-blur-md shadow-lg flex items-center justify-center cursor-pointer"
            >
              Luxury Designers
            </button>
          </Link>
        </motion.div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16 pt-8 border-t border-zinc-800/80 text-xs text-zinc-400 text-left sm:text-center">
          <div className="flex items-center sm:justify-center gap-3">
            <ShieldCheck className="size-5 text-white shrink-0" />
            <span>100% Verified Authentic</span>
          </div>
          <div className="flex items-center sm:justify-center gap-3">
            <Truck className="size-5 text-white shrink-0" />
            <span>Express Nairobi Same-Day</span>
          </div>
          <div className="flex items-center sm:justify-center gap-3">
            <Zap className="size-5 text-green-400 shrink-0" />
            <span>Safaricom M-Pesa Express</span>
          </div>
        </div>
      </div>

      {/* Animated Brand Ticker at Bottom */}
      <div className="relative z-10 w-full border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-md py-4 overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-marquee text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-400">
          {[...BRANDS_TICKER, ...BRANDS_TICKER].map((brand, i) => (
            <span key={i} className="flex items-center gap-10">
              <span>{brand}</span>
              <span className="text-zinc-600">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

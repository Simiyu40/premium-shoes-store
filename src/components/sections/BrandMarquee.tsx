"use client";

import React from "react";
import { Link } from "@/i18n/routing";

// --- BESPOKE LUXURY BRAND LOGO SVGs ---

export function BalenciagaLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Balenciaga">
      {/* Balenciaga Interlocking Double B */}
      <path d="M5.5 4h5a3.5 3.5 0 0 1 2.5 5.95A3.5 3.5 0 0 1 10.5 16H5.5V4zm2 2v3h3a1.5 1.5 0 0 0 0-3h-3zm0 5v3h3a1.5 1.5 0 0 0 0-3h-3z" />
      <path d="M18.5 4h-5a3.5 3.5 0 0 0-2.5 5.95A3.5 3.5 0 0 0 13.5 16h5V4zm-2 2v3h-3a1.5 1.5 0 0 1 0-3h3zm0 5v3h-3a1.5 1.5 0 0 1 0-3h3z" />
    </svg>
  );
}

export function SaintLaurentLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Saint Laurent">
      {/* Iconic YSL Cassandre Monogram */}
      <path d="M8 3.5L12 9.5L16 3.5" />
      <path d="M12 9.5V16" />
      <path d="M15.5 7.5C15.5 6 13.8 5.5 12 5.5C10 5.5 8.5 6.5 8.5 8.5C8.5 11.5 15.5 11 15.5 14C15.5 16 13.8 17 11.8 17C9.5 17 8 16 8 14.5" />
      <path d="M10 13V20.5H16.5" />
    </svg>
  );
}

export function BottegaVenetaLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Bottega Veneta">
      {/* Bottega Veneta Iconic Triangle Crest */}
      <path d="M12 21.5L2 4.5h20L12 21.5zm0-4.2l6.2-10.8H5.8L12 17.3z" />
      <circle cx="12" cy="10" r="1.5" />
    </svg>
  );
}

export function RickOwensLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Rick Owens">
      {/* Rick Owens Dark Minimalist Cross Monogram */}
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <circle cx="12" cy="9" r="2" fill="currentColor" />
    </svg>
  );
}

export function AirJordanLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Air Jordan">
      {/* Authentic Jordan Jumpman silhouette */}
      <circle cx="15.5" cy="3.5" r="1.3" />
      <path d="M18.8 3.2l-2.4 2.8-2-.9-.8.7 2.1 1.7-.8 3.5 5.5 5.2-.8.9-5.1-4.7-1.3 1.5.3 4.2h-1.3l-.3-4.8 1.9-2.3.9-3.7-2.1-1.3-4.1 3.5-.7-.8 4.4-3.9 1.9-2.3 4.5.5z" />
    </svg>
  );
}

export function MaisonMargielaLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-label="Maison Margiela">
      {/* Maison Margiela 4-Corner Stitches & Line 22 (Footwear) */}
      <line x1="4" y1="5" x2="7.5" y2="5" />
      <line x1="16.5" y1="5" x2="20" y2="5" />
      <line x1="4" y1="19" x2="7.5" y2="19" />
      <line x1="16.5" y1="19" x2="20" y2="19" />
      <circle cx="12" cy="12" r="4.5" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <text x="12" y="13.5" fontSize="4.5" fontWeight="900" textAnchor="middle" fill="currentColor" stroke="none">22</text>
    </svg>
  );
}

export function SalomonLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Salomon">
      {/* Salomon S spiral logo */}
      <path d="M14 4h-5a4 4 0 0 0-4 4c0 3.2 3.8 3.8 6.5 4.3 3 .5 4.5 1.5 4.5 3.7a3.8 3.8 0 0 1-3.8 3.8H5.5v-2h6.7a1.8 1.8 0 0 0 1.8-1.8c0-1.8-2.2-2.3-4.8-2.7C6.5 8.8 5 8 5 6a4 4 0 0 1 4-4h5v2z" />
    </svg>
  );
}

export function PradaLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-label="Prada">
      {/* Prada Milano Triangle Plaque */}
      <polygon points="12,21 3,6 21,6" strokeWidth="1.8" />
      <polygon points="12,18 5.5,7.5 18.5,7.5" strokeWidth="0.8" opacity="0.6" />
      <text x="12" y="11" fontSize="4.2" fontWeight="900" textAnchor="middle" fill="currentColor" stroke="none" letterSpacing="0.05em">PRADA</text>
      <text x="12" y="14" fontSize="2.2" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none" letterSpacing="0.08em">MILANO</text>
    </svg>
  );
}

export function OffWhiteLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Off-White">
      {/* Off-White 4-Way Crossed Arrows */}
      <path d="M4 4h5.5l-2.3 2.3 4.2 4.2-1.4 1.4-4.2-4.2L3.5 10V4.5L4 4zm16 0h-5.5l2.3 2.3-4.2 4.2 1.4 1.4 4.2-4.2L20.5 10V4.5L20 4zm0 16h-5.5l2.3-2.3-4.2-4.2 1.4-1.4 4.2 4.2L20.5 14v5.5l-.5.5zm-16 0h5.5l-2.3-2.3 4.2-4.2-1.4-1.4-4.2 4.2L3.5 14v5.5l.5.5z" />
    </svg>
  );
}

export function GucciLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Gucci">
      {/* Gucci Interlocking GG Crest */}
      <path d="M9 5a6 6 0 0 0-6 6c0 3.31 2.69 6 6 6a6 6 0 0 0 5.65-4H10v-2h6.5A5.98 5.98 0 0 0 15 9.15 6 6 0 0 0 9 5zm0 2a4 4 0 0 1 4 4 4 4 0 0 1-.22 1.3A6 6 0 0 0 9 11a6 6 0 0 0-3.78 1.34A4 4 0 0 1 5 11a4 4 0 0 1 4-4z" />
      <path d="M15 19a6 6 0 0 0 6-6c0-3.31-2.69-6-6-6a6 6 0 0 0-5.65 4H14v2H7.5a5.98 5.98 0 0 0 1.5 1.85A6 6 0 0 0 15 19zm0-2a4 4 0 0 1-4-4 4 4 0 0 1 .22-1.3A6 6 0 0 0 15 13a6 6 0 0 0 3.78-1.34A4 4 0 0 1 19 13a4 4 0 0 1-4 4z" />
    </svg>
  );
}

// Complete ordered luxury brands with respective logo components & search query
export const LUXURY_BRANDS = [
  { name: "BALENCIAGA", query: "Balenciaga", logo: BalenciagaLogo },
  { name: "SAINT LAURENT", query: "Saint Laurent", logo: SaintLaurentLogo },
  { name: "BOTTEGA VENETA", query: "Bottega Veneta", logo: BottegaVenetaLogo },
  { name: "RICK OWENS", query: "Rick Owens", logo: RickOwensLogo },
  { name: "AIR JORDAN", query: "Jordan", logo: AirJordanLogo },
  { name: "MAISON MARGIELA", query: "Maison Margiela", logo: MaisonMargielaLogo },
  { name: "SALOMON", query: "Salomon", logo: SalomonLogo },
  { name: "PRADA", query: "Prada", logo: PradaLogo },
  { name: "OFF-WHITE", query: "Off-White", logo: OffWhiteLogo },
  { name: "GUCCI", query: "Gucci", logo: GucciLogo },
];

export function BrandMarquee() {
  // Seamless loop with two identical sets
  const marqueeItems = [...LUXURY_BRANDS, ...LUXURY_BRANDS];

  return (
    <div className="relative z-10 w-full border-t border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
      {/* Infinite Marquee running smoothly from Left to Right */}
      <div className="animate-marquee-ltr flex items-center gap-6 sm:gap-10">
        {marqueeItems.map((brand, idx) => {
          const LogoComponent = brand.logo;
          return (
            <Link
              key={`${brand.name}-${idx}`}
              href={`/shop?search=${encodeURIComponent(brand.query)}`}
              className="group flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-transparent hover:border-zinc-700/60 hover:bg-zinc-900/70 transition-all duration-300 shrink-0 cursor-pointer text-zinc-400 hover:text-white"
            >
              <span className="p-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 group-hover:text-amber-400 group-hover:border-amber-400/30 group-hover:scale-110 transition-all duration-300">
                <LogoComponent className="size-4 shrink-0" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase whitespace-nowrap transition-colors">
                {brand.name}
              </span>
              <span className="text-zinc-700 group-hover:text-amber-400/50 transition-colors ml-4">•</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


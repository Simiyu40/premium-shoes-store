import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "../globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat" 
});

export const metadata: Metadata = {
  title: "Premium Footwear | Luxury Shoes",
  description: "Discover our collection of exclusive sneakers and boots.",
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#000000",
};

import { Toaster } from "@/components/ui/sonner";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.some((l) => l === locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${montserrat.variable} ${playfair.variable} font-sans min-h-screen bg-background text-foreground antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}

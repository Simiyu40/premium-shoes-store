"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-md">
      <Link 
        href={pathname} 
        locale="en"
        className={cn(buttonVariants({ variant: locale === "en" ? "default" : "ghost", size: "sm" }), "h-7 px-3 text-xs")}
      >
        EN
      </Link>
      <Link 
        href={pathname} 
        locale="sw"
        className={cn(buttonVariants({ variant: locale === "sw" ? "default" : "ghost", size: "sm" }), "h-7 px-3 text-xs")}
      >
        SW
      </Link>
    </div>
  );
}

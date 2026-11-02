/**
 * Seed script for the Premium Shoes Store.
 * 
 * Populates the `products` table in Supabase with curated shoe data.
 * Uses the service role key so it bypasses RLS policies.
 * 
 * Usage:
 *   node scripts/seed-products.mjs
 * 
 * Requires .env.local in the project root with:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load .env.local manually (no dotenv dependency) ──────────────────────
function loadEnv() {
  try {
    const envPath = resolve(__dirname, "..", ".env.local");
    const envFile = readFileSync(envPath, "utf-8");
    const vars = {};
    for (const line of envFile.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();
      vars[key] = value;
      if (!process.env[key]) process.env[key] = value;
    }
    return vars;
  } catch {
    console.error("Could not read .env.local");
    process.exit(1);
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ── Product data ─────────────────────────────────────────────────────────
// All images are from Unsplash (already whitelisted in next.config.mjs)
const products = [
  {
    id: "a1b2c3d4-0001-4000-8000-000000000001",
    name: "Air Max Obsidian",
    price: 14500,
    category: "Sneakers",
    brand: "Nike",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Iconic silhouette meets modern cushioning. The Air Max Obsidian delivers all-day comfort with a bold, streetwear-ready profile.",
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000002",
    name: "Ultraboost Midnight",
    price: 18900,
    category: "Running",
    brand: "Adidas",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Responsive Boost midsole with a Primeknit upper for a snug adaptive fit. Built for runners who refuse to compromise on style.",
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000003",
    name: "Classic Leather Heritage",
    price: 9800,
    category: "Lifestyle",
    brand: "Reebok",
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Clean lines, supple leather, timeless DNA. A heritage silhouette updated with modern comfort for everyday wear.",
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000004",
    name: "Gel-Kayano Elite",
    price: 21500,
    category: "Running",
    brand: "Asics",
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Engineered for stability and endurance. GEL technology in the heel and forefoot absorbs impact at every stride.",
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000005",
    name: "Old Skool Noir",
    price: 7500,
    category: "Skateboarding",
    brand: "Vans",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "The iconic side stripe. Durable suede and canvas upper with a vulcanized waffle outsole for superior board feel.",
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000006",
    name: "Suede Classic Shadow",
    price: 8900,
    category: "Lifestyle",
    brand: "Puma",
    images: [
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Born on the courts, raised on the streets. Premium suede construction with a clean, minimalist profile.",
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000007",
    name: "990v6 Heritage Grey",
    price: 26000,
    category: "Lifestyle",
    brand: "New Balance",
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Made in USA. ENCAP midsole cushioning, pigskin and mesh upper. The pinnacle of understated luxury in footwear.",
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000008",
    name: "Dunk Low Panda",
    price: 12500,
    category: "Sneakers",
    brand: "Nike",
    images: [
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612681621979-fffe4396a5ee?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "The most coveted colorway. Crisp white leather contrasts with black overlays for a timeless two-tone statement.",
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000009",
    name: "Chelsea Boot Ember",
    price: 32000,
    category: "Boots",
    brand: "Timberland",
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1200&auto=format&fit=crop",
    ],
    description: "Premium full-grain leather Chelsea boot with anti-fatigue technology. Waterproof construction for all conditions.",
  },
];

// ── Create table if it doesn't exist ─────────────────────────────────────
// We use the Supabase SQL editor function via RPC, but since we can't
// guarantee the RPC exists, we'll try the insert and handle errors.
async function ensureProductsTable() {
  // Check if the table exists by trying a simple select
  const { error } = await supabase.from("products").select("id").limit(1);
  
  if (error && error.code === "42P01") {
    // Table doesn't exist — create it via raw SQL
    console.log("📦 Products table not found. Creating...");
    const { error: createError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS public.products (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          price INTEGER NOT NULL,
          category TEXT NOT NULL DEFAULT '',
          brand TEXT NOT NULL DEFAULT '',
          images TEXT[] NOT NULL DEFAULT '{}',
          description TEXT DEFAULT '',
          created_at TIMESTAMPTZ DEFAULT now()
        );

        -- Enable Row Level Security but allow public reads
        ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY IF NOT EXISTS "Allow public read access on products"
          ON public.products
          FOR SELECT
          USING (true);
      `,
    });

    if (createError) {
      console.error("❌ Could not auto-create table via RPC:", createError.message);
      console.log("");
      console.log("╔══════════════════════════════════════════════════════════════╗");
      console.log("║  Please create the products table manually in Supabase:     ║");
      console.log("║  Go to SQL Editor and run the SQL below, then re-run this.  ║");
      console.log("╚══════════════════════════════════════════════════════════════╝");
      console.log("");
      console.log(`
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  brand TEXT NOT NULL DEFAULT '',
  images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security but allow public reads
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on products"
  ON public.products
  FOR SELECT
  USING (true);
      `);
      process.exit(1);
    }
    console.log("✅ Products table created.");
  } else if (error) {
    // Some other error (network, auth, etc.)
    console.error("❌ Cannot connect to Supabase:", error.message);
    process.exit(1);
  } else {
    console.log("✅ Products table exists.");
  }
}

// ── Upsert products ─────────────────────────────────────────────────────
async function seedProducts() {
  console.log(`🌱 Seeding ${products.length} products...`);
  
  const { data, error } = await supabase
    .from("products")
    .upsert(products, { onConflict: "id" })
    .select();

  if (error) {
    console.error("❌ Seed failed:", error.message);
    console.error("   Details:", error.details);
    console.error("   Hint:", error.hint);
    process.exit(1);
  }

  console.log(`✅ Successfully seeded ${data.length} products:`);
  for (const p of data) {
    console.log(`   • ${p.brand} ${p.name} — KES ${p.price.toLocaleString()}`);
  }
}

// ── Run ──────────────────────────────────────────────────────────────────
async function main() {
  console.log("");
  console.log("🏪 Premium Shoes Store — Database Seeder");
  console.log("─".repeat(44));
  console.log(`   Supabase: ${supabaseUrl}`);
  console.log("");

  await ensureProductsTable();
  await seedProducts();

  console.log("");
  console.log("🎉 Done! Your store now has products.");
}

main();

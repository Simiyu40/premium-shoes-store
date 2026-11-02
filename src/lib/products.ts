import { Product } from "@/store/useCart";
import { createClient } from "@/lib/supabase/server";

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "Air Max Obsidian",
    brand: "Nike",
    category: "Sneakers",
    price: 14500,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-002",
    name: "Ultraboost Midnight",
    brand: "Adidas",
    category: "Running",
    price: 18900,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-003",
    name: "Classic Leather Heritage",
    brand: "Reebok",
    category: "Lifestyle",
    price: 9800,
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-004",
    name: "Gel-Kayano Elite",
    brand: "Asics",
    category: "Running",
    price: 21500,
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-005",
    name: "Old Skool Noir",
    brand: "Vans",
    category: "Skateboarding",
    price: 7500,
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-006",
    name: "Suede Classic Shadow",
    brand: "Puma",
    category: "Lifestyle",
    price: 8900,
    images: [
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-007",
    name: "990v6 Heritage Grey",
    brand: "New Balance",
    category: "Lifestyle",
    price: 26000,
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-008",
    name: "Dunk Low Panda",
    brand: "Nike",
    category: "Sneakers",
    price: 12500,
    images: [
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612681621979-fffe4396a5ee?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-009",
    name: "Chelsea Boot Ember",
    brand: "Timberland",
    category: "Boots",
    price: 32000,
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

interface GetProductsOptions {
  limit?: number;
  category?: string;
}

/**
 * Resilient product fetcher.
 * 1. Tries Supabase database first if environment variables are available.
 * 2. If Supabase is paused, fails with an error, or has 0 products, falls back to the curated catalogue.
 * This guarantees the store ALWAYS renders products end to end.
 */
export async function getProducts(options?: GetProductsOptions): Promise<Product[]> {
  const { limit, category } = options || {};

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = await createClient();
      let query = supabase.from("products").select("*");

      if (category && category.toLowerCase() !== "all") {
        query = query.ilike("category", category);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (!error && Array.isArray(data) && data.length > 0) {
        // Sanitize data to ensure image arrays exist
        return data.map((item) => ({
          id: String(item.id),
          name: item.name || "Footwear",
          brand: item.brand || "Luxe",
          category: item.category || "Sneakers",
          price: Number(item.price) || 0,
          images: Array.isArray(item.images) && item.images.length > 0
            ? item.images
            : ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"],
        }));
      }

      if (error) {
        console.warn(
          `[getProducts] Supabase returned error (${error.message}). Using fallback catalogue.`
        );
      }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(
      `[getProducts] Failed to fetch from Supabase (${msg}). Falling back to local catalogue.`
    );
  }

  // Graceful fallback: return local curated catalogue
  let results = [...FALLBACK_PRODUCTS];

  if (category && category.toLowerCase() !== "all") {
    results = results.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (limit) {
    results = results.slice(0, limit);
  }

  return results;
}

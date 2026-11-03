import { Product } from "@/store/useCart";
import { fetchProductsFromSheet } from "@/lib/google-sheets";

export const FALLBACK_PRODUCTS: Product[] = [
  // --- LUXURY DESIGNER ---
  {
    id: "prod-001",
    name: "Balenciaga Triple S 'Alabaster'",
    brand: "Balenciaga",
    category: "Designer",
    price: 115000,
    featured: true,
    description: "The quintessential chunky luxury silhouette constructed from washed nubuck, mesh, and pre-distressed Italian rubber outsoles. Features embroidered shoe size at the toe and hiking-inspired bi-color laces.",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-002",
    name: "Balenciaga Track 2.0 'Triple Black'",
    brand: "Balenciaga",
    category: "Designer",
    price: 125000,
    featured: true,
    description: "Over 176 individual panels intricately layered into an ultra-modern cage sneaker. Dynamic articulated sole unit engineered with augmented rear heel and metallic logo accents.",
    images: [
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-003",
    name: "Maison Margiela Replica GAT 'White/Grey'",
    brand: "Maison Margiela",
    category: "Designer",
    price: 68000,
    description: "Inspired by 1970s Austrian training shoes. Handcrafted in Italy from ultra-soft nappa lambskin and brushed suede with natural gum rubber sole and signature numeric tongue patch.",
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512374382149-233c42b661ac?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-004",
    name: "Maison Margiela Tabi Ankle Boot",
    brand: "Maison Margiela",
    category: "Designer",
    price: 140000,
    description: "Margiela's legendary split-toe silhouette crafted from supple bovine leather. Features a cylindrical 6cm block heel and discreet hook-and-eye closure for an unmistakable avant-garde profile.",
    images: [
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-005",
    name: "Rick Owens Geobasket 'Milk/Black'",
    brand: "Rick Owens",
    category: "Designer",
    price: 155000,
    featured: true,
    description: "Monumental high-top sneaker featuring an extended padded tongue, geometric contrast calfskin leather paneling, side zipper entry, and signature shark-tooth serrated rubber cupsole.",
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-006",
    name: "Rick Owens Ramones High 'Black/Milk'",
    brand: "Rick Owens",
    category: "Designer",
    price: 110000,
    description: "Distressed heavyweight cotton canvas high-top with a calfskin leather cap-toe, side zip entry, and heavyweight milk vulcanized rubber outsole.",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-007",
    name: "Alexander McQueen Oversized Court",
    brand: "Alexander McQueen",
    category: "Designer",
    price: 74000,
    description: "Smooth white calfskin tennis silhouette set upon a signature flared exaggerated rubber sole. Accented with soft black suede heel counters and silver stamped logo branding.",
    images: [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-008",
    name: "Gucci Ace Embroidered Sneaker",
    brand: "Gucci",
    category: "Designer",
    price: 88000,
    description: "Retro low-top crafted in pristine Italian white leather, embellished with the house's historic green and red Web ribbon and gilded metallic bee embroidery.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-009",
    name: "Prada Cloudbust Thunder 'Nero'",
    brand: "Prada",
    category: "Designer",
    price: 120000,
    description: "Complex knit technical fabric sneaker encased in 3D injected rubber exoskeleton armor. High-profile toothy lugged sole for futuristic silhouette.",
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-010",
    name: "Prada Monolith Brushed Leather Loafers",
    brand: "Prada",
    category: "Designer",
    price: 135000,
    description: "Chunky modernist penny loafer in high-shine brushed spazzolato leather. Mounted on Prada's iconic 55mm oversized treaded Monolith lug sole with enamel triangle plaque.",
    images: [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=85&w=1200&auto=format&fit=crop",
    ],
  },

  // --- BOOTS & FORMALS ---
  {
    id: "prod-011",
    name: "Saint Laurent Wyatt 40 Harness Boot",
    brand: "Saint Laurent",
    category: "Boots",
    price: 145000,
    featured: true,
    description: "The epitome of Parisian rock chic. Smooth calfskin leather ankle boot accented with harness ring strap, side zip, almond toe, and stacked 40mm cuban heel.",
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-012",
    name: "Saint Laurent Lukas Western Boot",
    brand: "Saint Laurent",
    category: "Boots",
    price: 130000,
    description: "Rich tan suede calfskin tailored with pointed toe silhouette, interior zip closure, tone-on-tone western topstitching, and an angled cuban heel.",
    images: [
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-013",
    name: "Bottega Veneta Tire Lug Boot",
    brand: "Bottega Veneta",
    category: "Boots",
    price: 165000,
    featured: true,
    description: "Matte calfskin Chelsea boot elevated by wavy multi-layered rubber lug sole with clear contrast tread. Pull-on elastic side gussets for effortless wear.",
    images: [
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-014",
    name: "Bottega Veneta Puddle Boot 'Fondant'",
    brand: "Bottega Veneta",
    category: "Boots",
    price: 85000,
    description: "Monolithic molded waterproof ankle boot made from biodegradable polymer rubber. Minimalist bulbous toe and cotton-lined interior.",
    images: [
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-015",
    name: "Timberland 6-Inch Premium Waterproof 'Wheat'",
    brand: "Timberland",
    category: "Boots",
    price: 28000,
    description: "The timeless American workwear staple crafted from seam-sealed waterproof nubuck leather, padded collar, rustproof hex hardware, and lugged rubber outsoles.",
    images: [
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-016",
    name: "Timberland Chelsea Boot 'Ember'",
    brand: "Timberland",
    category: "Boots",
    price: 32000,
    description: "Handcrafted full-grain oiled leather Chelsea boot built with anti-fatigue removable footbed, stretch elastic panels, and rugged lug traction.",
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-017",
    name: "Dr. Martens 1460 Bex Smooth Leather",
    brand: "Dr. Martens",
    category: "Boots",
    price: 24500,
    description: "Classic 8-eye boot constructed on an amplified 1.5-inch Bex platform sole. Goodyear welted with signature yellow welt stitch and AirWair bouncing sole.",
    images: [
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-018",
    name: "Dr. Martens Adrian Tassel Loafer",
    brand: "Dr. Martens",
    category: "Boots",
    price: 22000,
    description: "Subcultural heritage kiltie loafer in Polished Smooth leather with double tassel detailing and grooved air-cushioned sole edges.",
    images: [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=85&w=1200&auto=format&fit=crop",
    ],
  },

  // --- GRAILS & HYPE SNEAKERS ---
  {
    id: "prod-019",
    name: "Travis Scott x Air Jordan 1 Low 'Reverse Mocha'",
    brand: "Jordan",
    category: "Sneakers",
    price: 185000,
    featured: true,
    description: "Grail-tier collaboration featuring nubuck and tumbled leather in sail and mocha, oversized reverse Swoosh, Cactus Jack heel embroidery, and vintage yellowed midsole.",
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-020",
    name: "Travis Scott x Air Jordan 1 Low 'Olive'",
    brand: "Jordan",
    category: "Sneakers",
    price: 165000,
    description: "Black suede base with white leather overlays, olive reverse leather Swoosh, and signature red Cactus Jack branding on heel and tongue.",
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-021",
    name: "Air Jordan 1 Retro High 'Chicago Lost & Found'",
    brand: "Jordan",
    category: "Sneakers",
    price: 48000,
    featured: true,
    description: "1985 Chicago retro honoring mom-and-pop sneaker shops. Pre-aged cracked black leather collars, varsity red leather overlays, and muslin nylon tongue.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-022",
    name: "Air Jordan 4 Retro 'Military Black'",
    brand: "Jordan",
    category: "Sneakers",
    price: 52000,
    description: "Crisp white leather upper with light neutral grey suede mudguard, black TPU support wings, heel tab with Jumpman branding, and visible Air-sole heel unit.",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-023",
    name: "Nike x Off-White Air Presto 'Black'",
    brand: "Nike",
    category: "Sneakers",
    price: 95000,
    description: "Virgil Abloh's deconstructed masterpiece. Breathable mesh upper, stitched contrast white Swoosh, translucent midfoot cage, and signature orange zip-tie tab.",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-024",
    name: "Nike x Tiffany & Co. Air Force 1 1837",
    brand: "Nike",
    category: "Sneakers",
    price: 195000,
    description: "Historic luxury partnership. Premium black suede upper crowned with iconic Tiffany Blue tumbled leather Swoosh and co-branded .925 sterling silver heel badge.",
    images: [
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-025",
    name: "Yeezy Boost 350 V2 'Onyx'",
    brand: "Adidas",
    category: "Sneakers",
    price: 38000,
    description: "All-black re-engineered Primeknit upper woven with monofilament side stripe, supported by responsive full-length enclosed Boost midsole cushion.",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-026",
    name: "Yeezy Boost 700 'Wave Runner'",
    brand: "Adidas",
    category: "Sneakers",
    price: 49000,
    description: "The dad shoe that defined a generation. Grey suede, blue/teal mesh accents, 3M reflective detailing, bright neon laces, and chunky sculpted Boost midsole.",
    images: [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=85&w=1200&auto=format&fit=crop",
    ],
  },

  // --- PERFORMANCE & TRAIL LUXURY ---
  {
    id: "prod-027",
    name: "Salomon XT-6 Advanced 'Vanilla Ice'",
    brand: "Salomon",
    category: "Running",
    price: 26500,
    description: "Ultra-distance trail icon embraced by high fashion. Sensifit welded TPU film upper, Quicklace system, and dual-density EVA cushioning with Agile Chassis System.",
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-028",
    name: "Salomon ACS Pro Advanced 'Metal/Black'",
    brand: "Salomon",
    category: "Running",
    price: 29000,
    description: "Technical archetype modernized with Kurim envelope structure, lateral opening mesh for ventilation, and Contagrip tread for grip on wet or urban terrain.",
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-029",
    name: "On Running Cloudmonster 'All Black'",
    brand: "On",
    category: "Running",
    price: 24000,
    description: "Swiss engineering delivering monster cushioning. Giant CloudTec pods paired with a springy Speedboard for unmatched forward propulsion and soft landings.",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-030",
    name: "Hoka Clifton 9 'Eggnog'",
    brand: "Hoka",
    category: "Running",
    price: 21500,
    description: "Featherlight maximalist daily trainer. Responsive EVA foam midsole with early-stage Meta-Rocker geometry for smooth transition through gait cycles.",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-031",
    name: "Nike Alphafly 3 'Proto'",
    brand: "Nike",
    category: "Running",
    price: 42000,
    description: "Marathon world-record breaker. Full-length carbon fiber Flyplate, dual forefoot Zoom Air pods, and ultra-lightweight ZoomX foam for maximum energy economy.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-032",
    name: "Asics GEL-Kayano Elite 'Midnight'",
    brand: "Asics",
    category: "Running",
    price: 21500,
    description: "Flagship stability running silhouette equipped with PureGEL rearfoot cushioning, 4D Guidance System, and FF BLAST PLUS ECO lightweight foam.",
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop",
    ],
  },

  // --- LIFESTYLE & SKATEBOARDING CLASSICS ---
  {
    id: "prod-033",
    name: "New Balance 990v6 Made in USA 'Heritage Grey'",
    brand: "New Balance",
    category: "Lifestyle",
    price: 34000,
    featured: true,
    description: "Handcrafted in the USA with premium pigskin suede and breathable mesh. Integrates FuelCell midsole technology for dynamic all-day walking support.",
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-034",
    name: "New Balance 1906R 'Silver Metallic'",
    brand: "New Balance",
    category: "Lifestyle",
    price: 27000,
    description: "Millennium runner aesthetic featuring N-ergy shock-absorbing outsole, Stability Web arch support, and ACTEVA LITE cushioning wrapped in silver mesh.",
    images: [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-035",
    name: "Nike Dunk Low 'Panda'",
    brand: "Nike",
    category: "Lifestyle",
    price: 14500,
    description: "Timeless monochrome staple with smooth white leather base, contrasting black overlays, perforated toe box, and durable pivot-circle traction pattern.",
    images: [
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612681621979-fffe4396a5ee?q=85&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "prod-036",
    name: "Vans Vault Old Skool LX 'Noir'",
    brand: "Vans",
    category: "Skateboarding",
    price: 12000,
    description: "Premium Vault tier construction featuring higher-grade leather sidestripe, 10oz heavy canvas, padded collar, and vulcanized waffle outsole.",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=85&w=1200&auto=format&fit=crop",
    ],
  },
];

interface GetProductsOptions {
  limit?: number;
  category?: string;
  featuredOnly?: boolean;
}

/**
 * Resilient product fetcher:
 * 1. Queries the Google Sheets database via the Apps Script Web App.
 * 2. If Google Sheets is not configured or fails, falls back gracefully to the curated catalogue.
 * This guarantees the storefront ALWAYS renders products end-to-end.
 */
export async function getProducts(options?: GetProductsOptions): Promise<Product[]> {
  const { limit, category, featuredOnly } = options || {};

  try {
    const sheetProducts = await fetchProductsFromSheet(category);
    if (sheetProducts && sheetProducts.length > 0) {
      let filtered = sheetProducts;
      if (featuredOnly) {
        filtered = filtered.filter((p) => p.featured);
      }
      return limit ? filtered.slice(0, limit) : filtered;
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[getProducts] Failed to fetch from Google Sheets (${msg}). Falling back to local catalogue.`);
  }

  // Graceful fallback: return local curated catalogue
  let results = [...FALLBACK_PRODUCTS];

  if (category && category.toLowerCase() !== "all") {
    results = results.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (featuredOnly) {
    results = results.filter((p) => p.featured);
  }

  if (limit) {
    results = results.slice(0, limit);
  }

  return results;
}

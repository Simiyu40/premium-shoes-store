/* eslint-disable */
/**
 * LUXE PREMIUM SHOES - GOOGLE APPS SCRIPT DATABASE ENGINE
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new) and name it "Luxe Shoes Database".
 * 2. Click Extensions > Apps Script.
 * 3. Replace all code in Code.gs with this entire file.
 * 4. Change API_KEY below to your chosen secret token.
 * 5. Run the setupSheets() function from the toolbar to automatically create the
 *    "Products" and "Orders" tabs and seed the 36 curated luxury shoes.
 * 6. Click Deploy > Manage deployments > Edit > New version, or Deploy > New deployment:
 *    - Type: Web app
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 7. Copy the Web App URL and add it to your Next.js environment:
 *    GOOGLE_SHEETS_API_URL=<Your Web App URL>
 *    GOOGLE_SHEETS_API_KEY=<Your chosen API_KEY>
 */

const API_KEY = "luxe_secret_key_change_me";
const PRODUCTS_SHEET_NAME = "Products";
const ORDERS_SHEET_NAME = "Orders";

// Full 36-product luxury collection
const SEED_PRODUCTS = [
  // --- LUXURY DESIGNER ---
  {
    id: "prod-001",
    name: "Balenciaga Triple S 'Alabaster'",
    brand: "Balenciaga",
    category: "Designer",
    price: 115000,
    featured: true,
    description: "The quintessential chunky luxury silhouette constructed from washed nubuck, mesh, and pre-distressed Italian rubber outsoles. Features embroidered shoe size at the toe and hiking-inspired bi-color laces.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-002",
    name: "Balenciaga Track 2.0 'Triple Black'",
    brand: "Balenciaga",
    category: "Designer",
    price: 125000,
    featured: true,
    description: "Over 176 individual panels intricately layered into an ultra-modern cage sneaker. Dynamic articulated sole unit engineered with augmented rear heel and metallic logo accents.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-003",
    name: "Maison Margiela Replica GAT 'White/Grey'",
    brand: "Maison Margiela",
    category: "Designer",
    price: 68000,
    featured: false,
    description: "Inspired by 1970s Austrian training shoes. Handcrafted in Italy from ultra-soft nappa lambskin and brushed suede with natural gum rubber sole and signature numeric tongue patch.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512374382149-233c42b661ac?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-004",
    name: "Maison Margiela Tabi Ankle Boot",
    brand: "Maison Margiela",
    category: "Designer",
    price: 140000,
    featured: false,
    description: "Margiela's legendary split-toe silhouette crafted from supple bovine leather. Features a cylindrical 6cm block heel and discreet hook-and-eye closure for an unmistakable avant-garde profile.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-005",
    name: "Rick Owens Geobasket 'Milk/Black'",
    brand: "Rick Owens",
    category: "Designer",
    price: 155000,
    featured: true,
    description: "Monumental high-top sneaker featuring an extended padded tongue, geometric contrast calfskin leather paneling, side zipper entry, and signature shark-tooth serrated rubber cupsole.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-006",
    name: "Rick Owens Ramones High 'Black/Milk'",
    brand: "Rick Owens",
    category: "Designer",
    price: 110000,
    featured: false,
    description: "Distressed heavyweight cotton canvas high-top with a calfskin leather cap-toe, side zip entry, and heavyweight milk vulcanized rubber outsole.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-007",
    name: "Alexander McQueen Oversized Court",
    brand: "Alexander McQueen",
    category: "Designer",
    price: 74000,
    featured: false,
    description: "Smooth white calfskin tennis silhouette set upon a signature flared exaggerated rubber sole. Accented with soft black suede heel counters and silver stamped logo branding.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-008",
    name: "Gucci Ace Embroidered Sneaker",
    brand: "Gucci",
    category: "Designer",
    price: 88000,
    featured: false,
    description: "Retro low-top crafted in pristine Italian white leather, embellished with the house's historic green and red Web ribbon and gilded metallic bee embroidery.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-009",
    name: "Prada Cloudbust Thunder 'Nero'",
    brand: "Prada",
    category: "Designer",
    price: 120000,
    featured: false,
    description: "Complex knit technical fabric sneaker encased in 3D injected rubber exoskeleton armor. High-profile toothy lugged sole for futuristic silhouette.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-010",
    name: "Prada Monolith Brushed Leather Loafers",
    brand: "Prada",
    category: "Designer",
    price: 135000,
    featured: false,
    description: "Chunky modernist penny loafer in high-shine brushed spazzolato leather. Mounted on Prada's iconic 55mm oversized treaded Monolith lug sole with enamel triangle plaque.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
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
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-012",
    name: "Saint Laurent Lukas Western Boot",
    brand: "Saint Laurent",
    category: "Boots",
    price: 130000,
    featured: false,
    description: "Rich tan suede calfskin tailored with pointed toe silhouette, interior zip closure, tone-on-tone western topstitching, and an angled cuban heel.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-013",
    name: "Bottega Veneta Tire Lug Boot",
    brand: "Bottega Veneta",
    category: "Boots",
    price: 165000,
    featured: true,
    description: "Matte calfskin Chelsea boot elevated by wavy multi-layered rubber lug sole with clear contrast tread. Pull-on elastic side gussets for effortless wear.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-014",
    name: "Bottega Veneta Puddle Boot 'Fondant'",
    brand: "Bottega Veneta",
    category: "Boots",
    price: 85000,
    featured: false,
    description: "Monolithic molded waterproof ankle boot made from biodegradable polymer rubber. Minimalist bulbous toe and cotton-lined interior.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-015",
    name: "Timberland 6-Inch Premium Waterproof 'Wheat'",
    brand: "Timberland",
    category: "Boots",
    price: 28000,
    featured: false,
    description: "The timeless American workwear staple crafted from seam-sealed waterproof nubuck leather, padded collar, rustproof hex hardware, and lugged rubber outsoles.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-016",
    name: "Timberland Chelsea Boot 'Ember'",
    brand: "Timberland",
    category: "Boots",
    price: 32000,
    featured: false,
    description: "Handcrafted full-grain oiled leather Chelsea boot built with anti-fatigue removable footbed, stretch elastic panels, and rugged lug traction.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-017",
    name: "Dr. Martens 1460 Bex Smooth Leather",
    brand: "Dr. Martens",
    category: "Boots",
    price: 24500,
    featured: false,
    description: "Classic 8-eye boot constructed on an amplified 1.5-inch Bex platform sole. Goodyear welted with signature yellow welt stitch and AirWair bouncing sole.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-018",
    name: "Dr. Martens Adrian Tassel Loafer",
    brand: "Dr. Martens",
    category: "Boots",
    price: 22000,
    featured: false,
    description: "Subcultural heritage kiltie loafer in Polished Smooth leather with double tassel detailing and grooved air-cushioned sole edges.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
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
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-020",
    name: "Travis Scott x Air Jordan 1 Low 'Olive'",
    brand: "Jordan",
    category: "Sneakers",
    price: 165000,
    featured: false,
    description: "Black suede base with white leather overlays, olive reverse leather Swoosh, and signature red Cactus Jack branding on heel and tongue.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-021",
    name: "Air Jordan 1 Retro High 'Chicago Lost & Found'",
    brand: "Jordan",
    category: "Sneakers",
    price: 48000,
    featured: true,
    description: "1985 Chicago retro honoring mom-and-pop sneaker shops. Pre-aged cracked black leather collars, varsity red leather overlays, and muslin nylon tongue.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-022",
    name: "Air Jordan 4 Retro 'Military Black'",
    brand: "Jordan",
    category: "Sneakers",
    price: 52000,
    featured: false,
    description: "Crisp white leather upper with light neutral grey suede mudguard, black TPU support wings, heel tab with Jumpman branding, and visible Air-sole heel unit.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-023",
    name: "Nike x Off-White Air Presto 'Black'",
    brand: "Nike",
    category: "Sneakers",
    price: 95000,
    featured: false,
    description: "Virgil Abloh's deconstructed masterpiece. Breathable mesh upper, stitched contrast white Swoosh, translucent midfoot cage, and signature orange zip-tie tab.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-024",
    name: "Nike x Tiffany & Co. Air Force 1 1837",
    brand: "Nike",
    category: "Sneakers",
    price: 195000,
    featured: false,
    description: "Historic luxury partnership. Premium black suede upper crowned with iconic Tiffany Blue tumbled leather Swoosh and co-branded .925 sterling silver heel badge.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-025",
    name: "Yeezy Boost 350 V2 'Onyx'",
    brand: "Adidas",
    category: "Sneakers",
    price: 38000,
    featured: false,
    description: "All-black re-engineered Primeknit upper woven with monofilament side stripe, supported by responsive full-length enclosed Boost midsole cushion.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-026",
    name: "Yeezy Boost 700 'Wave Runner'",
    brand: "Adidas",
    category: "Sneakers",
    price: 49000,
    featured: false,
    description: "The dad shoe that defined a generation. Grey suede, blue/teal mesh accents, 3M reflective detailing, bright neon laces, and chunky sculpted Boost midsole.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },

  // --- PERFORMANCE & TRAIL LUXURY ---
  {
    id: "prod-027",
    name: "Salomon XT-6 Advanced 'Vanilla Ice'",
    brand: "Salomon",
    category: "Running",
    price: 26500,
    featured: false,
    description: "Ultra-distance trail icon embraced by high fashion. Sensifit welded TPU film upper, Quicklace system, and dual-density EVA cushioning with Agile Chassis System.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-028",
    name: "Salomon ACS Pro Advanced 'Metal/Black'",
    brand: "Salomon",
    category: "Running",
    price: 29000,
    featured: false,
    description: "Technical archetype modernized with Kurim envelope structure, lateral opening mesh for ventilation, and Contagrip tread for grip on wet or urban terrain.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-029",
    name: "On Running Cloudmonster 'All Black'",
    brand: "On",
    category: "Running",
    price: 24000,
    featured: false,
    description: "Swiss engineering delivering monster cushioning. Giant CloudTec pods paired with a springy Speedboard for unmatched forward propulsion and soft landings.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-030",
    name: "Hoka Clifton 9 'Eggnog'",
    brand: "Hoka",
    category: "Running",
    price: 21500,
    featured: false,
    description: "Featherlight maximalist daily trainer. Responsive EVA foam midsole with early-stage Meta-Rocker geometry for smooth transition through gait cycles.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-031",
    name: "Nike Alphafly 3 'Proto'",
    brand: "Nike",
    category: "Running",
    price: 42000,
    featured: false,
    description: "Marathon world-record breaker. Full-length carbon fiber Flyplate, dual forefoot Zoom Air pods, and ultra-lightweight ZoomX foam for maximum energy economy.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-032",
    name: "Asics GEL-Kayano Elite 'Midnight'",
    brand: "Asics",
    category: "Running",
    price: 21500,
    featured: false,
    description: "Flagship stability running silhouette equipped with PureGEL rearfoot cushioning, 4D Guidance System, and FF BLAST PLUS ECO lightweight foam.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
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
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-034",
    name: "New Balance 1906R 'Silver Metallic'",
    brand: "New Balance",
    category: "Lifestyle",
    price: 27000,
    featured: false,
    description: "Millennium runner aesthetic featuring N-ergy shock-absorbing outsole, Stability Web arch support, and ACTEVA LITE cushioning wrapped in silver mesh.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-035",
    name: "Nike Dunk Low 'Panda'",
    brand: "Nike",
    category: "Lifestyle",
    price: 14500,
    featured: false,
    description: "Timeless monochrome staple with smooth white leather base, contrasting black overlays, perforated toe box, and durable pivot-circle traction pattern.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612681621979-fffe4396a5ee?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  },
  {
    id: "prod-036",
    name: "Vans Vault Old Skool LX 'Noir'",
    brand: "Vans",
    category: "Skateboarding",
    price: 12000,
    featured: false,
    description: "Premium Vault tier construction featuring higher-grade leather sidestripe, 10oz heavy canvas, padded collar, and vulcanized waffle outsole.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=85&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=85&w=1200&auto=format&fit=crop"
    ]),
    in_stock: true
  }
];

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Setup Products Sheet
  let prodSheet = ss.getSheetByName(PRODUCTS_SHEET_NAME);
  if (!prodSheet) {
    prodSheet = ss.insertSheet(PRODUCTS_SHEET_NAME);
  }
  
  const productHeaders = ["id", "name", "brand", "category", "price", "images", "description", "in_stock", "featured", "created_at"];
  if (prodSheet.getLastRow() === 0) {
    prodSheet.appendRow(productHeaders);
    const headerRange = prodSheet.getRange(1, 1, 1, productHeaders.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#111827");
    headerRange.setFontColor("#F9FAFB");
    prodSheet.setFrozenRows(1);

    const now = new Date().toISOString();
    SEED_PRODUCTS.forEach(p => {
      prodSheet.appendRow([
        p.id,
        p.name,
        p.brand,
        p.category,
        p.price,
        p.images,
        p.description,
        p.in_stock ? "TRUE" : "FALSE",
        p.featured ? "TRUE" : "FALSE",
        now
      ]);
    });
    Logger.log("Products sheet configured and seeded with 36 luxury shoes.");
  }

  // 2. Setup Orders Sheet
  let orderSheet = ss.getSheetByName(ORDERS_SHEET_NAME);
  if (!orderSheet) {
    orderSheet = ss.insertSheet(ORDERS_SHEET_NAME);
  }
  
  const orderHeaders = [
    "id",
    "created_at",
    "total_amount",
    "status",
    "phone_number",
    "delivery_address",
    "items",
    "checkout_request_id",
    "mpesa_receipt_number"
  ];
  if (orderSheet.getLastRow() === 0) {
    orderSheet.appendRow(orderHeaders);
    const orderHeaderRange = orderSheet.getRange(1, 1, 1, orderHeaders.length);
    orderHeaderRange.setFontWeight("bold");
    orderHeaderRange.setBackground("#111827");
    orderHeaderRange.setFontColor("#F9FAFB");
    orderSheet.setFrozenRows(1);
    Logger.log("Orders sheet configured successfully.");
  }

  return "Setup completed! 36 Products and Orders sheets are ready.";
}

function doGet(e) {
  try {
    const params = e ? e.parameter : {};
    const key = params.key;

    if (API_KEY && API_KEY !== "luxe_secret_key_change_me" && key !== API_KEY) {
      return jsonResponse({ success: false, error: "Unauthorized: Invalid API key" }, 401);
    }

    const action = params.action || "getProducts";

    if (action === "getProducts") {
      return handleGetProducts(params);
    } else if (action === "getOrder") {
      return handleGetOrder(params);
    } else if (action === "ping") {
      return jsonResponse({ success: true, message: "Luxe Database API online", timestamp: new Date().toISOString() });
    }

    return jsonResponse({ success: false, error: "Unknown action: " + action }, 400);
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() }, 500);
  }
}

function doPost(e) {
  try {
    let payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    const key = payload.key || (e && e.parameter ? e.parameter.key : null);
    if (API_KEY && API_KEY !== "luxe_secret_key_change_me" && key !== API_KEY) {
      return jsonResponse({ success: false, error: "Unauthorized: Invalid API key" }, 401);
    }

    const action = payload.action;

    if (action === "createOrder") {
      return handleCreateOrder(payload);
    } else if (action === "updateOrder") {
      return handleUpdateOrder(payload);
    } else if (action === "seedProducts") {
      setupSheets();
      return jsonResponse({ success: true, message: "Sheets re-initialized and seeded with 36 luxury shoes." });
    }

    return jsonResponse({ success: false, error: "Unknown or missing action in POST payload" }, 400);
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() }, 500);
  }
}

function handleGetProducts(params) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(PRODUCTS_SHEET_NAME);
  if (!sheet) {
    return jsonResponse({ success: true, data: [] });
  }

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return jsonResponse({ success: true, data: [] });
  }

  const headers = values[0];
  const categoryFilter = params.category ? params.category.toLowerCase() : null;
  const products = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const rowObj = {};
    headers.forEach((h, index) => {
      rowObj[h] = row[index];
    });

    if (!rowObj.id && !rowObj.name) continue;

    const category = String(rowObj.category || "");
    if (categoryFilter && categoryFilter !== "all" && category.toLowerCase() !== categoryFilter) {
      continue;
    }

    let images = [];
    if (typeof rowObj.images === "string" && rowObj.images.trim().startsWith("[")) {
      try {
        images = JSON.parse(rowObj.images);
      } catch (e) {
        images = [rowObj.images];
      }
    } else if (typeof rowObj.images === "string" && rowObj.images.includes(",")) {
      images = rowObj.images.split(",").map(url => url.trim());
    } else if (rowObj.images) {
      images = [String(rowObj.images).trim()];
    }

    products.push({
      id: String(rowObj.id),
      name: String(rowObj.name || "Footwear"),
      brand: String(rowObj.brand || "Luxe"),
      category: category || "Sneakers",
      price: Number(rowObj.price) || 0,
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=1200&auto=format&fit=crop"],
      description: String(rowObj.description || ""),
      featured: String(rowObj.featured).toUpperCase() === "TRUE",
      in_stock: String(rowObj.in_stock).toUpperCase() !== "FALSE"
    });
  }

  return jsonResponse({ success: true, data: products });
}

function handleCreateOrder(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ORDERS_SHEET_NAME);
  if (!sheet) {
    setupSheets();
    sheet = ss.getSheetByName(ORDERS_SHEET_NAME);
  }

  const orderId = payload.id || ("ord-" + new Date().getTime() + "-" + Math.random().toString(36).substring(2, 7));
  const createdAt = payload.created_at || new Date().toISOString();
  const totalAmount = Number(payload.total_amount) || 0;
  const status = payload.status || "PENDING";
  const phoneNumber = String(payload.phone_number || "");
  const deliveryAddress = String(payload.delivery_address || "");
  const items = typeof payload.items === "string" ? payload.items : JSON.stringify(payload.items || []);
  const checkoutRequestId = String(payload.checkout_request_id || "");
  const mpesaReceiptNumber = String(payload.mpesa_receipt_number || "");

  sheet.appendRow([
    orderId,
    createdAt,
    totalAmount,
    status,
    phoneNumber,
    deliveryAddress,
    items,
    checkoutRequestId,
    mpesaReceiptNumber
  ]);

  return jsonResponse({
    success: true,
    orderId: orderId,
    message: "Order recorded successfully"
  });
}

function handleUpdateOrder(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(ORDERS_SHEET_NAME);
  if (!sheet) {
    return jsonResponse({ success: false, error: "Orders sheet not found" }, 404);
  }

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return jsonResponse({ success: false, error: "No orders found to update" }, 404);
  }

  const headers = values[0];
  const idCol = headers.indexOf("id");
  const checkoutIdCol = headers.indexOf("checkout_request_id");
  const statusCol = headers.indexOf("status");
  const receiptCol = headers.indexOf("mpesa_receipt_number");

  const queryId = payload.id ? String(payload.id).trim() : null;
  const queryCheckoutId = payload.checkout_request_id ? String(payload.checkout_request_id).trim() : null;

  if (!queryId && !queryCheckoutId) {
    return jsonResponse({ success: false, error: "Missing id or checkout_request_id for update" }, 400);
  }

  let targetRowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (queryId && String(row[idCol]).trim() === queryId) {
      targetRowIndex = i + 1;
      break;
    }
    if (queryCheckoutId && String(row[checkoutIdCol]).trim() === queryCheckoutId) {
      targetRowIndex = i + 1;
      break;
    }
  }

  if (targetRowIndex === -1) {
    return jsonResponse({ success: false, error: "Order not found" }, 404);
  }

  if (payload.status !== undefined && statusCol !== -1) {
    sheet.getRange(targetRowIndex, statusCol + 1).setValue(payload.status);
  }
  if (payload.checkout_request_id !== undefined && checkoutIdCol !== -1) {
    sheet.getRange(targetRowIndex, checkoutIdCol + 1).setValue(payload.checkout_request_id);
  }
  if (payload.mpesa_receipt_number !== undefined && receiptCol !== -1) {
    sheet.getRange(targetRowIndex, receiptCol + 1).setValue(payload.mpesa_receipt_number);
  }

  return jsonResponse({
    success: true,
    message: "Order updated successfully",
    updatedRow: targetRowIndex
  });
}

function handleGetOrder(params) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(ORDERS_SHEET_NAME);
  if (!sheet) {
    return jsonResponse({ success: false, error: "Orders sheet not found" }, 404);
  }

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return jsonResponse({ success: false, error: "Order not found" }, 404);
  }

  const headers = values[0];
  const queryId = params.id ? String(params.id).trim() : null;

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const rowObj = {};
    headers.forEach((h, index) => {
      rowObj[h] = row[index];
    });

    if (queryId && String(rowObj.id).trim() === queryId) {
      return jsonResponse({ success: true, order: rowObj });
    }
  }

  return jsonResponse({ success: false, error: "Order not found" }, 404);
}

function jsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

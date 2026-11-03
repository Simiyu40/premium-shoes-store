/* eslint-disable */
/**
 * LUXE PREMIUM SHOES - GOOGLE APPS SCRIPT DATABASE ENGINE
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new) and name it "Luxe Shoes Database".
 * 2. Click Extensions > Apps Script.
 * 3. Replace all code in Code.gs with this entire file.
 * 4. Change API_KEY below to a secure secret token (e.g., "luxe_secret_2026_key").
 * 5. Run the setupSheets() function once from the toolbar to automatically create the
 *    "Products" and "Orders" tabs and seed the initial curated catalogue.
 * 6. Click Deploy > New deployment:
 *    - Select type: Web app
 *    - Description: "Luxe Shoes Database API"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"
 * 7. Copy the Web App URL (ends in /exec) and add it to your Next.js environment as:
 *    GOOGLE_SHEETS_API_URL=<Your Web App URL>
 *    GOOGLE_SHEETS_API_KEY=<Your chosen API_KEY>
 */

// -------------------------------------------------------------
// CONFIGURATION
// -------------------------------------------------------------
const API_KEY = "luxe_secret_key_change_me"; // Set your secret key here
const PRODUCTS_SHEET_NAME = "Products";
const ORDERS_SHEET_NAME = "Orders";

// Initial seed products for the store
const SEED_PRODUCTS = [
  {
    id: "prod-001",
    name: "Air Max Obsidian",
    brand: "Nike",
    category: "Sneakers",
    price: 14500,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop"
    ]),
    description: "Iconic silhouette with responsive Air cushioning and striking obsidian accents.",
    in_stock: true
  },
  {
    id: "prod-002",
    name: "Ultraboost Midnight",
    brand: "Adidas",
    category: "Running",
    price: 18900,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1200&auto=format&fit=crop"
    ]),
    description: "Primeknit upper engineered for maximum energy return and night running comfort.",
    in_stock: true
  },
  {
    id: "prod-003",
    name: "Classic Leather Heritage",
    brand: "Reebok",
    category: "Lifestyle",
    price: 9800,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop"
    ]),
    description: "Timeless soft garment leather sneaker with vintage EVA cushioning.",
    in_stock: true
  },
  {
    id: "prod-004",
    name: "Gel-Kayano Elite",
    brand: "Asics",
    category: "Running",
    price: 21500,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1200&auto=format&fit=crop"
    ]),
    description: "Advanced stability and GEL technology designed for marathon endurance.",
    in_stock: true
  },
  {
    id: "prod-005",
    name: "Old Skool Noir",
    brand: "Vans",
    category: "Skateboarding",
    price: 7500,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop"
    ]),
    description: "Durable canvas and suede skate shoe featuring the signature side stripe.",
    in_stock: true
  },
  {
    id: "prod-006",
    name: "Suede Classic Shadow",
    brand: "Puma",
    category: "Lifestyle",
    price: 8900,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop"
    ]),
    description: "Soft suede silhouette with retro appeal and rubber traction outsole.",
    in_stock: true
  },
  {
    id: "prod-007",
    name: "990v6 Heritage Grey",
    brand: "New Balance",
    category: "Lifestyle",
    price: 26000,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1200&auto=format&fit=crop"
    ]),
    description: "Premium pigskin and mesh construction with FuelCell midsole cushioning.",
    in_stock: true
  },
  {
    id: "prod-008",
    name: "Dunk Low Panda",
    brand: "Nike",
    category: "Sneakers",
    price: 12500,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612681621979-fffe4396a5ee?q=80&w=1200&auto=format&fit=crop"
    ]),
    description: "Iconic two-tone monochrome leather colorway built for effortless style.",
    in_stock: true
  },
  {
    id: "prod-009",
    name: "Chelsea Boot Ember",
    brand: "Timberland",
    category: "Boots",
    price: 32000,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1200&auto=format&fit=crop"
    ]),
    description: "Handcrafted full-grain leather Chelsea boot with rugged lug traction.",
    in_stock: true
  }
];

// -------------------------------------------------------------
// ONE-CLICK SETUP FUNCTION
// -------------------------------------------------------------
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Setup Products Sheet
  let prodSheet = ss.getSheetByName(PRODUCTS_SHEET_NAME);
  if (!prodSheet) {
    prodSheet = ss.insertSheet(PRODUCTS_SHEET_NAME);
  }
  
  const productHeaders = ["id", "name", "brand", "category", "price", "images", "description", "in_stock", "created_at"];
  if (prodSheet.getLastRow() === 0) {
    prodSheet.appendRow(productHeaders);
    const headerRange = prodSheet.getRange(1, 1, 1, productHeaders.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#111827");
    headerRange.setFontColor("#F9FAFB");
    prodSheet.setFrozenRows(1);

    // Seed initial products
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
        now
      ]);
    });
    Logger.log("Products sheet configured and seeded successfully.");
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

  return "Setup completed! Products and Orders sheets are ready.";
}

// -------------------------------------------------------------
// WEB APP HTTP HANDLERS (doGet & doPost)
// -------------------------------------------------------------

function doGet(e) {
  try {
    const params = e ? e.parameter : {};
    const key = params.key;

    // Validate API key
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
      return jsonResponse({ success: true, message: "Sheets re-initialized and seeded." });
    }

    return jsonResponse({ success: false, error: "Unknown or missing action in POST payload" }, 400);
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() }, 500);
  }
}

// -------------------------------------------------------------
// ACTION IMPLEMENTATIONS
// -------------------------------------------------------------

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

    // Filter by category if requested
    const category = String(rowObj.category || "");
    if (categoryFilter && categoryFilter !== "all" && category.toLowerCase() !== categoryFilter) {
      continue;
    }

    // Parse images array or comma separated string
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
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"],
      description: String(rowObj.description || ""),
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
      targetRowIndex = i + 1; // 1-indexed for Sheet API
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

  // Perform updates
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

// -------------------------------------------------------------
// HELPER: JSON HTTP RESPONSE
// -------------------------------------------------------------
function jsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}


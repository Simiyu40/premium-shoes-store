import { Product } from "@/store/useCart";

export interface CreateOrderInput {
  id: string;
  total_amount: number;
  status?: string;
  delivery_address: string;
  phone_number: string;
  items: string | unknown[];
  checkout_request_id?: string;
  mpesa_receipt_number?: string;
  created_at?: string;
}

export interface UpdateOrderInput {
  status?: string;
  checkout_request_id?: string;
  mpesa_receipt_number?: string;
}

function getGoogleSheetsConfig() {
  const apiUrl = process.env.GOOGLE_SHEETS_API_URL;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY || "";
  return { apiUrl, apiKey };
}

/**
 * Fetches products from Google Sheets via the deployed Apps Script Web App.
 * Uses Next.js ISR caching (revalidates every 60s) to guarantee fast edge response times.
 */
export async function fetchProductsFromSheet(category?: string): Promise<Product[] | null> {
  const { apiUrl, apiKey } = getGoogleSheetsConfig();

  if (!apiUrl) {
    return null;
  }

  try {
    const url = new URL(apiUrl);
    url.searchParams.set("action", "getProducts");
    if (apiKey) url.searchParams.set("key", apiKey);
    if (category && category.toLowerCase() !== "all") {
      url.searchParams.set("category", category);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["products"],
      },
      redirect: "follow",
    });

    if (!response.ok) {
      console.warn(`[Google Sheets DB] HTTP ${response.status} fetching products`);
      return null;
    }

    const data = await response.json();
    if (data && data.success && Array.isArray(data.data)) {
      return data.data as Product[];
    }

    return null;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Google Sheets DB] Error fetching products: ${msg}`);
    return null;
  }
}

/**
 * Records a new customer order row in the Google Sheets Orders tab.
 */
export async function insertOrderToSheet(
  order: CreateOrderInput
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  const { apiUrl, apiKey } = getGoogleSheetsConfig();

  if (!apiUrl) {
    console.warn("[Google Sheets DB] GOOGLE_SHEETS_API_URL is not set. Order recorded in local session only.");
    return { success: true, orderId: order.id };
  }

  try {
    const payload = {
      action: "createOrder",
      key: apiKey,
      id: order.id,
      total_amount: order.total_amount,
      status: order.status || "PENDING",
      delivery_address: order.delivery_address,
      phone_number: order.phone_number,
      items: typeof order.items === "string" ? order.items : JSON.stringify(order.items),
      checkout_request_id: order.checkout_request_id || "",
      mpesa_receipt_number: order.mpesa_receipt_number || "",
      created_at: order.created_at || new Date().toISOString(),
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      cache: "no-store",
    });

    const result = await response.json();
    if (result && result.success) {
      return { success: true, orderId: result.orderId || order.id };
    }

    return { success: false, error: result?.error || "Failed to record order in Google Sheet" };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Google Sheets DB] Exception recording order: ${msg}`);
    return { success: false, error: msg };
  }
}

/**
 * Updates an existing order row in the Google Sheets Orders tab.
 * Can find the order by either `id` or `checkoutRequestId`.
 */
export async function updateOrderInSheet(
  query: { id?: string; checkoutRequestId?: string },
  updates: UpdateOrderInput
): Promise<{ success: boolean; error?: string }> {
  const { apiUrl, apiKey } = getGoogleSheetsConfig();

  if (!apiUrl) {
    return { success: true };
  }

  try {
    const payload = {
      action: "updateOrder",
      key: apiKey,
      id: query.id,
      checkout_request_id: query.checkoutRequestId,
      ...updates,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      cache: "no-store",
    });

    const result = await response.json();
    if (result && result.success) {
      return { success: true };
    }

    return { success: false, error: result?.error || "Failed to update order in Google Sheet" };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Google Sheets DB] Exception updating order: ${msg}`);
    return { success: false, error: msg };
  }
}


/**
 * Seed script for Luxe Premium Shoes Store using Google Sheets.
 * 
 * Triggers the Apps Script Web App to setup and seed products in the Google Sheet.
 * 
 * Usage:
 *   node scripts/seed-products.mjs
 * 
 * Requires .env.local in the project root with:
 *   GOOGLE_SHEETS_API_URL
 *   GOOGLE_SHEETS_API_KEY
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

const apiUrl = process.env.GOOGLE_SHEETS_API_URL;
const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

if (!apiUrl) {
  console.log("ℹ️  Note: You can run setupSheets() directly inside Google Sheets (Extensions > Apps Script).");
  console.log("   If you have already deployed the Web App, provide GOOGLE_SHEETS_API_URL in .env.local to run this script.");
  process.exit(0);
}

async function seed() {
  console.log(`Connecting to Google Sheets API: ${apiUrl}...`);
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "seedProducts",
        key: apiKey,
      }),
      redirect: "follow",
    });

    const data = await response.json();
    console.log("Response:", data);
    if (data.success) {
      console.log("✅ Google Sheets catalogue configured and seeded successfully!");
    } else {
      console.warn("⚠️ Google Sheets API returned warning:", data.error || data);
    }
  } catch (err) {
    console.error("❌ Failed to reach Google Sheets API:", err.message);
  }
}

seed();

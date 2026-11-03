# Luxe - Premium Shoes Store

Luxe is a modern, high-performance e-commerce platform dedicated to premium footwear. Designed with a focus on an avant-garde aesthetic, smooth micro-interactions, and a seamless shopping journey from browsing to checkout.

This project was built by:
- **Hiram Simiyu** (COM/1004/23)
- **Frankline Ombati** (COM/091/23)

---

## ✨ Key Features

- **Premium UI/UX:** An elegant design featuring glassmorphism, fluid motion, and bespoke typography.
- **Google Sheets Database:** Entirely serverless database powered by Google Sheets and Google Apps Script — edit inventory, pricing, and view customer orders in real time.
- **Vercel Optimized:** Ready for global deployment on Vercel with ISR caching and edge-ready API routes.
- **M-PESA Integration:** Direct Daraja STK Push payment flow with automated callback status updates.
- **Internationalization (i18n):** Multi-language support powered by `next-intl`.
- **Progressive Web App (PWA):** Installable on iOS/Android/Desktop with offline service worker caching via Serwist.
- **Dynamic Shopping Cart:** Instant cart state management powered by Zustand.
- **Dark/Light Mode:** Full aesthetic consistency across light and dark color schemes.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Server Actions)
- **Database Backend:** [Google Sheets](https://sheets.google.com/) + [Google Apps Script](https://developers.google.com/apps-script)
- **Deployment & Hosting:** [Vercel](https://vercel.com/)
- **Payments:** [Safaricom Daraja API (M-Pesa STK Push)](https://developer.safaricom.co.ke/)
- **UI Library & Styling:** [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Localization:** [next-intl](https://next-intl-docs.vercel.app/)
- **PWA:** [Serwist](https://serwist.build/)

---

## 📊 Google Sheets Database Setup (5 Minutes)

You can use Google Sheets as your live inventory and order database:

1. **Create a new Google Sheet:**
   - Go to [sheets.new](https://sheets.new) and title the spreadsheet **"Luxe Shoes Database"**.
2. **Open the Apps Script Editor:**
   - Click **Extensions** > **Apps Script**.
3. **Paste the Database Script:**
   - Open `scripts/google-apps-script.js` in this repository.
   - Copy all its contents and replace everything in the Apps Script `Code.gs` file.
   - *(Optional)* Change `API_KEY` at the top of the script to your own secret key.
4. **Initialize Sheets & Products:**
   - Select the `setupSheets` function from the dropdown menu and click **Run**.
   - Grant Google authorization permissions when prompted.
   - This automatically creates the **Products** and **Orders** tabs with formatted headers and seeds the initial curated shoe catalogue.
5. **Deploy as a Web App:**
   - Click **Deploy** > **New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - Description: `Luxe Database API`
   - Execute as: `Me (your email)`
   - Who has access: `Anyone`
   - Click **Deploy**.
6. **Copy the Web App URL:**
   - Copy the URL (ending in `/exec`).
   - Add it to your `.env.local` or Vercel environment variables:
     ```env
     GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/AKfycb.../exec
     GOOGLE_SHEETS_API_KEY=your_chosen_api_key
     ```

---

## 🚀 Deployment to Vercel via CLI

To deploy directly to Vercel using the Vercel CLI:

1. **Install Vercel CLI globally (or run with npx):**
   ```bash
   npx vercel login
   ```
2. **Link and preview deployment:**
   ```bash
   npx vercel
   ```
   Follow the prompts to link to your Vercel account and project.
3. **Deploy to Production:**
   ```bash
   npx vercel --prod
   ```
4. **Add Environment Variables to Vercel:**
   You can add environment variables via the Vercel Dashboard (**Project Settings > Environment Variables**) or via CLI:
   ```bash
   npx vercel env add GOOGLE_SHEETS_API_URL
   npx vercel env add GOOGLE_SHEETS_API_KEY
   npx vercel env add MPESA_ENVIRONMENT
   npx vercel env add MPESA_CONSUMER_KEY
   npx vercel env add MPESA_CONSUMER_SECRET
   npx vercel env add MPESA_PASSKEY
   npx vercel env add MPESA_SHORTCODE
   npx vercel env add NEXT_PUBLIC_APP_URL
   ```

---

## 💻 Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```
2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
3. **Run development server:**
   ```bash
   pnpm dev
   ```
4. **Open in browser:**
   Open [http://localhost:3000](http://localhost:3000).

---

## 📦 Scripts

- `pnpm dev` - Starts Next.js development server.
- `pnpm build` - Creates an optimized production build.
- `pnpm start` - Starts production server.
- `pnpm lint` - Runs ESLint.

---

## 📄 License

This project is licensed under the MIT License.

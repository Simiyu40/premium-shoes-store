# Luxe - Premium Shoes Store

Luxe is a modern, high-performance e-commerce platform dedicated to premium footwear. Designed with a focus on an avant-garde aesthetic, smooth micro-interactions, and a seamless user experience, Luxe provides an exceptional shopping journey from browsing to checkout.

This project was built by:
- **Hiram Simiyu** (COM/1004/23)
- **Frankline Ombati** (COM/091/23)

## ✨ Key Features

- **Premium UI/UX:** An elegant, bespoke design using custom typography, glassmorphism, and fluid animations for an unforgettable shopping experience.
- **Internationalization (i18n):** Multi-language support to cater to a diverse customer base.
- **Dynamic Shopping Cart:** Fast, reliable state management for instant cart updates without page reloads.
- **M-PESA Integration:** A seamless and secure checkout process powered by M-PESA.
- **Progressive Web App (PWA):** Installable on devices with offline capabilities for a native-like experience.
- **Dark/Light Mode:** Aesthetic consistency across both color schemes.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Localization:** [next-intl](https://next-intl-docs.vercel.app/)
- **PWA Integration:** [Serwist](https://serwist.build/)

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v20+) and [pnpm](https://pnpm.io/) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/premium-shoes-store.git
   cd premium-shoes-store
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your Supabase and M-PESA configuration keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   # Add M-PESA and other required keys
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Scripts

- `pnpm dev` - Starts the development server.
- `pnpm build` - Builds the application for production.
- `pnpm start` - Runs the built application.
- `pnpm lint` - Runs ESLint to catch and fix issues.

## 📄 License

This project is licensed under the MIT License.

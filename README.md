# 🛒 E-Commerce Website

This is a full-featured e-commerce web application built with **Next.js**, **Supabase**, **Stripe**, and **Tailwind CSS**. It includes a shopping cart, authentication, and a checkout process.

## 🚀 Features

- 🎁 Product listing & details
- 🛒 Shopping cart management
- 🔑 User authentication (Supabase)
- 💳 Secure payments with **Stripe**
- 🌍 Multi-language support with `next-intl`
- 🌟 Responsive & dark mode support

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth)
- **Payments:** Stripe
- **Deployment:** Vercel

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env.local`):
   ```sh
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_PUBLIC_KEY=your-stripe-public-key
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
   The website will be available at `http://localhost:3000`.

## 💳 Stripe Integration

1. Create a [Stripe](https://stripe.com/) account.
2. Get your **Publishable Key** and **Secret Key** from the Stripe dashboard.
3. Add them to your `.env.local` file.
4. Make sure your **webhooks** are correctly set up to handle payment confirmations.

## 🚀 Deployment

### **Deploying to Vercel**

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and create a new project.
3. Connect your repository and set environment variables.
4. Click **Deploy**.

## 🛠 Environment Variables

Ensure you set up the following in **Vercel** or **`.env.local`**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

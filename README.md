# 🛒 E-Commerce Website

This is a full-featured e-commerce web application built with **Next.js**, **Supabase**, **Stripe**, **Nodemailer**, and **Tailwind CSS**. It includes a shopping cart, authentication, a checkout process, and email notifications.

## 🚀 Features

- 🎁 Product listing & details
- 🛒 Shopping cart management
- 🔑 User authentication (Supabase)
- 💳 Secure payments with **Stripe**
- 📧 Email notifications with **Nodemailer**
- 🌍 Multi-language support with `next-intl`
- 🌟 Responsive & dark mode support

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth)
- **Payments:** Stripe
- **Emails:** Nodemailer
- **Deployment:** Vercel

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ShotaJokhadze/Homework1.git
   cd Homework1
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
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-public-key
   EMAIL_HOST=smtp.your-email-provider.com
   EMAIL_PORT=your-email-port
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
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

## 📧 Nodemailer Integration

1. Set up an email provider (e.g., Gmail, SendGrid, Mailgun).
2. Get SMTP credentials (host, port, username, and password).
3. Add them to your `.env.local` file.
4. Implement email sending logic in your app to notify users about order confirmations, shipping updates, etc.

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
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASS`

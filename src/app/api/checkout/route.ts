import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

interface CartItem {
  product: {
    id: number | string;
    title: string;
    image: string;
    price: number;
  };
  quantity: number;
}

export async function POST(req: Request) {
  try {
    const { cartItems, locale } = await req.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/cart`,
      line_items: cartItems.map((item: CartItem) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
            images: [item.product.image],
            metadata: {
              product_id: String(item.product.id),
            },
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      })),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Failed to create Stripe session";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

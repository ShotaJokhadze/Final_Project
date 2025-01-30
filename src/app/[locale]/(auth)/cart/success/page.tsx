import { redirect } from "next/navigation";
import { stripe } from "../../../../../lib/stripe/stripe";
import { createClient } from "../../../../../utils/supabase/server";
import { Link } from "../../../../../i18n/routing";
import Stripe from "stripe";

export default async function SuccessPage({
  searchParams,
  params, // Add params here
}: {
  searchParams: { session_id: string };
  params: { locale: string };
}) {
  const { locale } = params;

  if (!searchParams.session_id) {
    redirect(`${locale}/cart`)
  }

  const supabase = await createClient();
  
  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      searchParams.session_id,
      {
        expand: ['line_items','line_items.data.price.product', 'payment_intent'],
      }
    );
    const orderItems = checkoutSession.line_items?.data.map((lineItem) => {
      const product = lineItem.price?.product as Stripe.Product;
      return {
        product_id: product.metadata.product_id,
        product_name: product.name,
        quantity: lineItem.quantity,
        unit_price: lineItem.price?.unit_amount,
        image: product.images?.[0] || null,
      }
    }) || [];

    const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;
    const paymentIntentId = paymentIntent.id;

    const userResponse = await supabase.auth.getUser();
    const userId = userResponse.data.user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data: existingOrder } = await supabase
    .from('orders')
    .select('id')
    .eq('payment_intent_id', paymentIntentId)
    .single();

    if (existingOrder) {
      console.log("Order already exists, skipping insertion.");
    } else {
      const { error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: userId,
          order_items: orderItems,
          total_amount: checkoutSession.amount_total,
          payment_intent_id: paymentIntentId,
          status: checkoutSession.payment_status,
          created_at: new Date().toISOString(),
        }]).single();

      if (orderError) {
        console.error("Failed to insert order:", orderError);
        throw orderError;
      }
    }


    const { error: clearCartError } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', userId);

    if (clearCartError) {
      console.error("Failed to clear cart:", clearCartError);
    }

    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="space-y-4">
            <Link
              href="/orders"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              View My Orders
            </Link>
            <Link
              href="/products"
              className="block w-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error processing success page:', error);
    const errorMessage = error instanceof Error ? error.message : "Something went wrong.";
    redirect(`${locale}/error?message=${encodeURIComponent(errorMessage)}`);
  }
} 
'use server'
import Stripe from 'stripe';
import { createClient } from './supabase/server';

export async function createProduct(inputData: FormData) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  const title = inputData.get('title') as string;
  const description = inputData.get('description') as string;
  const price = Number(inputData.get('price'));
  const brand = inputData.get('brand') as string;
  const image = inputData.get('image') as string;
  const title_ge = inputData.get('title_ge') as string;
  const description_ge = inputData.get('description_ge') as string;

  if (!title || !price || !image || !user_id || !brand || !description) {
    console.log('Missing required fields');
    return { success: false, message: 'Missing required fields.' };
  }

  try {
    const stripeProduct = await stripe.products.create({
      name: title,
      description: description,
      images: image ? [image] : [],
      metadata: {
        brand,
        title_ge,
        description_ge,
      }
    });

    const stripePrice = await stripe.prices.create({
      unit_amount: price * 100,
      currency: 'usd',
      product: stripeProduct.id,
    });

    const { data, error } = await supabase
      .from('products')
      .insert({
        title,
        price,
        image,
        user_id,
        brand,
        description,
        title_ge,
        description_ge,
        stripe_product_id: stripeProduct.id,
        stripe_price_id: stripePrice.id,
      })
      .single();

    if (error) {
      console.error('Error inserting into Supabase:', error);
      return { success: false, message: 'Failed to insert product into the database.' };
    }
    console.log('Product inserted into Supabase:', data);
    return { success: true, message: 'Product created successfully!' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Error creating product. Please try again.' };
  }
}

export async function deleteProduct(ProductId: number) {
  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  try {
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('user_id')
      .eq('id', ProductId) 
      .single();

    if (productError) {
      console.error('Error fetching product:', productError);
      return { success: false, message: 'Failed to verify product ownership.' };
    }

    if (product.user_id !== user_id) {
      console.log(`Unauthorized delete attempt by user: ${user_id}`);
      return { success: false, message: 'Unauthorized to delete this product.' };
    }

    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('id', ProductId);

    if (deleteError) {
      console.error('Error deleting product from Supabase:', deleteError);
      return { success: false, message: 'Failed to delete product.' };
    }

    return { success: true, message: 'Product deleted successfully!' };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, message: 'Error deleting product. Please try again.' };
  }
}

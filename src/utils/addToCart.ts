import { createClient } from "./supabase/server";

export async function addToCart(productId: number, quantity: number = 1) {

  if (quantity <= 0) {
    throw new Error('Quantity must be a positive number');
  }

  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser()
  const user_id = userResponse.data?.user?.id

  const { data, error } = await supabase
    .from('cart')
    .insert([{ user_id, product_id: productId, quantity }]).single();

  if (error) {
    console.error('Error adding to cart:', error.message);
    throw new Error('Failed to add product to cart');
  }

  return data;
}
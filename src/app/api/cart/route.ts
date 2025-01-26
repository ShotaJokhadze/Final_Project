import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { productId, quantity } = body;

    if (!productId || typeof productId !== "number") {
      console.error("Invalid productId:", productId);
      return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
    }

    const supabase = await createClient();

    const userResponse = await supabase.auth.getUser();
    const user_id = userResponse.data?.user?.id;

    // Check if the product is already in the cart
    const { data: existingCartItem } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user_id)
      .eq("product_id", productId)
      .single();

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + quantity;

      const { error: updateError } = await supabase
        .from("cart")
        .update({ quantity: newQuantity })
        .eq("id", existingCartItem.id);

      if (updateError) {
        console.error("Error updating cart item:", updateError.message);
        return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 });
      }

      return NextResponse.json({ message: "Cart item updated", quantity: newQuantity }, { status: 200 });
    } else {
      const { data, error: insertError } = await supabase
        .from("cart")
        .insert([{ user_id, product_id: productId, quantity }])
        .single();

      if (insertError) {
        console.error("Error inserting into cart:", insertError.message);
        return NextResponse.json({ error: "Failed to add product to cart" }, { status: 500 });
      }

      return NextResponse.json({ message: "Added to cart", data }, { status: 200 });
    }
  } catch (error) {
    console.error('Detailed error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ 
      error: errorMessage || "Internal Server Error",
    }, { status: 500 });
  }
}

export async function GET() {
  const supabase = await createClient();

  const { data: userResponse, error: userError } = await supabase.auth.getUser();

  if (userError || !userResponse?.user) {
    return NextResponse.json(
      { error: "User not logged in or could not be authenticated" },
      { status: 401 }
    );
  }

  const user_id = userResponse.user.id;

  const { data, error } = await supabase
  .from("cart")
  .select(`
    id, 
    user_id, 
    quantity, 
    product:product_id (
      title, 
      price, 
      image
    )
  `)
  .eq("user_id", user_id);

  if (error) {
    return NextResponse.json(
      { error: "Could not fetch cart items" },
      { status: 500 }
    );
  }

  return NextResponse.json(data || [], { status: 200 }); 
}
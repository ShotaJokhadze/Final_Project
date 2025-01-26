import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { quantity } = await req.json();

  const { error } = await supabase
    .from("cart")
    .update({ quantity })
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: "Failed to update quantity" }, { status: 500 });
  }

  return NextResponse.json({ message: "Quantity updated successfully" });
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { error } = await supabase.from("cart").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }

  return NextResponse.json({ message: "Item deleted successfully" });
}
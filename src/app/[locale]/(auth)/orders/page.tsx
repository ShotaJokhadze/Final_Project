import { notFound } from "next/navigation";
import { createClient } from "../../../../utils/supabase/server";
import OrdersList from "../../../../components/OrderCard/OrderCard";

export default async function OrdersPage() {
  const supabase = await createClient();
  
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  
  if (!userId) return notFound();

  const { data: orders, error } = await supabase
    .from("orders")
    .select()
    .eq("user_id", userId)
    .order('created_at', {ascending: false});

  if (error) {
    console.error("Error fetching orders:", error);
    return notFound();
  }

  return (
    <div className="w-full md:w-4/5 min-h-screen mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">My Orders</h1>
      <OrdersList orders={orders} />
    </div>
  );
}

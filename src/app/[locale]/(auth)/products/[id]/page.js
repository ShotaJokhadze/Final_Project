import { notFound } from "next/navigation";
import Product from "../../../../components/Product/Product";

const url = "https://dummyjson.com/products";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();

  return data.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();
  return data;
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return notFound();
  }

  return <Product {...product} />;
}

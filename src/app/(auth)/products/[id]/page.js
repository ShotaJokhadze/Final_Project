import { notFound } from "next/navigation";
import Product from "../../components/Product/Product";

const url = "https://dummyjson.com/products";

export async function generateStaticParams() {
  const res = await fetch(url);
  const data = await res.json();

  return data.products.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id) {
  const res = await fetch(`${url}/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
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

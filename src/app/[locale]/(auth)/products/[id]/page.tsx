import { notFound } from "next/navigation";
import Product from "../../../../components/Product/Product";
import { Product as ProductInterface } from "../../../../../types/product";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data: ProductInterface[] = await res.json();

  return data.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id: string): Promise<ProductInterface> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

interface ProductPageProps {
  params: {
    id: string,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    return notFound();
  }

  return <Product {...product} />;
}

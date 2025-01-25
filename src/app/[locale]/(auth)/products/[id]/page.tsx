import { notFound } from "next/navigation";
import Product from "../../../../../components/Product/Product";
import { Product as ProductInterface } from "../../../../../types/product";


const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
async function getProduct(id: string): Promise<ProductInterface> {
  const res = await fetch(
    `${baseUrl}/api/products/${id}`,
    { cache: 'no-store' }  // Added this to ensure fresh data
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

interface ProductPageProps {
  params: {
    id: string;
    locale: string;  // Added locale parameter
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id, locale } = params;  // Extract both id and locale
  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  // Pass both the product data and locale to the Product component
  return<Product {...product} locale={locale} />;
}
import Card from "../../../../components/productCard/Card";
import { Pagination } from "../../../../components/Pagination/Pagination";
import { Product } from "../../../../types/product";
import Link from "next/link";

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

interface ProductsPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { locale } = params;
  let products: Product[] = [];
  let fetchError: string | null = null;

  try {
    products = await fetchProducts();
  } catch (err) {
    fetchError = (err as Error).message;
  }

  // Pagination logic
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const productsPerPage = 18;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Slice products for current page
  const paginatedProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  // Helper function to get the appropriate text based on locale and availability
  const getLocalizedText = (georgianText: string | null, englishText: string) => {
    if (locale === 'ka') {
      return georgianText || englishText; // Fallback to English if Georgian is null
    }
    return englishText;
  };

  return (
    <div className="products-page p-3 w-full h-full flex flex-col items-between">
      {fetchError && <p>{fetchError}</p>}
      <div className="products-top flex justify-between items-center w-full">
        <h1>Our Products</h1>
        <Link 
          className="bg-mediumGray text-light rounded-md p-3 hover:bg-gray-900 transition-all" 
          href={`/${locale}/create-product`}
        >
          Create Product
        </Link>
      </div>
      <div className="card-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center place-content-center mt-2">
        {paginatedProducts.map((product) => (
          <div
            className="card w-[300px] border border-mediumGray relative h-[390px] flex flex-col justify-around gap-2 max-w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 transition-colors duration-300 overflow-hidden"
            key={product.id}
          >
            <Card
              key={product.id}
              id={product.id}
              header={getLocalizedText(product.title_ge, product.title)}
              content={getLocalizedText(product.description_ge, product.description)}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={page < totalPages}
          hasPrevPage={page > 1}
        />
      )}
    </div>
  );
}
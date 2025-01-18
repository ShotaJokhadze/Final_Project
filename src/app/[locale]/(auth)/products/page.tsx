import Card from "../../../../components/productCard/Card";
import { Pagination } from "../../../../components/Pagination/Pagination";
import { Product } from "../../../../types/product";

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
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
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

  return (
    <div className="products-page p-3 w-full">
      {fetchError && <p>{fetchError}</p>}

      <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center place-content-center">
        {paginatedProducts.map((product) => (
          <div
            className="card border border-mediumGray rounded-lg overflow-hidden relative h-[390px] flex flex-col justify-around gap-2 max-w-80"
            key={product.id}
          >
            <Card
              key={product.id}
              id={product.id}
              header={product.title}
              content={product.description}
              price={product.price}
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

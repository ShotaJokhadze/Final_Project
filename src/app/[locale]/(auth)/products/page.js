import "./products.scss";
import Card from "../../../components/productCard/Card";
import { Pagination } from "../../../components/Pagination/Pagination"; // You'll need to create this component

async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage({ searchParams }) {
  let products = [];
  let fetchError = null;

  try {
    products = await fetchProducts();
  } catch (err) {
    fetchError = err.message;
  }

  // Pagination logic
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
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

      <div className="card-container grid grid-cols-3 gap-5 place-items-center place-content-center">
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

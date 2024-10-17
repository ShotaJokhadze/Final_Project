import "./products.scss";
import Card from "../components/productCard/Card";
import SearchBar from "../components/Search/search";
import Sort from "../components/Sort/sort";

let url = "https://dummyjson.com/products";

export default async function Products({ searchParams }) {
  const searchTerm = searchParams?.search || "";
  const sortOption = searchParams?.sortBy || "";
  const sortOrder = searchParams?.order || "";

  let queryUrl = `${url}`;

  if (searchTerm) {
    queryUrl += `/search?q=${searchTerm}`;
  }

  if (sortOption) {
    console.log(searchTerm, sortOption);
    queryUrl += `${
      searchTerm ? "&" : "?"
    }sortBy=${sortOption}&order=${sortOrder}`;
  }

  const res = await fetch(queryUrl);
  const data = await res.json();
  const products = data.products;

  // console.log(queryUrl);
  return (
    <div className="products-page">
      <div className="filter-container">
        <SearchBar searchType="products" />
        <Sort />
      </div>

      <div className="card-container">
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              src={product.images[0]}
              header={product.title}
              content={product.description}
              price={product.price}
            />
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
}

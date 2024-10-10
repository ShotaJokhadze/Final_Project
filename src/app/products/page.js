import "./products.scss";
import Card from "../components/productCard/Card";

const url = "https://dummyjson.com/products";

async function getProducts() {
  const res = await fetch(url);
  const data = await res.json();
  return data.products;
}

export default async function Products() {
  const products = await getProducts();

  return (
    <>
      <div className="card-container">
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            src={product.images[0]}
            header={product.title}
            content={product.description}
          />
        ))}
      </div>
    </>
  );
}

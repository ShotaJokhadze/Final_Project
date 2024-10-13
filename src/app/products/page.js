"use client";

import { useState, useEffect } from "react";
import "./products.scss";
import Card from "../components/productCard/Card";

const url = "https://dummyjson.com/products";

async function getProducts() {
  const res = await fetch(url);
  const data = await res.json();
  return data.products;
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="products-page">
      <div className="sort-container">
        <label>Sort by:</label>
        <div
          className="dropdown"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          tabIndex={0}
          onBlur={handleBlur}
        >
          <div className="dropdown-selected">
            {sortOrder === "asc" ? "Price Low to High" : "Price High to Low"}
          </div>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleSortChange("asc")}>Price Low to High</li>
              <li onClick={() => handleSortChange("desc")}>
                Price High to Low
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="card-container">
        {sortedProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            src={product.images[0]}
            header={product.title}
            content={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

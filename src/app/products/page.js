"use client";

import { useState, useEffect } from "react";
import "./products.scss";
import Card from "../components/productCard/Card";

const url = "https://dummyjson.com/products";

const fetchProducts = async (sortBy, order) => {
  const res = await fetch(`${url}?sortBy=${sortBy}&order=${order}`);
  const { products } = await res.json();
  return products;
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sortBy") || "title"
  );
  const [sortOrder, setSortOrder] = useState(
    localStorage.getItem("sortOrder") || "asc"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const getSortedProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(sortBy, sortOrder);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getSortedProducts();
  }, [sortBy, sortOrder]);

  const handleSortChange = (newSortBy, order) => {
    setSortBy(newSortBy);
    setSortOrder(order);
    localStorage.setItem("sortBy", newSortBy);
    localStorage.setItem("sortOrder", order);
    setDropdownOpen(false);
  };

  return (
    <div className="products-page">
      <div className="sort-container">
        <label>Sort by:</label>
        <div
          className="dropdown"
          tabIndex={0}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="dropdown-selected">
            {sortBy === "price"
              ? `Price ${sortOrder === "asc" ? "Low to High" : "High to Low"}`
              : `Title ${sortOrder === "asc" ? "A-Z" : "Z-A"}`}
          </div>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleSortChange("price", "asc")}>
                Price Low to High
              </li>
              <li onClick={() => handleSortChange("price", "desc")}>
                Price High to Low
              </li>
              <li onClick={() => handleSortChange("title", "asc")}>
                Title A-Z
              </li>
              <li onClick={() => handleSortChange("title", "desc")}>
                Title Z-A
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="card-container">
        {products.map((product) => (
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

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./products.scss";
import Card from "../components/productCard/Card";

const url = "https://dummyjson.com/products";

const fetchProducts = async (searchTerm, sortBy, order) => {
  let queryUrl = `${url}`;

  if (searchTerm) {
    queryUrl += `/search?q=${searchTerm}`;
  }

  if (sortBy) {
    queryUrl += `${searchTerm ? "&" : "?"}sortBy=${sortBy}&order=${order}`;
  }

  const res = await fetch(queryUrl);
  const { products } = await res.json();
  return products;
};

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    searchParams.get("q") || ""
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const query = searchParams.get("q") || "";
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("order");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(
          debouncedSearchTerm,
          sortBy,
          sortOrder
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, [debouncedSearchTerm, sortBy, sortOrder]);

  const handleSearchInput = (e) => {
    const newSearchTerm = e.target.value;
    router.push(`?q=${newSearchTerm}`);
  };

  const handleSortChange = (newSortBy, newOrder) => {
    router.push(
      `?q=${debouncedSearchTerm}&sortBy=${newSortBy}&order=${newOrder}`
    );
    setDropdownOpen(false);
  };

  return (
    <div className="products-page">
      <div className="filter-container">
        <input
          type="text"
          value={query}
          onChange={handleSearchInput}
          placeholder="Search products..."
        />

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
                : sortBy === "title"
                ? `Title ${sortOrder === "asc" ? "A-Z" : "Z-A"}`
                : "Choose Sort"}
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

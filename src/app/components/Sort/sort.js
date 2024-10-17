"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Sort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("order");
  const query = searchParams.get("search") || "";
  console.log(query);

  const handleSortChange = (newSortBy, newOrder) => {
    const newUrl = `/products/?search=${query}&sortBy=${newSortBy}&order=${newOrder}`;
    router.push(newUrl);
    setDropdownOpen(false);
  };

  return (
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
            <li onClick={() => handleSortChange("title", "asc")}>Title A-Z</li>
            <li onClick={() => handleSortChange("title", "desc")}>Title Z-A</li>
          </ul>
        )}
      </div>
    </div>
  );
}

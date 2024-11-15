"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "../../../i18n/routing";

export default function SearchBar({ searchType }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue] = useDebounce(searchTerm, 500);
  const router = useRouter();

  useEffect(() => {
    if (debouncedValue) {
      router.push(`/${searchType}/?search=${debouncedValue}`);
    } else {
      router.push(`/${searchType}`);
    }
  }, [debouncedValue, router, searchType]);

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        placeholder="looking for something?"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Card from "../../../../components/productCard/Card";
import { Product } from "../../../../types/product";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function fetchProducts(searchQuery: string = "", brand: string = ""): Promise<Product[]> {
  const res = await fetch(`${baseUrl}/api/products?search=${searchQuery}&brand=${brand}`, {
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
}

export default function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = params;
  const router = useRouter();
  const searchParamsObj = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParamsObj.get("search") || "");
  const [brand, setBrand] = useState(searchParamsObj.get("brand") || "");
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const data = await fetchProducts(searchQuery, brand);
        setProducts(data);
        setFetchError(null);
      } catch (err) {
        setFetchError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [searchQuery, brand]);

  useEffect(() => {
    async function fetchBrands() {
      const res = await fetch(`${baseUrl}/api/brands`);
      const data = await res.json();
      setBrands(data);
    }
    fetchBrands();
  }, []);

  const getLocalizedText = (georgianText: string | null, englishText: string) => {
    if (locale === 'ka') {
      return georgianText || englishText; // Fallback to English if Georgian is null
    }
    return englishText;
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    router.push(`/${locale}/products?search=${value}&brand=${brand}`);
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setBrand(value);
    router.push(`/${locale}/products?search=${searchQuery}&brand=${value}`);
  };

  return (
    <div className="products-page w-full p-3 min-h-screen flex flex-col">
      {fetchError && <p className="text-red-500 mb-4">{fetchError}</p>}

      <div className="products-top flex flex-col lg:flex-row gap-4 lg:gap-6 w-full mb-6">
        <h1 className="text-2xl font-bold">Our Products</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 w-full sm:w-64"
          />
          <select
            value={brand}
            onChange={handleBrandChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 w-full sm:w-48"
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b} className="capitalize">
                {b}
              </option>
            ))}
          </select>
        </div>

        <Link 
          className="bg-mediumGray text-light rounded-md p-3 hover:bg-gray-900 transition-all text-center lg:ml-auto"  
          href={`/${locale}/create-product`}
        >
          Create Product
        </Link>
      </div>

      <div className="w-full min-h-[600px]">
        {isLoading ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((placeholder) => (
              <div 
                key={placeholder} 
                className="w-full max-w-[300px] h-[390px] bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg animate-pulse mx-auto"
              />
            ))}
          </div>
        ) : (
          <div className="card-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center place-content-start min-h-[600px]">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="card w-full max-w-[300px] border border-mediumGray relative h-[390px] flex flex-col justify-around gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 transition-colors duration-300 overflow-hidden">
                  <Card
                    id={product.id}
                    title={getLocalizedText(product.title_ge ?? null, product.title)}
                    description={getLocalizedText(product.description_ge ?? null, product.description)}
                    price={product.price}
                    brand={product.brand}
                    image={product.image}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center h-[600px] text-center">
                <p className="text-xl text-gray-600 dark:text-gray-300">No products found</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
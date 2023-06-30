"use client";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { getProducts } from "../lib/swell/products";
import Banner from "@/components/Banner";

export const revalidate = 1800;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productData, setProductData] = useState<
    (swell.Product & { categories: swell.Category[] })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchData = async (page: number) => {
    setIsLoading(true); // Set loading state
    const { results, total_pages } = await getProducts({ page });
    setTotalPages(total_pages);
    setProductData(results);
    setIsLoading(false); // Set loading state
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Banner />
      <h2 className="text-2xl font-bold text-foreground mt-3">
        Featured Products
      </h2>
      <div className="mt-4 grid grid-cols-1 rounded-md border-l border-t border-input sm:grid-cols-2 md:mt-8 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? [...Array(20)].map((_, index) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <ProductCard key={index} isLoading={true} /> // Pass `isLoading` prop as `true`
            ))
          : productData.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isLoading={false}
              /> // Pass `isLoading` prop as `false`
            ))}
      </div>

      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={handlePageChange}
        />
      </div>
    </>
  );
}

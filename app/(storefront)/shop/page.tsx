"use client";
import { SidebarFilter } from "@/components/sidebar-filter";
import ProductCard from "@/components/products/ProductCard";
import { getProductFilters } from "@/lib/swell/filters";
import { getProducts } from "@/lib/swell/products";
import { redirect } from "next/navigation";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  searchParams: {
    search?: string;
    category?: string;
    size?: string;
    brands?: string;
    color?: string;
  };
};

type Filter = {
  id: string;
  label: string;
  type: "range" | "select";
  options: {
    value: string | number;
    label: string | number;
  }[];
  interval?: number;
};

// rome-ignore lint/suspicious/noRedeclare: <explanation>
export default function Filter({ searchParams }: Props) {
  const search = searchParams.search;
  const category = searchParams.category?.split(",");
  const brands = searchParams.brands?.split(",");
  const size = searchParams.size?.split(",");
  const color = searchParams.color?.split(",");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productData, setProductData] = useState<
    (swell.Product & { categories: swell.Category[] })[]
  >([]);
  const [filters, setFilters] = useState<Filter[]>([]); // Use the custom Filter type
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (page: number) => {
    setIsLoading(true);
    const { results, total_pages } = await getProducts({ page });
    setTotalPages(total_pages);
    setProductData(results);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchDataAndRedirect = async () => {
    const products = await getProducts({
      search,
      $filters: {
        category,
        size,
        brands,
        color,
      },
    });
    if (products.results.length === 0) {
      redirect("/shop");
    }
    const filters = await getProductFilters(products.results);
    setFilters(filters);
    setProductData(products.results);
    setTotalPages(products.total_pages);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataAndRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, brands, size, color]);

  return (
    <main className="mt-4 md:mt-8 lg:mt-12">
      <div className="border-b border-input pb-10">
        <Image
          src="/images/shop-men.jpg"
          alt="Banner"
          className="w-full object-cover"
          width={1920}
          height={500}
        />
      </div>

      <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <SidebarFilter filters={filters} />

        <div className="lg:col-span-2 xl:col-span-3">
          <div className="grid grid-cols-1 border-l border-t border-input md:grid-cols-2 lg:col-span-2 lg:grid-cols-3 xl:col-span-3 xl:grid-cols-4">
            {isLoading
              ? [...Array(20)].map((_, index) => (
                  // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <ProductCard key={index} isLoading={true} />
                ))
              : productData.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isLoading={false}
                  />
                ))}
          </div>
        </div>
      </div>

      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={handlePageChange}
        />
      </div>
    </main>
  );
}

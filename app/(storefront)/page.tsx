"use client";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { getProducts } from "../lib/swell/products";
import Banner from "@/components/Banner";
import Balance, { Balancer } from "react-wrap-balancer";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import useUser from "@/hooks/useUser";
import { Shell } from "@/components/Shell";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/AspectRatio";
import ProductCategories from "@/components/products/ProductCategories";
export const revalidate = 1800;

export default function Home({ categories }: { categories: Category[] }) {
  const { user } = useUser();
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
      {/* <Banner /> */}

      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-48"
      >
        {/* {githubStars ? (
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Badge className="rounded-md px-3.5 py-1.5" variant="secondary">
              <Icons.gitHub className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
              {githubStars} stars on GitHub
              <span className="sr-only">GitHub</span>
            </Badge>
          </Link>
        ) : null} */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          <Balancer>
            An e-commerce storefront built with Next.js 13 and Swell
          </Balancer>
        </h1>

        <Balance className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
          Buy and sell your favorite products effortlessly with our
          high-performance and user-friendly platform.
        </Balance>
        <div className="space-x-4">
          <Link
            href="/shop"
            className={cn(
              buttonVariants({
                size: "lg",
              })
            )}
          >
            Buy Now
          </Link>
          <Link
            href="https://www.swell.is/"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              })
            )}
          >
            Sell Now
          </Link>
        </div>
      </section>
      <ProductCategories categories={categories} />
      <section>
        <h2 className="font-heading text-2xl leading-[1.1]">Latest Products</h2>
        <div className="mt-4 grid grid-cols-1 rounded-md border-l border-t border-input sm:grid-cols-2 md:mt-8 md:grid-cols-3 lg:mt-10 lg:grid-cols-4 xl:grid-cols-5">
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
      </section>
      <section>
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={handlePageChange}
          />
        </div>
      </section>
      {/* <section
        id="create-a-store-banner"
        aria-labelledby="create-a-store-banner-heading"
        className="grid place-items-center gap-6 rounded-lg border bg-card px-6 py-16 text-center text-card-foreground shadow-sm space-y-6"
      >
        <h2 className="text-2xl font-medium sm:text-3xl">
          Do you want to sell your products on our website?
        </h2>
        <Link href="https://www.swell.is/">
          <div className={cn(buttonVariants())}>
            Create a store
            <span className="sr-only">Create a store</span>
          </div>
        </Link>
      </section> */}
    </>
  );
}

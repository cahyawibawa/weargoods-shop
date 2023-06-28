import { SidebarFilter } from "@/components/sidebar-filter";
import ProductCard from "@/components/products/ProductCard";
import { getProductFilters } from "@/lib/swell/filters";
import { getProducts } from "@/lib/swell/products";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    search?: string;
    category?: string;
    size?: string;
    brands?: string;
    color?: string;
  };
};

export default async function Filter({ searchParams }: Props) {
  const search = searchParams.search;
  const category = searchParams.category?.split(",");
  const brands = searchParams.brands?.split(",");
  const size = searchParams.size?.split(",");
  const color = searchParams.color?.split(",");

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
    redirect("/filter");
  }
  const filters = await getProductFilters(products);

  return (
    <main className="mt-4 md:mt-8 lg:mt-12">
      <div className="border-b border-input pb-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Filter products
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Checkout out our products!
        </p>
      </div>

      <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <SidebarFilter filters={filters} />

        <div className="lg:col-span-2 xl:col-span-3">
          <div className="grid grid-cols-1 border-l border-t border-input md:grid-cols-2 lg:col-span-2 lg:grid-cols-3 xl:col-span-3 xl:grid-cols-4">
            {products.results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

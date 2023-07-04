import swell from "@/lib/swell";
interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  maxProducts?: number;
  category?: string;
  slug?: string;
  page?: number;
  sort?: string;
  search?: string;
}
type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
};

type Image = {
  caption: string;
  file: {
    url: string;
    width: number;
    height: number;
  };
};

type Category = {
  name: string;
  slug: string;
  products: Product[];
  images: Image[];
};

export const getProductFilters = (
  products: ResultsResponse<Product & { categories: Category[] }>
): Promise<
  {
    id: string;
    label: string;
    type: "range" | "select";
    options: {
      value: string | number;
      label: string | number;
    }[];
    interval?: number;
    attributes: string;
  }[]
> => {
  return swell.products.filters(products) as Promise<
    {
      id: string;
      label: string;
      type: "range" | "select";
      options: {
        value: string | number;
        label: string | number;
      }[];
      interval?: number;
      attributes: string;
    }[]
  >;
};
export { ResultsResponse };

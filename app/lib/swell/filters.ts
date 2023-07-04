import swell from "@/lib/swell";
import { ResultsResponse } from "types/Swell/swell";
import { Category } from "swell-js/types/category";
import { Product } from "swell-js/types/product";

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

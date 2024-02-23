import swell from "lib/swell";
import { type ResultsResponse } from "types/swell/swell";
import { type Category } from "swell-js/types/category";
import { type Product } from "swell-js/types/product";

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

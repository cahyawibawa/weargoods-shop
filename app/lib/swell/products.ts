import swell from "@/lib/swell";

interface SwellProductImage {
  caption?: string;
  file: SwellProductFile;
  id: string;
}

interface SwellProductFile {
  width: number;
  height: number;
  id: string;
  length: number;
  date_uploaded: string;
  content_type: string;
  md5: string;
  url: string;
}

interface SwellProductOption {
  name: string;
  variant: boolean;
  active: boolean;
  values: {
    name: string;
    id: string;
  }[];
  required: boolean;
  id: string;
  label: string;
}
interface SwellProductVariant {
  parent_id: string;
  name: string;
  active: boolean;
  option_value_ids: string[];
  currency: string;
  date_created: string;
  date_updated: string;
  sku?: string;
  id: string;
}
export interface CartOption {
  name: string;
  value: string;
}

interface SwellProduct extends swell.Product {
  dataCreated: string;
  images?: SwellProductImage[];
  options?: SwellProductOption[];
  variants?: SwellProductVariant[];
  categories: swell.Category[];
  id: string;
}

export const getProducts = async (
  input?: swell.ProductQuery & { search?: string } & FilterParams
): Promise<{
  results: (SwellProduct & { categories: swell.Category[] })[];
  total_pages: number;
}> => {
  const limit = input?.limit || 20;

  const { maxProducts, category, slug, page, sort, search } = input || {};

  // Use the destructured variables as needed in your function

  const response = (await swell.products.list({
    sort: sort,
    ...input,
    expand: ["categories", "variants"],
    limit,
  })) as swell.ResultsResponse<SwellProduct & { categories: swell.Category[] }>;

  const results = response.results.map((product) => ({
    ...product,
    categories: product.categories as swell.Category[],
  }));

  const totalCount = response.count;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    results,
    total_pages: totalPages,
  };
};

export const getProductsByCategorySlug = (slug: string) =>
  swell.products.list({
    category: slug,
  });

export const getProductBySlug = (slug: string) =>
  swell.products.get(slug, {
    expand: ["categories"],
  }) as Promise<swell.Product & { categories: swell.Category[] }>;

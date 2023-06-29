import swell from "@/lib/swell";

export const getProducts = async (
  input?: swell.ProductQuery & { search?: string }
): Promise<{
  results: (swell.Product & { categories: swell.Category[] })[];
  total_pages: number;
}> => {
  const limit = input?.limit || 20;
  const response = (await swell.products.list({
    ...input,
    expand: ["categories", "variants"],
    limit,
  })) as swell.ResultsResponse<
    swell.Product & { categories: swell.Category[] }
  >;

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

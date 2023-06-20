import swell from "@/lib/swell";

export const getProducts = (input?: swell.ProductQuery & { search?: string }) =>
  swell.products.list({
    ...input,
    expand: ["categories", "variants"],
    page: input?.page || 1,
    limit: input?.limit || 25,
  }) as Promise<
    swell.ResultsResponse<swell.Product & { categories: swell.Category[] }>
  >;

export const getProductsByCategorySlug = (slug: string) =>
  swell.products.list({
    category: slug,
  });

export const getProductBySlug = (slug: string) =>
  swell.products.get(slug, {
    expand: ["categories"],
  }) as Promise<swell.Product & { categories: swell.Category[] }>;

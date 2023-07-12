interface Product {
  id: string;
  name: string;
  active: boolean;
  dateCreated: string;
  description: string;
  options?: ProductOption[];
  variants?: Variant[];
  slug: string;
  tags?: string[];
  price: number;
  images?: ProductImage[];
  sale?: boolean | null;
  salePrice?: number | null;
  sku?: string | null;
  categories?: string[];
}

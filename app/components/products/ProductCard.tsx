"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: swell.Product & { categories: swell.Category[] };
};

export default function ProductCard({ product }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="group relative rounded-md border-b border-r border-input p-4 sm:p-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
        {product.images && (
          <Image
            src={
              isHovered
                ? product.images[1]?.file?.url || ""
                : product.images[0]?.file?.url || ""
            }
            alt={product.name}
            width={
              isHovered
                ? product.images[1]?.file?.width
                : product.images[0]?.file?.width
            }
            height={
              isHovered
                ? product.images[1]?.file?.height
                : product.images[0]?.file?.height
            }
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>
      <div className="pb-4 pt-10 text-center">
        <p className="text-sm font-medium uppercase text-muted-foreground">
          {product.categories && (
            <Link href={`/${product.categories[0].slug}/${product.slug}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          )}
        </p>
        <p className="mt-4 text-base font-medium text-foreground">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(product.price || 0)}
        </p>
      </div>
    </div>
  );
}

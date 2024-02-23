import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "components/ui/aspect-ratio";
import Balance, { Balancer } from "react-wrap-balancer";

export default function ProductCategories({
  categories,
}: {
  categories: Category[];
}) {
  if (!categories || !Array.isArray(categories)) {
    return null; // Or handle the case when categories is not available or not an array
  }

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="space-y-6 py-6 md:pt-10 lg:pt-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Categories
        </h2>
        <Balance className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Explore our categories and find the best products for you
        </Balance>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            aria-label={`Go to ${category.name}`}
            key={category.id}
            href={`/${category.slug}`}
          >
            <div className="group relative overflow-hidden rounded-md">
              <AspectRatio ratio={4 / 5}>
                <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
                {category.images && category.images.length > 0 && (
                  <Image
                    src={category.images[0].src}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover transition-transform group-hover:scale-105"
                    priority
                  />
                )}
              </AspectRatio>
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

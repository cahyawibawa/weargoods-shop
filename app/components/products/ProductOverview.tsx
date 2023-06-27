"use client";

import { addToCart } from "@/lib/swell/cart";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "../ui/Button";
import { Loader2 } from "lucide-react";
type Props = {
  product: swell.Product & { categories: swell.Category[] };
};

export default function ProductOverview({ product }: Props) {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const isMutating = loading || isPending;

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    await addToCart({
      product_id: product.id,
      quantity: 1,
    });
    setLoading(false);
    mutate("cart");
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      {product.images && (
        <Tab.Group as="div" className="flex flex-col-reverse">
          <div className="mx-auto mt-6 w-full px-6 sm:px-0">
            <Tab.List className="grid grid-cols-4 gap-6">
              {product.images.map((image, index) => (
                <Tab
                  key={image.id}
                  className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                >
                  {({ selected }) => (
                    <>
                      <span className="sr-only">{`Image index: ${index}`}</span>
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <Image
                          src={image.file?.url as string}
                          alt={image.caption || ""}
                          className="h-full w-full bg-gray-200 object-cover object-center"
                          width={image.file?.width}
                          height={image.file?.height}
                        />
                      </span>
                      <span
                        className={classNames(
                          selected ? "ring-indigo-500" : "ring-transparent",
                          "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>

          <Tab.Panels className="aspect-h-6 aspect-w-4 w-full">
            {product.images.map((image) => (
              <Tab.Panel key={image.id}>
                <Image
                  // rome-ignore lint/style/noNonNullAssertion: <explanation>
                  src={image.file?.url!}
                  alt={image.caption || ""}
                  className="h-full w-full bg-gray-200 object-cover object-center sm:rounded-lg"
                  width={image.file?.width}
                  height={image.file?.height}
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}

      <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {product.name}
        </h1>

        <div className="mt-3">
          <h2 className="sr-only">Product information</h2>

          <p className="text-3xl tracking-tight text-foreground">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(product.price || 0)}
          </p>
        </div>

        {/* <p className="mt-1 text-sm italic text-gray-500">
					{product.options
						?.map((option) => `${option.name}: ${option.values}`)
						.join(",  ")}
				</p> */}

        {product.description && (
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div
              className="inherit-font-family space-y-6 text-base text-foreground"
              // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mt-10 flex">
            <Button
              type="submit"
              className="max-w-xs w-full hover:bg-opacity-90"
              disabled={isMutating}
            >
              {isMutating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Add to Bag"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

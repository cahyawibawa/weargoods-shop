"use client";

import * as React from "react";
import { Button } from "components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "components/ui/command";


import { useRouter } from "next/navigation";
import { cn } from "lib/utils";
import { Icons } from "components/icons";
import { useDebounce } from "hooks/use-debounce";
import { Skeleton } from "components/ui/skeleton";
import { getProducts } from "lib/swell/products";

export function CommandMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [data, setData] = React.useState<
    | {
        products: swell.Product[];
        categories: swell.Category[];
      }[]
    | null
  >(null);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (debouncedQuery.length === 0) setData(null);

    if (debouncedQuery.length > 0) {
      startTransition(async () => {
        const data = await getProducts({ search: debouncedQuery });
        setData([
          {
            products: data.results,
            categories: [], // Provide the appropriate categories here
          },
        ]);
      });
    }
  }, [debouncedQuery]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setIsOpen(false);
    callback();
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);



  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-9 p-0 xl:h-9 xl:w-60 xl:justify-start xl:px-3 xl:py-2 sm:w-9"
        )}
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search products...</span>
        <span className="sr-only">Search products</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
          >
            No products found.
          </CommandEmpty>
          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data?.map((group) => (
              <CommandGroup
                key={group.products[0]?.name}
                className="capitalize"
              >
                {group.products.map((product) => (
                  <CommandItem
                    key={product.id}
                    onSelect={() =>
                      handleSelect(() =>
                        router.push(`/product/${product.slug}`)
                      )
                    }
                  >
                    {product.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          )}
          <CommandSeparator />
          {/* <CommandGroup heading="Command">
            <Link href={user ? "/dashboard" : "/signin"}>
              <CommandItem>
                <PackagePlus className="mr-2 h-4 w-4" />
                <span>Sell item</span>
              </CommandItem>
            </Link>

            <Link href="/shop">
              <CommandItem>
                <Store className="mr-2 h-4 w-4" />
                <span>Shop</span>
              </CommandItem>
            </Link>
          </CommandGroup> */}
          {/* <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunMedium className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  );
}

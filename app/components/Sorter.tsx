import React from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SortOptions = {
  value: string;
  sort?: string;
};

const sortOptions: SortOptions[] = [
  { value: "Choose one" },
  { value: "Min. Price", sort: "price asc" },
  { value: "Max. Price", sort: "price desc" },
  { value: "A - Z", sort: "name asc" },
  { value: "Z - A", sort: "name desc" },
  { value: "Oldest", sort: "date_created asc" },
  { value: "Newest", sort: "date_created desc" },
];

export function Sorter({ query }: { query: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();
  const searchParams = useSearchParams().toString();

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams);

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const handleSortOptionClick = (option: SortOptions) => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          sort: option.value,
        })}`
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Sort products" size="sm" disabled={isPending}>
          Sort
          <Icons.chevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(option.value === query && "font-bold")}
            onClick={() => handleSortOptionClick(option)}
          >
            {option.value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

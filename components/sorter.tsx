import { useState } from "react";
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
import {
  useCreateQueryString,
  useRemoveQueryString,
} from "@/hooks/useQueryString";

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

export function Sorter({ query }: { query: FilterParams }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const removeQueryString = useRemoveQueryString();

  const selectedQuery = query?.sort ?? "";
  const selectedParam = sortOptions.find(
    (param) => param.sort === selectedQuery
  );

  const [selected, setSelected] = useState(selectedParam || sortOptions[0]);
  const [isOpen, setIsOpen] = useState(false);

  const isDefaultSort = selected.value === sortOptions[0].value;

  /*****************************************************************************
   * Handle sort changes
   ****************************************************************************/
  const handleFilter = (param: SortOptions) => {
    setIsOpen(false);
    setSelected(param);

    const newSort =
      param.value !== sortOptions[0].value ? param.sort : undefined;
    const queryString = newSort
      ? createQueryString("sort", newSort)
      : removeQueryString("sort");

    router.push(`${pathname}?${queryString}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Sort products" size="sm">
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
            className={selected.sort === option.sort ? "font-bold" : ""}
            onClick={() => handleFilter(option)}
          >
            {option.value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

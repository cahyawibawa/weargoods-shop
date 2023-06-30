"use client";

import { DialogProps } from "@radix-ui/react-alert-dialog";
import * as React from "react";
import { Button } from "@/components/ui/Button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/Command";
import {
  CreditCard,
  Settings,
  ListFilter,
  Shirt,
  Search,
  PackagePlus,
  Circle,
  File,
  Laptop,
  Moon,
  SunMedium,
} from "lucide-react";
import useUser from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getProducts } from "@/lib/swell/products";
import { useTheme } from "next-themes";
import { Icons } from "./Icons";

export function CommandMenu({ ...props }: DialogProps) {
  const { setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<swell.Product[]>([]);
  const { user, isLoading } = useUser();

  const handleSearch = async () => {
    const productsResponse = await getProducts({ search });
    console.log(productsResponse);
    const products = productsResponse.results;
    setSearchResults(products);
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-9 p-0 xl:h-9 xl:w-60 xl:justify-start xl:px-3 xl:py-2 sm:w-9"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <Icons.search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search products...</span>
        <span className="sr-only">Search products</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search..."
          onSubmit={handleSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {/* <CommandGroup heading="Suggestions">
            <CommandList>
              {searchResults.map((product) => (
                <CommandItem key={product.id}>
                  <span>{product.name}</span>
                </CommandItem>
              ))}
            </CommandList>

            <Link href="/clothes">
              <CommandItem>
                <Shirt className="mr-2 h-4 w-4" />
                <span>Clothing</span>
              </CommandItem>
            </Link>
            <CommandItem>
              <ListFilter className="mr-2 h-4 w-4" />
              <span>Filter Products</span>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}

          <CommandSeparator />
          <CommandGroup heading="Command">
            <CommandItem>
              <PackagePlus className="mr-2 h-4 w-4" />
              <span>Sell item</span>
              {/* <CommandShortcut>⌘P</CommandShortcut> */}
            </CommandItem>

            {user ? (
              <Link href="/user-account">
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </Link>
            ) : null}
          </CommandGroup>
          <CommandSeparator />
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
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

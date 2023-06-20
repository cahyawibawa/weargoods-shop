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
import { CreditCard, Settings, ListFilter, Shirt, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { getProducts } from "@/lib/swell/products";

export function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<swell.Product[]>([]);

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
          "text-muted-foreground relative h-9 w-full justify-start rounded-[0.5rem] text-sm sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search products...</span>
        <span className="inline-flex lg:hidden">
          <Search className="h-6 w-6" />
        </span>
        <kbd className="bg-muted pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
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
          <CommandGroup heading="Suggestions">
            <CommandList>
              {searchResults.map((product) => (
                <CommandItem key={product.id}>
                  <span>{product.name}</span>
                </CommandItem>
              ))}
            </CommandList>

            {/* <Link href="/clothes">
              <CommandItem>
                <Shirt className="mr-2 h-4 w-4" />
                <span>Clothing</span>
              </CommandItem>
            </Link>
            <CommandItem>
              <ListFilter className="mr-2 h-4 w-4" />
              <span>Filter Products</span>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem> */}
          </CommandGroup>

          <CommandSeparator />
          <CommandGroup heading="Settings">
            {/* <Link href="/signin">
							<CommandItem>
								<LogIn className="mr-2 h-4 w-4" />
								<span>Sign In</span>
								<CommandShortcut>⌘L</CommandShortcut>
							</CommandItem>
						</Link>
						<CommandItem>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem> */}
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <Link href="/user-account">
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </Link>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

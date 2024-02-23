"use client";
import * as React from "react";
import { CommandMenu } from "components/command-menu";
import AvatarDropdown from "./avatar-dropdown/avatar-dropdown";
import useMenu from "hooks/use-menu";
import useUser from "hooks/use-user";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment } from "react";
import CartButton from "./cart-button/cart-button";
import { PanelRightClose } from "lucide-react";
import { cn } from "lib/utils";
import { buttonVariants } from "components/ui/button";
import { siteConfig } from "config/site";
import { Icons } from "components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "components/ui/navigation-menu";


type Props = {
  categories: swell.Category[];
};

export default function Navbar({ categories }: Props) {
  const opened = useMenu((state) => state.header);
  const open = useMenu((state) => state.open);
  const close = useMenu((state) => state.close);
  const handleOpen = () => open("header");
  const handleClose = () => close("header");
  const pathname = usePathname();
  const { user, isLoading } = useUser();

  return (
    <>
      <Transition.Root show={opened} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity/25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-background pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-foreground"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-2 px-5">
                  <Link
                    aria-label="Home"
                    href="/"
                    className="flex items-center"
                    onClick={handleClose}
                  >
                    <Icons.logo className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span className="font-bold ml-2">{siteConfig.name}</span>
                  </Link>
                </div>

                <div className="mt-2 space-y-6 border-muted px-4 py-6">
                  <Link
                    href="/shop"
                    onClick={handleClose}
                    className={cn(
                      "flex items-center self-center text-sm font-medium transition-colors hover:text-foreground/80",
                      pathname === "/shop"
                        ? "text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    Shop
                  </Link>
                  {categories.map((category) => (
                    <div key={category.id} className="flow-root">
                      <Link
                        href={`/${category.slug}`}
                        onClick={handleClose}
                        className={cn(
                          "flex items-center self-center text-sm font-medium transition-colors hover:text-foreground/80",
                          pathname?.startsWith(`/${category.slug}`)
                            ? "text-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        {category.name}
                      </Link>
                    </div>
                  ))}
                </div>

                {!isLoading && !user && (
                  <div className="space-y-6 border-t border-muted px-4 py-6">
                    <div className="flow-root">
                      <Link
                        href="/signin"
                        onClick={handleClose}
                        className={cn(
                          "flex items-center self-center text-sm font-medium transition-colors hover:text-foreground/80",
                          pathname?.startsWith("/signin")
                            ? "text-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        Sign in
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        href="/signup"
                        onClick={handleClose}
                        className={cn(
                          "flex items-center self-center text-sm font-medium transition-colors hover:text-foreground/80",
                          pathname?.startsWith("/signup")
                            ? "text-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        Create account
                      </Link>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="supports-backdrop-blur:bg-background/70 sticky top-0 z-40 bg-background backdrop-blur">
        <nav aria-label="Top">
          <div className="border-b border-input">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-background p-2 lg:hidden"
                onClick={handleOpen}
              >
                <span className="sr-only">Open menu</span>
                <PanelRightClose className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="ml-4 lg:flex lg:ml-0 hidden" aria-hidden="true">
                <Link href="/">
                  <span className="font-bold">{siteConfig.name}</span>
                  {/* <Icons.logo className="h-4 w-4" /> */}
                </Link>
              </div>
              {/* Filter */}
              <div className="hidden lg:ml-5 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                  href="/shop"
                                >
                                  <Icons.logo className="h-6 w-6" />
                                  <div className="mb-2 mt-4 text-lg font-medium">
                                    weargoods
                                  </div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    {siteConfig.description}
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                            {categories.map((category) => (
                              <ListItem
                                key={category.id}
                                href={`/${category.slug}`}
                                title={category.name}
                              >
                                {category.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>
              <div className="ml-auto flex items-center space-x-1 ">
                <div className="w-full flex-1 md:w-auto md:flex-none">
                  <CommandMenu />
                </div>
                <>
                  {user ? (
                    <div className="flex">
                      <AvatarDropdown />
                    </div>
                  ) : (
                    <Link href="/signin" aria-label="signin user">
                      <div
                        className={cn(
                          buttonVariants({
                            size: "sm",
                            variant: "outline",
                          }),
                          "h-9 w-9 p-0"
                        )}
                      >
                        <Icons.user className="h-4 w-4" />
                      </div>
                    </Link>
                  )}
                </>

                <CartButton />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

"use client";

import { CommandMenu } from "@/components/CommandMenu";
import { AvatarDropdown } from "@/components/layout/navbar/AvatarDropdown";
import useMenu from "@/hooks/useMenu";
import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { CartButton } from "./CartButton";
import { User, PanelRightClose } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-2 space-y-6 border-muted px-4 py-6">
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
                        className="-m-2 block p-2 font-medium text-muted-foreground"
                      >
                        Sign in
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        href="/signup"
                        onClick={handleClose}
                        className="-m-2 block p-2 font-medium text-muted-foreground"
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

      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 bg-background/95 backdrop-blur">
        <nav aria-label="Top">
          <div className="border-b border-input">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-background p-2 text-gray-400 lg:hidden"
                onClick={handleOpen}
              >
                <span className="sr-only">Open menu</span>
                <PanelRightClose className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <span className="sr-only">{siteConfig.name}</span>
                  <Image
                    priority
                    className="mx-auto h-8 w-auto"
                    src="/white-logo.png"
                    alt=""
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
              {/* Filter */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <Link
                    href="/filter"
                    className={cn(
                      "flex items-center self-center text-sm font-medium transition-colors hover:text-foreground/80",
                      pathname?.startsWith("/filter")
                        ? "text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    Shop
                  </Link>
                </div>
              </div>

              {/* Categories */}

              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/${category.slug}`}
                      className={cn(
                        "flex items-center self-center text-sm font-medium transition-colors hover:text-foreground/80",
                        pathname?.startsWith(`/${category.slug}`)
                          ? "text-foreground"
                          : "text-foreground/60"
                      )}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="ml-auto flex items-center space-x-1 ">
                <div className="w-full flex-1 md:w-auto md:flex-none">
                  <CommandMenu />
                </div>
                {/* <ModeToggle /> */}

                <>
                  {user ? (
                    <div className="flex">
                      <AvatarDropdown />
                    </div>
                  ) : (
                    <Link href="/signin">
                      <div
                        className={cn(
                          buttonVariants({
                            size: "sm",
                            variant: "outline",
                          }),
                          "w-9 px-0 "
                        )}
                      >
                        <User aria-hidden="true" />
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

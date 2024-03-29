import useMenu from "hooks/use-menu";
import { getCart, removeFromCart } from "lib/swell/cart";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Button } from "components/ui/button";
import { buttonVariants } from "components/ui/button";
import { cn } from "lib/utils";
import { Icons } from "components/icons";
import useUser from "hooks/use-user";
import { useRouter } from "next/navigation";
export default function CartButton() {
  const opened = useMenu((state) => state.cart);
  const open = useMenu((state) => state.open);
  const close = useMenu((state) => state.close);
  const router = useRouter();

  const handleOpen = () => open("cart");
  const handleClose = () => close("cart");

  const { data } = useSWR("cart", getCart);
  const { mutate } = useSWRConfig();

  const counter = data?.item_quantity || 0;
  const { user, isLoading } = useUser();

  const handleCheckout = () => {
    if (user) {
      // If the user is authenticated, proceed to the checkout directly
      router.push(data?.checkout_url || "");
    } else {
      // If the user is not authenticated, redirect to the sign-in page first
      router.push("/signin");
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={handleOpen}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        className={cn(
          buttonVariants({
            size: "sm",
            variant: "outline",
          }),
          "h-9 w-9 p-0 group"
        )}
      >
        <Icons.shoppingBag aria-hidden="true" className="h-4 w-4" />
        {counter > 0 && (
          <span className="absolute top-5 right-1 flex items-center justify-center w-4 h-4 bg-blue-500 text-xs text-foreground rounded-full">
            {counter}
          </span>
        )}
        <span className="sr-only">items in cart, view bag</span>
      </Button>

      <Transition.Root show={opened} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-background shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-foreground">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={handleClose}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-muted"
                            >
                              {data?.items?.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-muted">
                                    <Image
                                      src={
                                        item.product?.images?.[0]?.file?.url ||
                                        ""
                                      }
                                      alt={item.product?.name || ""}
                                      className="h-full w-full object-cover object-center"
                                      width={94}
                                      height={94}
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-foreground">
                                        <h3>
                                          <Link
                                            href={`/products/${item.product?.slug}`}
                                          >
                                            {item.product?.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: data.currency,
                                          }).format(item.price_total || 0)}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.product?.id}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Variant: {item.variant?.name}
                                      </p>
                                      <p className="text-gray-500">
                                        Qty: {item.quantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={async () => {
                                            // rome-ignore lint/style/noNonNullAssertion: <explanation>
                                            await removeFromCart(item.id!);
                                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                            mutate("cart");
                                          }}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-muted px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-foreground">
                          <p>Subtotal</p>
                          <p>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: data?.currency || "IDR",
                            }).format(data?.sub_total || 0)}
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                       
                        <div className="mt-6">
                          {user ? (
                            <Button
                              onClick={handleCheckout}
                              className="max-w-md w-full bg-indigo-500 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              Checkout
                            </Button>
                          ) : (
                            <Link href="/signin">
                              <Button className="max-w-md w-full bg-indigo-500 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                Sign in to Checkout
                              </Button>
                            </Link>
                          )}
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or&nbsp;
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={handleClose}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

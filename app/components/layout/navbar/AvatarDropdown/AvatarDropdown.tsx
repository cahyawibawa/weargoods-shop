import { logoutUser } from "@/lib/swell/account";
import { Menu, Transition } from "@headlessui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useTransition } from "react";
import { useSWRConfig } from "swr";

const userNavigation = [{ name: "Your Profile", href: "/profile" }];

export default function AvatarDropdown() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { mutate } = useSWRConfig();

  return (
    <Menu as="div" className="relative flex-shrink-0">
      <Menu.Button className="p-2 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Open user menu</span>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  href={item.href}
                  className={classNames(
                    active ? "bg-gray-300/25" : "",
                    "block px-4 py-2 text-sm text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            {({ active }) => (
              <button
                disabled={isPending}
                type="button"
                onClick={async () => {
                  await logoutUser();
                  startTransition(() => {
                    mutate("/api/me", null);
                    router.refresh();
                    router.push("/");
                  });
                }}
                className={classNames(
                  active ? "bg-gray-300/25" : "",
                  "block w-full px-4 py-2 text-left text-sm text-muted-foreground"
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

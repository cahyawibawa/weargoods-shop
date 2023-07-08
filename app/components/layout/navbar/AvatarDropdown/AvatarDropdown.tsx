import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useTransition, useState } from "react";
import { useSWRConfig } from "swr";
import useUser from "@/hooks/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";
import { logoutUser } from "@/lib/swell/account";

export default function AvatarDropdown() {
  const { user } = useUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    startTransition(() => {
      setIsLoading(true);
      logoutUser().then(() => {
        setIsLoading(false);
        mutate("/api/me", null);
        router.refresh();
        router.push("/");
      });
    });
  };

  const getEmailInitials = (email: string | undefined) => {
    if (!email || typeof email !== "string") return "";

    const trimmedEmail = email.trim();
    if (trimmedEmail.length === 0) return "";

    const [firstChar, lastChar] = [
      trimmedEmail[0],
      trimmedEmail[trimmedEmail.length - 1],
    ];
    return `${firstChar}${lastChar}`;
  };

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback>
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-foreground text-xs font-medium">
                    {getEmailInitials(user.email)}
                  </div>
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.firstName && user.lastName ? (
                    <>
                      {user.firstName} {user.lastName}
                    </>
                  ) : (
                    <>{user.email}</>
                  )}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/account">
                  <Icons.user className="mr-2 h-4 w-4" aria-hidden="true" />
                  Account
                  <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/store">
                  <Icons.terminal className="mr-2 h-4 w-4" aria-hidden="true" />
                  Dashboard
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/orders">
                  <Icons.scrollText
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Orders
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="" onClick={handleLogout}>
                <Icons.logout className="mr-2 h-4 w-4" aria-hidden="true" />
                {isPending ? "Logging out..." : "Log out"}
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/signin">
          <div
            className={buttonVariants({
              size: "sm",
            })}
          >
            Sign In
            <span className="sr-only">Sign In</span>
          </div>
        </Link>
      )}
    </>
  );
}

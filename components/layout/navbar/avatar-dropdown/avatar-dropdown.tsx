import { Icons } from 'components/icons'
import { Avatar, AvatarFallback } from 'components/ui/avatar'
import { Button, buttonVariants } from 'components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
import useUser from 'hooks/use-user'
import { logoutUser } from 'lib/swell/account'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment, useState, useTransition } from 'react'
import { useSWRConfig } from 'swr'

export default function AvatarDropdown() {
  const { user } = useUser()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { mutate } = useSWRConfig()
  const [isLoading, setIsLoading] = useState(true)

  const handleLogout = async () => {
    startTransition(() => {
      setIsLoading(true)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      logoutUser().then(() => {
        setIsLoading(false)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        mutate('/api/me', null)
        router.refresh()
        router.push('/')
      })
    })
  }

  const getEmailInitials = (email: string | undefined) => {
    if (!email || typeof email !== 'string') return ''

    const trimmedEmail = email.trim()
    if (trimmedEmail.length === 0) return ''

    const [firstChar, lastChar] = [
      trimmedEmail[0],
      trimmedEmail[trimmedEmail.length - 1],
    ]
    return `${firstChar}${lastChar}`
  }

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
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-medium text-foreground">
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
              <DropdownMenuItem asChild disabled>
                <Link href="/dashboard/store">
                  <Icons.terminal className="mr-2 h-4 w-4" aria-hidden="true" />
                  Dashboard
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <Link href="/dashboard/orders">
                  <Icons.scrollText
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Orders
                  <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="" onClick={handleLogout}>
                <Icons.logout className="mr-2 h-4 w-4" aria-hidden="true" />
                {isPending ? 'Logging out...' : 'Log out'}
                <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/signin">
          <div
            className={buttonVariants({
              size: 'sm',
            })}
          >
            Sign In
            <span className="sr-only">Sign In</span>
          </div>
        </Link>
      )}
    </>
  )
}

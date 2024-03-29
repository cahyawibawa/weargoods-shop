'use client'

import { Icons } from 'components/icons'
import { cn, SidebarNavItem } from 'lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface SidebarNavProps {
  items: SidebarNavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()

  if (!items?.length) return null

  return (
    <div className="flex w-full flex-col gap-2">
      {items.map((item, index) => {
        const Icon = Icons.chevronLeft

        return item.href ? (
          <Link
            // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            href={item.href}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            <span
              className={cn(
                'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground',
                pathname === item.href
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground',
                item.disabled && 'pointer-events-none opacity-60'
              )}
            >
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
          >
            {item.title}
          </span>
        )
      })}
    </div>
  )
}

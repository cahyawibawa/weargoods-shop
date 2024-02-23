'use client'

import { Icons } from 'components/icons'
import { ThemeToggle } from 'components/theme-toggle'
import { buttonVariants } from 'components/ui/button'
import { siteConfig } from 'config/site'
import { cn } from 'lib/utils'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <section
        id="footer-bottom"
        aria-labelledby="footer-bottom-heading"
        className="flex flex-col items-center justify-between space-y-1 md:flex-row"
      >
        <div className="text-center text-sm leading-loose text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}.
        </div>
        <div className="flex items-center space-x-1">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                })
              )}
            >
              <Icons.gitHub className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </section>
    </footer>
  )
}

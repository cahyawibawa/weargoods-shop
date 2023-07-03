"use client";

import { InputWithButton } from "@/components/Subscribe";
import { ModeToggle } from "@/components/ToggleMode";
import { siteConfig } from "@/config/site";
export default function Footer() {
  return (
    <footer aria-label="Site Footer">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-0 sm:px-6 lg:px-0">
        <div className=" grid grid-cols-1 gap-8 border-t border-input pt-12 md:grid-cols-4 lg:grid-cols-6">
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-foreground">About Us</p>

            <nav aria-label="Footer About Nav" className="mt-8">
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    className="text-muted-foreground transition hover:opacity-75"
                    href="/"
                  >
                    About Weargoods
                  </a>
                </li>

                <li>
                  <a
                    className="text-muted-foreground transition hover:opacity-75"
                    href="/"
                  >
                    Environmental Responsibility
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-foreground">Information</p>

            <nav aria-label="Footer Services Nav" className="mt-8">
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    className="text-muted-foreground transition hover:opacity-75"
                    href="/"
                  >
                    Size Guide
                  </a>
                </li>

                <li>
                  <a
                    className="text-muted-foreground transition hover:opacity-75"
                    href="/"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-foreground">
              Helpfull Links
            </p>

            <nav aria-label="Footer Resources Nav" className="mt-8">
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    className="text-muted-foreground transition hover:opacity-75"
                    href="/"
                  >
                    FAQs
                  </a>
                </li>

                <li>
                  <a
                    className="text-muted-foreground transition hover:opacity-75"
                    href="/"
                  >
                    Support
                  </a>
                </li>

                <li>
                  <a
                    className="group flex justify-center gap-1.5 sm:justify-start"
                    href="/"
                  >
                    <span className="text-muted-foreground transition group-hover:text-gray-700/75 ">
                      Live Chat
                    </span>

                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-foreground">Legal</p>

            <nav aria-label="Footer Helpful Nav" className="mt-8">
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    className="text-muted-foreground transition hover:opacity-75"
                    href="/"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>

                <li>
                  <a
                    className="text-muted-foreground transition hover:opacity-75"
                    href="/"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="text-center sm:text-left md:col-span-4 lg:col-span-2">
            <p className="text-lg font-medium text-foreground">Stay in Touch</p>

            <div className="mx-auto mt-8 max-w-md sm:ms-0">
              <p className="pb-6 text-muted-foreground text-sm">
                Join our newsletter to get the latest news and updates
              </p>
            </div>
            <InputWithButton />
          </div>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-6 dark:border-gray-800 sm:flex sm:items-center sm:justify-between">
          <p className="text-center text-sm text-muted-foreground  sm:text-left">
            Copyright &copy; {new Date().getFullYear()} {siteConfig.name}. All
            rights reserved.
          </p>
          {/* 
          <ul className="mt-4 flex justify-center gap-6 sm:mt-0 sm:justify-start">
            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-foreground transition hover:text-foreground/75 dark:text-white dark:hover:text-white/75"
              >
                <span className="sr-only">Instagram</span>
                <Instagram />
              </a>
            </li>
            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-foreground transition hover:text-foreground/75 dark:text-white dark:hover:text-white/75"
              >
                <span className="sr-only">Facebook</span>
                <Facebook />
              </a>
            </li>
          </ul> */}
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}

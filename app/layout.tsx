import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import { fontSans, fontMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/Toaster";
import { Analytics } from "@vercel/analytics/react";
import "./styles/globals.css";
import localFont from "next/font/local";
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Server Actions",
    "weargoods",
    "Swell",
    "commerce",
    "e-commerce",
  ],
  authors: [
    {
      name: "cahya wibawa",
      url: "https://github.com/cahyawibawa",
    },
  ],
  creator: "cahya wibawa",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@lictoyagami",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const revalidate = 1800;

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en-US">
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable,
            fontHeading.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Analytics />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}

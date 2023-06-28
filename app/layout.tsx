import { siteConfig } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { fontSans, fontMono } from "@/lib/fonts";
import { getCategories } from "@/lib/swell/categories";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/Toaster";
import "./styles/globals.css";

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

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getCategories();
  return (
    <>
      <ClerkProvider>
        <html lang="en-US">
          <head />
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable,
              fontMono.variable
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}

import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BASE_URL } from "@/constants";
import { fontSans } from "@/lib/fonts";
import { getCategories } from "@/lib/swell/categories";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/Toaster";
import "./styles/globals.css";

const inter = Inter({
	variable: "--font-inter",
	display: "swap",
	subsets: ["latin"],
});

const roboto_mono = Roboto_Mono({
	variable: "--font-roboto-mono",
	display: "swap",
	subsets: ["latin"],
});

const { NEXT_PUBLIC_SITE_NAME } = process.env;

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: {
		// rome-ignore lint/style/noNonNullAssertion: <explanation>
		default: NEXT_PUBLIC_SITE_NAME!,
		template: `%s | ${NEXT_PUBLIC_SITE_NAME}`,
	},
	robots: {
		follow: true,
		index: true,
	},
	description: "High-performance ecommerce store built with Next.js and Swell.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=${encodeURIComponent(
					process.env.NEXT_PUBLIC_SITE_NAME || "",
				)}`,
				width: 1200,
				height: 630,
			},
		],
		type: "website",
	},
};

export const revalidate = 1800;

type Props = {
	children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
	const data = await getCategories();
	return (
		<html lang="en-US">
			<head />
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<div className="mx-auto flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
						<NextTopLoader showSpinner={false} color="rgb(79 70 229)" />
						<Navbar categories={data.results} />
						{children}
						<Footer />
					</div>
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	);
}

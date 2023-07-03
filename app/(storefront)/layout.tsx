import { getCategories } from "@/lib/swell/categories";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import NextTopLoader from "nextjs-toploader";
interface StorefrontProps {
  children?: React.ReactNode;
}

export default async function RootLayout({ children }: StorefrontProps) {
  const data = await getCategories();

  return (
    <div className="mx-auto flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      <NextTopLoader showSpinner={false} color="rgb(79 70 229)" />
      <Navbar categories={data.results} />
      {children}
      <Footer />
    </div>
  );
}

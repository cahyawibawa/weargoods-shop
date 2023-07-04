import { Separator } from "@/components/ui/Separator";
import { SidebarNav } from "@/components/SideBarNav";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { getCategories } from "@/lib/swell/categories";
import { ScrollArea } from "@/components/ui/ScrollArea";
const sidebarNavItems = [
  {
    title: "Account",
    href: "/user-account",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Orders",
    href: "/orders",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const data = await getCategories();
  return (
    <div className="mx-auto flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      <Navbar categories={data.results} />
      {/* <Separator className="my-6" /> */}
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-8 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <SidebarNav items={sidebarNavItems} />
          </ScrollArea>
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

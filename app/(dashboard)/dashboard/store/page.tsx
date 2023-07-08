import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Header } from "@/components/Header";
export const metadata: Metadata = {
  title: "Store",
  description: "Sell your items",
};
export default function StorePage() {
  return (
    <Shell variant="sidebar">
      <Header title="Store" description="Consign your items" size="sm" />
      <div className="w-full overflow-hidden rounded-lg">
        {/* <AccountForm /> */}
      </div>
    </Shell>
  );
}

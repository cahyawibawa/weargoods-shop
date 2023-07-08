import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Header } from "@/components/Header";
export const metadata: Metadata = {
  title: "Orders",
  description: "Track your order",
};
export default function OrderPage() {
  return (
    <Shell variant="sidebar">
      <Header title="Orders" description="Track your order" size="sm" />
      <div className="w-full overflow-hidden rounded-lg">
        {/* <AccountForm /> */}
      </div>
    </Shell>
  );
}

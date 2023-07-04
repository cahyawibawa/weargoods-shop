import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Header } from "@/components/Header";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Sell your items",
};
export default function AccountProfilePage() {
  return (
    <Shell layout="dashboard">
      <Header title="Dashboard" description="Consign your items" size="sm" />
      <div className="w-full overflow-hidden rounded-lg">
        {/* <AccountForm /> */}
      </div>
    </Shell>
  );
}

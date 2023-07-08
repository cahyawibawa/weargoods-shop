import { Separator } from "@/components/ui/Separator";
import { AccountForm } from "@/components/form/AccountForm";
import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Header } from "@/components/Header";
export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings",
};
export default function AccountProfilePage() {
  return (
    <Shell variant="sidebar">
      <Header
        title="Account"
        description="Manage your account settings."
        size="sm"
      />
      <div className="w-full overflow-hidden rounded-lg">
        <AccountForm />
      </div>
    </Shell>
  );
}

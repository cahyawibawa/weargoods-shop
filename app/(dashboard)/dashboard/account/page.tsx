import { Separator } from "components/ui/separator";
import { AccountForm } from "components/form/account-form";
import type { Metadata } from "next";
import { Shell } from "components/shell";
import { Header } from "components/header";
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

import { type Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { SendEmailResetForm } from "@/components/form/SendEmailResetForm";
import { Shell } from "@/components/Shell";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
export const metadata: Metadata = {
  title: "Reset Password",
  description: "Enter your email to reset your password",
};

export default function ResetPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/signin"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <Shell className="max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Reset password</CardTitle>
            <CardDescription>
              Enter your email address and we will send you a verification code
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <SendEmailResetForm />
          </CardContent>
        </Card>
      </Shell>
    </div>
  );
}

import { type Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { ResetPasswordStep2Form } from "components/form/reset-password-form-v2";
import { Shell } from "components/shell";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Enter your email to reset your password",
};

export default function ResetPasswordStep2Page() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Shell className="max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Reset password</CardTitle>
            <CardDescription>Enter your new password</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <ResetPasswordStep2Form />
          </CardContent>
        </Card>
      </Shell>
    </div>
  );
}

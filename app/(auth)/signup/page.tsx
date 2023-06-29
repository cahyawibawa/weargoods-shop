import { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { OAuthSignIn } from "@/components/auth/Oauth";
import { Shell } from "@/components/Shell";
import { SignUpForm } from "@/components/form/SignUpForm";
import { buttonVariants } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up to your Weargoods account.",
};

export default function AuthenticationPage() {
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
      <Shell layout="auth">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            {/* <CardDescription>
              Choose your preferred sign up method
            </CardDescription> */}
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* <OAuthSignIn /> */}
            <SignUpForm />
          </CardContent>
          <CardFooter className="flex flex-wrap items-center space-x-2">
            <div className="flex-1 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                aria-label="Sign in"
                href="/signin"
                className="text-primary underline-offset-4 transition-colors hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </Shell>
    </div>
  );
}

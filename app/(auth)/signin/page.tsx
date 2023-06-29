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
import { cn } from "@/lib/utils";
import { OAuthSignIn } from "@/components/auth/Oauth";
import { SignInForm } from "@/components/form/SignInForm";
import { Shell } from "@/components/Shell";
import { buttonVariants } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";
export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Weargoods account.",
};

export default function AuthenticationPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
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
            <CardTitle className="text-2xl">Sign in</CardTitle>
            {/* <CardDescription>
              Choose your preferred sign in method
            </CardDescription> */}
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* <OAuthSignIn /> */}
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div> */}
            <SignInForm />
          </CardContent>
          <CardFooter className="flex flex-wrap items-center space-x-2">
            <div className="flex-1 text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                aria-label="Sign up"
                href="/signup"
                className="text-primary underline-offset-4 transition-colors hover:underline"
              >
                Sign up
              </Link>
            </div>
            <Link
              aria-label="Reset password"
              href="/signin/reset-password"
              className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
            >
              Reset password
            </Link>
          </CardFooter>
        </Card>
      </Shell>
    </div>
  );
}

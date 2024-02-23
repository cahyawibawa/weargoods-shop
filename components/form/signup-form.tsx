"use client";
import * as React from "react";
import { cn } from "lib/utils";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Icons } from "components/icons";
import { createUser } from "lib/swell/account";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  email_optin: boolean;
  password: string;
};

// rome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { mutate } = useSWRConfig();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const response = await createUser(data);
    setIsLoading(false);

    mutate("/api/me", response);
    router.refresh();
    router.push("/");
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder=""
            type="text"
            autoCapitalize="none"
            autoComplete="given-name"
            autoCorrect="off"
            {...register("first_name", {
              required: true,
            })}
          />

          <div className="grid gap-3">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder=""
              type="text"
              autoCapitalize="none"
              autoComplete="family-name"
              autoCorrect="off"
              {...register("last_name", {
                required: true,
              })}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="enter your email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register("email", {
                required: true,
              })}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="enter your password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              {...register("password", {
                required: true,
              })}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

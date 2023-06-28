"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Icons } from "@/components/Icons";

import { createUser } from "@/lib/swell/account";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

// rome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { mutate } = useSWRConfig();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await createUser({
      email: data.email,
      password: data.password,
    });
    setIsLoading(true);

    startTransition(() => {
      mutate("/api/me", response);
      router.refresh();
      router.push("/");
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
            disabled={isLoading}
            {...register("first_name", {
              required: true,
            })}
          />

          <div className="grid gap-3">
            <Label htmlFor="lastName">last name</Label>
            <Input
              id="lastName"
              placeholder=""
              type="text"
              autoCapitalize="none"
              autoComplete="family-name"
              autoCorrect="off"
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
              {...register("password", {
                required: true,
              })}
            />
          </div>
          <Button disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

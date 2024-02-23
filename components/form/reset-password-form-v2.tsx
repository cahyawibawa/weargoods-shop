"use client";
import React, { useState } from "react";
import { cn } from "lib/utils";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Icons } from "components/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import swell from "lib/swell";
type FormValues = {
  password: string;
  confirmPassword: string;
};

// rome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface ResetPasswordStep2FormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ResetPasswordStep2Form({
  className,
  ...props
}: ResetPasswordStep2FormProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const key = searchParams?.get("key");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);

    try {
      await swell.account.recover({
        password: data.password,
        reset_key: key,
      });

      toast({
        description: "Password changed successfully!",
      });
      document.location.href = "/signin";
    } catch (e) {
      console.error(e);
      toast({
        description:
          "There was an error changing your password. Please try again.",
      });
    } finally {
      // Turn off spinner
      setIsLoading(false);
    }
  };
  const password = useRef({});
  password.current = watch("password");

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="******"
            type="password"
            autoCapitalize="none"
            autoComplete="new-password"
            autoCorrect="off"
            disabled={isLoading}
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            placeholder="******"
            type="password"
            autoCapitalize="none"
            autoComplete="new-password"
            autoCorrect="off"
            disabled={isLoading}
            {...register("confirmPassword", {
              required: "Please confirm your password",
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Icons } from "@/components/Icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import swell from "@/lib/swell";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/constants";

type FormValues = {
  email: string;
  password: string;
};

type SendEmailResetFormProps = React.HTMLAttributes<HTMLDivElement>;

export function SendEmailResetForm({
  className,
  ...props
}: SendEmailResetFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);

    try {
      await swell.account.recover({
        email: data.email,
        reset_url: `${BASE_URL}/signin/reset-password/step-2?key={reset_key}`,
      });
      toast({
        description: "Password reset link has been sent to your email.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was an error sending your email. Please try again.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
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
              minLength: {
                value: 6,
                message: "Please enter a valid password",
              },
            })}
          />
          {errors.email && (
            <p role="alert" className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}

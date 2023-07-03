"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Icons } from "@/components/Icons";
import { loginUser } from "@/lib/swell/account";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastAction } from "@/components/ui/Toast";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  dontComplete: string;
};

type SignInFormProps = React.HTMLAttributes<HTMLDivElement>;

export function SignInForm({ className, ...props }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.dontComplete) {
      return;
    }
    try {
      await loginUser({
        email: data.email,
        password: data.password,
      });

      setIsLoading(true);
      startTransition(() => {
        router.refresh();
        document.location.href = "/";
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setIsLoading(false);
    }
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required";
    }
    return true;
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
            })}
          />
          {errors.email && (
            <div className="text-red-500">Email is required</div>
          )}

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
              validate: validatePassword,
            })}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

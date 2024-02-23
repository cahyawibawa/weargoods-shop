"use client";

import { getCurrentUser, updateAccount } from "lib/swell/account";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import LoadingModal from "components/ui/loading-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Checkbox } from "components/ui/checkbox";
import { Button } from "components/ui/button";
import { ScrollArea } from "components/ui/scroll-area";
import countriesJSON from "data/countries.json";
type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  shipping: {
    country: string;
    phone: string;
    address1: string;
    city: string;
    state: string;
    zip: string;
  };
  email_optin?: boolean;
};

type Props = {
  account?: swell.Account;
};

export function AccountForm({ account }: Props) {
  const { countries } = countriesJSON;
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: async () => {
      const data = account || (await getCurrentUser());

      setIsLoading(false);
      return {
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        shipping: {
          country: data.shipping?.country || "",
          phone: data.shipping?.phone || "",
          address1: data.shipping?.address1 || "",
          city: data.shipping?.city || "",
          state: data.shipping?.state || "",
          zip: data.shipping?.zip || "",
        },
        email_optin: data.email_optin,
      };
    },
  });

  const onSubmit: SubmitHandler<swell.Account> = async (data) => {
    const { orderValue, orderCount, dateCreated, balance, id, ...formData } =
      data;

    const response = await updateAccount(formData);
    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      mutate("/api/me", response);
      router.refresh();
    });
  };

  return (
    <>
      {isLoading && <LoadingModal />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Personal Information</CardTitle>
            <CardDescription>
              Use your real information and contact point.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2 mb-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  autoComplete="given-name"
                  {...register("first_name", { required: true })}
                />
              </div>
              <div className="flex-1 space-y-2 mb-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  autoComplete="family-name"
                  {...register("last_name", { required: true })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                autoComplete="email"
                {...register("email", {
                  required: true,
                })}
              />
            </div>
          </CardContent>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Address Information</CardTitle>
            <CardDescription>
              Use a permanent address where you can receive your purchases.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 space-y-2 mb-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  autoComplete="country-name"
                  {...register("shipping.country", {
                    required: true,
                  })}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-72 w-48 rounded-md border">
                      <SelectGroup>
                        <SelectLabel>Country</SelectLabel>
                        {countries.map((country, i) => (
                          // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          <SelectItem key={i} value={country.alpha2Code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2 mb-2 lg:mb-0">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  type="tel"
                  id="phone"
                  autoComplete="tel"
                  {...register("shipping.phone", {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="space-y-2 mb-2">
              <Label htmlFor="streetAddress">Street Address</Label>
              <Input
                type="text"
                id="streetAddress"
                autoComplete="street-address"
                {...register("shipping.address1", {
                  required: true,
                })}
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1 space-y-2 mb-2">
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  id="city"
                  autoComplete="address-level2"
                  {...register("shipping.city", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex-1 space-y-2 mb-2">
                <Label htmlFor="state">Province</Label>
                <Input
                  type="text"
                  id="state"
                  autoComplete="address-level1"
                  {...register("shipping.state", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="postal-code">ZIP</Label>
                <Input
                  type="text"
                  id="postal-code"
                  autoComplete="postal-code"
                  {...register("shipping.zip", {
                    required: true,
                  })}
                />
              </div>
            </div>
          </CardContent>

          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Notifications</CardTitle>
            <CardDescription>
              We&apos;ll always let you know about important changes, but you
              pick what else you want to hear about.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" {...register("email_optin")} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Offers
                </label>
                <p className="text-sm text-muted-foreground">
                  Get notified when a candidate accepts or rejects an offer.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => reset()}>
              Cancel
            </Button>
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}

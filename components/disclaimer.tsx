import React from "react";
import { Input } from "components/ui/input";
import { Label } from "./ui/Label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";

const Disclaimer = () => {
  return (
    <div>
      {/* <AlertDialog>
        <AlertDialogTrigger asChild>
          <Label
            className="text-red-500 cursor-pointer"
            style={{ animation: "pulse 1.5s infinite" }}
          >
            Read this before checkout
          </Label>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> How to use Testcard </AlertDialogTitle>
            <AlertDialogDescription>
              This website is intended for personal project purposes only and
              does not function as an actual online store. However, you can
              still proceed with the checkout process using test card
              information. To complete the payment, you can enter the following
              details as an example:
            </AlertDialogDescription>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Testing interactively</CardTitle>
                <CardDescription />
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        disabled
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name on Card</Label>
                      <Input disabled id="name" placeholder="Your Name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex space-x-1.5">
                        <div>
                          <Label htmlFor="expiry">MM/YY</Label>
                          <Input disabled id="expiry" placeholder="12/34" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input disabled id="cvc" placeholder="567" />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button>Deploy</Button>
                    </CardFooter>
            </Card>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </div>
  );
};

export default Disclaimer;

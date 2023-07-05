import { SizeGuide } from "@/components/SizeGuide";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "@/lib/swell/cart";

type Props = {
  product: swell.Product & { categories: swell.Category[] };
};

export function AddToCart({ product }: Props) {
  const [chosenOptions, setChosenOptions] = useState({});
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const isMutating = loading || isPending;
  const { toast } = useToast();
  const [toastMessage, setToastMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!isMutating && toastMessage !== "") {
      toast({
        description: toastMessage,
      });
      setToastMessage(""); // Clear the toast message
    }
  }, [isMutating, toast, toastMessage]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    await addToCart({
      product_id: product.id,
      quantity: quantity, // Use the updated quantity value
    });

    setLoading(false);

    mutate("cart"); // Mutate the "cart" key to update the cart data

    startTransition(() => {
      router.refresh(); // Use replace() instead of refresh()
    });

    setToastMessage("Successfully added to cart");
  };
  return (
    <form className="mb-8" onSubmit={handleSubmit}>
      <div className="mt-10 flex flex-col sm:flex-row">
        <div className="flex items-center">
          <Input
            type="number"
            min={0}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 mr-2"
          />
        </div>

        <div className="flex items-center ml-0 sm:ml-2 mt-4 sm:mt-0">
          <SizeGuide />
        </div>
      </div>

      <Button
        type="submit"
        className="max-w-xs w-full hover:bg-opacity-90 mt-4"
        disabled={isMutating}
      >
        {isMutating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Add to Cart"
        )}
      </Button>
    </form>
  );
}
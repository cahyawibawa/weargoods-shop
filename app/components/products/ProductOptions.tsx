import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface ProductProp {
  product: SwellProduct;
  chosenOptions: { [key: string]: string };
  setChosenOptions: React.Dispatch<
    // rome-ignore lint/suspicious/noRedeclare: <explanation>
    React.SetStateAction<{ [key: string]: string }>
  >;
}

interface SwellProduct {
  variants?: SwellProductVariant[];
  options?: SwellProductOption[];
  categories: swell.Category[];
}

interface SwellProductVariant {
  active: boolean;
  name: string;
  value_ids: string[];
}

interface SwellProductOption {
  active: boolean;
  label: string;
  values: {
    name: string;
    id: string;
  }[];
}

const ProductOptions = ({
  product,
  setChosenOptions,
  chosenOptions,
}: ProductProp) => {
  const [selectedIds, setSelectedIds] = useState<{ [key: string]: string }>({});
  const { state, updateState } = useStore();

  const activeProductVariants = Array.isArray(product.variants)
    ? product.variants.filter((variant) => variant.active)
    : [];

  const availableProductsId = Object.values(selectedIds);

  useEffect(() => {
    const firstActiveVariant = Array.isArray(product.variants)
      ? [...product.variants].reverse().find((variant) => variant.active)
      : undefined;

    const firstActiveLabel = firstActiveVariant?.name.split(", ");
    product.options?.forEach((option, i) => {
      setChosenOptions((prev) => ({
        ...prev,
        [option.label]: firstActiveLabel ? firstActiveLabel[i] : "",
      }));
      setSelectedIds((prev) => ({
        ...prev,
        [option.label]: firstActiveVariant?.value_ids[i] || "",
      }));
    });
  }, [product, setChosenOptions]);

  useEffect(() => {
    if (availableProductsId.length === product.options?.length) {
      const selectedIdsSameAsActiveVariants = activeProductVariants?.map(
        (variant) =>
          variant.value_ids.every((id) => availableProductsId.includes(id))
      );
      updateState({
        ...state,
        isVariantActive:
          selectedIdsSameAsActiveVariants?.includes(true) || false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  const handleOptionChange = (option: string, value: string) => {
    setChosenOptions({
      ...chosenOptions,
      [option]: value,
    });
  };

  return (
    <div className="space-y-3">
      {product.options?.map((option, index) => {
        return (
          <div key={`option${index.toString()}`} className="space-y-1">
            {option.active && (
              <>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>{option.label}</SelectLabel> */}
                      {option.values.map((value, valueIndex) => (
                        <SelectItem
                          key={`option${index.toString()}-value${valueIndex.toString()}`}
                          value={value.name}
                          onClick={() =>
                            handleOptionChange(option.label, value.name)
                          }
                        >
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductOptions;

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCreateQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return createQueryString;
};

export const useRemoveQueryString = () => {
  const searchParams = useSearchParams();

  const removeQueryString = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);

      return params.toString();
    },
    [searchParams]
  );

  return removeQueryString;
};

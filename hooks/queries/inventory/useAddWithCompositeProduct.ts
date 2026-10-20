// utils
import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// configs
import fetch from "@/config/xior";

const addProductWithComposite = (newProduct: any) => {
  return fetch.post("/miams/api/v1/mapping/product/local-product/add/", newProduct);
};

export default function useAddAddWithCompositeProduct() {
  const queryClient = useQueryClient();

  return useMutation(addProductWithComposite, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-product-data"]);
      openSuccessNotification({ description: "Product Added!" });
    },
    onError: (error: any) => {
      openErrorNotification({ description: error?.response?.data?.message });
    },
  });
}

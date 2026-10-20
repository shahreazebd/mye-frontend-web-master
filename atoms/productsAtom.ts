import { Data } from "@/schema/product";
import { atom, useAtom } from "jotai";

import type { Product } from "@/hooks/queries/inventory/useGetProductDetails";

const productsAtom = atom({
  selectedProducts: [] as number[],
  singleProduct: {} as Product,
  isProductDetailsModalOpen: false,
  isMultipleProductAddSheet: false,
  isMultipleProductEditSheet: false,
  isMultipleProductDeleteModal: false,
  isSingleProductAddSheet: false,
  isSingleProductEditSheet: false,
  isSingleProductDeleteModal: false,
  isSingleCompositeProductDeletePopover: false,
});

const compositeProductsAtom = atom({
  selectedCompositeProduct: [] as Data[],
  compositeProduct: [] as Data[],
});

export function useCompositeProductsAtom() {
  const [compositeProductsState, setCompositeProductsState] =
    useAtom(compositeProductsAtom);

  return { compositeProductsState, setCompositeProductsState };
}

export default productsAtom;

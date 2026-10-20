"use client";

import productsAtom, { useCompositeProductsAtom } from "@/atoms/productsAtom";
import { useAtom } from "jotai";

import useAuth from "@/hooks/custom/useAuth";
import useExistingProductComposite from "@/hooks/queries/composite/useExistingProductComposite";
import useDeleteChildProduct from "@/hooks/queries/product/useDeleteChildProduct";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import ChildProductTable from "./composite-products-table/child-product-table";
import AddCompositeProductsTable from "./composite-products-table/composite-products-add-table";

export let deleteCompositeProduct = (
  // eslint-disable-next-line no-unused-vars
  parent_product_id: number,
  // eslint-disable-next-line no-unused-vars
  child_product_id: number
) => {};

export default function ProductDetailsModal() {
  const { userInformation } = useAuth();
  const [value, setValue] = useAtom(productsAtom);
  const { compositeProductsState } = useCompositeProductsAtom();
  const { id } = value.singleProduct ?? {};

  // query hooks
  const { mutate: deleteChildProduct } = useDeleteChildProduct();
  const { mutate: createComposite, isLoading } = useExistingProductComposite();

  deleteCompositeProduct = (parent_product_id: number, child_product_id: number) => {
    const payload = {
      parent_product_id,
      child_product_id,
      company_uid: userInformation?.company_uid as string,
    };

    deleteChildProduct(payload);
  };

  const updateCompositeProduct = () => {
    const compositeChildProducts = compositeProductsState.compositeProduct
      .filter((e) =>
        compositeProductsState.selectedCompositeProduct.map((e) => e.sku).includes(e.sku)
      )
      .map((e) => ({ child_product_id: e.id, quantity: e.composite_quantity }));

    const payload = {
      company_uid: userInformation?.company_uid as string,
      parent_product: id?.toString(),
      composite_child_product: compositeChildProducts,
    };

    createComposite(payload);
  };

  const handelModal = () => {
    setValue((prev) => ({
      ...prev,
      isProductDetailsModalOpen: !prev.isProductDetailsModalOpen,
    }));
  };

  return (
    <Dialog open={value.isProductDetailsModalOpen} onOpenChange={handelModal}>
      <DialogContent className="container">
        <DialogHeader>
          <DialogTitle>{value.singleProduct.sku}</DialogTitle>
          <DialogDescription>
            Product details and composite product options for SKU{" "}
            {value.singleProduct.sku}.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5">
          <Tabs defaultValue="composite_product" className="container">
            <TabsList>
              <TabsTrigger value="composite_product">Composite Products</TabsTrigger>
              <TabsTrigger value="add_composite_product">
                Add Composite Products
              </TabsTrigger>
            </TabsList>
            <TabsContent value="composite_product">
              <ChildProductTable parentProductId={id} />
            </TabsContent>
            <TabsContent value="add_composite_product">
              <AddCompositeProductsTable />
              <Button
                onClick={updateCompositeProduct}
                disabled={
                  compositeProductsState?.selectedCompositeProduct?.length === 0 ||
                  isLoading
                }
                loading={isLoading}
              >
                Add Composite Product
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

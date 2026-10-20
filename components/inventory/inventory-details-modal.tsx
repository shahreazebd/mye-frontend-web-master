"use client";

import { useState } from "react";
import { useInventoryAtom } from "@/atoms/inventoryAtom";

import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";
import useUpdateRemoteProduct from "@/hooks/queries/inventory/use-update-remote-product";
import { useGetMappingProducts } from "@/hooks/queries/inventory/useGetMappingProducts";
import useGetCompositeChildProducts from "@/hooks/queries/product/use-get-composite-child-products";

import ChildProductTable from "../settings/products/composite-products-table/child-product-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MappingProducts } from "./mapping-product";
import ProductDetails from "./product-details";
import { StockHistoryTable } from "./stock-history/stock-history-table";
import StockInquiry from "./stock-inquiry";

export default function InventoryDetailsModal() {
  const [selectedTab, setSelectedTab] = useState("");

  const { inventoryStore, setInventoryStore } = useInventoryAtom();
  const { userInformation } = useAuth();

  const { data: mappingProducts, isLoading: mappingLoading } = useGetMappingProducts(
    inventoryStore?.localProductId
  );
  const { mutate: updateRemoteProduct, isLoading } = useUpdateRemoteProduct();
  const { data } = useGetCompositeChildProducts(inventoryStore?.localProductId);

  const status = mappingProducts?.some(
    (product) => product?.mapped_remote_product?.sync_inventory
  );

  return (
    <Dialog
      open={inventoryStore?.isInventoryDetailsModalOpen}
      onOpenChange={() => {
        setInventoryStore((prev) => ({
          ...prev,
          isInventoryDetailsModalOpen: !prev?.isInventoryDetailsModalOpen,
        }));
      }}
    >
      <DialogContent className="h-[80vh] w-[80vw] overflow-auto">
        <DialogHeader>
          <DialogTitle>{inventoryStore?.sku}</DialogTitle>
          <DialogDescription>
            Inventory details and mapping information for SKU {inventoryStore?.sku}.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5">
          <Tabs defaultValue="product_details" onValueChange={(e) => setSelectedTab(e)}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="product_details">Product Details</TabsTrigger>
                <TabsTrigger value="mapping">Mapping</TabsTrigger>

                {data && (
                  <TabsTrigger value="composite_product">Composite Products</TabsTrigger>
                )}
                <TabsTrigger value="order_history">Order History</TabsTrigger>
                <TabsTrigger value="stock_history">Stock History</TabsTrigger>
              </TabsList>

              {mappingProducts?.length && selectedTab === "mapping" ? (
                <div className="flex items-center gap-x-2">
                  <Switch
                    disabled={isLoading}
                    checked={status}
                    onCheckedChange={(value) => {
                      const data = mappingProducts?.map((product) => ({
                        channel_uid: product?.channel_uid,
                        remote_product: product?.remote_product,
                        sync_inventory: value,
                      }));

                      const payload = {
                        company_uid: userInformation?.company_uid as string,
                        data,
                      };

                      updateRemoteProduct(payload);
                    }}
                  />
                  <span
                    className={cn(
                      "font-bold capitalize",
                      status ? "text-blue-700" : "text-red-700"
                    )}
                  >
                    {status ? "Inventory sync enabled" : "Inventory sync disabled"}
                  </span>
                </div>
              ) : null}
            </div>
            <TabsContent value="product_details">
              <ProductDetails />
            </TabsContent>
            <TabsContent value="mapping">
              <MappingProducts
                mappingProducts={mappingProducts}
                loading={mappingLoading}
              />
            </TabsContent>

            <TabsContent value="composite_product">
              <ChildProductTable parentProductId={inventoryStore?.localProductId} />
            </TabsContent>

            <TabsContent value="order_history">
              <StockInquiry />
            </TabsContent>

            <TabsContent value="stock_history">
              <StockHistoryTable />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

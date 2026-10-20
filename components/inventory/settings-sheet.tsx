"use client";

import { useInventoryAtom } from "@/atoms/inventoryAtom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import InventoryTab from "./inventory-tab";
import ProductTab from "./product-tab";

export default function SettingsSheet() {
  const { inventoryStore, setInventoryStore } = useInventoryAtom();

  return (
    <Sheet
      open={inventoryStore?.isSettingsSheetOpen}
      onOpenChange={() => {
        setInventoryStore((prev) => ({
          ...prev,
          isSettingsSheetOpen: false,
        }));
      }}
    >
      <SheetContent className="w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Import</SheetTitle>
          <SheetDescription>
            Import your inventory and product here. Click import when you are done.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="inventory" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="product">Product</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <InventoryTab />
          </TabsContent>
          <TabsContent value="product">
            <ProductTab />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

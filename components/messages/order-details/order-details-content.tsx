"use client";

import { useMessagesOrderDetailsAtom } from "@/atoms/messages-order-details-atom";
import { CreditCard, Package } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { OrderDetailsEmpty } from "./order-details-empty";
import { OrderDetailsError } from "./order-details-error";
import { OrderDetailsItemsTab } from "./order-details-items-tab";
import { OrderDetailsLoading } from "./order-details-loading";
import { OrderDetailsSummaryTab } from "./order-details-summary-tab";

export function OrderDetailsContent() {
  const { isFetching, isError, hasLoadedOrder, currentItems } =
    useMessagesOrderDetailsAtom();

  if (isFetching && !hasLoadedOrder) {
    return <OrderDetailsLoading />;
  }

  if (isError) {
    return <OrderDetailsError />;
  }

  if (!hasLoadedOrder) {
    return <OrderDetailsEmpty />;
  }

  return (
    <Tabs defaultValue="summary" className="mt-2 w-full">
      <TabsList className="grid h-9 w-full grid-cols-2">
        <TabsTrigger value="summary" className="text-xs">
          <CreditCard className="mr-1.5 inline size-3.5" /> Summary
        </TabsTrigger>
        <TabsTrigger value="items" className="text-xs">
          <Package className="mr-1.5 inline size-3.5" /> Items ({currentItems.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="summary" className="mt-4">
        <OrderDetailsSummaryTab />
      </TabsContent>
      <TabsContent value="items" className="mt-4">
        <OrderDetailsItemsTab />
      </TabsContent>
    </Tabs>
  );
}

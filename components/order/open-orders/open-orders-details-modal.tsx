"use client";

import {
  useActiveOpenOrderAtom,
  useIsOpenOrderDetailsModalOpenAtom,
} from "@/atoms/openOrderAtom";
import dayjs from "dayjs";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import OrderItemsTable from "./order-items-table";
import ShowData from "./show-data";

export default function OpenOrderDetailsModal() {
  const { setIsOpenOrderDetailsModalOpen, isOpenOrderDetailsModalOpen } =
    useIsOpenOrderDetailsModalOpenAtom();

  const { activeOpenOrder } = useActiveOpenOrderAtom();

  const detailsData = [
    { key: "Order ID", value: activeOpenOrder?.channel_order_id },
    { key: "Channel", value: activeOpenOrder?.channel?.name },
    { key: "Date", value: dayjs(activeOpenOrder?.purchase_date).format("MMMM DD YYYY") },
    { key: "Total", value: `${activeOpenOrder?.total} ${activeOpenOrder?.currency}` },
  ];

  const shippingAddress = [
    { key: "Buyer Name", value: activeOpenOrder?.shipping_address?.buyer_name },
    { key: "Phone", value: activeOpenOrder?.shipping_address?.phone },
    { key: "Email", value: activeOpenOrder?.shipping_address?.email },
    { key: "Address 1", value: activeOpenOrder?.shipping_address?.address1 },
    { key: "Address 2", value: activeOpenOrder?.shipping_address?.address2 },
    { key: "Post Code", value: activeOpenOrder?.shipping_address?.post_code },
    { key: "City", value: activeOpenOrder?.shipping_address?.city },
    { key: "State", value: activeOpenOrder?.shipping_address?.state },
    { key: "Country Code", value: activeOpenOrder?.shipping_address?.country },
  ];

  return (
    <Dialog
      open={isOpenOrderDetailsModalOpen}
      onOpenChange={setIsOpenOrderDetailsModalOpen}
    >
      <DialogContent className="container">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="my-4">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="shippingAddress">Shipping Address</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <ShowData data={detailsData} />
          </TabsContent>
          <TabsContent value="items">
            <OrderItemsTable
              orderItems={activeOpenOrder?.items}
              currency={activeOpenOrder?.currency}
            />
          </TabsContent>

          <TabsContent value="shippingAddress">
            <ShowData data={shippingAddress} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

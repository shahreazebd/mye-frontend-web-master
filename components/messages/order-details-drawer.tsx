"use client";

import { useSyncMessagesOrderDetails } from "@/atoms/messages-order-details-atom";
import dayjs from "dayjs";

import { OrderInfo } from "@/types/messages";
import {
  OrderByFilterData,
  useGetOrdersByFilter,
} from "@/hooks/queries/order/use-get-orders-by-filter";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { OrderDetailsContent } from "./order-details/order-details-content";
import { OrderDetailsHeader } from "./order-details/order-details-header";

export type OrderDetailsDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderDetails?: OrderInfo | null;
  channelUid?: string;
  buyerUsername?: string;
  legacyItemId?: string;
  timestamp: string;
};

const EMPTY_ORDERS: OrderByFilterData[] = [];

export function OrderDetailsDrawer({
  open,
  onOpenChange,
  orderDetails,
  channelUid,
  buyerUsername,
  legacyItemId,
  timestamp,
}: Readonly<OrderDetailsDrawerProps>) {
  const dateObj = timestamp ? dayjs(timestamp) : dayjs();
  const safeDate = dateObj.isValid() ? dateObj : dayjs();
  const computedDateFrom = safeDate.subtract(3, "months").format("YYYY-MM-DD");
  const computedDateTo = safeDate.format("YYYY-MM-DD");

  // Query order by filter when drawer is open and filter params are present
  const shouldFetch = Boolean(open && channelUid && buyerUsername && legacyItemId);

  const {
    data: apiResponse,
    isLoading: isQueryLoading,
    isError,
    error,
    refetch,
  } = useGetOrdersByFilter(
    {
      channel_uid: channelUid,
      buyer_username: buyerUsername,
      legacy_item_id: legacyItemId,
      date_from: computedDateFrom,
      date_to: computedDateTo,
    },
    shouldFetch
  );

  // isQueryLoading is true even when the query is disabled (no legacyItemId).
  // Only treat it as loading when we actually intend to fetch.
  const isFetchingOrders = shouldFetch && isQueryLoading;

  // Sync state and selected order index via atom hook
  useSyncMessagesOrderDetails({
    open,
    apiOrders: apiResponse?.data ?? EMPTY_ORDERS,
    orderDetails,
    buyerUsername,
    legacyItemId,
    isFetching: isFetchingOrders,
    isError,
    error,
    onRefetch: refetch,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-3xl overflow-hidden p-6 sm:max-w-3xl md:max-w-4xl">
        <OrderDetailsHeader />
        <OrderDetailsContent />
      </DialogContent>
    </Dialog>
  );
}

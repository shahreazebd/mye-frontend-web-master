import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { atom, useAtom, useSetAtom } from "jotai";

import { OrderInfo } from "@/types/messages";
import { OrderByFilterData } from "@/hooks/queries/order/use-get-orders-by-filter";

// ─── View Model Types ─────────────────────────────────────────────────────────

export type OrderItemViewModel = {
  id: string | number;
  remote_sku?: string;
  title?: string;
  price?: string | number;
  quantity: number;
  total_amount?: string | number;
  lineItemId?: string;
};

export type SummaryItemViewModel = {
  key: string;
  value: string;
  badge?: boolean;
  badgeVariant?: "default" | "secondary" | "outline";
};

// ─── Atom State Types ─────────────────────────────────────────────────────────

export type MessagesOrderDetailsContextState = {
  apiOrders: OrderByFilterData[];
  orderDetails?: OrderInfo | null;
  buyerUsername?: string;
  legacyItemId?: string;
  isFetching: boolean;
  isError: boolean;
  error?: unknown;
  onRefetch?: () => void;
};

// SyncParams extends the context state with `open` as the only extra field
export type SyncMessagesOrderDetailsParams = MessagesOrderDetailsContextState & {
  open: boolean;
};

// ─── Atoms ────────────────────────────────────────────────────────────────────

export const messagesOrderDetailsContextAtom = atom<MessagesOrderDetailsContextState>({
  apiOrders: [],
  orderDetails: null,
  buyerUsername: undefined,
  legacyItemId: undefined,
  isFetching: false,
  isError: false,
  error: null,
  onRefetch: undefined,
});

export const selectedOrderIndexAtom = atom<number>(0);

// ─── Sync Hook (used in drawer to push query state into atoms) ────────────────

export function useSyncMessagesOrderDetails({
  open,
  ...contextState
}: SyncMessagesOrderDetailsParams) {
  const setContext = useSetAtom(messagesOrderDetailsContextAtom);
  const setSelectedOrderIndex = useSetAtom(selectedOrderIndexAtom);

  // Sync query state into the atom whenever the drawer is open
  useEffect(() => {
    if (open) setContext(contextState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, contextState.apiOrders, contextState.isFetching, contextState.isError]);

  // Reset selected order when drawer opens or item changes
  useEffect(() => {
    if (open) setSelectedOrderIndex(0);
  }, [open, contextState.legacyItemId, setSelectedOrderIndex]);
}

// ─── Read Hook (used in subcomponents) ───────────────────────────────────────

export function useMessagesOrderDetailsAtom() {
  const [context] = useAtom(messagesOrderDetailsContextAtom);
  const [selectedOrderIndex, setSelectedOrderIndex] = useAtom(selectedOrderIndexAtom);

  const {
    apiOrders,
    orderDetails,
    buyerUsername,
    legacyItemId,
    isFetching,
    isError,
    error,
    onRefetch,
  } = context;

  // ── Internal normalization ────────────────────────────────────────────────
  const activeApiOrder: OrderByFilterData | null =
    apiOrders[selectedOrderIndex] || apiOrders[0] || null;

  const currency = activeApiOrder?.currency || orderDetails?.currency || "USD";
  const paymentStatus =
    activeApiOrder?.payment_status || orderDetails?.payment_status || "Pending";
  const dispatchStatus = activeApiOrder?.dispatch_status;
  const orderId = activeApiOrder?.channel_order_id || orderDetails?.channel_order_id;

  // ── Derived view data ─────────────────────────────────────────────────────

  const hasLoadedOrder = !!(activeApiOrder || orderDetails);

  const currentItems = useMemo((): OrderItemViewModel[] => {
    if (activeApiOrder?.items?.length) {
      return activeApiOrder.items.map((item, idx) => {
        const lineMeta = activeApiOrder.order_meta?.lineItems?.find(
          (m) =>
            m.legacyItemId === legacyItemId ||
            item.position_item_ids?.includes(m.lineItemId)
        );
        return {
          id: item.id || idx + 1,
          remote_sku: item.remote_sku,
          title: item.title || lineMeta?.lineItemId || item.remote_sku,
          price: item.price,
          quantity: item.quantity || 1,
          total_amount: item.total_amount,
          lineItemId: lineMeta?.lineItemId,
        };
      });
    }
    if (orderDetails?.items?.length) {
      return orderDetails.items.map((item, idx) => ({
        id: idx + 1,
        remote_sku: item.remote_sku || "",
        title: item.title || item.remote_sku || `Item #${idx + 1}`,
        price: item.price || "-",
        quantity: item.quantity || 1,
        total_amount: item.total_amount || "-",
        lineItemId: undefined,
      }));
    }
    return [];
  }, [activeApiOrder, orderDetails, legacyItemId]);

  const summaryData = useMemo((): SummaryItemViewModel[] => {
    const total = activeApiOrder?.total ?? orderDetails?.total;
    const purchaseDate = activeApiOrder?.purchase_date;
    const dispatchedAt = activeApiOrder?.dispatched_at ?? orderDetails?.dispatched_at;
    const dispatchedBy = activeApiOrder?.dispatched_by;

    const rows: SummaryItemViewModel[] = [
      { key: "Order ID", value: orderId || "-" },
      {
        key: "Payment Status",
        value: paymentStatus,
        badge: true,
        badgeVariant: paymentStatus.toUpperCase() === "PAID" ? "default" : "secondary",
      },
      { key: "Payment Method", value: activeApiOrder?.payment_method || "-" },
      { key: "Total Amount", value: total ? `${total} ${currency}` : "-" },
      {
        key: "Purchase Date",
        value: purchaseDate ? dayjs(purchaseDate).format("MMMM DD, YYYY h:mm A") : "-",
      },
      {
        key: "Dispatch Status",
        value: dispatchStatus || "PENDING",
        badge: Boolean(dispatchStatus),
        badgeVariant:
          dispatchStatus?.toUpperCase() === "DISPATCHED" ? "outline" : "secondary",
      },
      {
        key: "Dispatched Date",
        value: dispatchedAt
          ? dayjs(dispatchedAt).format("MMMM DD, YYYY h:mm A")
          : "Not dispatched yet",
      },
    ];

    if (dispatchedBy) rows.push({ key: "Dispatched By", value: dispatchedBy });
    if (buyerUsername) rows.push({ key: "Buyer Username", value: `@${buyerUsername}` });
    if (legacyItemId) rows.push({ key: "Listing Item ID", value: legacyItemId });

    return rows;
  }, [activeApiOrder, orderDetails]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Return only what components actually consume ───────────────────────────
  return {
    // Status flags (order-details-content)
    isFetching,
    isError,
    hasLoadedOrder,
    // Error recovery (order-details-error)
    error,
    onRefetch,
    // Empty state (order-details-empty)
    buyerUsername,
    legacyItemId,
    // Items tab (order-details-items-tab)
    currentItems,
    currency,
    // Summary tab (order-details-summary-tab)
    summaryData,
    // Header (order-details-header)
    orderId,
    paymentStatus,
    dispatchStatus,
    apiOrders,
    selectedOrderIndex,
    setSelectedOrderIndex,
  };
}

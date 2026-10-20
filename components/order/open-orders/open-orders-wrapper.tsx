"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAmazonCarrierOptions } from "@/atoms/carriersAtom";
import openOrderAtom, { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { Channel } from "@/schema/channel";
import type { OpenOrder } from "@/schema/open-order";
import { buildAmazonShippingRatePayload } from "@/utils/amazon-postage";
import { mergeDuplicateOrders } from "@/utils/helpers";
import { useAtom } from "jotai";
import { AlertCircle, Loader, ScrollText, Truck, X, XCircle } from "lucide-react";

import { normalizeCarrierName } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";
import useAddActivityLog from "@/hooks/queries/activity-log/useAddActivityLog";
import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import { useGetCarrierList } from "@/hooks/queries/new-carriers/use-get-carrier-list";
import useCancelOrders from "@/hooks/queries/order/useCancelOrder";
import useDispatchOrders from "@/hooks/queries/order/useDispatchOrders";
import useGetOpenOrders from "@/hooks/queries/order/useGetOpenOrders";
import { useAmazonBulkShippingRates } from "@/hooks/queries/shipments/use-amazon-bulk-shipping-rates";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { DataTable } from "@/components/core/data-table/data-table";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";
import { handleReconnect } from "@/components/settings/all-channels/all-channel-actions";

import { columns } from "./open-order-columns";
import OpenOrdersFilters from "./open-orders-filters";

const OpenOrderDetailsModal = dynamic(() => import("./open-orders-details-modal"));
const DispatchOrderModal = dynamic(() => import("./dispatch-order-modal"));
const CancelOrderModal = dynamic(() => import("./cancel-order-modal"));

type Params = "dispatch" | "cancel";

function gramsToPoundsOunces(grams: number) {
  const pounds = grams * 0.00220462;
  const wholePounds = Math?.floor(pounds);
  const ounces = (pounds - wholePounds) * 16;
  return { lb: wholePounds, oz: Number.parseFloat(ounces?.toFixed(3)) };
}

function gramsToKilogramsGrams(grams: number) {
  const kilograms = Math?.floor(grams / 1000);
  const remainingGrams = grams % 1000;
  return { kg: kilograms, gm: remainingGrams };
}

function cmToInches(cm: number) {
  return (cm * 0.393701)?.toFixed(2);
}

export default function OpenOrdersWrapper() {
  const { toast } = useToast();
  const router = useRouter();
  const { userInformation } = useAuth();

  const { setAmazonCarrierOptions } = useAmazonCarrierOptions();

  const [selectedTableRows, setSelectedTableRows] = useState([] as any[]);

  const handleSelectedRowData = useCallback((data: any[]) => {
    setSelectedTableRows(data);
  }, []);

  const [selectedChannelDetails, setSelectedChannelDetails] = useState({} as Channel);

  const selectedChannelId = selectedChannelDetails?.channel_uid || "all";

  const [isShow, setIsShow] = useState(true);

  const [, setOpenOrder] = useAtom(openOrderAtom);
  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();

  const { data: channel } = useGetChannelDetails(selectedChannelId);

  const {
    data: orders,
    isLoading,
    isFetching,
    refetch: refetchOpenOrder,
  } = useGetOpenOrders(selectedChannelId);

  const { mutate: addActivityLog } = useAddActivityLog();
  const { mutate: dispatchOrders, isLoading: dispatchLoading } =
    useDispatchOrders(selectedChannelId);
  const { mutate: cancelOrders, isLoading: cancelLoading } =
    useCancelOrders(selectedChannelId);

  const { mutate: triggerShippingRates } = useAmazonBulkShippingRates();

  // carrier list
  const { data: carrierList, isLoading: isCarrierListLoading } = useGetCarrierList();
  const carrierTypes = [...new Set(carrierList?.map((e) => e.type))];

  useEffect(() => {
    const isShowReconnectChannelId = localStorage?.getItem("isShowReconnectChannelId");

    if (isShowReconnectChannelId === selectedChannelId) {
      setIsShow(false);
    }
  }, [selectedChannelId]);

  const withoutAddressOrders = useMemo(() => {
    return selectedTableRows.filter((item) => item?.shipping_address === null);
  }, [selectedTableRows]);

  const withoutItemsOrders = useMemo(() => {
    return selectedTableRows.filter((item) => item?.items?.length <= 0);
  }, [selectedTableRows]);

  const withoutAddressIds = useMemo(() => {
    return withoutAddressOrders.map((item) => item.channel_order_id).join(",");
  }, [withoutAddressOrders]);

  const withoutItemsIds = useMemo(() => {
    return withoutItemsOrders.map((item) => item.channel_order_id).join(",");
  }, [withoutItemsOrders]);

  useEffect(() => {
    if (withoutAddressOrders.length > 0) {
      toast({
        title: "Notice",
        description:
          "The following orders do not have an associated shipping address: " +
          withoutAddressOrders.map((item) => item.channel_order_id).join(", "),
        variant: "destructive",
      });
    }
  }, [withoutAddressIds, toast]);

  useEffect(() => {
    if (withoutItemsOrders.length > 0) {
      toast({
        title: "Notice",
        description:
          "The following orders do not have any items: " +
          withoutItemsOrders.map((item) => item.channel_order_id).join(", "),
        variant: "destructive",
      });
    }
  }, [withoutItemsIds, toast]);

  function getMappedOrders() {
    const mappedData = mergeDuplicateOrders(selectedTableRows)
      ?.map((row) => {
        const totalWeightInGrams = row?.items?.reduce((acc, cur) => {
          return acc + +cur?.weight * cur?.quantity;
        }, 0);

        const sku = row?.items?.map((item) => {
          const sku = item?.local_SKU || `${item?.remote_sku} (Remote)`;

          return {
            sku,
            quantity: item?.quantity,
          };
        });

        // total order items
        const totalItems = row?.items
          ?.map((e) => e?.quantity)
          ?.reduce((acc, row) => acc + row, 0);

        const height = row?.items?.reduce(
          (acc, cur) => acc + +cur?.height * +cur?.quantity,
          0
        );

        const width = Math.max(...row.items.map((e) => +e?.width));

        const length = Math.max(...row.items.map((e) => +e?.depth));

        const dimensions = `${height}, ${width}, ${length}`;
        const inch = `${cmToInches(height)}, ${cmToInches(width)}, ${cmToInches(length)}`;
        const { lb, oz } = gramsToPoundsOunces(totalWeightInGrams);
        const { kg, gm } = gramsToKilogramsGrams(totalWeightInGrams);

        const orderMetadata = row?.order_meta?.latest_delivery_date || null;

        return {
          ...row,
          sku: sku?.map((e) => e.sku)?.join(","),
          modified_sku: sku?.map((e) => e?.sku)?.join(","),
          quantity: sku?.map((e) => e?.quantity)?.join(","),
          total_weight: totalWeightInGrams,
          lb,
          oz,
          kg,
          gm,
          total_items: totalItems,
          dimensions,
          dimensionsInches: inch,
          latestDeliveryDate: orderMetadata,
          rateRecordId: crypto.randomUUID(),
        };
      })
      .sort((a, b) => {
        if (!channel?.report_sorted_by) {
          return 0;
        } else if (channel?.report_sorted_by === "sku") {
          return (
            a?.sku.localeCompare(b?.sku) ||
            a?.shipping_address?.buyer_name?.localeCompare(
              b?.shipping_address?.buyer_name
            )
          );
        } else {
          return (
            a?.shipping_address?.buyer_name.localeCompare(
              b?.shipping_address?.buyer_name
            ) || a?.sku.localeCompare(b.sku)
          );
        }
      });

    return mappedData.filter(
      (item) => item?.shipping_address !== null || item?.items?.length > 0
    );
  }

  function openDispatchOrderModal() {
    document.body.style.pointerEvents = "";

    setOpenOrder((prev) => ({ ...prev, isDispatchOrderModalOpen: true }));
  }

  function openCancelOrderModal() {
    document.body.style.pointerEvents = "";
    setOpenOrder((prev) => ({ ...prev, isCancelOrderModalOpen: true }));
  }

  function buyShippingLabelHandler(carrier: string) {
    if (!selectedChannelId || selectedChannelId === "all") {
      return toast({
        title: "Please select a channel",
        description: "Please select a channel in order to buy postage",
        variant: "destructive",
      });
    }

    const filteredMappedData = getMappedOrders();
    setOpenOrdersWithStorage(filteredMappedData);

    const baseSearchParams = {
      carrier: carrier.toUpperCase(),
      channelId: selectedChannelId,
      country: channel?.country?.toLowerCase() || "",
    };

    if (carrier === "amazon") {
      const payload = {
        storeId: selectedChannelId,
        data: filteredMappedData?.map(buildAmazonShippingRatePayload) ?? [],
      };

      setAmazonCarrierOptions({});

      return triggerShippingRates(payload, {
        onSuccess: (res) => {
          const batchId = res?.data?.data?.batchId;
          const query = new URLSearchParams({
            ...baseSearchParams,
            batchId,
          }).toString();

          router.push(`/order/open-orders/postage-preview?${query}`);
        },
      });
    }

    const query = new URLSearchParams(baseSearchParams).toString();
    router.push(`/order/open-orders/postage-preview?${query}`);
  }

  function activityLogHandler(ids: number[], type: Params) {
    const ps = ids?.length === 1 ? "order" : "orders";
    const message = `${type} ${ids?.length} ${selectedTableRows[0]?.channel?.name}'s ${ps}.`;
    const userFullName = userInformation?.Name;
    const payload = {
      website_name: "mye",
      company_uid: userInformation?.company_uid,
      notification_data: {
        data: userFullName + " " + message,
        type: type + "_order",
        parent_type: "order",
        user: userFullName,
        avatar_url: userInformation?.avater_url,
      },
    };
    addActivityLog(payload);
  }

  function dispatchOrCancelOrderHandler(type: Params) {
    const ids = (selectedTableRows as OpenOrder[]).map((row) => row.id);
    const firstRow = selectedTableRows[0];
    const payload = {
      channel_uid: firstRow?.channel_uid,
      company_uid: firstRow?.company_uid,
      channel_type: firstRow?.channel?.channel_type,
      order_id: ids,
    };

    if (!ids?.length) {
      return toast({
        title: "Please select an order",
        description: "Please select an order to dispatch or cancel",
        variant: "destructive",
      });
    }

    switch (type) {
      case "dispatch":
        dispatchOrders(payload, {
          onSuccess: () => {
            activityLogHandler(ids, "dispatch");
            setOpenOrder((prev) => ({ ...prev, isDispatchOrderModalOpen: false }));
          },
        });

        break;

      case "cancel":
        cancelOrders(payload, {
          onSuccess: () => {
            activityLogHandler(ids, "cancel");
            setOpenOrder((prev) => ({ ...prev, isCancelOrderModalOpen: false }));
          },
        });

        break;
      default:
        break;
    }
  }

  function handelHideReconnectPopup() {
    localStorage.setItem("isShowReconnectChannelId", selectedChannelId);
    setIsShow(false);
  }

  return (
    <>
      {/* reconnect banner  */}

      {channel && channel?.is_authorized === false && isShow && (
        <div className="mb-2 flex justify-between rounded-lg border border-yellow-500 bg-yellow-100 px-5 py-1">
          <div className="flex items-center gap-x-2">
            <AlertCircle className="size-4 text-black" />
            <p className="text-sm text-black">
              {channel?.name} has been expired. Please reconnect it again.
            </p>
          </div>

          <div className="flex items-center gap-x-2">
            <Button
              size="sm"
              variant="outline"
              className="text-black"
              onClick={() =>
                handleReconnect(
                  channel?.channel_uid,
                  channel?.channel_type,
                  channel?.country
                )
              }
            >
              Reconnect
            </Button>
            <Button size="sm" variant="link" onClick={handelHideReconnectPopup}>
              <X className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* without address */}

      {(withoutAddressOrders?.length > 0 || withoutItemsOrders?.length > 0) && (
        <div className="mb-2 flex justify-between rounded-lg border border-yellow-500 bg-yellow-100 px-5 py-1">
          <div className="flex items-center gap-x-2">
            <AlertCircle className="size-4 text-black" />
            {withoutAddressOrders?.length > 0 && (
              <p className="text-sm text-black">
                The following orders do not have an associated shipping address:{" "}
                {withoutAddressOrders.map((item) => item.channel_order_id).join(", ")}
              </p>
            )}
            {withoutItemsOrders?.length > 0 && (
              <p className="text-sm text-black">
                The following orders do not have any items:{" "}
                {withoutItemsOrders.map((item) => item.channel_order_id).join(", ")}
              </p>
            )}
          </div>

          <div className="flex items-center gap-x-2">
            <Button
              size="sm"
              variant="outline"
              className="text-black"
              onClick={() => {
                if (withoutAddressOrders.length > 0) {
                  globalThis.navigator.clipboard.writeText(
                    withoutAddressOrders.map((item) => item.channel_order_id).join(", ")
                  );
                }

                if (withoutItemsOrders.length > 0) {
                  globalThis.navigator.clipboard.writeText(
                    withoutItemsOrders.map((item) => item.channel_order_id).join(", ")
                  );
                }
                toast({
                  title: "Order IDs Copied",
                  description: "Order IDs copied to clipboard",
                });
              }}
            >
              Copy Order ID{withoutAddressOrders.length > 1 && "s"}
            </Button>
          </div>
        </div>
      )}

      <DataTableToolbar
        title="Open Orders"
        description="Paid Orders Awaiting Completion."
        component={
          <div className="flex gap-2">
            <OpenOrdersFilters
              refetchOpenOrder={refetchOpenOrder}
              isFetching={isFetching}
              setSelectedChannelDetails={setSelectedChannelDetails}
              selectedChannelDetails={selectedChannelDetails}
              selectedDataCount={selectedTableRows?.length}
              dataCount={orders?.length}
            />
          </div>
        }
      />

      <ContextMenu>
        <ContextMenuTrigger>
          <DataTable
            className="mt-3"
            header={false}
            columns={columns}
            data={orders}
            singleRowSelection={false}
            search={false}
            loading={isLoading}
            dataSize={100}
            pagination={true}
            pageOptions={[100, 200, 500, 1000]}
            selectedRowData={handleSelectedRowData}
          />
        </ContextMenuTrigger>

        {userInformation?.type !== "w_manager" && (
          <ContextMenuContent className="w-60">
            <ContextMenuItem
              inset
              onClick={() => refetchOpenOrder()}
              className="cursor-pointer pl-3"
            >
              <Loader className="mr-3 size-4" />
              Refresh
            </ContextMenuItem>

            <ContextMenuItem
              inset
              onClick={openDispatchOrderModal}
              className="cursor-pointer pl-3"
            >
              <Truck className="mr-3 size-4" />
              Dispatch
            </ContextMenuItem>

            <ContextMenuItem
              inset
              onClick={openCancelOrderModal}
              className="cursor-pointer pl-3"
            >
              <XCircle className="mr-3 size-4" />
              Mark as Cancelled
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuSub>
              <ContextMenuSubTrigger
                disabled={!selectedTableRows.length}
                className={selectedTableRows.length ? "" : "text-gray-400"}
              >
                <ScrollText className="ml-1 mr-3 size-4" /> Buy Shipping Label
              </ContextMenuSubTrigger>

              <ContextMenuSubContent className="w-48">
                {isCarrierListLoading ? (
                  <div className="flex flex-col gap-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ) : (
                  <div>
                    {carrierTypes.map((carrier) => (
                      <ContextMenuItem
                        key={carrier}
                        onClick={() =>
                          buyShippingLabelHandler(carrier.toLocaleLowerCase())
                        }
                      >
                        <Image
                          src={`/logos/carriers/round/${carrier.toLocaleLowerCase()}.svg`}
                          width={20}
                          height={20}
                          className="mr-2"
                          alt={carrier}
                        />
                        <span className="capitalize">
                          {normalizeCarrierName(carrier)}
                        </span>
                      </ContextMenuItem>
                    ))}
                  </div>
                )}
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        )}
      </ContextMenu>

      {/* modals */}
      <OpenOrderDetailsModal />
      <DispatchOrderModal
        disabled={dispatchLoading}
        confirmFn={() => dispatchOrCancelOrderHandler("dispatch")}
      />
      <CancelOrderModal
        disabled={cancelLoading}
        confirmFn={() => dispatchOrCancelOrderHandler("cancel")}
      />
    </>
  );
}

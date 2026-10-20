"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import openOrderAtom, { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { carriers } from "@/constants/carriers";
import { Channel } from "@/schema/channel";
import type { OpenOrder } from "@/schema/open-order";
import { hasDuplicate, mergeCell } from "@/utils/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { AlertCircle, Loader, ScrollText, Truck, X, XCircle } from "lucide-react";

import useAuth from "@/hooks/custom/useAuth";
import useAddActivityLog from "@/hooks/queries/activity-log/useAddActivityLog";
import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import useCancelOrders from "@/hooks/queries/order/useCancelOrder";
import useDispatchOrders from "@/hooks/queries/order/useDispatchOrders";
import useGetOpenOrders from "@/hooks/queries/order/useGetOpenOrders";
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
import { useToast } from "@/components/ui/use-toast";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";
import { handleReconnect } from "@/components/settings/all-channels/all-channel-actions";

import { DataTable } from "../../core/data-table/data-table";
import CancelOrderModal from "./cancel-order-modal";
import DispatchOrderModal from "./dispatch-order-modal";
import { columns } from "./open-order-columns";
import OpenOrderDetailsModal from "./open-orders-details-modal";
import OpenOrdersFilters from "./open-orders-filters";

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
  const queryClient = useQueryClient();
  const { userInformation } = useAuth();
  const [withoutAddressOrders, setWithoutAddressOrders] = useState([] as OpenOrder[]);
  const [withoutItemsOrders, setWithoutItemsOrders] = useState([] as OpenOrder[]);

  // states
  const [selectedTableRows, setSelectedTableRows] = useState([] as OpenOrder[]);

  const [selectedChannelDetails, setSelectedChannelDetails] = useState({} as Channel);

  const selectedChannelId = selectedChannelDetails?.channel_uid || "all";

  const [isShow, setIsShow] = useState(true);

  const [, setOpenOrder] = useAtom(openOrderAtom);
  const { openOrdersWithStorage, setOpenOrdersWithStorage } =
    useOpenOrderAtomWithStorage();

  const { data: channel, isLoading: isChannelLoading } =
    useGetChannelDetails(selectedChannelId);
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

  useEffect(() => {
    const isShowReconnectChannelId = localStorage?.getItem("isShowReconnectChannelId");

    if (isShowReconnectChannelId === selectedChannelId) {
      setIsShow(false);
    }
  }, [selectedChannelId]);

  useEffect(() => {
    const mappedData = mergeCell(selectedTableRows)
      ?.map((row) => {
        const totalWeightInGrams = row?.items?.reduce((acc, cur) => {
          return acc + +cur?.weight * cur?.quantity;
        }, 0);

        const modifiedSKU = row?.items
          ?.map((item) => {
            const sku = item?.local_SKU || `${item?.remote_sku} (Remote)`;

            return sku;
          })
          ?.join(",");

        const quantity = row?.items?.map((item) => item?.quantity)?.join(",");

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
          sku: modifiedSKU,
          modified_sku: modifiedSKU,
          quantity: quantity,
          total_weight: totalWeightInGrams,
          lb,
          oz,
          kg,
          gm,
          total_items: totalItems,
          dimensions,
          dimensionsInches: inch,
          carriers: "",
          latestDeliveryDate: orderMetadata,
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

    const filterWithoutAddress = mappedData.filter(
      (item) => item?.shipping_address === null
    );

    const filterWithoutItems = mappedData.filter((item) => item?.items?.length <= 0);

    const filterWithAddressAndItem = mappedData.filter(
      (item) => item?.shipping_address !== null || item?.items?.length > 0
    );

    if (filterWithoutItems?.length > 0) {
      toast({
        title: "Notice",
        description:
          "The following orders do not have any items: " +
          filterWithoutItems?.map((item) => item?.channel_order_id).join(", "),
        variant: "destructive",
      });
    }

    if (filterWithoutAddress?.length > 0) {
      toast({
        title: "Notice",
        description:
          "The following orders do not have an associated shipping address: " +
          filterWithoutAddress?.map((item) => item?.channel_order_id).join(", "),
        variant: "destructive",
      });
    }

    setWithoutAddressOrders(filterWithoutAddress);
    setWithoutItemsOrders(filterWithoutItems);

    setOpenOrdersWithStorage(filterWithAddressAndItem);
  }, [selectedTableRows?.length, isChannelLoading]);

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

    // else if (selectedTableRows.find((row) => row.channel.channel_type === "amazon")) {
    //   return toast({
    //     title: "Amazon is not available right now",
    //     description: "Please select another channel to buy shipping label",
    //     variant: "destructive",
    //   });
    // }

    const qs = new URLSearchParams({
      carrier,
      channelId: selectedChannelId,
      country: channel?.country?.toLowerCase() as string,
    })?.toString();

    router.push(`/order/open-orders/postage-preview?${qs}`);
  }

  function refreshData() {
    queryClient.invalidateQueries(["fetch-orders-data"]);
  }

  function activityLogHandler(ids: number[], type: Params) {
    const ps = ids?.length === 1 ? "order" : "orders";
    const message = `${type} ${ids?.length} ${openOrdersWithStorage[0]?.channel?.name}'s ${ps}.`;
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
    const ids = selectedTableRows.map((row) => row.id);
    const payload = {
      channel_uid: openOrdersWithStorage[0]?.channel_uid,
      company_uid: openOrdersWithStorage[0]?.company_uid,
      channel_type: openOrdersWithStorage[0]?.channel?.channel_type,
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

  const handelHideReconnectPopup = () => {
    localStorage.setItem("isShowReconnectChannelId", selectedChannelId);
    setIsShow(false);
  };

  // function buyShippingLabelForAmazon() {
  //   if (!selectedChannelId || selectedChannelId === "all") {
  //     return toast({
  //       title: "Please select a channel",
  //       description: "Please select a channel in order to buy postage",
  //       variant: "destructive",
  //     });
  //   }

  //   const qs = new URLSearchParams({
  //     channelId: selectedChannelId,
  //     country: channel?.country?.toLowerCase() as string,
  //   }).toString();

  //   router.push(`/order/open-orders/postage-preview?${qs}`);
  // }

  return (
    <>
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

      {(withoutAddressOrders?.length > 0 || withoutItemsOrders?.length > 0) && (
        <div className="mb-2 flex justify-between rounded-lg border border-yellow-500 bg-yellow-100 px-5 py-1">
          <div className="flex items-center gap-x-2">
            <AlertCircle className="size-4 text-black" />
            {withoutAddressOrders?.length > 0 && withoutItemsOrders?.length > 0 ? (
              <>
                <p className="text-sm text-black">
                  The following orders do not have an associated shipping address:{" "}
                  {withoutAddressOrders.map((item) => item.channel_order_id).join(", ")}
                </p>
                <p className="text-sm text-black">
                  The following orders do not have any items:{" "}
                  {withoutItemsOrders.map((item) => item.channel_order_id).join(", ")}
                </p>
              </>
            ) : withoutAddressOrders?.length > 0 ? (
              <p className="text-sm text-black">
                The following orders do not have an associated shipping address and items:{" "}
                {withoutAddressOrders.map((item) => item.channel_order_id).join(", ")}
              </p>
            ) : (
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
                  window.navigator.clipboard.writeText(
                    withoutAddressOrders.map((item) => item.channel_order_id).join(", ")
                  );
                }

                if (withoutItemsOrders.length > 0) {
                  window.navigator.clipboard.writeText(
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
          <OpenOrdersFilters
            refetchOpenOrder={refetchOpenOrder}
            isFetching={isFetching}
            setSelectedChannelDetails={setSelectedChannelDetails}
            selectedChannelDetails={selectedChannelDetails}
            selectedDataCount={selectedTableRows?.length}
            dataCount={orders?.length}
          />
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
            pagination={true}
            paginationRowCountShow={true}
            dataSize={100}
            pageOptions={[100, 200, 500, 1000]}
            selectedRowData={(data) => {
              setSelectedTableRows(data);
            }}
          />
          {orders && hasDuplicate(orders) && (
            <p className="text-base font-semibold text-[#ee1e5f]">Duplicate Found</p>
          )}
        </ContextMenuTrigger>

        {userInformation?.type !== "w_manager" && (
          <ContextMenuContent className="w-60">
            <ContextMenuItem inset onClick={refreshData} className="cursor-pointer pl-3">
              <Loader className="mr-3 size-4" />
              Refresh
            </ContextMenuItem>

            <ContextMenuItem
              inset
              onClick={openDispatchOrderModal}
              className="cursor-pointer pl-3"
              disabled={selectedTableRows?.length ? false : true}
            >
              <Truck className="mr-3 size-4" />
              Dispatch
            </ContextMenuItem>

            <ContextMenuItem
              inset
              onClick={openCancelOrderModal}
              className=" cursor-pointer pl-3"
              disabled={selectedTableRows?.length ? false : true}
            >
              <XCircle className="mr-3 size-4" />
              Mark as Cancelled
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuSub>
              <ContextMenuSubTrigger
                disabled={selectedTableRows?.length ? false : true}
                className={!selectedTableRows?.length ? "text-gray-400" : ""}
              >
                <ScrollText className="ml-1 mr-3 size-4" /> Buy Shipping Label
              </ContextMenuSubTrigger>

              <ContextMenuSubContent className="w-48">
                {carriers?.map((carrier) => (
                  <ContextMenuItem
                    key={carrier?.id}
                    onClick={() => buyShippingLabelHandler(carrier?.id)}
                  >
                    <Image
                      src={`/logos/carriers/round/${carrier?.id}.svg`}
                      width={20}
                      height={20}
                      className="mr-2"
                      alt={carrier?.label}
                    />
                    {carrier?.label}
                  </ContextMenuItem>
                ))}
              </ContextMenuSubContent>
            </ContextMenuSub>

            {/* <ContextMenuItem
                inset
                onClick={buyShippingLabelForAmazon}
                className=" cursor-pointer pl-3"
                disabled={selectedTableRows.length ? false : true}
              >
                <ScrollText className="ml-1 mr-3 size-4" />
                Buy Shipping Label
              </ContextMenuItem> */}
          </ContextMenuContent>
        )}
      </ContextMenu>

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

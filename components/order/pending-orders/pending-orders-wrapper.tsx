"use client";

import { useState } from "react";
import openOrderAtom from "@/atoms/openOrderAtom";
import type { OpenOrder } from "@/schema/open-order";
import { useAtom } from "jotai";
import { XCircle } from "lucide-react";

import useAuth from "@/hooks/custom/useAuth";
import useAddActivityLog from "@/hooks/queries/activity-log/useAddActivityLog";
import { useGetPendingOrders } from "@/hooks/queries/order/use-get-pending-orders";
import useCancelOrders from "@/hooks/queries/order/useCancelOrder";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useToast } from "@/components/ui/use-toast";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import { DataTable } from "../../core/data-table/data-table";
import { columns } from "./pending-order-columns";
import OpenOrdersFilters from "./pending-orders-filters";

export function PendingOrdersWrapper() {
  const [selectedTableRows, setSelectedTableRows] = useState([] as OpenOrder[]);
  const [selectedChannelId, setSelectedChannelId] = useState("");

  const [, setOpenOrder] = useAtom(openOrderAtom);

  const { mutate: cancelOrders, isLoading: cancelLoading } =
    useCancelOrders(selectedChannelId);

  const { data: orders, isLoading } = useGetPendingOrders(selectedChannelId);
  const { mutate: addActivityLog } = useAddActivityLog();

  const { userInformation } = useAuth();

  const { toast } = useToast();

  function activityLogHandler(ids: number[], channelName: string) {
    const ps = ids?.length === 1 ? "order" : "orders";
    const message = `Canceled ${ids?.length} ${channelName}'s ${ps}.`;
    const userFullName = userInformation?.Name;
    const payload = {
      website_name: "mye",
      company_uid: userInformation?.company_uid,
      notification_data: {
        data: userFullName + " " + message,
        type: "cancel" + "_order",
        parent_type: "order",
        user: userFullName,
        avatar_url: userInformation?.avater_url,
      },
    };
    addActivityLog(payload);
  }

  function cancelOrderHandler() {
    const ids = (selectedTableRows as OpenOrder[])?.map((row) => row?.id);

    const channelType = selectedTableRows?.[0].channel.channel_type;
    const channelName = selectedTableRows?.[0].channel.name;

    const payload = {
      channel_uid: selectedChannelId,
      company_uid: userInformation?.company_uid,
      channel_type: channelType,
      order_id: ids,
    };

    if (!ids?.length) {
      return toast({
        title: "Please select an order",
        description: "Please select an order to dispatch or cancel",
        variant: "destructive",
      });
    }

    if (selectedChannelId === "all") {
      return toast({
        title: "Please select a channel",
        description: "Please select a channel before cancel order",
        variant: "destructive",
      });
    }

    cancelOrders(payload, {
      onSuccess: () => {
        activityLogHandler(ids, channelName);
        setOpenOrder((prev) => ({ ...prev, isCancelOrderModalOpen: false }));
      },
    });
  }

  return (
    <div>
      <DataTableToolbar
        title="Pending Orders"
        description="Payment Not Yet Received."
        component={
          <OpenOrdersFilters
            setSelectedChannelId={setSelectedChannelId}
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
            dataSize={15}
            pagination={false}
            selectedRowData={(data) => {
              setSelectedTableRows(data);
            }}
          />
        </ContextMenuTrigger>

        {userInformation?.type !== "w_manager" && (
          <ContextMenuContent className="w-60">
            <ContextMenuItem
              inset
              onClick={cancelOrderHandler}
              className=" cursor-pointer pl-3"
              disabled={!selectedTableRows?.length || cancelLoading}
            >
              <XCircle className="mr-3 size-4" />
              Mark as Cancelled
            </ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>
    </div>
  );
}

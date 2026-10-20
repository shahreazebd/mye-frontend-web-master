"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Channel } from "@/schema/channel";
import dayjs from "dayjs";

import useGetCancelOrders from "@/hooks/queries/order/useGetCancelOrders";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import { DataTable } from "../../core/data-table/data-table";
import { columns } from "./cancel-order-column";
import TableHeader from "./table-header";

export default function CancelOrdersWrapper() {
  const searchParams = useSearchParams();
  const date = searchParams?.get("date") || dayjs().format("YYYY-MM-DD");
  const [channelDetails, setChannelDetails] = useState({} as Channel | null);

  const { data: cancelledOrders, isLoading } = useGetCancelOrders(
    date,
    channelDetails?.channel_uid as string
  );

  const [q, setQ] = useState<any>("");
  return (
    <>
      <DataTableToolbar
        title="Cancelled Orders"
        description="Manage All Cancelled Orders"
        q={q}
        setQ={setQ}
        component={
          <TableHeader
            dataCount={cancelledOrders?.length}
            setChannelDetails={setChannelDetails}
            data={cancelledOrders}
          />
        }
        search={false}
      />

      <DataTable
        columns={columns}
        data={cancelledOrders}
        singleRowSelection={false}
        loading={isLoading}
        search={false}
        pagination={false}
      />
    </>
  );
}

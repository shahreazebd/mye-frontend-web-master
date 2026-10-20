"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Channel } from "@/schema/channel";
import dayjs from "dayjs";

import useGetAllDispatchOrderBatch from "@/hooks/queries/order/use-get-all-dispatched-orders-batch";
import { DataTable } from "@/components/core/data-table/data-table";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import DispatchedOrdersInfoModal from "./dispatched-orders-info-modal";
import { columns } from "./orders-table/dispatched-order-columns";
import TableHeader from "./orders-table/table-header";

export default function DispatchOrders() {
  const searchParams = useSearchParams();
  const [channelDetails, setChannelDetails] = useState({} as Channel | null);

  const date = searchParams.get("date") || dayjs().format("YYYY-MM-DD");

  const { data, isLoading } = useGetAllDispatchOrderBatch(
    date,
    channelDetails?.channel_uid as string
  );

  const [q, setQ] = useState<any>("");

  return (
    <>
      <DataTableToolbar
        title="Dispatched Orders"
        description="Manage All Dispatched Orders"
        q={q}
        setQ={setQ}
        component={<TableHeader setChannelDetails={setChannelDetails} />}
        search={true}
      />

      <DataTable
        className="pt-3"
        query={q}
        header={false}
        columns={columns}
        data={data ?? []}
        dataSize={20}
        loading={isLoading}
      />

      <DispatchedOrdersInfoModal />
    </>
  );
}

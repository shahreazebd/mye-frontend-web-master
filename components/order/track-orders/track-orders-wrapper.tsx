"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { useGetTrackingList } from "@/hooks/queries/tracking/use-get-tracking-list";
import { DataTable } from "@/components/core/data-table/data-table";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import { columns } from "./track-orders-columns";
import TrackOrdersHeader from "./track-orders-header";

export default function TrackOrdersWrapper() {
  const [q, setQ] = useState<any>("");
  const searchParams = useSearchParams();

  const carrierParam =
    searchParams.get("carrier") || searchParams.get("carrierType") || "";
  const carrierType = carrierParam === "ALL" ? "" : carrierParam;
  const startDate =
    searchParams.get("startDate") || dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const endDate = searchParams.get("endDate") || dayjs().format("YYYY-MM-DD");

  const { data: trackingListData, isLoading: trackingListLoading } = useGetTrackingList({
    carrierType,
    startDate,
    endDate,
  });

  return (
    <>
      <DataTableToolbar
        title="Track Orders"
        description="Manage All Track Orders"
        q={q}
        setQ={setQ}
        search={true}
        component={<TrackOrdersHeader />}
      />

      <DataTable
        className="pt-3"
        query={q}
        header={false}
        columns={columns}
        data={trackingListData}
        dataSize={20}
        loading={trackingListLoading}
      />
    </>
  );
}

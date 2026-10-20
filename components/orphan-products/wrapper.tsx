"use client";

import { useState } from "react";
import type { OpenOrder } from "@/schema/open-order";

import useGetOrphanProducts from "@/hooks/queries/product/useGetOrphanProducts";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import { DataTable } from "../core/data-table/data-table";
import { columns } from "./columns";
import { Filters } from "./filters";

export default function OrphanProductsWrapper() {
  // states
  const [selectedTableRows, setSelectedTableRows] = useState([] as OpenOrder[]);
  const [selectedChannelId, setSelectedChannelId] = useState("");

  const { data, isLoading } = useGetOrphanProducts(selectedChannelId);

  return (
    <>
      <DataTableToolbar
        title="Orphan Products"
        description="Manage All Orphan Products"
        component={
          <Filters
            selectedChannelId={selectedChannelId}
            setSelectedChannelId={setSelectedChannelId}
            selectedTableRows={selectedTableRows}
            dataCount={0}
          />
        }
      />

      <DataTable
        header={false}
        columns={columns}
        data={data || []}
        singleRowSelection={false}
        search={false}
        loading={!selectedChannelId ? false : isLoading}
        pagination={false}
        selectedRowData={(e) => {
          setSelectedTableRows(e);
        }}
      />
    </>
  );
}

"use client";

import mappingAtom from "@/atoms/mappingAtom";
import { useAtom } from "jotai";
import { Settings } from "lucide-react";

import useGetLocalProducts from "@/hooks/queries/mapping/useGetLocalProducts";
import { DataTable } from "@/components/core/data-table/data-table";

import { columns } from "./local-product-column";
import LocalProductHeader from "./local-product-header";

export default function LocalProductTable() {
  const { data, isLoading } = useGetLocalProducts();
  const [, setMapping] = useAtom(mappingAtom);

  return (
    <div className="col-span-2">
      <div className="flex items-center justify-between">
        <h5>MYE - Local Products</h5>

        <Settings
          size={24}
          className="cursor-pointer"
          onClick={() =>
            setMapping((prev) => ({ ...prev, isSmartMappingProductModalOpen: true }))
          }
        />
      </div>
      {data?.length ? (
        <div>
          <b>Source:</b> MYE &nbsp;&nbsp;&nbsp;&nbsp;
          <b>Total:</b> {data?.length}
        </div>
      ) : (
        ""
      )}

      <DataTable
        columns={columns}
        data={data ?? []}
        dataSize={50}
        pageOptions={[50, 100, 200, 500]}
        component={<LocalProductHeader />}
        loading={isLoading}
        searchPlaceholder="Search by SKU..."
        selectedRowData={(rows) => {
          rows?.length &&
            setMapping((prev) => ({ ...prev, localProductId: rows[0]?.id }));
        }}
      />
    </div>
  );
}

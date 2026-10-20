import { Dispatch, SetStateAction, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowRight } from "lucide-react";

import { MappingProduct } from "@/types/mapping-product";
import { useGetRequestHistory } from "@/hooks/queries/inventory/useGetRequestHistory";

import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { MappingProductTable } from "./mapping-product-table";
import { MappingProductTableAction } from "./mapping-product-table-action";
import { RequestHistory } from "./request-history";

interface Props {
  mappingProducts: MappingProduct[] | undefined;
  loading: boolean;
}

const emptyArray: [] = [];

function useMappingColumn({
  setRequestHistoryParams,
}: {
  setRequestHistoryParams: Dispatch<
    SetStateAction<{ channelUid: string; remoteProductSku: string }>
  >;
}) {
  const columns: ColumnDef<MappingProduct>[] = [
    {
      id: "expander",
      header: () => null,
      cell: (info) => {
        return info?.row?.getCanExpand() ? (
          <button
            {...{
              onClick: info?.row?.getToggleExpandedHandler(),
              style: { cursor: "pointer" },
            }}
          >
            {info?.row?.getIsExpanded() ? (
              <ArrowDown className="size-5" />
            ) : (
              <ArrowRight
                className="size-5"
                onClick={() => {
                  info?.table?.resetExpanded(false);

                  setRequestHistoryParams({
                    channelUid: info?.row?.original?.channel_uid,
                    remoteProductSku:
                      info?.row?.original?.mapped_remote_product?.remote_product_sku,
                  });
                }}
              />
            )}
          </button>
        ) : (
          "🔵"
        );
      },
    },
    {
      accessorKey: "channel_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Channel Name" />
      ),
      cell: ({ row }) => (
        <div className="mr-5">{row?.original?.channel_details?.name ?? "N/A"}</div>
      ),
    },
    {
      accessorKey: "remote_product_sku",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Remote Product SKU" />
      ),
      cell: ({ row }) => (
        <div className="mr-5">
          {row?.original?.mapped_remote_product?.remote_product_sku ?? "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "country",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
      cell: ({ row }) => (
        <div className="mr-16">{row?.original?.channel_details?.country ?? "N/A"}</div>
      ),
    },
    {
      accessorKey: "channel_type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Channel Type" />
      ),
      cell: ({ row }) => <>{row?.original?.channel_details?.channel_type ?? "N/A"}</>,
    },
    {
      accessorKey: "mapped_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Inventory Sync" />
      ),

      cell: (info) => <MappingProductTableAction row={info.row.original} />,
    },
  ];

  return columns;
}

export function MappingProducts({ mappingProducts }: Readonly<Props>) {
  const [requestHistoryParams, setRequestHistoryParams] = useState({
    channelUid: "",
    remoteProductSku: "",
  });

  const columns = useMappingColumn({ setRequestHistoryParams });

  const {
    data: inventoryRequestHistoryData,
    isLoading: isLoadingInventoryRequestHistory,
  } = useGetRequestHistory(requestHistoryParams);

  return (
    <MappingProductTable
      data={mappingProducts}
      columns={columns}
      getRowCanExpand={() => true}
      renderSubComponent={RequestHistory}
      subComponentData={inventoryRequestHistoryData ?? emptyArray}
      subComponentLoading={isLoadingInventoryRequestHistory}
    />
  );
}

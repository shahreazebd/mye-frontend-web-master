"use client";

import { CancelledOrder } from "@/schema/open-order";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import CancelOrdersGeneralInfo from "./cancel-orders-general-info";
import DataTableRowActions from "./data-table-row-actions";

export const columns: ColumnDef<CancelledOrder>[] = [
  {
    id: "1",
    header: ({ table }) => (
      <Checkbox
        checked={table?.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table?.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row?.getIsSelected()}
        onCheckedChange={(value) => row?.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "#",
    accessorKey: "#",
    header: "#",
    cell: ({ row }) => <>{row?.index + 1}</>,
  },
  {
    accessorKey: "generalInfo",
    header: "General Info",
    cell: (info) => {
      return <CancelOrdersGeneralInfo info={info} />;
    },
  },
  {
    accessorKey: "marketplace",
    header: "Marketplace",
    cell: ({ row }) => {
      return (
        <Avatar className="h-8 w-16 rounded-none">
          <AvatarImage
            className="object-contain"
            src={`/logos/marketplaces/${row?.original?.market_place?.toLowerCase()}.svg`}
            alt={row?.original?.market_place}
          />
          <AvatarFallback>{row?.original?.market_place ?? "N/A"}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
    cell: ({ row }) => (
      <div className="w-[250px] 2xl:w-[350px]">
        <span className="mb-1 block font-medium">
          {row?.original?.shipping_address?.buyer_name}
        </span>
        <span className="text-xs">
          {row.original?.shipping_address?.address1}
          {row.original?.shipping_address?.city} - {row.original?.shipping_address?.state}
          {row.original?.shipping_address?.country ?? ""}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      return (
        <div className="w-max text-xs 2xl:text-sm">
          <span className="block">
            {row?.original?.items?.map((e, i) => {
              return (
                <li key={i} className="text-sm">
                  {e?.remote_sku}
                </li>
              );
            })}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "total",
    header: "Total Price",
    cell: ({ row }) => {
      return (
        <div className="w-[90px] text-xs 2xl:text-sm">
          {row?.original?.total} {row?.original?.currency}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];

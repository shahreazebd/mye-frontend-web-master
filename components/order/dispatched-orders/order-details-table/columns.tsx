import { AvatarFallback } from "@radix-ui/react-avatar";
import { ColumnDef } from "@tanstack/react-table";

import type { DispatchedOrderDetails } from "@/types/dispatched-order";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

import OpenOrdersGeneralInfo from "../../legacy-open-orders/open-orders-general-info";
import { DispatchedOrderActionCell } from "../invoice/dispatched-order-action-cell";

export const columns: ColumnDef<DispatchedOrderDetails>[] = [
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
    accessorFn: (row) => {
      return row?.channel_order_id;
    },
    header: "General Info",
    cell: (info) => {
      return <OpenOrdersGeneralInfo info={info} />;
    },
  },
  {
    accessorKey: "market_place",
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
          {row?.original?.shipping_address?.address1}
          {row?.original?.shipping_address?.city} -{" "}
          {row?.original?.shipping_address?.state}
          {row?.original?.shipping_address?.country ?? ""}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => (
      <div className="w-max text-xs 2xl:text-sm">
        {row?.original?.items?.map((item, idx) => {
          return (
            <span className="block" key={item?.remote_sku + idx?.toString()}>
              {item?.remote_sku}
            </span>
          );
        })}
      </div>
    ),
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="w-[40px] text-center text-xs 2xl:text-sm">
        {row?.original?.items?.map((item, idx) => (
          <span className="block" key={item?.order_id + idx}>
            {item?.quantity}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Unit Total",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => <DispatchedOrderActionCell order={row.original} />,
  },
];

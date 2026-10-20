import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { OrderDetail } from "@/types/customer-details";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<OrderDetail>[] = [
  {
    accessorKey: "#",
    header: () => <div>#</div>,
    cell: ({ row }) => (
      <p className="text-center text-xs text-slate-400">{row?.index + 1}</p>
    ),
  },

  {
    accessorKey: "channel_order_id",
    header: () => <div>Channel Order ID</div>,
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-bold leading-tight">
          {row?.original?.channel_order_id}
        </p>
        <p className="pt-1 text-xs font-normal leading-tight text-gray-400">
          {dayjs(row?.original?.purchase_date).format("DD-MM-YYYY, hh:mm a")}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "market_place",
    header: "Marketplace",
    cell: ({ row }) => {
      return (
        <Avatar className="h-5 w-16 rounded-none">
          <AvatarImage
            className="object-contain"
            src={`/logos/marketplaces/${row?.original?.market_place?.toLocaleLowerCase()}.svg`}
            alt={row?.original?.market_place}
          />
          <AvatarFallback>{row?.original?.market_place ?? "N/A"}</AvatarFallback>
        </Avatar>
      );
    },
  },

  {
    accessorKey: "address1",
    header: () => <div>Shipping Address</div>,
    cell: ({ row }) => (
      <p className="text-sm font-normal capitalize leading-tight">
        {row?.original?.address1?.toLowerCase()} {row?.original?.address2?.toLowerCase()}{" "}
        - {row?.original?.state?.toLowerCase()} {row?.original?.country ?? ""}
      </p>
    ),
  },

  {
    accessorKey: "dispatch_status",
    header: () => <div>Dispatched</div>,
    cell: ({ row }) => (
      <div>
        {row?.original?.dispatch_status === "OPEN_ORDER" ? (
          <p className="text-xs font-semibold leading-tight text-pink-600">
            In Open (Not dispatched yet)
          </p>
        ) : (
          <p className="text-sm font-normal leading-tight">
            {dayjs(row?.original?.updatedAt).format("dddd")}
          </p>
        )}

        <p className="pt-1 text-xs font-normal leading-tight text-gray-400">
          {dayjs(row?.original?.updatedAt).format("DD-MM-YYYY, hh:mm a")}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "order_items",
    header: () => <div>Items</div>,
    cell: ({ row }) => (
      <div>
        {row?.original?.order_items?.map((e, i) => {
          return (
            <p
              key={i}
              className="border-b border-dotted text-sm font-normal capitalize leading-tight last:border-b-0"
            >
              {e?.local_sku}
            </p>
          );
        })}
      </div>
    ),
  },

  {
    accessorKey: "price",
    header: () => <div>Item Price</div>,
    cell: ({ row }) => (
      <div>
        {row?.original?.order_items?.map((e, i) => {
          return (
            <p
              key={i}
              className="border-b border-dotted text-sm font-normal capitalize leading-tight last:border-b-0"
            >
              {e?.price}
            </p>
          );
        })}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <div>Quantity</div>,
    cell: ({ row }) => (
      <div>
        {row?.original?.order_items?.map((e, i) => {
          return (
            <p
              key={i}
              className="border-b border-dotted text-sm font-normal capitalize leading-tight last:border-b-0"
            >
              {e?.quantity}
            </p>
          );
        })}
      </div>
    ),
  },
  {
    accessorKey: "total_amount",
    header: () => <div>Item Total Price</div>,
    cell: ({ row }) => (
      <div>
        {row?.original?.order_items?.map((e, i) => {
          return (
            <p
              key={i}
              className="border-b border-dotted text-sm font-normal capitalize leading-tight last:border-b-0"
            >
              {e?.total_amount}
            </p>
          );
        })}
      </div>
    ),
  },

  {
    accessorKey: "currency",
    header: () => <div>Total Spent</div>,
    cell: ({ row }) => (
      <p className="text-sm font-normal leading-tight">
        {row?.original?.total} {row?.original?.currency}
      </p>
    ),
  },
];

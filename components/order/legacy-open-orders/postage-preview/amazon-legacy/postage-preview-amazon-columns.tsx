"use client";

import { MappedOpenOrder } from "@/schema/open-order";
import { getInitials } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { Check } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { DataTableColumnHeader } from "../../../../core/data-table/data-table-column-header";
import { PostagePrice } from "../postage-price";
import { AmazonCustomerDeliveryInfoCell } from "./amazon-customer-delivery-info-cell";
import { AmazonTableActionCell } from "./amazon-table-actions-cell";
import { CarrierSelectCell } from "./carrier-select-cell";
import { DimensionsCell } from "./dimensions-cell";
import { TotalWeightCell } from "./total-weight-cell";

export const amazonPostagePreviewColumns: ColumnDef<MappedOpenOrder>[] = [
  {
    id: "#",
    accessorKey: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <span>{row?.index + 1}</span>,
    enableSorting: false,
  },
  {
    id: "shipping_address.buyer_name",
    accessorKey: "shipping_address.buyer_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Details" />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const order = row?.original;

      return (
        <section>
          <div className="ml-12 mt-2 text-sm font-bold">
            <span className="mr-2">{order?.channel_order_id}</span>

            {order?.order_meta?.is_prime && (
              <span className="text-blue-400">
                <Check className="inline size-4 text-yellow-500" />
                Prime
              </span>
            )}
          </div>

          {order?.items?.map((item, i) => (
            <div
              key={item?.remote_sku + i}
              className="m-1 mb-4 flex items-center space-x-2"
            >
              <Avatar className="size-10">
                <AvatarImage
                  src={item?.image || "/images/no-image-available.svg"}
                  alt={item?.remote_sku}
                />
                <AvatarFallback>{getInitials(item?.remote_sku)}</AvatarFallback>
              </Avatar>

              <div className="text-gray-600">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="line-clamp-1 w-[400px] text-xs">
                        {item?.remote_product_title}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent className="w-[400px]">
                      <p className="text-sm">{item?.remote_product_title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <p className="mt-1 text-sm">
                  <span className="font-semibold">sku:</span> {item?.remote_sku} |{" "}
                  <span className="font-semibold">qty:</span> {item?.quantity} |{" "}
                  <span className="font-semibold">amount:</span> {item?.price}
                </p>
              </div>
            </div>
          ))}
        </section>
      );
    },
  },
  {
    id: "dimensions",
    accessorKey: "dimensions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight and Packaging" />
    ),
    cell: (cell) => {
      return (
        <>
          <TotalWeightCell cell={cell} />
          <DimensionsCell cell={cell} />
        </>
      );
    },

    enableSorting: false,
    // <DataTableColumnHeader column={column} title="Dimensions (cm)" />
  },

  {
    id: "ss",
    accessorKey: "ss",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Delivery Option" />
    ),
    cell: AmazonCustomerDeliveryInfoCell,
    enableSorting: false,
  },

  {
    id: "carriers",
    accessorKey: "carriers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Selected Delivery Service" />
    ),
    cell: CarrierSelectCell,
    enableSorting: false,
  },

  {
    id: "total_amount",
    accessorKey: "total_amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => {
      return <PostagePrice orderId={row?.original?.channel_order_id} />;
    },
    enableSorting: false,
  },

  {
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: AmazonTableActionCell,
    enableSorting: false,
  },
];

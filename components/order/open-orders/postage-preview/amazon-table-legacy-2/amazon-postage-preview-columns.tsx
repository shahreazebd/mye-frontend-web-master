"use client";

import { MappedOpenOrder } from "@/schema/open-order";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/core/data-table/data-table-column-header";

import { AmazonCustomerDeliveryInfoCell } from "./amazon-customer-delivery-info-cell";
import { AmazonDimensionsCell } from "./amazon-dimensions-cell";
import { AmazonQuantityCell } from "./amazon-quantity-cell";
import { AmazonRateSelectCell } from "./amazon-rate-select-cell";
import { AmazonTableActionCell } from "./amazon-table-actions-cell";
import { AmazonTotalPriceCell } from "./amazon-total-price-cell";
import { AmazonTotalWeightCell } from "./amazon-total-weight-cell";
import { OrderDetailsCell } from "./order-details-cell";

export const amazonPostagePreviewColumns: ColumnDef<MappedOpenOrder>[] = [
  {
    id: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <>{row.index + 1}</>,
    enableSorting: false,
  },
  {
    id: "orderDetails",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Details" />
    ),
    cell: ({ row }) => <OrderDetailsCell order={row.original} />,
  },
  {
    id: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    cell: ({ row }) => (
      <>
        {row.original?.items?.map((item, i) => (
          <AmazonQuantityCell
            key={i}
            itemIndex={i}
            orderIndex={row.index}
            quantity={item.quantity}
            dimensions={row.original?.dimensions}
            dimensionsInches={row.original?.dimensionsInches}
          />
        ))}
      </>
    ),
  },
  {
    id: "weightAndPackaging",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight & Packaging" />
    ),
    cell: ({ row }) => (
      <div className="space-y-2">
        <AmazonTotalWeightCell data={row.original} />
        <AmazonDimensionsCell
          dimensions={row.original?.dimensions}
          inches={row.original?.dimensionsInches}
          id={row.original?.id}
        />
      </div>
    ),
  },
  {
    id: "customerDelivery",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Delivery Option" />
    ),
    cell: ({ row }) => (
      <AmazonCustomerDeliveryInfoCell
        orderId={row.original?.channel_order_id}
        city={row.original?.shipping_address?.city}
        buyer_name={row.original?.shipping_address?.buyer_name}
      />
    ),
  },
  {
    id: "selectedDeliveryService",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Selected Delivery Service" />
    ),
    cell: ({ row }) => <AmazonRateSelectCell orderId={row.original?.channel_order_id} />,
  },
  {
    id: "total",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => <AmazonTotalPriceCell orderId={row.original?.channel_order_id} />,
  },
  {
    id: "action",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
    cell: ({ row }) => (
      <AmazonTableActionCell index={row.index} orderId={row.original?.channel_order_id} />
    ),
  },
];

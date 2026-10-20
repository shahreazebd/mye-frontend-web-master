import type { OrderItem } from "@/schema/open-order";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../../core/data-table/data-table";

type Props = {
  orderItems: OrderItem[];
  currency: string;
};

export default function OrderItemsTable(props: Props) {
  const columns: ColumnDef<OrderItem>[] = [
    {
      id: "#",
      accessorKey: "#",
      header: "#",
      cell: ({ row }) => <>{row?.index + 1}</>,
    },
    {
      id: "remote_sku",
      accessorKey: "remote_sku",
      header: "Remote SKU",
    },
    {
      id: "height",
      accessorKey: "height",
      header: "Height(cm)",
    },
    {
      id: "width",
      accessorKey: "width",
      header: "Width(cm)",
    },
    {
      id: "depth",
      accessorKey: "depth",
      header: "Depth(cm)",
    },
    {
      id: "weight",
      accessorKey: "weight",
      header: "Weight(g)",
    },
    {
      id: "price",
      accessorKey: "price",
      header: `Price(${props?.currency})`,
    },
    {
      id: "quantity",
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      id: "total_amount",
      accessorKey: "total_amount",
      header: `Total Amount(${props?.currency})`,
    },
  ];

  return (
    <section>
      <DataTable
        data={props?.orderItems ?? []}
        columns={columns}
        className="h-[calc(100vh-600px)] overflow-hidden"
      />
    </section>
  );
}

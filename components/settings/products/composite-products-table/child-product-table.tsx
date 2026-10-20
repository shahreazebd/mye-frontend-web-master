"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

import { ChildProduct } from "@/types/product";
import useGetCompositeChildProducts from "@/hooks/queries/product/use-get-composite-child-products";
import { DataTable } from "@/components/core/data-table/data-table";

import { DataTableColumnHeader } from "../../../core/data-table/data-table-column-header";
import { deleteCompositeProduct } from "../product-details-modal";

export let allProductSelected = () => [] as number[];

const columns: ColumnDef<ChildProduct>[] = [
  {
    id: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="ml-3">{row.index + 1}</div>,
  },
  {
    accessorKey: "child_product_sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => <div>{row.getValue("child_product_sku")}</div>,
  },

  {
    accessorKey: "child_product_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div>{row.getValue("child_product_name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div
          onClick={() =>
            deleteCompositeProduct(
              row.original.parent_product_id,
              row.original.child_product_id
            )
          }
        >
          <Trash className="text-muted-foreground/70 mr-2 size-3.5 cursor-pointer" />
        </div>
      );
    },
  },
];

type Props = {
  parentProductId: number;
};

export default function ChildProductTable(props: Props) {
  const { data, isLoading } = useGetCompositeChildProducts(props.parentProductId);

  return (
    <DataTable
      singleRowSelection={false}
      columns={columns}
      data={data ?? []}
      dataSize={10}
      loading={isLoading}
      paginationRowCountShow={false}
    />
  );
}

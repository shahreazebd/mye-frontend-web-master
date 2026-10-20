import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { PostageOrder } from "@/types/postage";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "../../core/data-table/data-table-column-header";
import TrackingInfoColumn from "../Tracking-Info-Column";
import { PostageDetailsOrderIdCell } from "./postage-details-order-id-cell";
import { PostageDetailsStatusCell } from "./postage-details-status-cell";
import { PostageDetailsTableLabelLinkCell } from "./postage-details-table-labellink-cell";

export const postageDetailsColumns = (postageServiceName: string) => {
  const ordersColumn: ColumnDef<PostageOrder>[] = [
    {
      id: "1",
      header: ({ table }) => (
        <Checkbox
          checked={table?.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table?.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="size-3 translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row?.getIsSelected()}
          onCheckedChange={(value) => row?.toggleSelected(!!value)}
          aria-label="Select row"
          className="size-3 translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "#",
      accessorKey: "#",
      header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "orderId",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Order ID" />,
      cell: PostageDetailsOrderIdCell,
    },
    {
      accessorKey: "trackingNumber",
      header: ({ column }) =>
        postageServiceName === "EVRI" && (
          <DataTableColumnHeader column={column} title="Tracking Number" />
        ),
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>{row.getValue("trackingNumber")}</div>
      ),
    },
    {
      accessorKey: "trackingInfo",
      header: ({ column }) =>
        postageServiceName === "EVRI" && (
          <DataTableColumnHeader column={column} title="Tracking Info" />
        ),
      cell: TrackingInfoColumn,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: PostageDetailsStatusCell,
      filterFn: (row, columnId, filterValue) => {
        return filterValue === "" || row.getValue(columnId) === filterValue;
      },
      enableSorting: false,
    },
    {
      accessorKey: "createdOn",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
      cell: ({ row }) => (
        <div>{dayjs(row?.original?.createdOn).format("MM/DD/YYYY")}</div>
      ),
    },
    {
      accessorKey: "labelLink",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
      cell: PostageDetailsTableLabelLinkCell,
    },
  ];

  return ordersColumn;
};

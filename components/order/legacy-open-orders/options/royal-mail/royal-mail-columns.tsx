"use client";

import type { RoyalMailService } from "@/schema/royalmail-service";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<RoyalMailService>[] = [
  {
    id: "1",
    cell: ({ row, table }) => (
      <Checkbox
        checked={row?.getIsSelected()}
        onCheckedChange={(value) => {
          table?.resetRowSelection();

          row?.toggleSelected(!!value);
        }}
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
    id: "serviceName",
    accessorKey: "serviceName",
    header: "Service Name",
  },
  {
    id: "serviceCode",
    accessorKey: "serviceCode",
    header: "Service Code",
  },
  {
    id: "deliverySpeedMye",
    accessorKey: "deliverySpeedMye",
    header: "Delivery Speed",
  },

  {
    id: "maxCompensationLevel",
    accessorKey: "maxCompensationLevel",
    header: "Compensation",
  },
];

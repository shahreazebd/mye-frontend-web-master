import { Channel } from "@/schema/channel";
import { ColumnDef } from "@tanstack/react-table";
import { FolderDown, PackageOpen } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { DataTableColumnHeader } from "../../../core/data-table/data-table-column-header";
import { handleDownloadButton, handleDropboxFileUpload } from "./open-orders-wrapper";

export const columns: ColumnDef<Channel>[] = [
  {
    id: "#",
    accessorKey: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="w-[220px]">{row.getValue("name")}</div>,
  },

  {
    accessorKey: "channel_type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Marketplace" />,
    cell: (info) => {
      return (
        <div className="w-[220px]">
          <Avatar className="h-10 w-16 rounded-none">
            <AvatarImage
              className="object-contain"
              src={`/logos/marketplaces/${info.row.original?.channel_type}.svg`}
              alt={info.row.original?.channel_type}
            />
            <AvatarFallback>{info.row.original?.channel_type ?? "N/A"}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "channel_max_stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Channel Max Stock" />
    ),
    cell: ({ row }) => (
      <div className="w-[160px] text-center">{row.getValue("channel_max_stock")}</div>
    ),
  },
  {
    id: "Action",
    accessorKey: "Action",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
    cell: ({ row }) => {
      const handelDropboxUpload = () => {
        handleDropboxFileUpload(
          row.original.name as string,
          row.original.company_uid as string,
          row.original.channel_uid as string
        );
      };

      return (
        <div className="flex gap-5">
          <Button variant="outline" onClick={handelDropboxUpload}>
            <div className="flex gap-3">
              <PackageOpen />
              <span>Send CSV to dropbox</span>
            </div>
          </Button>

          <Button variant="outline" onClick={() => handleDownloadButton(row?.original)}>
            <div className="flex gap-3">
              <FolderDown />
              <span>Download</span>
            </div>
          </Button>
        </div>
      );
    },
  },
];

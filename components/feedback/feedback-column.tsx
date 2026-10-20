"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { EbayFeedback } from "@/hooks/queries/ebay-feedback/useGetEbayFeedbacks";

import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { Button } from "../ui/button";

export const columns: ColumnDef<EbayFeedback>[] = [
  {
    id: "1",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },

  {
    accessorKey: "feedback_details",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Channel Name" />
    ),
    cell: ({ row }) => {
      const feedback_details = row.original?.feedback_details;
      return (
        <>
          <section className="h-full w-[250px] gap-3 border-r">
            <h6 className="text-sm">User: {feedback_details?.CommentingUser}</h6>
            <small className="text-xs text-slate-500">
              Item Price: {feedback_details.ItemPrice?.value}{" "}
              {feedback_details.ItemPrice?._currencyID}
            </small>
          </section>
        </>
      );
    },
  },

  {
    accessorKey: "channel_uid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Channel Name" />
    ),
    cell: ({ row }) => {
      const feedback_details = row.original?.feedback_details;
      return (
        <>
          <section className="h-full w-[650px] gap-3 border-r">
            <h6 className="text-sm">Item Id: {feedback_details?.ItemID}</h6>
            <small className="text-xs text-slate-500">
              Item Title: {feedback_details?.ItemTitle}
            </small>
          </section>
        </>
      );
    },
  },
  {
    accessorKey: "_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Service" />,
    cell: ({ row }) => {
      const feedback_details = row.original?.feedback_details;

      const status =
        feedback_details.CommentType === "Positive"
          ? "/svg/plus.svg"
          : feedback_details.CommentType === "Negative"
          ? "/svg/minus.svg"
          : "/svg/neutral.svg";

      return (
        <section className="h-full w-[600px] gap-3 border-r">
          <div className="flex w-11/12">
            <h6 className="mr-2 text-sm ">{feedback_details?.ItemTitle}</h6>
            <Image src={status} alt="status" width={20} height={20} />
          </div>
          <p className="w-11/12 text-xs text-slate-500">
            {feedback_details?.CommentText}
          </p>
        </section>
      );
    },
  },

  {
    accessorKey: "actions",
    id: "actions",
    cell: () => {
      return (
        <div className="">
          <Button>Answer</Button>
        </div>
      );
    },
  },
];

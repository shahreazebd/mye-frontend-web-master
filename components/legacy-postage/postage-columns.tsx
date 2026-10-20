"use client";

import Image from "next/image";
import { truncateName } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { Postage } from "@/types/postage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import PostageAction from "./postage-action";

export const columns: ColumnDef<Postage>[] = [
  {
    accessorKey: "channel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Channel Name" />
    ),
    cell: ({ row }) => {
      const vendorImageSrc = `/logos/marketplaces/round/${row?.original?.channel?.channel_type}.svg`;

      return row?.original?.createdAt ? (
        <div className="w-full">
          <section className="flex h-full min-w-[280px] items-center gap-3 border-r">
            <Avatar className="size-12">
              <AvatarImage src={vendorImageSrc} />
              <AvatarFallback>{row?.original?.channel?.name}</AvatarFallback>
            </Avatar>

            <div className="text-left">
              <h6 className="text-sm">
                {truncateName(row?.original?.channel?.name, 30)}
              </h6>
              <small className="text-xs text-slate-500">
                {dayjs(row?.original.createdAt).format("DD MMMM YYYY, h:mm A")}
              </small>
            </div>
          </section>
        </div>
      ) : (
        ""
      );
    },
  },
  {
    accessorKey: "service",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Service" />,
    cell: ({ row }) => {
      const carriersLogoSrc =
        row?.original?.service?.name === "AMAZON"
          ? "/logos/marketplaces/amazon.svg"
          : `/logos/carriers/${row?.original?.service?.type.toLocaleLowerCase()}.svg`;

      return row?.original?.createdAt ? (
        <div className="w-full">
          <section className="min-w-[350px]">
            <div className="flex h-full items-center gap-4 border-r">
              <Image
                src={carriersLogoSrc}
                width={80}
                height={70}
                alt={row?.original?.service?.name}
              />

              <div className="text-left">
                <h6 className="text-sm">
                  {truncateName(row?.original?.service?.name, 30)}
                </h6>
                <small className="text-xs text-slate-500">
                  {row?.original?.service?.email}
                </small>
              </div>
            </div>
          </section>
        </div>
      ) : (
        ""
      );
    },
  },
  {
    accessorKey: "orders",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Orders" />,
    cell: ({ row }) => {
      const successOrders = row?.original?.orders?.filter((o) => o.status === "SUCCESS");
      const failedOrders = row?.original?.orders?.filter((o) => o.status === "FAILED");

      return row?.original?.createdAt ? (
        <div className="w-full">
          <div className="hidden 2xl:block">
            <div className="grid h-full w-[400px] grid-cols-3 gap-2 border-r">
              <div className="text-center">
                <h6>{row?.original?.orders?.length}</h6>
                <small className="text-slate-500">Orders</small>
              </div>

              <div className="text-center">
                <h6>{successOrders?.length}</h6>
                <div className="flex justify-center">
                  <Image
                    src="/images/icons/check.svg"
                    width={20}
                    height={20}
                    alt="success"
                  />
                  <small className="ml-2 block text-slate-500">Success</small>
                </div>
              </div>

              <div className="text-center">
                <h6>{failedOrders?.length}</h6>

                <div className="flex justify-center">
                  <Image
                    src="/images/icons/cross.svg"
                    width={20}
                    height={20}
                    alt="failed"
                  />
                  <small className="ml-2 block text-slate-500">Failed</small>
                </div>
              </div>
            </div>
          </div>

          <div className="block w-[120px] border-r 2xl:hidden">
            <ul>
              <li className="flex items-center gap-1">
                <small className="w-[60px] text-left text-primary">Success</small>
                <h6>{successOrders?.length}</h6>
              </li>
              <li className="flex items-center gap-1">
                <small className="w-[60px] text-left text-[#ee1e5f]">Failed</small>
                <h6>{failedOrders?.length}</h6>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      );
    },
  },
  {
    accessorKey: "actions",
    id: "actions",
    cell: ({ row }) => <PostageAction order={row?.original} />,
  },
];

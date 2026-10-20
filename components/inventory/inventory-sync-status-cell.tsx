import { useState } from "react";
import Link from "next/link";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { MoveRight } from "lucide-react";
import { useInView } from "react-intersection-observer";

import type { Inventory } from "@/types/inventory";
import type { SyncDetails } from "@/types/inventory-sync-details";
import { cn } from "@/lib/utils";
import { useGetInventorySyncDetails } from "@/hooks/queries/inventory/use-inventory-sync-details";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/core/data-table/data-table";

import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { buttonVariants } from "../ui/button";

export default function InventorySyncStatus(props: CellContext<Inventory, unknown>) {
  const { ref } = useInView();

  const [activeTab, setActiveTab] = useState("");

  const { data: syncDetails, isLoading } = useGetInventorySyncDetails({
    localSku: props?.row?.original?.local_product?.sku,
    inView: false,
    isMapped: props?.row?.original?.is_mapped,
  });

  const columns: ColumnDef<SyncDetails>[] = [
    {
      accessorKey: "sku",
      header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => <p className="text-xs font-semibold">{row?.original?.status}</p>,
    },

    {
      accessorKey: "item_id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
      enableSorting: false,
      cell: ({ row }) => (
        <>
          {activeTab === "ebay" && (
            <Link
              href={`https://www.ebay.com/itm/${row?.original?.item_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "link", size: "sm" }), "px-0")}
            >
              View on eBay
            </Link>
          )}
        </>
      ),
    },
  ];

  return (
    <div ref={ref} className="flex gap-2">
      {!props?.row?.original?.is_mapped ? (
        <div className="flex items-center gap-2">
          <span className={cn("mr-1 size-2.5 rounded-full bg-slate-500")} />
          <p className="text-xs font-semibold capitalize">Mapping unavailable</p>
        </div>
      ) : (
        <>
          {isLoading ? (
            <Skeleton className="h-[20px] w-[150px] rounded-full" />
          ) : (
            <div className={"flex items-center gap-x-2 text-xs font-semibold capitalize"}>
              <span
                className={cn("mr-1 size-2.5 rounded-full", {
                  "bg-green-500": syncDetails?.sync_status === "synced",
                  "bg-red-500": syncDetails?.sync_status === "not synced",
                  "bg-yellow-500": syncDetails?.sync_status === "partially synced",
                  "bg-slate-500": syncDetails?.sync_status === "information unavailable",
                })}
              />
              {syncDetails?.sync_status}
            </div>
          )}

          {syncDetails?.sync_status && (
            <Popover>
              <PopoverTrigger asChild>
                {!isLoading && (
                  <MoveRight className="h-4 w-3 cursor-pointer text-gray-400" />
                )}
              </PopoverTrigger>
              <PopoverContent
                className="min-w-[500px]"
                onClick={(event) => event.stopPropagation()}
              >
                {syncDetails?.data?.length !== 0 &&
                syncDetails?.sync_status !== "information unavailable" ? (
                  <Tabs defaultValue={""} onValueChange={(val) => setActiveTab(val)}>
                    <section className="flex items-center justify-between">
                      <TabsList>
                        {syncDetails?.data?.map((e, i) => (
                          <TabsTrigger key={i} value={e?.marketplace}>
                            <span className="capitalize">{e?.marketplace}</span>
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {syncDetails?.data
                        ?.filter((e) => e?.marketplace === activeTab)
                        ?.map((e, i) => (
                          <Badge
                            variant="outline"
                            key={i}
                            className={cn("capitalize", {
                              "text-green-700": e?.sync_status === "synced",
                              "text-red-700": e?.sync_status === "not synced",
                            })}
                          >
                            {e?.sync_status}
                          </Badge>
                        ))}
                    </section>

                    {syncDetails?.data?.map((e, i) => (
                      <TabsContent key={i} value={e?.marketplace}>
                        <DataTable
                          header={false}
                          data={e?.data}
                          columns={columns}
                          search={false}
                          isViewShow={false}
                          pagination={false}
                          key="_id"
                          className="max-h-[250px] overflow-y-scroll"
                        />
                      </TabsContent>
                    ))}
                  </Tabs>
                ) : (
                  <section className="flex h-[50px] items-center justify-center ">
                    <p className=" text-sm font-semibold">Information Unavailable</p>
                  </section>
                )}
              </PopoverContent>
            </Popover>
          )}
        </>
      )}
    </div>
  );
}

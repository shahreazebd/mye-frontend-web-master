"use client";

import Image from "next/image";
import { OpenOrder } from "@/schema/open-order";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import DataTableRowActions from "./data-table-row-actions";
import OpenOrdersGeneralInfo from "./open-orders-general-info";

export const columns: ColumnDef<OpenOrder>[] = [
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
    header: "#",
    cell: ({ row }) => <div className="text-xs">{row?.index + 1}</div>,
  },
  {
    accessorKey: "generalInfo",
    header: "General Info",
    cell: (info) => {
      return <OpenOrdersGeneralInfo info={info} />;
    },
  },
  {
    accessorKey: "marketplace",
    header: "Marketplace",
    cell: ({ row }) => {
      return (
        <Avatar className="h-5 w-16 rounded-none">
          <AvatarImage
            className="object-contain"
            src={`/logos/marketplaces/${row?.original?.channel?.channel_type}.svg`}
            alt={row?.original?.channel?.channel_type}
          />
          <AvatarFallback>{row?.original?.channel?.channel_type ?? "N/A"}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
    cell: ({ row }) => {
      const {
        buyer_name,
        phone,
        email,
        address1,
        address2,
        post_code,
        city,
        state,
        country,
      } = row?.original?.shipping_address ?? {};
      const shippingAddress = [
        { key: "Buyer Name", value: buyer_name?.trim() },
        { key: "Phone", value: phone },
        { key: "Email", value: email },
        { key: "Address 1", value: address1 },
        { key: "Address 2", value: address2 },
        { key: "Post Code", value: post_code },
        { key: "City", value: city },
        { key: "State", value: state },
        { key: "Country Code", value: country },
      ].filter((e: any) => Boolean(e.value));

      return (
        <div className="w-[220px] 2xl:w-[280px]">
          <HoverCard openDelay={50} closeDelay={0}>
            <HoverCardTrigger>
              <span className="block text-xs font-medium">{buyer_name}</span>
              <span className="text-[11px] capitalize text-slate-600">
                {address1?.toLowerCase()}
                {city?.toLowerCase()} - {state?.toLowerCase()} {country ?? ""}
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="ml-6">
              <div className="rounded-sm border px-5 py-3">
                <p className="pb-1 text-sm text-slate-700">Shipping Address</p>
                {shippingAddress?.map((address) => {
                  return (
                    <p key={address?.key} className="pt-1 text-xs">
                      <span className="text-slate-500">{address?.key} - </span>
                      {address?.value}
                    </p>
                  );
                })}
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      );
    },
  },

  {
    accessorKey: "shipping_address.order_count",
    header: "Customer Stats",
    cell: ({ row }) => {
      return row?.original?.shipping_address?.order_count ? (
        <div className="text-xs">
          Purchased{" "}
          <b className="text-black">{row?.original?.shipping_address?.quantity}</b>{" "}
          {row?.original?.shipping_address?.quantity > 1 ? "items" : "item"} over
          <b className="mx-0.5 text-black">
            {row?.original?.shipping_address?.order_count}
          </b>
          {row?.original?.shipping_address?.order_count > 1 ? "orders" : "order"}
          <div className="text-slate-500">
            and spent a total of{" "}
            <span className="text-black">
              {row?.original?.shipping_address?.total_spend}{" "}
              {row?.original?.shipping_address?.currency}
            </span>
          </div>
        </div>
      ) : (
        ""
      );
    },
  },
  // {
  //   accessorKey: "items",
  //   header: "",
  //   cell: (info) => (
  //     <div className="flex shrink-0">
  //       {info.row.original.items.map((item, idx) => {
  //         if (item.mapped)
  //           return (
  //             <span key={item.mapped + idx.toString()}>
  //               <Avatar className="hidden h-10 w-8 rounded-none sm:flex">
  //                 <AvatarImage
  //                   className="shrink-0 rounded-sm border"
  //                   src={`/images/random/${info.row.id.slice(-1, 2)}.jpg`}
  //                 />
  //               </Avatar>
  //             </span>
  //           );
  //         else
  //           return (
  //             <span className="block" key={item.mapped + idx.toString()}>
  //               remote
  //             </span>
  //           );
  //       })}
  //     </div>
  //   ),
  // },

  // {
  //   accessorKey: "items",
  //   header: "Items",
  //   cell: (info) => (
  //     <div className="flex items-center gap-4">
  //       <div className="flex w-max flex-col gap-y-1.5 text-xs">
  //         {info.row.original.items.map((item, idx) => {
  //           if (item.mapped)
  //             return (
  //               <HoverCard
  //                 key={item.mapped + idx.toString()}
  //                 openDelay={50}
  //                 closeDelay={0}
  //               >
  //                 <HoverCardTrigger className="cursor-pointer text-slate-700 hover:text-black hover:underline">
  //                   {item.local_SKU}
  //                 </HoverCardTrigger>
  //                 <HoverCardContent className="ml-6">
  //                   {item.image ? (
  //                     <Image
  //                       src={item?.image}
  //                       className="h-80 w-min shrink-0 rounded-sm border"
  //                       alt="no-image"
  //                       width={250}
  //                       height={320}
  //                     />
  //                   ) : (
  //                     <Image
  //                       src="/images/no-image-available.svg"
  //                       className="h-28 w-min shrink-0 rounded-sm border"
  //                       alt="no-image"
  //                       width={128}
  //                       height={128}
  //                     />
  //                   )}
  //                 </HoverCardContent>
  //               </HoverCard>
  //             );
  //           else
  //             return (
  //               <div key={item.mapped + idx.toString()}>
  //                 {item.remote_sku} - <b>Unmapped</b>
  //               </div>
  //             );
  //         })}
  //       </div>
  //       <div>
  //         {info.row.original.items?.length >= 2 ? (
  //           <div className="flex items-center">
  //             {info.row.original.items.slice(0, 4).map((item) => {
  //               return (
  //                 item.image && (
  //                   <Image
  //                     key={item.local_product_name}
  //                     alt={item.local_SKU}
  //                     src={item.image || ""}
  //                     height="60"
  //                     width="60"
  //                     className="size-8 -ml-2 h-8 w-8 shrink-0 rounded-full border-2 border-white first:-ml-0"
  //                   />
  //                 )
  //               );
  //             })}
  //             {info.row.original.items.length > 4 && (
  //               <div className="rounded-ful size-8 -ml-2 flex shrink-0 items-center justify-center rounded-full bg-purple-300">
  //                 <p className="text-xs text-white">
  //                   +{info.row.original.items?.length - 4}
  //                 </p>
  //               </div>
  //             )}
  //           </div>
  //         ) : (
  //           <div className="flex items-center">
  //             {info.row.original.items.map((item) => {
  //               return (
  //                 item.image && (
  //                   <Image
  //                     key={item.local_product_name}
  //                     alt={item.local_SKU}
  //                     src={item.image || ""}
  //                     height="60"
  //                     width="60"
  //                     className="size-8 -ml-2 h-8 w-8 shrink-0 rounded-full border-2 border-white first:-ml-0"
  //                   />
  //                 )
  //               );
  //             })}
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   ),
  // },

  {
    accessorKey: "items",
    header: "Items",
    cell: (info) => (
      <div className="flex items-center">
        <div className="flex w-max flex-col text-xs">
          {info?.row?.original?.items?.map((item, idx) => {
            if (item?.mapped)
              return (
                <HoverCard
                  key={item?.mapped + idx?.toString()}
                  openDelay={50}
                  closeDelay={0}
                >
                  <HoverCardTrigger className="cursor-pointer text-slate-700 hover:text-black hover:underline">
                    <div className="flex items-center gap-2">
                      {item?.image ? (
                        <div className="size-5 overflow-hidden rounded-full border border-slate-300">
                          <Image
                            key={item?.local_product_name}
                            alt={item?.local_SKU}
                            src={item?.image}
                            height="60"
                            width="40"
                            className="shrink-0"
                          />
                        </div>
                      ) : (
                        <div className="size-5"></div>
                      )}
                      <div className="mt-0.5 h-5">{item?.local_SKU}</div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="ml-6">
                    {item?.image ? (
                      <Image
                        src={item?.image}
                        className="h-80 w-min shrink-0 rounded-sm border"
                        alt="no-image"
                        width={250}
                        height={320}
                      />
                    ) : (
                      <Image
                        src="/images/no-image-available.svg"
                        className="h-28 w-min shrink-0 rounded-sm border"
                        alt="no-image"
                        width={128}
                        height={128}
                      />
                    )}
                  </HoverCardContent>
                </HoverCard>
              );
            else
              return (
                <div
                  className="flex items-center gap-2"
                  key={item?.mapped + idx?.toString()}
                >
                  <div className="size-5 overflow-hidden rounded-full">
                    <Image
                      key={item?.local_product_name}
                      alt={item?.local_SKU}
                      src="/images/unmapped.jpg"
                      height="60"
                      width="60"
                      className="shrink-0"
                    />
                  </div>
                  <div className="text-slate-700">
                    {item?.remote_sku} - <b className="text-red-600">Unmapped</b>
                  </div>
                </div>
              );
          })}
        </div>
        {/* <div>
          {info.row.original.items?.length >= 2 ? (
            <div className="flex items-center">
              {info.row.original.items.slice(0, 4).map((item) => {
                return (
                  item.image && (
                    <Image
                      key={item.local_product_name}
                      alt={item.local_SKU}
                      src={item.image || ""}
                      height="60"
                      width="60"
                      className="size-8 -ml-2 h-8 w-8 shrink-0 rounded-full border-2 border-white first:-ml-0"
                    />
                  )
                );
              })}
              {info.row.original.items.length > 4 && (
                <div className="rounded-ful size-8 -ml-2 flex shrink-0 items-center justify-center rounded-full bg-purple-300">
                  <p className="text-xs text-white">
                    +{info.row.original.items?.length - 4}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              {info.row.original.items.map((item) => {
                return (
                  item.image && (
                    <Image
                      key={item.local_product_name}
                      alt={item.local_SKU}
                      src={item.image || ""}
                      height="60"
                      width="60"
                      className="size-8 -ml-2 h-8 w-8 shrink-0 rounded-full border-2 border-white first:-ml-0"
                    />
                  )
                );
              })}
            </div>
          )}
        </div> */}
      </div>
    ),
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: (info) => (
      <div className="w-[40px] text-center text-xs">
        {info?.row?.original?.items.map((item, idx) => (
          <span className="mt-0.5 block h-5" key={item?.depth + idx}>
            {item?.quantity}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "unitTotal",
    header: "Unit Total",
    cell: (info) => (
      <div className="w-[80px] text-xs">
        {info?.row?.original?.items?.map((item, idx) => (
          <span className="mt-0.5 block h-5" key={item?.local_product_name + idx}>
            {item?.total_amount} {info?.row?.original?.currency}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: (info) => {
      let total = 0;
      info?.row?.original?.items?.forEach((item) => {
        total += item?.total_amount;
      });

      return (
        <div className="w-[80px] text-xs">
          {total?.toFixed(2)} {info?.row?.original?.currency}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];

"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CancelledOrder } from "@/schema/open-order";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DownloadReport } from "@/components/core/download-report";
import ChannelSelect2 from "@/components/shared/channel-select-2";

type Props = {
  dataCount?: number;
  setChannelDetails: any;
  data?: CancelledOrder[];
};

export default function TableHeader(props: Readonly<Props>) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const date = searchParams.get("date") || dayjs().format("YYYY-MM-DD");

  const rows = props.data?.flatMap((order) => {
    const items = order.items || [];
    const itemsToProcess = items.length > 0 ? items : [{} as any];

    return itemsToProcess.map((item) => ({
      "Order ID": order.id,
      "Channel Order ID": order.channel_order_id,
      Marketplace: order.market_place,
      "Payment Status": order.payment_status,
      "Payment Method": order.payment_method,
      "Purchase Date": order.purchase_date
        ? dayjs(order.purchase_date).format("DD/MM/YYYY, h:mm a")
        : "",
      "Total Price": order.total,
      Currency: order.currency,
      "Dispatch Status": order.dispatch_status,
      "Buyer Name": order.shipping_address?.buyer_name || "",
      "Address 1": order.shipping_address?.address1 || "",
      "Address 2": order.shipping_address?.address2 || "",
      City: order.shipping_address?.city || "",
      State: order.shipping_address?.state || "",
      "Post Code": order.shipping_address?.post_code || "",
      Country: order.shipping_address?.country || "",
      "Item Remote SKU": item.remote_sku || "",
      "Item Quantity": item.quantity || "",
      "Item Price": item.price || "",
      "Item Local SKU": item.local_SKU || "",
      "Item Title": item.remote_product_title || "",
    }));
  });

  return (
    <>
      <ChannelSelect2
        dataCount={props?.dataCount}
        setChannelDetails={props?.setChannelDetails}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "h-8 w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {date ? dayjs(date).format("MMMM DD, YYYY") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={new Date(date)}
            defaultMonth={new Date(date)}
            onSelect={(date) => {
              router.push(`?date=${dayjs(date).format("YYYY-MM-DD")}`);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <DownloadReport
        showPdf={false}
        data={rows}
        filename={`cancelled_orders_${dayjs().format("YYYY-MM-DD")}`}
      />
    </>
  );
}

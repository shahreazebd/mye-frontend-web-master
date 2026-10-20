"use client";

import { useSearchParams } from "next/navigation";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";

import { cn } from "@/lib/utils";
import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PostagePreviewTableToolbar } from "../postage-preview-table-toolbar";
import { AmazonRateSelectCell } from "./amazon-carrier-select-cell";
import { AmazonCustomerDeliveryInfoCell } from "./amazon-customer-delivery-info-cell";
import { AmazonDimensionsCell } from "./amazon-dimensions-cell";
import { AmazonQuantityCell } from "./amazon-quantity-cell";
import { AmazonTableActionCell } from "./amazon-table-actions-cell";
import { AmazonTotalPriceCell } from "./amazon-total-price-cell";
import { AmazonTotalWeightCell } from "./amazon-total-weight-cell";
import { OrderDetailsCell } from "./order-details-cell";

const GROUP_BORDER_COLORS = [
  "[&>td:first-child]:border-l-[4px] [&>td:first-child]:border-l-red-400",
  "[&>td:first-child]:border-l-[4px] [&>td:first-child]:border-l-emerald-400",
  "[&>td:first-child]:border-l-[4px] [&>td:first-child]:border-l-orange-400",
  "[&>td:first-child]:border-l-[4px] [&>td:first-child]:border-l-sky-400",
  "[&>td:first-child]:border-l-[4px] [&>td:first-child]:border-l-fuchsia-400",
  "[&>td:first-child]:border-l-[4px] [&>td:first-child]:border-l-yellow-400",
  "[&>td:first-child]:border-l-[4px] [&>td:first-child]:border-l-teal-400",
  "[&>td:first-child]:border-l-[4px] [&>td:first-child]:border-l-purple-400",
];

const getGroupKey = (order: { channel_order_id?: string; id: number | string }) => {
  if (order.channel_order_id) return order.channel_order_id;
  const numId = Number(order.id);
  return Number.isNaN(numId) ? String(order.id) : String(Math.floor(numId));
};

export function AmazonPostagePreviewTable() {
  const params = useSearchParams();
  const { openOrdersWithStorage } = useOpenOrderAtomWithStorage();
  const channelId = params.get("channelId") ?? openOrdersWithStorage[0]?.channel_uid;
  const { data: channelDetails } = useGetChannelDetails(channelId);

  // Count occurrences of each group key
  const groupCounts = new Map<string, number>();
  openOrdersWithStorage?.forEach((order) => {
    const key = getGroupKey(order);
    groupCounts.set(key, (groupCounts.get(key) ?? 0) + 1);
  });

  // Map group key → color index, only for groups with duplicates (count > 1)
  const groupColorMap = new Map<string, number>();
  let colorIdx = 0;
  openOrdersWithStorage?.forEach((order) => {
    const key = getGroupKey(order);
    const count = groupCounts.get(key) ?? 0;
    if (count > 1 && !groupColorMap.has(key)) {
      groupColorMap.set(key, colorIdx % GROUP_BORDER_COLORS.length);
      colorIdx++;
    }
  });

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight">Amazon Postage Preview</h2>
        <PostagePreviewTableToolbar channelDetails={channelDetails} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Order Details</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Weight and Packaging</TableHead>
            <TableHead>Customer Delivery Option</TableHead>
            <TableHead>Selected Delivery Service</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {openOrdersWithStorage?.length > 0
            ? openOrdersWithStorage.map((data, idx) => {
                const groupKey = getGroupKey(data);
                const accentIdx = groupColorMap.get(groupKey);

                return (
                  <TableRow
                    key={data.id}
                    className={cn(
                      accentIdx !== undefined ? GROUP_BORDER_COLORS[accentIdx] : ""
                    )}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <OrderDetailsCell order={data} />
                    </TableCell>
                    <TableCell>
                      {data?.items?.map((item, i) => (
                        <AmazonQuantityCell
                          key={`${data.id}-${item.remote_sku || i}`}
                          itemIndex={i}
                          orderIndex={idx}
                          quantity={item.quantity}
                          dimensions={data?.dimensions}
                          dimensionsInches={data?.dimensionsInches}
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      <>
                        <AmazonTotalWeightCell data={data} />
                        <AmazonDimensionsCell
                          dimensions={data?.dimensions}
                          inches={data?.dimensionsInches}
                          id={data?.id}
                        />
                      </>
                    </TableCell>
                    <TableCell>
                      <AmazonCustomerDeliveryInfoCell
                        latestDeliveryDate={data?.latestDeliveryDate}
                        rowId={data?.id.toString()}
                        city={data?.shipping_address?.city}
                        buyer_name={data?.shipping_address?.buyer_name}
                      />
                    </TableCell>
                    <TableCell>
                      <AmazonRateSelectCell rowId={data?.id.toString()} />
                    </TableCell>
                    <TableCell>
                      <AmazonTotalPriceCell rowId={data?.id.toString()} />
                    </TableCell>
                    <TableCell>
                      <AmazonTableActionCell
                        index={idx}
                        rowId={data?.id.toString()}
                        channelOrderId={data?.channel_order_id}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </section>
  );
}

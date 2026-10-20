"use client";

import { useSearchParams } from "next/navigation";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";

import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PostagePrice } from "../postage-price";
import { OthersTableHeader } from "../table-header";
import { AmazonCarrierSelectCell } from "./amazon-carrier-select-cell";
import { AmazonCustomerDeliveryInfoCell } from "./amazon-customer-delivery-info-cell";
import { AmazonDimensionsCell } from "./amazon-dimensions-cell";
import { AmazonQuantityCell } from "./amazon-quantity-cell";
import { AmazonTableActionCell } from "./amazon-table-actions-cell";
import { AmazonTotalWeightCell } from "./amazon-total-weight-cell";
import { OrderDetailsCell } from "./order-details-cell";

export function AmazonPostagePreviewTable() {
  const params = useSearchParams();
  const { openOrdersWithStorage } = useOpenOrderAtomWithStorage();
  const channelId = params.get("channelId") ?? openOrdersWithStorage[0]?.channel_uid;
  const { data: channelDetails } = useGetChannelDetails(channelId);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight">Amazon Postage Preview</h2>
        <OthersTableHeader channelDetails={channelDetails} />
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
            ? openOrdersWithStorage.map((data, idx) => (
                <TableRow key={data.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <OrderDetailsCell order={data} />
                  </TableCell>
                  <TableCell>
                    {data?.items?.map((item, i) => (
                      <AmazonQuantityCell
                        key={i}
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
                      orderId={data?.channel_order_id}
                      city={data?.shipping_address?.city}
                      buyer_name={data?.shipping_address?.buyer_name}
                    />
                  </TableCell>
                  <TableCell>
                    <AmazonCarrierSelectCell orderId={data?.channel_order_id} />
                  </TableCell>
                  <TableCell>
                    <PostagePrice orderId={data?.channel_order_id} />
                  </TableCell>
                  <TableCell>
                    <AmazonTableActionCell index={idx} orderId={data?.channel_order_id} />
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </section>
  );
}

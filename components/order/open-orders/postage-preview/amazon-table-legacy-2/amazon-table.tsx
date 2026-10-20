"use client";

import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AmazonCustomerDeliveryInfoCell } from "./amazon-customer-delivery-info-cell";
import { AmazonDimensionsCell } from "./amazon-dimensions-cell";
import { AmazonQuantityCell } from "./amazon-quantity-cell";
import { AmazonRateSelectCell } from "./amazon-rate-select-cell";
import { AmazonTableActionCell } from "./amazon-table-actions-cell";
import { AmazonTotalPriceCell } from "./amazon-total-price-cell";
import { AmazonTotalWeightCell } from "./amazon-total-weight-cell";
import { OrderDetailsCell } from "./order-details-cell";

export function AmazonPostagePreviewTable() {
  const { openOrdersWithStorage } = useOpenOrderAtomWithStorage();

  return (
    <section>
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
                    <AmazonRateSelectCell orderId={data?.channel_order_id} />
                  </TableCell>
                  <TableCell>
                    <AmazonTotalPriceCell orderId={data?.channel_order_id} />
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

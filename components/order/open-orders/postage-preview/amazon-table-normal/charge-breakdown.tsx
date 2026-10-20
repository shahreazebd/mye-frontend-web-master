"use client";

import { RateItemList } from "@/hooks/queries/shipments/fetchAmazonBulkRates";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ChargeBreakdownPopover({
  rateItemList = [],
}: {
  rateItemList: RateItemList[];
}) {
  const items = rateItemList || [];

  const total = items
    .reduce((acc, item) => acc + item.rateItemCharge.value, 0)
    .toFixed(2);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" size="sm" className="px-0 text-sm">
          See Details
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 rounded-xl p-4 shadow-lg">
        <p className="text-sm font-semibold">Charge details</p>

        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="text-left">Charge</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items?.map((item) => (
              <TableRow
                key={item.rateItemNameLocalization}
                className="border-b last:border-0"
              >
                <TableCell className="text-sm">{item.rateItemNameLocalization}</TableCell>
                <TableCell className="text-right text-sm">
                  {item.rateItemCharge.value}
                </TableCell>
              </TableRow>
            ))}

            {/* Total row */}
            <TableRow>
              <TableCell className="text-sm font-semibold">Total</TableCell>
              <TableCell className="text-right text-sm font-semibold">{total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </PopoverContent>
    </Popover>
  );
}

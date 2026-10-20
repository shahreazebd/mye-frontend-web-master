"use client";

import { useMessagesOrderDetailsAtom } from "@/atoms/messages-order-details-atom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function OrderDetailsItemsTab() {
  const { currentItems, currency } = useMessagesOrderDetailsAtom();

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 text-xs">
            <TableHead className="w-12 py-2 text-center text-xs">#</TableHead>
            <TableHead className="py-2 text-xs">Item Title / SKU</TableHead>
            <TableHead className="py-2 text-right text-xs">Price</TableHead>
            <TableHead className="py-2 text-center text-xs">Qty</TableHead>
            <TableHead className="py-2 text-right text-xs">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-xs text-muted-foreground"
              >
                No items listed for this order.
              </TableCell>
            </TableRow>
          ) : (
            currentItems.map((item, idx) => (
              <TableRow key={item.remote_sku || item.id || idx} className="text-xs">
                <TableCell className="py-2.5 text-center font-mono text-xs text-muted-foreground">
                  {idx + 1}
                </TableCell>
                <TableCell className="py-2.5">
                  <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground">
                    {item.title || item.remote_sku || `Item #${idx + 1}`}
                  </p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                    {item.remote_sku && (
                      <span className="font-mono">SKU: {item.remote_sku}</span>
                    )}
                    {item.lineItemId && (
                      <span className="font-mono opacity-80">
                        Line ID: {item.lineItemId}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-2.5 text-right text-xs">
                  {item.price && item.price !== "-" ? `${item.price} ${currency}` : "-"}
                </TableCell>
                <TableCell className="py-2.5 text-center text-xs font-semibold">
                  {item.quantity}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2.5 text-right text-xs font-semibold text-primary">
                  {item.total_amount && item.total_amount !== "-"
                    ? `${item.total_amount} ${currency}`
                    : "-"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

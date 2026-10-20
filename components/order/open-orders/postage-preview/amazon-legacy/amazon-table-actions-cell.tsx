// import { useAmazonCarrierOptions, useSelectedCarrierKV } from "@/atoms/carriersAtom";

import { useAmazonCarrierOptions, useSelectedCarrierKV } from "@/atoms/carriersAtom";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { MappedOpenOrder } from "@/schema/open-order";
import { CellContext } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AmazonTableActionCell(props: CellContext<MappedOpenOrder, unknown>) {
  const orderId = props.row.original.channel_order_id;

  const { openOrdersWithStorage, setOpenOrdersWithStorage } =
    useOpenOrderAtomWithStorage();

  const { setSelectedCarrierKV } = useSelectedCarrierKV();
  const { setAmazonCarrierOptions } = useAmazonCarrierOptions();

  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[160px]"
          onClick={(event) => event.stopPropagation()}
        >
          <DropdownMenuItem
            onClick={() => {
              const orders = openOrdersWithStorage?.filter(
                (order) => order?.channel_order_id !== orderId
              );

              setAmazonCarrierOptions((prev) => {
                // eslint-disable-next-line no-unused-vars
                const { [orderId]: _, ...rest } = prev;

                return rest;
              });

              setSelectedCarrierKV((prev) => {
                // eslint-disable-next-line no-unused-vars
                const { [orderId]: _, ...rest } = prev;

                return rest;
              });

              setOpenOrdersWithStorage(orders);
            }}
          >
            <Trash className="text-muted-foreground/70 mr-2 size-3.5" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}

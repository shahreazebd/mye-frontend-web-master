import { useSelectedPostageChannelId } from "@/atoms/postageAtom";
import type { CellContext } from "@tanstack/react-table";
import { Eye, Loader2 } from "lucide-react";

import type { PostageOrder } from "@/types/postage";
import useGetOrderDetails from "@/hooks/queries/order/use-get-order-details";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function PostageDetailsOrderIdCell(props: CellContext<PostageOrder, unknown>) {
  const { selectedPostageChannelId } = useSelectedPostageChannelId();

  const {
    data: orderDetails,
    refetch,
    isLoading,
  } = useGetOrderDetails(
    selectedPostageChannelId,
    props.row.original.orderId as string,
    false
  );

  return (
    <section className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-8 px-2" onClick={() => refetch()}>
            <Eye className="size-4 text-gray-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="grid gap-2 px-2">
            <div className="space-y-2">
              <p className="font-medium leading-none">Order Details</p>
            </div>
            {isLoading ? (
              <div className="flex h-[80px] w-[200px] items-center justify-center">
                <Loader2 className="animate-spin" strokeWidth={1} />
              </div>
            ) : (
              <div className="flex">
                <div className="mr-6 space-y-2">
                  <p className="text-sm font-semibold">Buyer Name</p>
                  <p className="text-sm font-semibold">Address 1</p>
                  <p className="text-sm font-semibold">Address 2</p>
                  <p className="text-sm font-semibold">City</p>
                  <p className="text-sm font-semibold">Postcode</p>
                  <p className="text-sm font-semibold">Country Code</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm ">{orderDetails?.shipping_address?.buyer_name}</p>
                  <p className="text-sm ">{orderDetails?.shipping_address?.address1}</p>
                  <p className="text-sm ">{orderDetails?.shipping_address?.address2}</p>
                  <p className="text-sm ">{orderDetails?.shipping_address?.city}</p>
                  <p className="text-sm ">{orderDetails?.shipping_address?.post_code}</p>
                  <p className="text-sm ">{orderDetails?.shipping_address?.country}</p>
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      {props.row.getValue("orderId")}
    </section>
  );
}

import { MappedOpenOrder } from "@/schema/open-order";
import { getInitials } from "@/utils/helpers";
import { Check } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function OrderDetailsCell({ order }: { order: MappedOpenOrder }) {
  return (
    <section>
      <div className="ml-12 mt-2 text-sm font-bold">
        <span className="mr-2">{order?.channel_order_id}</span>

        {order?.order_meta?.is_prime && (
          <span className="text-blue-400">
            <Check className="inline size-4 text-yellow-500" />
            Prime
          </span>
        )}
      </div>

      {order?.items?.map((item, i) => (
        <div key={item?.remote_sku + i} className="m-1 mb-4 flex items-center space-x-2">
          <Avatar className="size-10">
            <AvatarImage
              src={item?.image || "/images/no-image-available.svg"}
              alt={item?.remote_sku}
            />
            <AvatarFallback>{getInitials(item?.remote_sku)}</AvatarFallback>
          </Avatar>

          <div className="text-gray-600">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="line-clamp-1 w-[400px] text-xs">
                    {item?.remote_product_title}
                  </p>
                </TooltipTrigger>
                <TooltipContent className="w-[400px]">
                  <p className="text-sm">{item?.remote_product_title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <p className="mt-1 text-sm">
              <span className="font-semibold">sku:</span> {item?.remote_sku} |{" "}
              <span className="font-semibold">qty:</span> {item?.quantity} |{" "}
              <span className="font-semibold">amount:</span> {item?.price}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

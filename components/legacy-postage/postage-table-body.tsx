import Image from "next/image";
import { truncateName } from "@/utils/helpers";
import dayjs from "dayjs";

import { Postage } from "@/types/postage";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import PostageAction from "./postage-action";

export function PostageTableBody({ postage }: { postage: Postage }) {
  const {
    successOrdersCount,
    failedOrdersCount,
    carriersLogoSrc,
    vendorImageSrc,
    channel,
    service,
    progress,
    createdAt,
    totalOrderCount,
    mergeOrderCount,
    totalPostageCount,
    _id,
  } = postage;

  return (
    <tr key={_id} className="hover:bg-muted/50 border-b transition-colors">
      <td className="p-4 pl-6">
        <div className="flex items-center gap-3">
          <Image
            src={vendorImageSrc}
            alt={channel?.name ?? "Vendor"}
            width={40}
            height={40}
            className="object-cover"
          />
          <div>
            <div className="font-medium">{truncateName(channel?.name ?? "", 30)} </div>
            <div className="text-xs text-muted-foreground">
              {dayjs(createdAt).format("DD MMMM YYYY, h:mm A")}
            </div>
          </div>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center overflow-hidden rounded">
            <Image
              src={carriersLogoSrc}
              alt={service?.name ?? "Carrier"}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{truncateName(service?.name ?? "", 30)}</div>
            <div className="text-xs text-muted-foreground">{service?.email ?? ""}</div>
          </div>
        </div>
      </td>
      <td className="p-4 text-center">
        <Badge variant="outline" className="font-medium">
          {totalOrderCount}
        </Badge>
      </td>
      <td className="p-4 text-center">
        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
          {successOrdersCount}
        </Badge>
      </td>
      <td className="p-4 text-center">
        <Badge
          variant="outline"
          className={cn(failedOrdersCount > 0 && "border-red-200 bg-red-50 text-red-700")}
        >
          {failedOrdersCount}
        </Badge>
      </td>
      <td className="p-4 text-center">
        <Badge
          variant="outline"
          className={cn(
            mergeOrderCount > 0 && "border-yellow-200 bg-yellow-50 text-yellow-700"
          )}
        >
          {mergeOrderCount}
        </Badge>
      </td>
      <td className="p-4 text-center">
        <Badge
          variant="outline"
          className={cn(
            totalPostageCount > 0 && "border-teal-200 bg-teal-50 text-teal-700"
          )}
        >
          {totalPostageCount}
        </Badge>
      </td>
      <td className="w-40 p-4 text-center">
        {totalOrderCount && <Progress value={progress} className="h-5" />}
      </td>
      <td className="p-4 text-center">
        <PostageAction order={postage} />
      </td>
    </tr>
  );
}

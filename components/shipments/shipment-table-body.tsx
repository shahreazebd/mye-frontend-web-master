import Image from "next/image";
import { truncateName } from "@/utils/helpers";
import dayjs from "dayjs";

import { ShipmentList } from "@/types/shipments";
import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import ShipmentAction from "./shipment-action";

export function ShipmentTableBody({ shipment }: Readonly<{ shipment: ShipmentList }>) {
  const totalOrders = shipment?.orders?.length || 0;
  const successCount =
    shipment?.orders?.filter((o) => o?.status === "SUCCESS").length || 0;
  const failedCount = shipment?.orders?.filter((o) => o?.status === "FAILED").length || 0;

  const progress = totalOrders
    ? Math.round(((successCount + failedCount) / totalOrders) * 100)
    : 0;

  return (
    <tr className="hover:bg-muted/50 border-b transition-colors">
      {/* Store */}
      <td className="p-4 pl-6">
        <div className="flex items-center gap-3">
          <Image
            src={`/logos/marketplaces/round/${shipment.marketplace.toLowerCase()}.svg`}
            alt={shipment.marketplace ?? "Vendor"}
            width={40}
            height={40}
            className="object-cover"
          />
          <div>
            <div className="font-medium">
              {truncateName(shipment.storeName ?? "", 30)}
            </div>
            <div className="text-xs text-muted-foreground">
              {dayjs(shipment.createdAt).format("DD MMMM YYYY, h:mm A")}
            </div>
          </div>
        </div>
      </td>

      {/* Carrier */}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center overflow-hidden rounded">
            <Image
              src={
                shipment.carrier.type === "AMAZON"
                  ? "/logos/marketplaces/round/amazon.svg"
                  : `/logos/carriers/round/${shipment.carrier.type?.toLowerCase()}.svg`
              }
              alt={shipment.carrier.type ?? "Carrier"}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">
              {truncateName(shipment.carrier?.name ?? "", 30)}
            </div>
            <div className="text-xs text-muted-foreground">
              {shipment.carrier?.name ?? ""}
            </div>
          </div>
        </div>
      </td>

      {/* Total Orders */}
      <td className="p-4 text-center">
        <Badge variant="outline" className="font-medium">
          {totalOrders}
        </Badge>
      </td>

      {/* Success */}
      <td className="p-4 text-center">
        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
          {successCount}
        </Badge>
      </td>

      {/* Failed */}
      <td className="p-4 text-center">
        <Badge
          variant="outline"
          className={cn(failedCount > 0 && "border-red-200 bg-red-50 text-red-700")}
        >
          {failedCount}
        </Badge>
      </td>

      <td className="w-40 p-4 text-center">
        {totalOrders > 0 && shipment.status !== "WAITING" && (
          <Progress value={progress} />
        )}
      </td>

      {/* Actions */}
      <td className="p-4 text-center">
        <ShipmentAction shipment={shipment} />
      </td>
    </tr>
  );
}

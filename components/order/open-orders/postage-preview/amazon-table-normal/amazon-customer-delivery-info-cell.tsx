import {
  useAmazonRateOptions,
  useAmazonSelectedRates,
} from "@/atoms/shipment-preview-atom";
import dayjs from "dayjs";
import { Calendar, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  rowId: string;
  buyer_name: string;
  city: string;
  latestDeliveryDate?: string | null;
};

export function AmazonCustomerDeliveryInfoCell({
  rowId,
  buyer_name,
  city,
  latestDeliveryDate,
}: Readonly<Props>) {
  const { amazonSelectedRates } = useAmazonSelectedRates();
  const { amazonRateOptions, amazonSingleRate } = useAmazonRateOptions();

  if (amazonSingleRate.isLoading && amazonSingleRate.orderId === rowId)
    return <Spinner />;

  const selectedRate = amazonSelectedRates[rowId];
  const firstAvailableRate = amazonRateOptions[rowId]?.rates?.rates?.[0];
  const carrierData = selectedRate || firstAvailableRate;

  if (!carrierData) return <span>N/A</span>;

  return (
    <div className="m-1 flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Calendar size={16} className="text-blue-500" />
        <Badge
          variant="outline"
          className="h-7 border-blue-200 bg-blue-50 px-2 text-xs font-bold text-blue-700"
        >
          {latestDeliveryDate ? dayjs(latestDeliveryDate).format("ddd, MMM DD") : "N/A"}
        </Badge>
      </div>
      <div className="flex items-start gap-2">
        <MapPin size={16} className="mt-0.5 text-muted-foreground" />
        <span className="text-sm leading-tight text-muted-foreground">
          to <span className="font-bold text-foreground">{buyer_name}</span> at{" "}
          <span className="font-bold text-foreground">{city}</span>
        </span>
      </div>
    </div>
  );
}

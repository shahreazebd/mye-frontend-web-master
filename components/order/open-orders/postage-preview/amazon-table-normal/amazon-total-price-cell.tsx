import {
  useAmazonRateOptions,
  useAmazonSelectedRates,
} from "@/atoms/shipment-preview-atom";

import { Spinner } from "@/components/ui/spinner";

import { ChargeBreakdownPopover } from "./charge-breakdown";

export function AmazonTotalPriceCell({ rowId }: Readonly<{ rowId: string }>) {
  const { amazonSelectedRates } = useAmazonSelectedRates();
  const { amazonRateOptions, amazonSingleRate } = useAmazonRateOptions();

  if (amazonSingleRate.isLoading && amazonSingleRate.orderId === rowId)
    return <Spinner />;

  const selectedRate = amazonSelectedRates[rowId];
  const firstAvailableRate = amazonRateOptions[rowId]?.rates?.rates?.[0];
  const carrierData = selectedRate || firstAvailableRate;

  if (!carrierData) return <span>N/A</span>;

  const totalPrice = carrierData.rateItemList
    .reduce((total, rate) => total + rate.rateItemCharge.value, 0)
    .toFixed(2);

  return (
    <div className="m-1 flex flex-col items-start gap-1">
      <div className="flex items-baseline gap-1.5">
        <span className="text-xl font-bold tracking-tight text-foreground">
          {totalPrice}
        </span>
        <span className="text-xs font-semibold text-muted-foreground">
          {carrierData?.totalCharge?.unit}
        </span>
      </div>
      <ChargeBreakdownPopover rateItemList={carrierData?.rateItemList} />
    </div>
  );
}

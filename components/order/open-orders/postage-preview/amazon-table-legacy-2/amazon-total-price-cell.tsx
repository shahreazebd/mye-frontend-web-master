import {
  useAmazonRateOptions,
  useAmazonSelectedRates,
} from "@/atoms/shipment-preview-atom";

import { Spinner } from "@/components/ui/spinner";

import { ChargeBreakdownPopover } from "./charge-breakdown";

export function AmazonTotalPriceCell({ orderId }: { orderId: string }) {
  const { amazonSelectedRates } = useAmazonSelectedRates();
  const { amazonSingleRate } = useAmazonRateOptions();

  if (amazonSingleRate.isLoading && amazonSingleRate.orderId === orderId)
    return <Spinner />;

  const carrierData = amazonSelectedRates[orderId];
  if (!carrierData) return <span>N/A</span>;

  const totalPrice = carrierData.rateItemList
    .reduce((total, rate) => total + rate.rateItemCharge.value, 0)
    .toFixed(2);

  return (
    <span>
      <div>
        {totalPrice} {carrierData?.totalCharge?.unit}
      </div>
      <ChargeBreakdownPopover rateItemList={carrierData?.rateItemList} />
    </span>
  );
}

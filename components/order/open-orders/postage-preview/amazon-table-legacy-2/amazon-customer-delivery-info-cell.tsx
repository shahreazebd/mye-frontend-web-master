import { useAmazonCarrierOptions } from "@/atoms/carriersAtom";
import {
  useAmazonRateOptions,
  useAmazonSelectedRates,
} from "@/atoms/shipment-preview-atom";
import dayjs from "dayjs";

import { Spinner } from "@/components/ui/spinner";

type Props = { orderId: string; buyer_name: string; city: string };

export function AmazonCustomerDeliveryInfoCell({ orderId, buyer_name, city }: Props) {
  const { amazonCarrierOptions } = useAmazonCarrierOptions();

  const { amazonSelectedRates } = useAmazonSelectedRates();
  const { amazonSingleRate } = useAmazonRateOptions();

  if (amazonSingleRate.isLoading && amazonSingleRate.orderId === orderId)
    return <Spinner />;

  const carrierData = amazonSelectedRates[orderId];

  if (!carrierData) return <span>N/A</span>;

  return (
    <section>
      {amazonCarrierOptions ? (
        <section className="m-1 space-y-1">
          {carrierData ? (
            <>
              <span>
                Deliver by:{" "}
                {dayjs(carrierData?.promise?.deliveryWindow?.end).format("ddd, MMM DD")}{" "}
                <br />
                to {buyer_name} at {city}
              </span>
            </>
          ) : (
            <>
              <span>N/A</span>
            </>
          )}
        </section>
      ) : null}
    </section>
  );
}

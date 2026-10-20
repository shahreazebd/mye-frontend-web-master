import { useAmazonCarrierOptions, useSelectedCarrierKV } from "@/atoms/carriersAtom";
import dayjs from "dayjs";

type Props = { orderId: string; buyer_name: string; city: string };

export function AmazonCustomerDeliveryInfoCell({ orderId, buyer_name, city }: Props) {
  const { amazonCarrierOptions } = useAmazonCarrierOptions();

  const { selectedCarrierKV } = useSelectedCarrierKV();

  const carrierData = selectedCarrierKV[orderId];

  return (
    <section>
      {amazonCarrierOptions[orderId] ? (
        <section className="m-1 space-y-1">
          {carrierData ? (
            <>
              <span>
                Deliver by:{" "}
                {dayjs(carrierData?.EarliestEstimatedDeliveryDate).format("ddd, MMM DD")}{" "}
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

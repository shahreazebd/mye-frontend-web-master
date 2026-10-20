import { useAmazonCarrierOptions, useSelectedCarrierKV } from "@/atoms/carriersAtom";
import { MappedOpenOrder } from "@/schema/open-order";
import { CellContext } from "@tanstack/react-table";
import dayjs from "dayjs";

export function AmazonCustomerDeliveryInfoCell(
  props: CellContext<MappedOpenOrder, unknown>
) {
  const orderId = props?.row?.original?.channel_order_id;

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
                to {props?.row?.original?.shipping_address?.buyer_name} at{" "}
                {props?.row?.original?.shipping_address?.city}
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

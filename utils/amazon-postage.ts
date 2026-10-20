import { randomUUID } from "crypto";
import { MappedOpenOrder } from "@/schema/open-order";

import { kgAndGramToGrams, lbAndOunceToOunces } from "./postage";

export function buildAmazonShippingRatePayload(data: MappedOpenOrder) {
  const country = data?.shipping_address?.country?.toLowerCase();

  // Split dimension strings
  const [hCM, wCM, lCM] = (data?.dimensions || "").split(", ") || [0, 0, 0];

  // Convert weights
  const weightInGrams =
    country === "united states of america"
      ? lbAndOunceToOunces(+data?.lb, +data?.oz)
      : kgAndGramToGrams(+data?.kg, +data?.gm);

  // Build final payload
  const payload = {
    packages: [
      {
        dimensions: {
          length: +lCM,
          width: +wCM,
          height: +hCM,
          unit: "CENTIMETER",
        },
        weight: {
          unit: "GRAM",
          value: +weightInGrams,
        },
        items: data?.items?.map((item) => ({
          quantity: item?.quantity ?? 1,
          itemIdentifier: item?.position_item_id?.[0] ?? "",
          description: data?.channel_order_id || "description",
          weight: {
            unit: "GRAM",
            value: +item?.weight,
          },
          itemValue: {
            value: +data?.total,
            unit: data?.currency ?? "GBP",
          },
        })),
        insuredValue: {
          unit: data?.currency ?? "GBP",
          value: +data?.total,
        },
        packageClientReferenceId: data?.channel_order_id || randomUUID(),
      },
    ],
    channelDetails: {
      channelType: "AMAZON",
      amazonOrderDetails: {
        orderId: data?.channel_order_id ?? "",
      },
    },
    rowId: data?.rateRecordId,
  };

  return payload;
}

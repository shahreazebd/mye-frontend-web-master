import { useAmazonCarrierOptions, useSelectedCarrierKV } from "@/atoms/carriersAtom";
import dayjs from "dayjs";
import { Shield, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { AmazonCarrierSelect } from "./amazon-carrier-select";

export function AmazonCarrierSelectCell({ orderId }: { orderId: string }) {
  const { amazonCarrierOptions } = useAmazonCarrierOptions();
  const { selectedCarrierKV } = useSelectedCarrierKV();

  const carrierData = selectedCarrierKV[orderId];

  return (
    <section>
      {amazonCarrierOptions[orderId] ? (
        <section className="m-1 space-y-1">
          {carrierData && (
            <>
              <p className="text-base font-bold text-green-600">
                {carrierData?.ShippingServiceName}
              </p>
              <p className="text-xs">
                Deliver On: {dayjs(carrierData?.ShipDate).format("ddd, MMM DD")}
              </p>

              <div>
                {carrierData?.Benefits?.IncludedBenefits?.includes(
                  "CLAIMS_PROTECTED"
                ) && (
                  <Badge className="bg-teal-600 hover:bg-teal-600">
                    <Shield size={16} className="mr-1" /> Claims Protected
                  </Badge>
                )}
              </div>
            </>
          )}

          <div className="!mt-4">
            {!amazonCarrierOptions[orderId]?.error ? (
              <AmazonCarrierSelect
                options={amazonCarrierOptions[orderId]?.data}
                orderId={orderId}
              />
            ) : (
              <div className="flex w-64 items-center gap-2">
                <TriangleAlert className="mb-0.5 size-4 shrink-0 text-red-500" />{" "}
                {amazonCarrierOptions[orderId]?.error ===
                "could not found eligible shipping service for this order"
                  ? "Could not found eligible shipping service for this order"
                  : "Dimenssions(Height, Width, Length) and Weight cannnot be 0."}
              </div>
            )}
          </div>
        </section>
      ) : null}
    </section>
  );
}

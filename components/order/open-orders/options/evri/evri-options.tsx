import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { useGetPostagePayload, usePostageAtom } from "@/atoms/postageAtom";

import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import { useCreateEvriShipment } from "@/hooks/queries/shipments/use-create-evri-shipment";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import CarrierAccountSelect from "../carrier-account-select";
import SelectOption from "../select-option";

export default function EvriOptions() {
  const { toast } = useToast();
  const searchParams = Object.fromEntries(useSearchParams().entries());
  const router = useRouter();

  const [nextDayDelivery, setNextDayDelivery] = useState("");
  const [carrierAccount, setCarrierAccount] = useState("");

  const { mutate: buyPostage, isLoading: isBuyPostageLoading } = useCreateEvriShipment();

  const { data: channelDetails } = useGetChannelDetails(searchParams?.channelId);

  const { postagePayload } = useGetPostagePayload();

  const { setPostageInfo } = usePostageAtom();

  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();

  const buttonStatus = !!carrierAccount && !!nextDayDelivery;

  function buyPostageHandler() {
    if (channelDetails) {
      const payload = {
        storeId: channelDetails?.channel_uid,
        storeName: channelDetails?.name,
        marketplace: channelDetails?.channel_type?.toUpperCase(),
        carrierId: carrierAccount,
        metadata: {
          nextDay: nextDayDelivery === "yes",
        },
        orders: postagePayload,
      };

      toast({
        title: "Please wait",
        description: "You are redirecting to the postage page",
      });

      localStorage.setItem("postagePayloadData", JSON.stringify(payload));

      buyPostage(payload, {
        onSuccess: () => {
          setOpenOrdersWithStorage([]);

          setPostageInfo((prev) => {
            return {
              ...prev,
              isBuyPostageModalOpen: false,
            };
          });
          router.push("/shipments");
        },
      });
    }
  }

  return (
    <section>
      <section className="mb-6 mt-12 grid grid-cols-2 gap-8">
        <section>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Select Account
          </label>
          <CarrierAccountSelect
            carrier="EVRI"
            className="w-full"
            onValueChange={(data) => {
              setCarrierAccount(data);
            }}
          />
        </section>

        <SelectOption
          label="Next Day Delivery"
          className="w-full"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          onValueChange={(data) => setNextDayDelivery(data)}
        />
      </section>

      <section className="text-end">
        <Button
          className="bg-slate-900"
          disabled={!buttonStatus || isBuyPostageLoading}
          onClick={buyPostageHandler}
          loading={isBuyPostageLoading}
        >
          Buy Postage
        </Button>
      </section>
    </section>
  );
}

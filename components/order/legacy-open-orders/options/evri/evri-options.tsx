import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { useGetPostagePayload, usePostageAtom } from "@/atoms/postageAtom";

import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import useBuyPostage, { PostagePayload } from "@/hooks/queries/postage/useBuyPostage";
// import useGetPostagePayload from "@/hooks/queries/postage/use-get-postage-payload";
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

  // const { mutate: buyPostage, isLoading: isBuyPostageLoading } = useBuyEvriPostage();
  const { mutate: buyPostage, isLoading: isBuyPostageLoading } = useBuyPostage();

  const { data: channelDetails } = useGetChannelDetails(searchParams?.channelId);

  // const { data: postagePayload } = useGetPostagePayload();
  const { postagePayload } = useGetPostagePayload();

  const { setPostageInfo } = usePostageAtom();

  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();

  const buttonStatus = !!carrierAccount && !!nextDayDelivery;

  // const payloadHandler = () => {
  //   if (channelDetails) {
  //     const payload: PostagePayload = {
  //       data: {
  //         channel_uid: channelDetails.channel_uid,
  //         channel_name: channelDetails.name,
  //         company_uid: channelDetails.company_uid,
  //         service: "EVRI",
  //         service_meta_data: {
  //           service_name: "EVRI",
  //           account_email: "ashourov@evidentbd.com",
  //           delivery_next_date: nextDayDelivery === "yes",
  //           service: "STANDARD",
  //           shipment_service_uuid: carrierAccount,
  //         },

  //         order_data: postagePayload.data,
  //       },
  //       serviceType: "EVRI",
  //     };

  //     console.log(payload);
  //   }
  // };

  function buyPostageHandler() {
    if (channelDetails) {
      const payload: PostagePayload = {
        data: {
          channel_uid: channelDetails?.channel_uid,
          channel_name: channelDetails?.name,
          company_uid: channelDetails?.company_uid,
          service: "EVRI",
          service_meta_data: {
            service_name: "EVRI",
            account_email: "ashourov@evidentbd.com",
            delivery_next_date: nextDayDelivery === "yes",
            service: "STANDARD",
            shipment_service_uuid: carrierAccount,
          },

          order_data: postagePayload,
        },
        serviceType: "EVRI",
      };

      toast({
        title: "Please wait",
        description: "You are redirecting to the postage page",
      });

      localStorage.setItem("postagePayloadData", JSON.stringify(payload?.data));

      buyPostage(payload, {
        onSuccess: () => {
          setOpenOrdersWithStorage([]);

          setPostageInfo((prev) => {
            return {
              ...prev,
              isBuyPostageModalOpen: false,
            };
          });
          router.replace("/postage");
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

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { useGetPostagePayload, usePostageAtom } from "@/atoms/postageAtom";

import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import useBuyPostage, { PostagePayload } from "@/hooks/queries/postage/useBuyPostage";
// import useGetPostagePayload from "@/hooks/queries/postage/use-get-postage-payload";
import { Button } from "@/components/ui/button";

import CarrierAccountSelect from "../carrier-account-select";
import SelectOption from "../select-option";

export default function DhlOptions() {
  const searchParams = Object.fromEntries(useSearchParams().entries());
  const router = useRouter();

  // const { mutate: buyPostage, isLoading: isBuyPostageLoading } = useBuyDhlPostage();
  const { mutate: buyPostage, isLoading: isBuyPostageLoading } = useBuyPostage();

  const [returnShippment, setReturnShippment] = useState("");
  const [carrierAccount, setCarrierAccount] = useState("");

  const { data: channelDetails } = useGetChannelDetails(searchParams.channelId);

  const { postagePayload } = useGetPostagePayload();

  const { setPostageInfo } = usePostageAtom();

  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();

  const buttonStatus = !!carrierAccount && !!returnShippment;

  function buyPostageHandler() {
    if (channelDetails) {
      const payload: PostagePayload = {
        data: {
          channel_uid: channelDetails?.channel_uid,
          channel_name: channelDetails?.name,
          company_uid: channelDetails?.company_uid,
          channel_type: channelDetails?.channel_type,
          service: "DHL",
          service_meta_data: {
            service_name: "DHL",
            service: "STANDARD",
            shipment_service_uuid: carrierAccount,
            return: returnShippment === "yes",
          },

          order_data: postagePayload,
        },
        serviceType: "DHL",
      };

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
            carrier="DHL"
            className="w-full"
            onValueChange={(data) => {
              setCarrierAccount(data);
            }}
          />
        </section>

        <SelectOption
          label=" Do You Want To Return Shipment?"
          className="w-full"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          onValueChange={(data) => {
            setReturnShippment(data);
          }}
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

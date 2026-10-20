import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { useGetPostagePayload, usePostageAtom } from "@/atoms/postageAtom";

import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import { useBuyDHLShipment } from "@/hooks/queries/shipments/use-buy-dhl-shipment";
import { Button } from "@/components/ui/button";

import CarrierAccountSelect from "../carrier-account-select";
import SelectOption from "../select-option";

export default function DhlOptions() {
  const [returnShippment, setReturnShippment] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const searchParams = Object.fromEntries(useSearchParams().entries());
  const router = useRouter();

  const { mutate: buyPostage, isLoading: isBuyPostageLoading } = useBuyDHLShipment();

  const [carrierAccount, setCarrierAccount] = useState("");

  const { data: channelDetails } = useGetChannelDetails(searchParams.channelId);

  const { postagePayload } = useGetPostagePayload();

  const { setPostageInfo } = usePostageAtom();

  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();

  const buttonStatus = !!carrierAccount;

  function buyPostageHandler() {
    if (channelDetails) {
      const marketplace = channelDetails?.channel_type.toUpperCase();

      const payload = {
        storeId: channelDetails?.channel_uid,
        storeName: channelDetails?.name,
        companyId: channelDetails?.company_uid,
        marketplace: marketplace,
        carrierId: carrierAccount,
        metadata: {
          service: "STANDARD",
          shipment_service_uuid: carrierAccount,
          returnShippment: returnShippment === "yes",
        },
        orders: postagePayload,
      };

      localStorage.setItem("postagePayloadData", JSON.stringify(payload));

      buyPostage(payload, {
        onSuccess: () => {
          setOpenOrdersWithStorage([]);
          setPostageInfo((prev) => ({
            ...prev,
            isBuyPostageModalOpen: false,
          }));
          setErrorMessages([]);
          router.push("/shipments");
        },
        onError: (error) => {
          const errors = (error as any)?.response?.data || [];

          if (errors?.length) {
            const formattedErrors = errors
              ?.filter((e: any) => e.status !== "fulfilled")
              ?.map((err: any) => ({
                orderId: err?.reason?.orderId,
                items:
                  err.reason?.error?.items?.map((item: any) => ({
                    sequenceNumber: item.sequenceNumber,
                    validationMessages:
                      item.validationMessages?.map((msg: any) => msg.validationMessage) ||
                      [],
                  })) || [],
              }));
            setErrorMessages(formattedErrors);
            setPostageInfo((prev) => ({
              ...prev,
              isPostageErrors: formattedErrors,
            }));
            setPostageInfo((prev) => ({
              ...prev,
              isBuyPostageModalOpen: false,
            }));
            return;
          }
        },
      });
    }
  }

  function copyPayloadHandler() {
    if (channelDetails) {
      const payload = {
        storeId: channelDetails?.channel_uid,
        storeName: channelDetails?.name,
        companyId: channelDetails?.company_uid,
        marketplace: "EBAY",
        carrierId: carrierAccount,
        metadata: {
          service: "STANDARD",
          shipment_service_uuid: carrierAccount,
          returnShippment: returnShippment === "yes",
        },
        orders: postagePayload,
      };

      navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    }
  }

  return (
    <section>
      {/* Error Messages Display */}
      {errorMessages.length > 0 && (
        <section className="mb-6 rounded border border-red-400 bg-red-100 p-4 text-red-700">
          <h3 className="mb-2 text-lg font-semibold">Error(s) Occurred</h3>
          {errorMessages.map((error, index) => {
            return (
              <div key={index} className="mb-4">
                <p className="font-medium">Order ID: {(error as any)?.orderId}</p>
                {(error as any)?.items.map((item: any) => (
                  <div key={item.sequenceNumber} className="ml-4">
                    <p className="font-medium">Shipment {item.sequenceNumber}:</p>
                    <ul className="ml-6 list-disc">
                      {item.validationMessages.map((message: any, msgIndex: any) => (
                        <li key={msgIndex}>{message}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          })}
        </section>
      )}

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
          label="Do You Want To Return Shipment?"
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

      <section className="flex justify-end gap-2">
        <Button
          disabled={!buttonStatus || isBuyPostageLoading}
          onClick={copyPayloadHandler}
          loading={isBuyPostageLoading}
          variant="link"
        >
          Copy Payload
        </Button>

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

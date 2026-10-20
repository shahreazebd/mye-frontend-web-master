import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { useGetPostagePayload, usePostageAtom } from "@/atoms/postageAtom";

import useGetAllShippingCarrier from "@/hooks/queries/carriers/useGetAllShippingCarrier";
import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import useBuyPostage, { PostagePayload } from "@/hooks/queries/postage/useBuyPostage";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import CarrierAccountSelect from "../carrier-account-select";
import SelectOption from "../select-option";

const packageTypes = [
  {
    label: "FedEx® Letters ( 1 lbs/0.5 KG )",
    value: "FEDEX_ENVELOPE",
  },
  {
    label: "FedEx® Box ( 20 lbs/9 KG )",
    value: "FEDEX_BOX",
  },
  {
    label: "FedEx® Small Box ( 20 lbs/9 KG )",
    value: "FEDEX_SMALL_BOX",
  },
  {
    label: "FedEx® Medium Box ( 20 lbs/9 KG )",
    value: "FEDEX_MEDIUM_BOX",
  },
  {
    label: "FedEx® Large Box ( 20 lbs/9 KG )",
    value: "FEDEX_LARGE_BOX",
  },
  {
    label: "FedEx® Extra Large Box ( 20 lbs/9 KG )",
    value: "FEDEX_EXTRA_LARGE_BOX",
  },
  {
    label: "FedEx® 10kg Box ( 22 lbs/10 KG )",
    value: "FEDEX_10KG_BOX",
  },
  {
    label: "FedEx® 25kg Box ( 55 lbs/25 KG )",
    value: "FEDEX_25KG_BOX",
  },
  {
    label: "FedEx® Pak ( 20 lbs/9 KG )",
    value: "FEDEX_PAK",
  },
  {
    label: "FedEx® Tube ( 20 lbs/9 KG )",
    value: "FEDEX_TUBE",
  },
];

const serviceTypes = [
  {
    label: "FedEx Priority Overnight® (Selected Markets)",
    value: "PRIORITY_OVERNIGHT",
  },
  {
    label: "FedEx First",
    value: "FEDEX_FIRST",
  },
  {
    label: "FedEx Priority Express",
    value: "FEDEX_PRIORITY_EXPRESS",
  },
  {
    label: "FedEx Priority",
    value: "FEDEX_PRIORITY",
  },
  {
    label: "FedEx Priority Express Freight",
    value: "FEDEX_PRIORITY_EXPRESS_FREIGHT",
  },
  {
    label: "FedEx Priority Freight",
    value: "FEDEX_PRIORITY_FREIGHT",
  },
  {
    label: "FedEx Economy (Only U.K.)",
    value: "FEDEX_ECONOMY_SELECT",
  },
];

const pickupTypes = [
  {
    label: "Indicates FedEx will be contacted to request a pickup.",
    value: "CONTACT_FEDEX_TO_SCHEDULE",
  },
  {
    label: "Indicates Shipment will be dropped off at a FedEx Location.",
    value: "DROPOFF_AT_FEDEX_LOCATION",
  },
  {
    label: "Indicates Shipment will be picked up as part of a regular scheduled pickup.",
    value: "USE_SCHEDULED_PICKUP",
  },
];

export default function FedexOptions() {
  const [carrierAccountUuid, setCarrierAccountUuid] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [packageType, setPackageType] = useState("");
  const [pickupType, setPickupType] = useState("");

  const [fedexDefaultAccount, setFedexDefaultAccount] = useState({} as any);

  const { toast } = useToast();

  const searchParams = Object.fromEntries(useSearchParams()?.entries());
  const router = useRouter();

  const { data: channelDetails } = useGetChannelDetails(searchParams?.channelId);
  const { data: shippingCarrier } = useGetAllShippingCarrier();
  const { mutate: buyPostage, isLoading: isBuyPostageLoading } = useBuyPostage();

  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();

  const { postagePayload } = useGetPostagePayload();

  const { setPostageInfo } = usePostageAtom();

  useEffect(() => {
    const defaultAccount =
      shippingCarrier?.find(
        (carrier) => carrier.shipping_service_name === "FEDEX" && carrier.is_default
      ) || {};

    setFedexDefaultAccount(defaultAccount);
  }, [shippingCarrier]);

  useEffect(() => {
    const defaultAccount = shippingCarrier?.find(
      (carrier) => carrier.uuid === carrierAccountUuid
    );
    setFedexDefaultAccount(defaultAccount);
  }, [carrierAccountUuid]);

  function buyPostageHandler() {
    if (channelDetails) {
      const payload: PostagePayload = {
        data: {
          channel_uid: channelDetails?.channel_uid,
          channel_name: channelDetails?.name,
          company_uid: channelDetails?.company_uid,
          service: "fedex",
          service_meta_data: {
            labelResponseOptions: "URL_ONLY",
            account_email: "ashourov@evidentbd.com",
            next_day: true,
            service:
              serviceType ||
              fedexDefaultAccount?.carrier_meta_data?.additional_data?.service_type,
            packagingType:
              packageType ||
              fedexDefaultAccount?.carrier_meta_data?.additional_data?.package_type,
            pickupType:
              pickupType ||
              fedexDefaultAccount?.carrier_meta_data?.additional_data?.pickup_type,
            shipment_service_uuid: carrierAccountUuid || fedexDefaultAccount?.uuid,
          },

          order_data: postagePayload,
        },
        serviceType: "FEDEX",
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
      {!fedexDefaultAccount ? (
        <>loading</>
      ) : (
        <>
          <section className="mb-6  grid grid-cols-2 gap-8">
            <section>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Select Account
              </label>
              <CarrierAccountSelect
                carrier="FEDEX"
                className="w-full"
                onValueChange={setCarrierAccountUuid}
                defaultAccount={fedexDefaultAccount?.uuid}
              />
            </section>

            <SelectOption
              className="w-full"
              label="Select Service Type"
              placeholder="Select service type"
              onValueChange={(data) => setServiceType(data)}
              options={serviceTypes}
              defaultOption={
                fedexDefaultAccount?.carrier_meta_data?.additional_data?.service_type
              }
            />

            <SelectOption
              className="w-full"
              label="Select Package Type"
              placeholder="Select package type"
              onValueChange={(data) => setPackageType(data)}
              options={packageTypes}
              defaultOption={
                fedexDefaultAccount?.carrier_meta_data?.additional_data?.package_type
              }
            />

            <SelectOption
              className="w-full"
              label="Select Pickup Type"
              placeholder="Select pickup type"
              onValueChange={(data) => setPickupType(data)}
              options={pickupTypes}
              defaultOption={
                fedexDefaultAccount?.carrier_meta_data?.additional_data?.pickup_type
              }
            />
          </section>
        </>
      )}
      <section className="text-end">
        <Button
          className="bg-slate-900"
          onClick={buyPostageHandler}
          disabled={isBuyPostageLoading}
        >
          Buy Postage
        </Button>
      </section>
    </section>
  );
}

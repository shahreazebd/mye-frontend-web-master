"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCarrierUuidAtom, useRoyalMailParcelSizeAtom } from "@/atoms/carriersAtom";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { useGetPostagePayload, usePostageAtom } from "@/atoms/postageAtom";

import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import useBuyPostage, { PostagePayload } from "@/hooks/queries/postage/useBuyPostage";
import { useGetRoyalMailServices } from "@/hooks/queries/royal-mail/use-get-royalmail-services";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
// import useGetPostagePayload from "@/hooks/queries/postage/use-get-postage-payload";
import { DataTable } from "@/components/core/data-table/data-table";

import ParcelSizeRadioGroup from "./parcel-sizes-info";
import { columns } from "./royal-mail-columns";

export default function RoyalMailOptions() {
  const searchParams = Object.fromEntries(useSearchParams().entries());
  const router = useRouter();

  const [serviceCode, setServiceCode] = useState("");

  const { data: royalMailServices } = useGetRoyalMailServices();

  const { royalMailParcelSize } = useRoyalMailParcelSizeAtom();

  const { mutate: buyPostage, isLoading: isBuyPostageLoading } = useBuyPostage();

  const { data: channelDetails } = useGetChannelDetails(searchParams.channelId);

  const { setPostageInfo } = usePostageAtom();

  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();

  const { toast } = useToast();

  const { carrierUuid } = useCarrierUuidAtom();

  const { postagePayload } = useGetPostagePayload();

  const buttonStatus = !!carrierUuid && !!royalMailParcelSize && !!serviceCode;

  function buyPostageHandler() {
    if (channelDetails) {
      const payload: PostagePayload = {
        data: {
          channel_uid: channelDetails?.channel_uid,
          channel_name: channelDetails?.name,
          company_uid: channelDetails?.company_uid,
          service: "CLICKANDDROP",
          service_meta_data: {
            service_name: "CLICKANDDROP",
            shipping_service_uuid: carrierUuid,
            postage_service_code: serviceCode,
            packageFormatIdentifier: royalMailParcelSize,
          },

          order_data: postagePayload,
        },
        serviceType: "CLICKANDDROP",
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
    <>
      <ParcelSizeRadioGroup />

      <DataTable
        columns={columns}
        data={
          royalMailServices?.services?.filter((e) => {
            return e?.validPackagings?.map((i) => i?.name)?.includes(royalMailParcelSize);
          }) ?? []
        }
        search={false}
        selectedRowData={(rows) => {
          setServiceCode(rows?.[0]?.serviceCode);
        }}
      />

      <section className="mb-12 mt-4 text-right">
        <Button
          size="sm"
          className="bg-slate-900"
          disabled={!buttonStatus || isBuyPostageLoading}
          onClick={buyPostageHandler}
          loading={isBuyPostageLoading}
        >
          Buy Postages
        </Button>
      </section>
    </>
  );
}

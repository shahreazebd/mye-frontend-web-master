"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCarrierUuidAtom, useRoyalMailParcelSizeAtom } from "@/atoms/carriersAtom";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { useGetPostagePayload, usePostageAtom } from "@/atoms/postageAtom";

import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import { useGetRoyalMailServices } from "@/hooks/queries/royal-mail/use-get-royalmail-services";
import { useBuyRoyalMailShipment } from "@/hooks/queries/shipments/use-buy-royal-mail-shipment";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DataTable } from "@/components/core/data-table/data-table";

import ParcelSizeRadioGroup from "./parcel-sizes-info";
import { columns } from "./royal-mail-columns";

export default function RoyalMailOptions() {
  const searchParams = Object.fromEntries(useSearchParams().entries());
  const router = useRouter();

  const [serviceCode, setServiceCode] = useState("");

  const { data: royalMailServices } = useGetRoyalMailServices();

  const { royalMailParcelSize } = useRoyalMailParcelSizeAtom();

  const { mutate: buyPostage, isLoading: isBuyPostageLoading } =
    useBuyRoyalMailShipment();

  const { data: channelDetails } = useGetChannelDetails(searchParams.channelId);

  const { setPostageInfo } = usePostageAtom();

  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();

  const { toast } = useToast();

  const { carrierUuid } = useCarrierUuidAtom();

  const { postagePayload } = useGetPostagePayload();

  const buttonStatus = !!carrierUuid && !!royalMailParcelSize && !!serviceCode;

  function buyPostageHandler() {
    if (channelDetails) {
      const payload = {
        storeId: channelDetails?.channel_uid,
        storeName: channelDetails?.name,
        companyId: channelDetails?.company_uid,
        marketplace: channelDetails?.channel_type.toUpperCase(),
        carrierType: "ROYAL_MAIL",
        carrierId: carrierUuid,
        metadata: {
          shipping_service_uuid: carrierUuid,
          postage_service_code: serviceCode,
          packageFormatIdentifier: royalMailParcelSize,
          serviceCode: serviceCode,
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

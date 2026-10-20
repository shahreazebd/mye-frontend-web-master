"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Loader2, XCircle } from "lucide-react";

import fetch from "@/config/xior";
import useGetSearchParams from "@/hooks/custom/use-search-params";
import useAuth from "@/hooks/custom/useAuth";
import useEbayReconnect from "@/hooks/queries/channel-integration/useEbayReconnect";

import { Button } from "../ui/button";

export default function CallbackEbay() {
  const searchParams = useGetSearchParams();
  const router = useRouter();
  const { userInformation } = useAuth();

  const {
    mutate: ebayReconnect,
    isLoading: reconnectLoading,
    isError: reconnectError,
  } = useEbayReconnect();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (data: Record<string, any>) =>
      fetch.post("/integration/api/v1/channel/add-channel/ebay/", data),
    {
      onSuccess: async (response) => {
        const channel = response.data?.data?.channel_uid;
        const company = userInformation?.company_uid;
        const URI = `/integration/api/v1/channel/product-retrive/${company}/${channel}/`;

        await fetch.get(URI);
      },
      retry: false,
    }
  );

  useEffect(() => {
    const channelData = JSON.parse(localStorage.getItem("channelData") as string);
    const isReconnect = localStorage.getItem("reconnect") === "ebayReconnect";

    const allData = {
      ...searchParams,
      ...channelData,
    };

    if (isReconnect) {
      const payload = {
        code: searchParams?.code,
        channel_uid: channelData?.channelUid,
      };
      ebayReconnect(payload, {
        onSuccess: () => {
          localStorage.removeItem("channelData");
          localStorage.removeItem("reconnect");
        },
      });
    } else {
      mutate(allData, {
        onSuccess: () => {
          localStorage.removeItem("channelData");
        },
      });
    }
  }, []);

  const loading = isLoading || reconnectLoading;
  const error = isError || reconnectError;

  return (
    <div className="-mb-20 -mt-5 flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <Image
        src="/logos/marketplaces/ebay.svg"
        alt="eBay"
        width={100}
        height={100}
        className="mb-1 h-12 w-28"
      />

      {/* LOADING STATE */}
      {loading && (
        <>
          <Loader2 className="my-10 size-12 animate-spin text-blue-500" />
          <h4 className="text-xl font-semibold text-gray-700">Connecting to eBay...</h4>
          <p className="mt-2 max-w-sm text-center text-gray-500">
            Please wait while we complete the integration.
          </p>
        </>
      )}

      {/* ERROR STATE */}
      {error ? (
        <>
          <XCircle className="my-6 size-16 text-red-500" />
          <h4 className="mb-4 mt-6 text-3xl font-semibold text-red-600">
            Integration Failed
          </h4>
          <p className="mx-auto max-w-md text-center text-gray-500">
            Something went wrong while connecting your eBay channel.
          </p>
          <div className="mt-6 flex gap-4">
            <Button variant="dark" onClick={() => router.push("/settings/all-channels")}>
              Go Back
            </Button>
            <Button variant="outline" onClick={() => router.refresh()}>
              Retry
            </Button>
          </div>
        </>
      ) : (
        <>
          <Image
            src="/gif/success.gif"
            alt="success"
            width={150}
            height={150}
            unoptimized
          />
          <h4 className="mb-4 mt-7 text-3xl font-semibold text-green-600">
            Channel Integrated Successfully
          </h4>
          <p className="mx-auto text-center text-sm text-gray-600 xl:w-5/12">
            Discover how ecommerce integrations can help you drive greater efficiency and
            multi-channel growth.
          </p>
          <Button
            className="mt-4"
            variant="dark"
            onClick={() => router.push("/settings/all-channels")}
          >
            Go back to Channels
          </Button>
        </>
      )}

      {/* SUCCESS STATE */}
      {/* {isSuccess && (
        <>
          <Image
            src="/gif/success.gif"
            alt="success"
            width={150}
            height={150}
            unoptimized
          />
          <h4 className="mb-4 mt-7 text-3xl font-semibold text-green-600">
            Channel Integrated Successfully
          </h4>
          <p className="mx-auto text-center text-sm text-gray-600 xl:w-5/12">
            Discover how ecommerce integrations can help you drive greater efficiency and
            multi-channel growth.
          </p>
          <Button
            className="mt-4"
            variant="dark"
            onClick={() => router.push("/settings/all-channels")}
          >
            Go back to Channels
          </Button>
        </>
      )} */}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Loader2, XCircle } from "lucide-react";

import fetch from "@/config/xior";
import useGetSearchParams from "@/hooks/custom/use-search-params";
import useAmazonReconnect from "@/hooks/queries/channel-integration/useAmazonReconnect";

import { Button } from "../ui/button";

export default function CallbackAmazon() {
  const router = useRouter();
  const searchParams = useGetSearchParams();

  const {
    mutate: triggerAmazonReconnect,
    isLoading: reconnectLoading,
    isError: reconnectError,
    isSuccess: reconnectSuccess,
  } = useAmazonReconnect();
  const {
    mutate: addChannel,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(
    (data: any) => fetch.post("/integration/api/v1/channel/add-channel/amazon/", data),
    {
      onSuccess: async (response) => {
        const channelId = response.data?.channel_uid;
        const URI = `/amazon/api/v2/products/fetch/${channelId}`;

        await fetch.get(URI);
      },
      retry: false,
    }
  );

  useEffect(() => {
    const runIntegration = async () => {
      try {
        const channelData = JSON.parse(localStorage.getItem("channelData") ?? "{}");
        const isReconnect = localStorage.getItem("reconnect") === "amazonReconnect";

        if (isReconnect) {
          const payload = {
            amzn_authorization_code: searchParams?.spapi_oauth_code,
            channel_uid: channelData?.channelUid,
          };

          triggerAmazonReconnect(payload, {
            onSuccess: () => {
              localStorage.removeItem("channelData");
              localStorage.removeItem("reconnect");
            },
          });
        } else {
          const allData = { ...searchParams, ...channelData };
          addChannel(allData, {
            onSuccess: () => {
              localStorage.removeItem("channelData");
            },
          });
        }
      } catch {
        console.error("Error connecting to Amazon");
      }
    };

    runIntegration();
  }, []);

  const success = isSuccess || reconnectSuccess;
  const loading = isLoading || reconnectLoading;
  const error = isError || reconnectError;

  return (
    <div className="-mb-20 -mt-5 flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <Image
        src="/logos/marketplaces/amazon.svg"
        alt="amazon"
        width={100}
        height={100}
        className="mb-1 h-12 w-28"
      />

      {/* LOADING STATE */}
      {loading && (
        <>
          <Loader2 className="my-10 size-12 animate-spin text-blue-500" />
          <h4 className="text-xl font-semibold text-gray-700">Connecting to Amazon...</h4>
          <p className="mt-2 max-w-sm text-center text-gray-500">
            Please wait while we complete the integration.
          </p>
        </>
      )}

      {/* SUCCESS STATE */}
      {success && !loading && !error && (
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

      {/* ERROR STATE */}
      {error && !loading && (
        <>
          <XCircle className="my-6 size-16 text-red-500" />
          <h4 className="mb-4 mt-6 text-3xl font-semibold text-red-600">
            Integration Failed
          </h4>
          <p className="mx-auto max-w-md text-center text-gray-500">
            Something went wrong while connecting your Amazon channel.
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
      )}
    </div>
  );
}

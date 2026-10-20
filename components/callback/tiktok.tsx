"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, XCircle } from "lucide-react";

import useGetSearchParams from "@/hooks/custom/use-search-params";
import useAuth from "@/hooks/custom/useAuth";
import {
  IntegrateTiktokPayload,
  useIntegrateTiktok,
} from "@/hooks/queries/channel-integration/use-integrate-tiktok";

import { Button } from "../ui/button";

export function CallbackTiktok() {
  const searchParams = useGetSearchParams();
  const router = useRouter();
  const { userInformation } = useAuth();

  const { mutate: integrateTiktok, isLoading, isError, isSuccess } = useIntegrateTiktok();

  useEffect(() => {
    let channelData: Record<string, any> = {};
    try {
      const rawChannelData = localStorage.getItem("channelData");
      if (rawChannelData) {
        channelData = JSON.parse(rawChannelData);
      }
    } catch {
      channelData = {};
    }

    const payload: IntegrateTiktokPayload = {
      company_uid: userInformation?.company_uid || channelData?.company_uid || "",
      name: channelData?.name || "TikTok",
      country: searchParams?.shop_region || channelData?.country || "",
      auth_code: searchParams?.code || searchParams?.auth_code || "",
      channel_max_stock: Number(channelData?.channel_max_stock) || 10,
      location_id: channelData?.location_id,
    };

    integrateTiktok(payload, {
      onSuccess: () => {
        localStorage.removeItem("channelData");
        localStorage.removeItem("reconnect");
      },
    });
  }, []);

  const loading = isLoading;
  const error = isError;

  const renderStatus = () => {
    if (loading || (!isSuccess && !error)) {
      return (
        <div className="flex flex-col items-center">
          <Loader2 className="my-10 size-12 animate-spin text-blue-500" />
          <h4 className="text-xl font-semibold text-gray-700">Connecting to TikTok...</h4>
          <p className="mt-2 max-w-sm text-center text-gray-500">
            Please wait while we complete the integration.
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center">
          <XCircle className="my-6 size-16 text-red-500" />
          <h4 className="mb-4 mt-6 text-3xl font-semibold text-red-600">
            Integration Failed
          </h4>
          <p className="mx-auto max-w-md text-center text-gray-500">
            Something went wrong while connecting your TikTok channel.
          </p>
          <div className="mt-6 flex gap-4">
            <Button variant="dark" onClick={() => router.push("/settings/all-channels")}>
              Go Back
            </Button>
            <Button variant="outline" onClick={() => router.refresh()}>
              Retry
            </Button>
          </div>
        </div>
      );
    }

    if (isSuccess) {
      return (
        <div className="flex flex-col items-center">
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
        </div>
      );
    }

    return null;
  };

  return (
    <div className="-mb-20 -mt-5 flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <Image
        src="/logos/marketplaces/tiktok.svg"
        alt="TikTok"
        width={120}
        height={40}
        className="mb-1 h-12 w-32 object-contain"
      />
      {renderStatus()}
    </div>
  );
}

export default CallbackTiktok;

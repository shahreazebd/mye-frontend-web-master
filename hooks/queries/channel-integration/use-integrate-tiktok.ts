import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";

export type TiktokChannelMetadata = {
  shop_id: number | string;
  shop_cipher: string;
  location_id?: string | number;
};

export type IntegrateTiktokPayload = {
  company_uid: string;
  name: string;
  country: string;
  auth_code: string;
  channel_max_stock?: number;
  location_id?: string | number;
};

export type IntegrateTiktokResult = {
  auth: any;
  save: any;
  channel: {
    channel_uid: string;
    company_uuid: string;
    name: string;
    country: string;
    channel_metadata: any;
  };
};

const fetcher = async (payload: IntegrateTiktokPayload) => {
  // Step 1: Exchange auth_code and get TikTok metadata
  const authRes = await fetch.post("/tiktok/auth/integrate-channel/", {
    company_uid: payload.company_uid,
    name: payload.name,
    country: payload.country,
    auth_code: payload.auth_code,
  });

  const channel = authRes?.data?.channel;

  // channel_metadata: shop_id, shop_cipher, location_id
  const channel_metadata: TiktokChannelMetadata = {
    shop_id: channel?.channel_metadata?.shop_id,
    shop_cipher: channel?.channel_metadata?.shop_cipher,
    location_id: payload.location_id ? String(payload.location_id) : "",
  };

  // Step 2: Save to integration service with secret-key header
  const saveRes = await fetch.post("/integration/api/v1/channel/add-channel/tiktok/", {
    name: payload.name || channel?.name || "TikTok",
    channel_uid: channel?.channel_uid,
    company_uid: channel?.company_uuid || payload.company_uid,
    channel_type: "tiktok",
    channel_max_stock: Number(payload.channel_max_stock) || 10,
    country: channel?.country || payload.country,
    channel_metadata,
  });

  return {
    auth: authRes?.data,
    save: saveRes?.data,
    channel,
  };
};

export function useIntegrateTiktok() {
  const queryClient = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-channels"]);
    },
    retry: false,
  });
}

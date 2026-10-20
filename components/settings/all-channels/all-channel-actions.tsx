import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { channelAtom } from "@/atoms/channelAtom";
import { Channel } from "@/schema/channel";
import { Row } from "@tanstack/react-table";
import { useAtom } from "jotai";
import { File, FolderDot, FolderSync, Settings, Settings2 } from "lucide-react";

import CSVStockUpdateDialog from "./csv-stock-update-dialog";
import { FullStockUpdateALert } from "./full-stock-update-alert";

export const handleReconnect = (
  channelUid: string,
  channelType: string,
  country: string
) => {
  const ebayURL =
    "https://auth.ebay.com/oauth2/authorize?client_id=EvidentB-mye-PRD-7a28ec690-fd9b983c&response_type=code&redirect_uri=Evident_BD_Ltd-EvidentB-mye-PR-gamzbydd&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly https://api.ebay.com/oauth/api_scope/commerce.message";

  localStorage.setItem("channelData", JSON.stringify({ channelUid: channelUid }));

  if (channelType === "ebay") {
    localStorage.setItem("reconnect", "ebayReconnect");
    window.open(ebayURL, "_blank");
  } else if (channelType === "amazon") {
    localStorage.setItem("reconnect", "amazonReconnect");

    let end_point_extension;

    if (country === "United States of America") {
      end_point_extension = "com";
    } else if (country === "United Kingdom") {
      end_point_extension = "co.uk";
    } else if (country === "Australia") {
      end_point_extension = "com.au";
    } else if (country === "Germany") {
      end_point_extension = "de";
    } else {
      end_point_extension = "com";
    }

    const URL = `https://sellercentral.amazon.${end_point_extension}/apps/authorize/consent?application_id=amzn1.sp.solution.5978c345-3158-4941-abbb-0d0d9b72575d&state=stateexample&version=beta`;

    window.open(URL, "_blank");
  } else if (channelType === "tiktok") {
    localStorage.setItem("reconnect", "tiktokReconnect");
    const tiktokURL =
      country === "United States of America"
        ? "https://services.us.tiktokshop.com/open/authorize?service_id=7436612112146466615"
        : "https://services.tiktokshop.com/open/authorize?service_id=7436612112146466615";

    window.open(tiktokURL, "_blank");
  }
};

export default function AllChannelActions({ row }: { row: Row<Channel> }) {
  const [isOpenFullStockAlert, setIsOpenFullStockAlert] = useState(false);
  const [isOpenCSVStockDialog, setIsOpenCSVStockDialog] = useState(false);

  const [, setChannel] = useAtom(channelAtom);

  const { channel_uid, channel_type, country, is_authorized } = row.original ?? {};

  const handelEditChannelOpen = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    setChannel((prev) => {
      return {
        ...prev,
        isChannelSheetOpen: true,
        channelDetails: row.original,
      };
    });
  };

  const handleFullStockUpdate = async (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    setIsOpenFullStockAlert(true);
  };

  const handleCSVStockUpdate = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    setIsOpenCSVStockDialog(true);
  };

  return (
    <div className="flex w-full gap-6">
      <Link
        href={`/mapping/${channel_uid}`}
        className="flex items-center gap-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Settings2 size={18} />
        Mapping
      </Link>

      <div
        className="flex cursor-pointer items-center gap-1"
        onClick={handelEditChannelOpen}
      >
        <Settings size={18} />
        Settings
      </div>

      <div
        className="flex cursor-pointer items-center gap-1"
        onClick={handleFullStockUpdate}
      >
        <FolderDot size={18} /> Full Stock Update
      </div>

      <div
        className="flex cursor-pointer items-center gap-1"
        onClick={handleCSVStockUpdate}
      >
        <File size={18} /> CSV Stock Update
      </div>

      {!is_authorized && (
        <div
          className="flex cursor-pointer items-center gap-1"
          onClick={() => handleReconnect(channel_uid, channel_type, country)}
        >
          <FolderSync size={18} /> <span>Reconnect</span>
        </div>
      )}

      {isOpenFullStockAlert && (
        <FullStockUpdateALert
          isOpenFullStockAlert={isOpenFullStockAlert}
          setIsOpenFullStockAlert={setIsOpenFullStockAlert}
          channelUid={channel_uid}
          name={row?.original?.name}
        />
      )}

      {isOpenCSVStockDialog && (
        <CSVStockUpdateDialog
          isOpenCSVStockDialog={isOpenCSVStockDialog}
          setIsOpenCSVStockDialog={setIsOpenCSVStockDialog}
          channelUid={channel_uid}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { channelAtom } from "@/atoms/channelAtom";
import { groupBy } from "@/utils/helpers";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";

import useChannelInventorySync from "@/hooks/queries/channel-integration/useChannelInventorySync";
import useChannelOrderSync from "@/hooks/queries/channel-integration/useChannelOrderSync";
import useGetChannels from "@/hooks/queries/channel/useGetChannels";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { NoDataPlaceholder } from "@/components/core/no-data-placeholder";

import AllChannelHeader from "./all-channel-header";
import SettingsSheet from "./settings-channel-sheet";
import SingleChannelCard from "./single-channel-card";

export interface InventorySync {
  order_sync?: boolean;
  inventory_sync: boolean;
  channel_uid: string;
  company_uid: string;
}

export interface OrderSync {
  order_sync: boolean;
  channel_uid: string;
  company_uid: string;
  inventory_sync?: string;
}

// eslint-disable-next-line no-unused-vars
export let onInventorySyncChange = (value: InventorySync) => {};
// eslint-disable-next-line no-unused-vars
export let onOrderSyncChange = (value: OrderSync) => {};

export default function AllChannelsWrapper() {
  const [channel] = useAtom(channelAtom);
  const { data, isLoading } = useGetChannels();
  const { mutate: syncOrder } = useChannelOrderSync();
  const { mutate: syncInventory } = useChannelInventorySync();
  const [payload, setPayload] = useState<InventorySync | OrderSync>();

  onInventorySyncChange = (value: InventorySync) => {
    setPayload(() => value);
  };

  onOrderSyncChange = (value: OrderSync) => {
    setPayload(() => value);
  };

  const handelUserConfirmation = () => {
    if (payload?.order_sync === undefined) {
      syncInventory(payload);
    } else {
      syncOrder(payload);
    }
  };

  const channelGroup = groupBy(data, (e) => e.channel_type);

  const syncType = payload?.order_sync ? "order" : "inventory";

  return (
    <>
      <AllChannelHeader />

      <AlertDialog>
        {isLoading ? (
          <div className="flex h-[calc(100vh-130px)] items-center justify-center">
            <Loader2 className="size-16 animate-spin" />
          </div>
        ) : data?.length ? (
          channelGroup
            .sort((a, b) => a.key.localeCompare(b.key))
            .map((channel) => (
              <SingleChannelCard
                key={channel.key}
                data={channel.values}
                isLoading={isLoading}
                logo={`/logos/marketplaces/round/${channel.key}.svg`}
                alt={channel.key}
              />
            ))
        ) : (
          <NoDataPlaceholder className="h-[calc(100vh-130px)]" title="No channel found" />
        )}

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {payload?.inventory_sync || payload?.order_sync
                ? `This action cannot be undone. This will start the ${syncType} syncing process.`
                : `This action cannot be undone. This will close the ${syncType} syncing process.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handelUserConfirmation}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {channel.isChannelSheetOpen && <SettingsSheet />}
    </>
  );
}

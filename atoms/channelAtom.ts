import { Channel } from "@/schema/channel";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const channelAtom = atom({
  uuid: "",
  isChannelSheetOpen: false,
  channelDetails: {} as Channel | null,
});
export const channelAtomWithStorage = atomWithStorage("channelDetails", {} as Channel);

export function useChannelAtom() {
  const [channelId, setChannelId] = useAtom(channelAtom);
  return { channelId, setChannelId };
}

export function useChannelAtomWithStorage() {
  const [channelWithStorage, setChannelWithStorage] = useAtom(channelAtomWithStorage);
  return { channelWithStorage, setChannelWithStorage };
}

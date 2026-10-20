import { atom, useAtom } from "jotai";

import { RemoteProduct } from "@/types/remote-product";

type RemoteProductsFilterType = { linked: string; syncInventory: boolean | null };

const remoteProductsFilterAtom = atom({
  linked: "",
  syncInventory: null,
} as RemoteProductsFilterType);

const unlinkAlert = atom({
  isOpen: false,
  description: "",
});

const unlinkRowAtom = atom<RemoteProduct | null>(null);

export function useUnlinkRow() {
  const [unlinkRow, setUnlinkRow] = useAtom(unlinkRowAtom);
  return { unlinkRow, setUnlinkRow };
}

export function useRemoteProductFilterBy() {
  const [remoteProductsFilterBy, setRemoteProductsFilterBy] = useAtom(
    remoteProductsFilterAtom
  );
  return { remoteProductsFilterBy, setRemoteProductsFilterBy };
}

export function useUnlinkAlertStatus() {
  const [isUnlinkAlertOpen, setIsUnlinkAlertOpen] = useAtom(unlinkAlert);
  return { isUnlinkAlertOpen, setIsUnlinkAlertOpen };
}

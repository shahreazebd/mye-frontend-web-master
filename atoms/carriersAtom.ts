import type { ParcelSize } from "@/schema/royalmail-service";
import { atom, useAtom } from "jotai";

import { AmazonCarrier, EligibleShippingService } from "@/types/amazon-carriers-option";

const carrierUuidAtom = atom("");
export function useCarrierUuidAtom() {
  const [carrierUuid, setCarrierUuid] = useAtom(carrierUuidAtom);

  return {
    carrierUuid,
    setCarrierUuid,
  };
}

const royalMailServiceAtom = atom("");

export function useRoyalmailServiceAtom() {
  const [royalMailService, setRoyalMailService] = useAtom(royalMailServiceAtom);

  return { royalMailService, setRoyalMailService };
}

const royalMailParcelSizeAtom = atom("" as ParcelSize);

export function useRoyalMailParcelSizeAtom() {
  const [royalMailParcelSize, setRoyalMailParcelSize] = useAtom(royalMailParcelSizeAtom);

  return { royalMailParcelSize, setRoyalMailParcelSize };
}

const amazonCarrierOptionsAtom = atom({} as Record<string, AmazonCarrier>);

export function useAmazonCarrierOptions() {
  const [amazonCarrierOptions, setAmazonCarrierOptions] = useAtom(
    amazonCarrierOptionsAtom
  );

  return {
    amazonCarrierOptions,
    setAmazonCarrierOptions,
  };
}

const selectedCarrierKVAtom = atom({} as Record<string, EligibleShippingService | null>);

export function useSelectedCarrierKV() {
  const [selectedCarrierKV, setSelectedCarrierKV] = useAtom(selectedCarrierKVAtom);

  return {
    selectedCarrierKV,
    setSelectedCarrierKV,
  };
}

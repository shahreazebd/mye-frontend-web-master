import { atom, useAtom } from "jotai";

const shippingCarrierAtom = atom({
  isOpenCarrierDeleteAlert: false,
  isOpenCarrierEditDialog: false,
  carrierData: {} as any,
});

export function useShippingCarrierAtom() {
  const [carrier, setCarrier] = useAtom(shippingCarrierAtom);

  return { carrier, setCarrier };
}

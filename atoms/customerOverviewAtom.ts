import { atom, useAtom } from "jotai";

import { CustomarOverview } from "@/types/customer-overview";

const CustomerOverOldAtom = atom({
  detailsModal: false,
  data: {} as CustomarOverview,
});

export function useCustomerOverOldAtom() {
  const [CustomerOverOld, setCustomerOverOld] = useAtom(CustomerOverOldAtom);

  return { CustomerOverOld, setCustomerOverOld };
}

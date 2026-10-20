import { atom, useAtom } from "jotai";

import type { DispatchOrders } from "@/types/dispatched-order";

const dispatchedOrdersAtom = atom({
  isDispatchedOrdersInfoModalOpen: false,
  dispatchedOrdersInfo: {} as DispatchOrders,
});

export function useDispatchedOrdersAtom() {
  const [dispatchedOrdersInfo, setDispatchedOrdersInfo] = useAtom(dispatchedOrdersAtom);
  return {
    dispatchedOrdersInfo,
    setDispatchedOrdersInfo,
  };
}

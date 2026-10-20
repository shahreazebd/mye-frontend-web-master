import dayjs from "dayjs";
import { atom, useAtom } from "jotai";

const filterAtom = atom({
  sku: "",
  returnId: "",
  orderId: "",
  channelUid: "",
  trackingId: "",
  startDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
  endDate: dayjs().format("YYYY-MM-DD"),
});

export function useReturnOrderFilterAtom() {
  const [filter, setFilter] = useAtom(filterAtom);

  return { filter, setFilter };
}

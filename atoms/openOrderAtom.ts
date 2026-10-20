import { MappedOpenOrder, OpenOrder } from "@/schema/open-order";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const openOrderAtomWithStorage = atomWithStorage("orderData", [] as MappedOpenOrder[]);

export function useOpenOrderAtomWithStorage() {
  const [openOrdersWithStorage, setOpenOrdersWithStorage] = useAtom(
    openOrderAtomWithStorage
  );

  return { openOrdersWithStorage, setOpenOrdersWithStorage };
}

const postagePreviewStorage = atom([] as MappedOpenOrder[]);

export function usePostagePreviewStorage() {
  const [selectedRows, setSelectedRows] = useAtom(postagePreviewStorage);

  return { selectedRows, setSelectedRows };
}

const openOrderAtom = atom({
  isDispatchOrderModalOpen: false,
  isCancelOrderModalOpen: false,
});

const openOrderDetailsModalAtom = atom(false);
export function useIsOpenOrderDetailsModalOpenAtom() {
  const [isOpenOrderDetailsModalOpen, setIsOpenOrderDetailsModalOpen] = useAtom(
    openOrderDetailsModalAtom
  );
  return { isOpenOrderDetailsModalOpen, setIsOpenOrderDetailsModalOpen };
}

const activeOpenOrderAtom = atom({} as OpenOrder);

export function useActiveOpenOrderAtom() {
  const [activeOpenOrder, setActiveOpenOrder] = useAtom(activeOpenOrderAtom);

  return { activeOpenOrder, setActiveOpenOrder };
}

export default openOrderAtom;

const paginationAtom = atom({
  pageIndex: 0,
  pageSize: 100,
});

export function useOpenOrderPaginationAtom() {
  const [pagination, setPagination] = useAtom(paginationAtom);

  return { pagination, setPagination };
}

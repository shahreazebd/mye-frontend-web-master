import { atom, useAtom } from "jotai";

const paginationAtom = atom({
  pageIndex: 0,
  pageSize: 100,
});

export function useStockInquiryPaginationAtom() {
  const [pagination, setPagination] = useAtom(paginationAtom);

  return { pagination, setPagination };
}

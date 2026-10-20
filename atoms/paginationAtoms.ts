import { atom, useAtom } from "jotai";

const paginationAtom = atom({
  page: 0,
  pageSize: 0,
});

export function usePaginationAtom() {
  const [pagination, setPagination] = useAtom(paginationAtom);

  return { pagination, setPagination };
}

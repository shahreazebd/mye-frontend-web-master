import { atom, useAtom } from "jotai";

const customerListpaginationAtom = atom({
  pageIndex: 1,
  pageSize: 20,
});

export function useCustomerPaginationAtom() {
  const [customerListPagination, setCustomerListPagination] = useAtom(
    customerListpaginationAtom
  );
  return {
    customerListPagination,
    setCustomerListPagination,
  };
}

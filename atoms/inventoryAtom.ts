import { atom, useAtom } from "jotai";

import { Inventory } from "@/types/inventory";

export const inventoryAtom = atom({
  sku: "",
  localProductId: 0,
  locationId: 0,
  isInventoryDetailsModalOpen: false,
  isSettingsSheetOpen: false,
  searchQuery: "",
  selectedInventory: {} as Inventory,
});

export function useInventoryAtom() {
  const [inventoryStore, setInventoryStore] = useAtom(inventoryAtom);

  return {
    inventoryStore,
    setInventoryStore,
  };
}

const paginationAtom = atom({
  pageIndex: 0,
  pageSize: 100,
});

export function useInventoryPaginationAtom() {
  const [pagination, setPagination] = useAtom(paginationAtom);

  return { pagination, setPagination };
}

const stockHistoryListFiltersAtom = atom<{
  startDate: Date | undefined;
  endDate: Date | undefined;
  operation: string;
  locationId: string;
}>({
  startDate: undefined,
  endDate: undefined,
  operation: "",
  locationId: "",
});

export function useStockHistoryListFiltersAtom() {
  const [stockHistoryListFilters, setStockHistoryListFilters] = useAtom(
    stockHistoryListFiltersAtom
  );

  return {
    stockHistoryListFilters,
    setStockHistoryListFilters,
  };
}

const stockHistoryListPaginationAtom = atom({
  pageIndex: 0,
  pageSize: 100,
});

export function useStockHistoryListPaginationAtom() {
  const [stockHistoryListPagination, setStockHistoryListPagination] = useAtom(
    stockHistoryListPaginationAtom
  );

  return {
    stockHistoryListPagination,
    setStockHistoryListPagination,
  };
}

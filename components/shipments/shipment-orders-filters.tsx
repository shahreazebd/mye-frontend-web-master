"use client";

import { useEffect, useState } from "react";
import {
  useShipmentOrdersFiltersAtom,
  useShipmentOrdersPaginationAtom,
} from "@/atoms/postageAtom";

import useDebounce from "@/hooks/custom/useDebounce";

import { CarrierSelect } from "../order/open-orders/postage-preview/carrier-select";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function ShipmentOrdersFilters() {
  const { filters, setFilters } = useShipmentOrdersFiltersAtom();
  const { setPagination } = useShipmentOrdersPaginationAtom();

  const [searchVal, setSearchVal] = useState(filters.q || "");
  const debouncedSearchVal = useDebounce(searchVal, 500);

  useEffect(() => {
    setSearchVal(filters.q || "");
  }, [filters.q]);

  useEffect(() => {
    setFilters((prev) => {
      if (prev.q === debouncedSearchVal) return prev;
      return { ...prev, q: debouncedSearchVal };
    });
    setPagination((prev) => {
      if (prev.pageIndex === 0) return prev;
      return { ...prev, pageIndex: 0 };
    });
  }, [debouncedSearchVal, setFilters, setPagination]);

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        placeholder="Search orders..."
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        className="h-8 w-[220px] bg-white lg:w-[320px]"
      />

      <Select value={filters.status} onValueChange={(val) => updateFilter("status", val)}>
        <SelectTrigger className="h-8 w-[130px] bg-white capitalize">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent side="bottom" className="z-[50]">
          <SelectItem value="ALL">All Statuses</SelectItem>
          <SelectItem value="PROCESSING">Processing</SelectItem>
          <SelectItem value="SUCCESS">Success</SelectItem>
          <SelectItem value="FAILED">Failed</SelectItem>
        </SelectContent>
      </Select>

      <CarrierSelect
        isShowAll={true}
        onValueChange={(val) => updateFilter("carrierType", val)}
      />
    </div>
  );
}

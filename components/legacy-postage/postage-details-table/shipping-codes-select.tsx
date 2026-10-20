"use client";

import { useEffect } from "react";
import { useShippingCodeSelectAtom } from "@/atoms/postageAtom";
import {
  shippingCarriersEbay,
  shippingCarriersOtto,
} from "@/constants/shipping-carriers";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ShippingCodesSelect({ marketplace }: Readonly<{ marketplace: string }>) {
  const { setShippingCode } = useShippingCodeSelectAtom();

  useEffect(() => {
    setShippingCode("");
  }, []);

  const shippingCarriers =
    marketplace === "ebay" ? shippingCarriersEbay : shippingCarriersOtto;

  return (
    <Select onValueChange={setShippingCode}>
      <SelectTrigger className="h-[32px] w-[200px]">
        <SelectValue placeholder="Select a shipping carrier" />
      </SelectTrigger>
      <SelectContent>
        {shippingCarriers?.map((code) => (
          <SelectItem key={code.value} value={code.value}>
            {code.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

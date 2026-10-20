"use client";

import { useEffect, useState } from "react";
import { useCarrierUuidAtom } from "@/atoms/carriersAtom";

import useGetAllCarriers from "@/hooks/queries/carriers/use-get-carriers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  carrier: string;
  className?: string;
  onValueChange?: (value: string) => void;
  defaultAccount?: string;
};

export default function CarrierAccountSelect(props: Readonly<Props>) {
  const { data: carriers } = useGetAllCarriers(props?.carrier);

  const [value, setValue] = useState(props?.defaultAccount);

  const { setCarrierUuid } = useCarrierUuidAtom();

  function onCarrierChangeHandler(value: string) {
    setValue(value);
    setCarrierUuid(value);
    props.onValueChange?.(value);
  }

  useEffect(() => {
    setValue(props?.defaultAccount);
  }, [props?.defaultAccount]);

  return (
    <Select onValueChange={onCarrierChangeHandler} value={value}>
      <SelectTrigger className={props?.className}>
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {carriers?.map((carrier) => (
            <SelectItem key={carrier?.uuid} value={carrier?.uuid}>
              {carrier?.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

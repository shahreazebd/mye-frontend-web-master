import { useEffect, useRef, useState } from "react";
import locationAtom from "@/atoms/locationAtom";
import type { CellContext } from "@tanstack/react-table";
import { useAtom } from "jotai";

import type { Inventory } from "@/types/inventory";
import useAuth from "@/hooks/custom/useAuth";
import useUpdateMinimumStock from "@/hooks/queries/inventory/use-update-minimum-stock";

import { Input } from "../ui/input";

export default function MinimumQuantity(props: CellContext<Inventory, unknown>) {
  const initialValue = props?.getValue() as number;

  const { userInformation } = useAuth();

  const [toggle, setToggle] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);

  const [location] = useAtom(locationAtom);

  const { mutate: updateMinimumStock } = useUpdateMinimumStock(location?.locationId);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [toggle]);

  function toggleInput() {
    if (
      ["owner", "parent"]?.includes(userInformation?.type!) ||
      userInformation?.user_email === "shobuj@roughandtough.co.uk"
    )
      setToggle(false);
  }

  function onBlur() {
    const payload = {
      sku: props?.row?.original?.local_product?.sku,
      company_uid: props?.row?.original?.company_uid,
      minimum_quantity: value,
      location_id: +location?.locationId,
    };

    updateMinimumStock([payload], {
      onError: () => {
        setValue(initialValue);
      },
    });

    setToggle(true);
  }

  return (
    <div onDoubleClick={toggleInput} className="w-28 text-center">
      {toggle ? (
        <span>{value}</span>
      ) : (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.valueAsNumber)}
          onBlur={onBlur}
          onKeyUp={(e) => {
            if (e?.key === "Enter") onBlur();
          }}
          type="number"
          className="h-7 w-28"
          ref={inputRef}
        />
      )}
    </div>
  );
}

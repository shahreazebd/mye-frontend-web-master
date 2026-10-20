import { useEffect, useRef, useState } from "react";
import { useCompositeProductsAtom } from "@/atoms/productsAtom";
import type { Data } from "@/schema/product";
import type { CellContext } from "@tanstack/react-table";
import { Edit } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function QuantityCell(props: CellContext<Data, unknown>) {
  const initialValue = props.getValue() as number;

  const { compositeProductsState } = useCompositeProductsAtom();

  const [toggle, setToggle] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);

  const status = compositeProductsState.selectedCompositeProduct
    .map((e) => e.sku)
    .includes(props.row.original.sku);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggle]);

  function toggleInput() {
    if (status) setToggle(false);
  }

  function onBlur() {
    // @ts-ignore
    props.table.options.meta?.updateData(
      props.row.index,
      props.column.id,
      value,
      "composite"
    );
    setToggle(true);
  }

  return (
    <div>
      {toggle ? (
        <div className="ml-2 flex items-center gap-x-8">
          <span>{value}</span>
          <Edit size={16} onClick={toggleInput} className="z-[99999] cursor-pointer" />
        </div>
      ) : (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.valueAsNumber)}
          onBlur={onBlur}
          onKeyUp={(e) => {
            if (e.key === "Enter") onBlur();
          }}
          type="number"
          className="h-7 w-28"
          ref={inputRef}
        />
      )}
    </div>
  );
}

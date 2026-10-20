import productsAtom from "@/atoms/productsAtom";
import { Data } from "@/schema/product";
import { Table } from "@tanstack/react-table";
import { useAtom } from "jotai";

import { Checkbox } from "@/components/ui/checkbox";

import { allProductSelected } from "./products-health-wrapper";

interface Props {
  table: Table<Data>;
}

export default function ProductHeaderCheckbox({ table }: Props) {
  const [, setProduct] = useAtom(productsAtom);

  function handelCheckedChange(value: boolean, table: Table<Data>) {
    table.toggleAllPageRowsSelected(!!value);

    setProduct((prev) => ({
      ...prev,
      selectedProducts: value ? allProductSelected() : ([] as number[]),
    }));
  }

  return (
    <>
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => handelCheckedChange(value as boolean, table)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    </>
  );
}

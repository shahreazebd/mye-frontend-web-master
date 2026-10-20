import productsAtom from "@/atoms/productsAtom";
import { Data } from "@/schema/product";
import { Row } from "@tanstack/react-table";
import { useAtom } from "jotai";

import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  row: Row<Data>;
}

export default function ProductCellCheckbox({ row }: Props) {
  const [, setProduct] = useAtom(productsAtom);

  function handelCheckedChange(value: boolean) {
    row.toggleSelected(!!value);

    setProduct((prev) => ({
      ...prev,
      selectedProducts: value
        ? [...prev.selectedProducts, row.original?.id as number]
        : prev.selectedProducts.filter((item) => item !== row.original?.id),
    }));
  }

  return (
    <>
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => handelCheckedChange(value as boolean)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    </>
  );
}

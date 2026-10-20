import { useInventoryAtom } from "@/atoms/inventoryAtom";
import { CheckSquare, Copy } from "lucide-react";

import type { Inventory } from "@/types/inventory";
import useSkuCopy from "@/hooks/custom/useSkuCopy";

interface Props {
  data: Inventory;
}

export default function SKUCell({ data }: Readonly<Props>) {
  const { handleCopy, isClicked } = useSkuCopy();

  const { setInventoryStore } = useInventoryAtom();

  function handelEditClick() {
    setInventoryStore((prev) => ({
      ...prev,
      isInventoryDetailsModalOpen: true,
      localProductId: data?.local_product?.local_product_id,
      sku: data?.local_product?.sku,
      locationId: data?.location,
    }));
  }

  return (
    <div className="group">
      <span
        className="relative inline-flex w-max cursor-pointer items-center gap-1.5"
        onDoubleClick={handelEditClick}
      >
        {data?.local_product?.sku}

        {data?.local_product?.is_composite && (
          <span className="select-none rounded bg-cyan-900 px-1 py-0.5 text-[9px] font-medium leading-none text-white">
            Composite
          </span>
        )}

        {isClicked ? (
          <CheckSquare className="absolute -right-7 ml-2.5 size-3.5 cursor-pointer font-thin text-green-700 transition ease-in-out" />
        ) : (
          <Copy
            onClick={() => handleCopy(data?.local_product?.sku)}
            className="absolute -right-7 ml-2.5 hidden size-3.5 animate-pulse cursor-pointer font-thin transition ease-in-out hover:duration-0 group-hover:block"
          />
        )}
      </span>
    </div>
  );
}

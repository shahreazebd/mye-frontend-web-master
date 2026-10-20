import productsAtom from "@/atoms/productsAtom";
import type { Data } from "@/schema/product";
import { useAtom } from "jotai";

// import { CirclePlusIcon } from "lucide-react";

import { CopyText } from "@/components/shared/copy-text";

export default function ProductSkuCell({ data }: { data: Data }) {
  const [, setProduct] = useAtom(productsAtom);

  const handleProductClick = () => {
    setProduct((prev) => ({
      ...prev,
      isProductDetailsModalOpen: true,
      singleProduct: data,
    }));
  };

  return (
    <div
      title="Double click to add/edit composite products"
      className="relative cursor-pointer items-center pr-5"
      onDoubleClick={handleProductClick}
    >
      <div className="inline-flex items-center">
        {data.sku}

        {data?.is_composite ? (
          <span className="ml-2 rounded-md bg-cyan-900 px-1.5 py-1 text-[11px] leading-none text-white">
            Composite
          </span>
        ) : (
          ""
        )}

        <CopyText className="absolute right-0 ml-2" text={data.sku} />

        {/* <CirclePlusIcon className="absolute -right-7 hidden h-4 animate-pulse text-gray-700 hover:duration-0 group-hover:block" /> */}
      </div>
    </div>
  );
}

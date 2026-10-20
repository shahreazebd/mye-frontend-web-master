import productsAtom from "@/atoms/productsAtom";
import type { Data } from "@/schema/product";
import { useAtom } from "jotai";

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
    <div className="cursor-pointer" onDoubleClick={handleProductClick}>
      {data.sku}
    </div>
  );
}

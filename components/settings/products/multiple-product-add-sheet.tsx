import productsAtom from "@/atoms/productsAtom";
import { useAtom } from "jotai";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ProductTab from "@/components/inventory/product-tab";

export default function MultipleProductAddSheet() {
  const [product, setProduct] = useAtom(productsAtom);

  const sheetClose = () => {
    setProduct((prev) => ({
      ...prev,
      isMultipleProductAddSheet: false,
    }));
  };

  return (
    <>
      <Sheet open={product.isMultipleProductAddSheet} onOpenChange={sheetClose}>
        <SheetContent className="w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Import Multiple Products</SheetTitle>
            <ProductTab />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

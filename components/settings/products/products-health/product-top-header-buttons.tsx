import Link from "next/link";
import productsAtom from "@/atoms/productsAtom";
import { useAtom } from "jotai";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ProductTopHeaderButtons() {
  const [products, setProduct] = useAtom(productsAtom);

  const handleDelete = () => {
    setProduct((prev) => ({ ...prev, isMultipleProductDeleteModal: true }));
  };

  return (
    <div className="space-x-2">
      {products.selectedProducts.length > 0 && (
        <>
          <Button variant="outline" className="h-8" onClick={handleDelete}>
            <Trash className="h-4" /> &nbsp;Delete
          </Button>
        </>
      )}

      <Link href="#">
        <Button variant="outline" className="h-8">
          <div className="h-4">Fix All</div>
        </Button>
      </Link>
    </div>
  );
}

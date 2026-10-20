import { useCallback, useState } from "react";
import productsAtom from "@/atoms/productsAtom";
import { useAtom } from "jotai";
import { Plus, Trash, Upload } from "lucide-react";

import useAuth from "@/hooks/custom/useAuth";
import useMultipleDelete from "@/hooks/queries/product/useMultipleDelete";
import { Button } from "@/components/ui/button";
import DeleteAlert from "@/components/delete-alert";

import { AttributesUpdate } from "./attributes-update";

export default function ProductTopHeaderButtons() {
  const { userInformation } = useAuth();
  const { mutate: deleteBulkProducts, isLoading } = useMultipleDelete();
  const [products, setProduct] = useAtom(productsAtom);

  const [open, setOpen] = useState(false);

  function handleImport() {
    setProduct((prev) => ({ ...prev, isMultipleProductAddSheet: true }));
  }

  function handleUpdateProduct() {
    setProduct((prev) => ({ ...prev, isMultipleProductEditSheet: true }));
  }

  function handleAddNew() {
    setProduct((prev) => ({ ...prev, isSingleProductAddSheet: true }));
  }

  function deleteProductsHandler() {
    const payload = {
      company_uid: userInformation?.company_uid as string,
      product_ids: products.selectedProducts,
    };

    deleteBulkProducts(payload);
  }

  const a = useCallback(setOpen, []);

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" className="h-8 bg-white" onClick={handleImport}>
        <Upload className="h-4" /> &nbsp;Import
      </Button>
      <Button variant="outline" className="h-8 bg-white" onClick={handleUpdateProduct}>
        <Upload className="h-4" /> &nbsp;Update Product
      </Button>
      <Button variant="outline" className="h-8 bg-white" onClick={handleAddNew}>
        <Plus className="h-4" /> &nbsp;Add New
      </Button>
      <AttributesUpdate />
      {products?.selectedProducts?.length > 0 && (
        <Button
          disabled={isLoading}
          variant="outline"
          className="h-8"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4" /> &nbsp;Delete
        </Button>
      )}
      <DeleteAlert
        isLoading={isLoading}
        deletedItemName="Products"
        removeFunction={deleteProductsHandler}
        open={open}
        setOpen={a}
      />
    </div>
  );
}

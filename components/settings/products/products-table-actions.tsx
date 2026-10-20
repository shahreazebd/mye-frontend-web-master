"use client";

import { useState } from "react";
import productsAtom from "@/atoms/productsAtom";
import { Data } from "@/schema/product";
import { useAtom } from "jotai";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import useAuth from "@/hooks/custom/useAuth";
import useDeleteProduct from "@/hooks/queries/product/use-delete.product";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteAlert from "@/components/delete-alert";

interface Props {
  data: Data;
}

// eslint-disable-next-line no-unused-vars
export function ProductsTableActions({ data }: Props) {
  const [, setProduct] = useAtom(productsAtom);

  const { mutate: deleteProduct } = useDeleteProduct();

  const { userInformation } = useAuth();

  function openSheetHandler() {
    setProduct((prev) => ({
      ...prev,
      singleProduct: data,
      isSingleProductEditSheet: true,
    }));

    document.body.style.pointerEvents = "";
  }

  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[160px]"
          onClick={(event) => event.stopPropagation()}
        >
          <DropdownMenuItem onClick={openSheetHandler}>
            <Edit className="text-muted-foreground/70 mr-2 size-3.5" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="text-muted-foreground/70 mr-2 size-3.5" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteAlert
        deletedItemName="Products"
        removeFunction={() => {
          deleteProduct({
            productId: data.id,
            companyUid: userInformation?.company_uid!,
          });
        }}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

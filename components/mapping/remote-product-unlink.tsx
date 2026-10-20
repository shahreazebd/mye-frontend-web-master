import React from "react";
import { useUnlinkRow } from "@/atoms/remoteProductsAtom";
import { Row } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

import { RemoteProduct } from "@/types/remote-product";
import useUnlinkProduct from "@/hooks/queries/mapping/useUnlinkProduct";

interface Props {
  row: Row<RemoteProduct>;
}

export default function RemoteProductUnlink({ row }: Readonly<Props>) {
  const { mutate: unlinkProduct, isLoading } = useUnlinkProduct();

  const mappedId = row.original.mapping?.mapped_id?.toString();

  const { setUnlinkRow } = useUnlinkRow();

  function handleUnlink(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();

    if (mappedId) {
      setUnlinkRow(row.original);
      unlinkProduct(mappedId);
    }
  }

  const sku = row.original?.mapping?.mapped_local_product?.sku;

  return (
    <>
      {sku ? (
        <button
          className="flex h-6 w-[65px] cursor-pointer items-center justify-center rounded-md bg-[#ee1e5f] px-2 text-center text-[13px] font-bold text-white hover:bg-[#ee1e5f]/80 disabled:cursor-not-allowed"
          onClick={(e) => handleUnlink(e)}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Unlink"}
        </button>
      ) : (
        <div className="h-6"></div>
      )}
    </>
  );
}

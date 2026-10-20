import React from "react";
import { CheckSquare, Copy } from "lucide-react";

import { RemoteProduct } from "@/types/remote-product";
import useSkuCopy from "@/hooks/custom/useSkuCopy";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export function RemoteProductMappingColumn({ row }: { row: RemoteProduct }) {
  const { handleCopy, isClicked } = useSkuCopy();

  return (
    <div className="flex min-w-[280px] items-center gap-x-1 overflow-hidden text-left text-sm">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-x-2">
              <p className="text-sm">{row?.mapping?.mapped_local_product?.sku}</p>
              {isClicked && (
                <CheckSquare className="inline size-4 cursor-pointer text-green-600 transition ease-in-out" />
              )}

              {!isClicked && row?.mapping?.mapped_local_product?.sku && (
                <Copy
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(row?.mapping?.mapped_local_product?.sku as string);
                  }}
                  className="inline size-4 cursor-pointer transition ease-in-out"
                />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="w-[200px] text-left">
            {row?.mapping?.mapped_local_product?.sku}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

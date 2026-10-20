"use client";

import { Row } from "@tanstack/react-table";
import { CheckSquare, Copy } from "lucide-react";

import { RemoteProduct } from "@/types/remote-product";
import useSkuCopy from "@/hooks/custom/useSkuCopy";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  row: Row<RemoteProduct>;
};

export function RemoteProductSkuCell({ row }: Props) {
  const { handleCopy, isClicked } = useSkuCopy();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className="flex w-auto items-center gap-x-2 overflow-hidden text-left text-sm"
            style={{ whiteSpace: "nowrap" }}
          >
            {row.getValue("remote_product_sku")}
            {isClicked ? (
              <CheckSquare className="inline size-4 cursor-pointer text-green-600 transition ease-in-out" />
            ) : (
              <Copy
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(row.getValue("remote_product_sku"));
                }}
                className="inline size-4 cursor-pointer transition ease-in-out"
              />
            )}{" "}
          </div>
        </TooltipTrigger>
        <TooltipContent>{row.getValue("remote_product_sku")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

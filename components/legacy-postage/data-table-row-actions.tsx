"use client";

import { Download, Eye, MoreHorizontal } from "lucide-react";

import type { Postage } from "@/types/postage";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DialogTrigger } from "../ui/dialog";

interface Props {
  data: Postage;
}

export default function DataTableRowActions({ data }: Props) {
  const handelDetailsClick = () => {
    // setLocalPd(() => local_product_id);
    // setLocalSku(() => sku);
  };

  const handelDownloadPostage = () => {
    data?.batchLabel && window.open(data?.batchLabel, "_blank");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted ">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={handelDetailsClick}>
              <Eye className="text-muted-foreground/70 mr-2 size-3.5" />
              Details
            </DropdownMenuItem>
          </DialogTrigger>

          {data?.batchLabel && (
            <DropdownMenuItem onClick={handelDownloadPostage}>
              <Download className="text-muted-foreground/70 mr-2 size-3.5" />
              Download
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

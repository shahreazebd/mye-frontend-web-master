import React from "react";
import { useRemoteProductFilterBy } from "@/atoms/remoteProductsAtom";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function RemoteProductActionHeader() {
  const { setRemoteProductsFilterBy } = useRemoteProductFilterBy();

  return (
    <div className={cn("flex items-center space-x-2")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>Action</span>

            <ChevronsUpDown className="ml-2 size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() =>
              setRemoteProductsFilterBy((prev) => {
                return {
                  ...prev,
                  linked: "link",
                };
              })
            }
          >
            Linked
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              setRemoteProductsFilterBy((prev) => {
                return {
                  ...prev,
                  linked: "unlink",
                };
              })
            }
          >
            Not linked
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() =>
              setRemoteProductsFilterBy((prev) => {
                return {
                  ...prev,
                  linked: "unlink",
                };
              })
            }
          >
            Reset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

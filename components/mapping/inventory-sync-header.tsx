import React from "react";
import { useRemoteProductFilterBy } from "@/atoms/remoteProductsAtom";
import { Column } from "@tanstack/react-table";
import {
  ChevronsUpDown,
  ListRestart,
  RefreshCw,
  RefreshCwOff,
  SortAsc,
  SortDesc,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function InventorySyncHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { setRemoteProductsFilterBy } = useRemoteProductFilterBy();

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <SortDesc className="ml-2 size-4" />
            ) : column.getIsSorted() === "asc" ? (
              <SortAsc className="ml-2 size-4" />
            ) : (
              <ChevronsUpDown className="ml-2 size-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() =>
              setRemoteProductsFilterBy((prev) => {
                return {
                  ...prev,
                  syncInventory: true,
                };
              })
            }
          >
            <RefreshCw className="text-muted-foreground/70 mr-2 size-3.5" />
            Synced
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              setRemoteProductsFilterBy((prev) => {
                return {
                  ...prev,
                  syncInventory: false,
                };
              })
            }
          >
            <RefreshCwOff className="text-muted-foreground/70 mr-2 size-3.5" />
            Not Synced
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              setRemoteProductsFilterBy((prev) => {
                return {
                  ...prev,
                  syncInventory: null,
                };
              })
            }
          >
            <ListRestart className="text-muted-foreground/70 mr-2 size-3.5" />
            Reset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

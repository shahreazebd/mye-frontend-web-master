import React, { useState } from "react";
import { Column } from "@tanstack/react-table";
import { ChevronsUpDown, EyeOff, SortAsc, SortDesc } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [value, setValue] = useState(0);

  if (!column.getCanSort()) {
    return <div className={cn("text-sm", className)}>{title}</div>;
  }

  const handelSetQuantity = () => {
    const payload = {
      quantity: value,
    };

    console.log(payload);
  };

  return (
    <div className={cn("mb-1 flex items-center space-x-2", className)}>
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
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <SortAsc className="text-muted-foreground/70 mr-2 size-3.5" />
            A-Z
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <SortDesc className="text-muted-foreground/70 mr-2 size-3.5" />
            Z-A
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {title === "Minimum Quantity" ? (
            <div className="px-2">
              <p className="mb-2 mt-3 text-sm">All Item Quantity</p>
              <div className="mb-3 flex gap-2">
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.valueAsNumber)}
                  type="number"
                  placeholder="2456"
                  className="h-8 w-28"
                />
                <Button size="sm" className="h-8" onClick={handelSetQuantity}>
                  Set
                </Button>
              </div>
            </div>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="text-muted-foreground/70 mr-2 size-3.5" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

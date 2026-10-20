"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";

import Search from "./search";

interface DataTableToolbarProps {
  title?: string;
  description?: string;
  q?: string | number;
  setQ?: Dispatch<SetStateAction<string | number>>;
  component?: ReactNode;
  card?: ReactNode;
  search?: boolean;
}

export function DataTableToolbar({
  title,
  description,
  component,
  card,
  search = false,
  q,
  setQ,
}: DataTableToolbarProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        {title ? (
          <div>
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex items-center justify-end gap-1">
          {search && <Search onChange={(v) => setQ?.(v)} value={q || ""} />}

          {component && component}
        </div>
      </div>
      {card}
    </>
  );
}

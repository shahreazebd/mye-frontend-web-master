"use client";

import { ReactNode } from "react";

interface DataTableToolbarProps {
  title: string;
  description: string;
  component?: ReactNode;
  card?: ReactNode;
}

export function DataTableBackendToolbar({
  title,
  description,
  component,
  card,
}: DataTableToolbarProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        {title ? (
          <div>
            <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
            <p className="text-left text-xs leading-none text-gray-500">{description}</p>
          </div>
        ) : (
          <></>
        )}

        <div className="flex items-center justify-end gap-2">
          {component && component}
        </div>
      </div>
      {card}
    </>
  );
}

"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function OrderDetailsLoading() {
  return (
    <div className="space-y-4 py-6">
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="space-y-2 rounded-md border p-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
}

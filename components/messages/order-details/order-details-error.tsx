"use client";

import { useMessagesOrderDetailsAtom } from "@/atoms/messages-order-details-atom";
import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function OrderDetailsError() {
  const { error, onRefetch } = useMessagesOrderDetailsAtom();

  const errorMessage =
    error instanceof Error
      ? error.message
      : (error as { message?: string })?.message ||
        "An error occurred while fetching the order from the server.";

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="bg-destructive/10 flex size-12 items-center justify-center rounded-full text-destructive">
        <AlertCircle className="size-6" />
      </div>
      <div className="max-w-md">
        <p className="text-sm font-semibold text-foreground">
          Unable to load order details
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{errorMessage}</p>
      </div>
      {onRefetch && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRefetch()}
          className="mt-2 text-xs"
        >
          <RefreshCw className="mr-1.5 size-3.5" /> Retry Search
        </Button>
      )}
    </div>
  );
}

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const markerVariants = cva("flex items-center gap-2 text-xs text-muted-foreground", {
  variants: {
    variant: {
      default: "justify-center py-2",
      separator:
        "w-full py-2 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border",
      border: "border-b pb-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Marker({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof markerVariants>) {
  return (
    <div
      data-slot="marker"
      className={cn(markerVariants({ variant, className }))}
      {...props}
    />
  );
}

function MarkerIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-icon"
      className={cn("flex size-4 items-center justify-center", className)}
      {...props}
    />
  );
}

function MarkerContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-content"
      className={cn("px-2 font-medium", className)}
      {...props}
    />
  );
}

export { Marker, MarkerIcon, MarkerContent, markerVariants };

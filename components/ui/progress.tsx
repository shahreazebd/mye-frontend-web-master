"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClass?: string;
  value?: number | null; // Allow null for indeterminate states
  showLabel?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, indicatorClass, showLabel = true, ...props }, ref) => {
  const clampedValue = Math.min(Math.max(value ?? 0, 0), 100); // Ensure value is between 0 and 100

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-md bg-muted", // Default height added
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full flex-1 bg-primary transition-all", // Full height of the container
          indicatorClass
        )}
        style={{ width: `${clampedValue}%` }} // Dynamic width via inline style
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className="sr-only">{clampedValue}%</span> {/* Accessible value */}
        {showLabel && <span className="text-xs text-white"> {clampedValue}%</span>}
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

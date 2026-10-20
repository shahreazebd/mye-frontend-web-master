"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bubbleVariants = cva(
  "relative flex w-fit max-w-full flex-col gap-1 rounded-lg px-3.5 py-2.5 text-sm leading-relaxed transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        muted: "bg-muted text-foreground border border-border/80",
        outline: "border bg-card text-card-foreground",
        tinted: "bg-primary/10 text-primary border border-primary/20",
        ghost: "bg-transparent text-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
      align: {
        start: "self-start text-left",
        end: "self-end text-left",
      },
    },
    defaultVariants: {
      variant: "muted",
      align: "start",
    },
  }
);

function Bubble({
  className,
  variant,
  align = "start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof bubbleVariants>) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant, align, className }))}
      {...props}
    />
  );
}

function BubbleContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-content"
      className={cn("w-full break-words text-sm", className)}
      {...props}
    />
  );
}

function BubbleReactions({
  className,
  side = "bottom",
  align = "start",
  ...props
}: React.ComponentProps<"div"> & {
  side?: "top" | "bottom";
  align?: "start" | "end";
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-side={side}
      data-align={align}
      className={cn(
        "absolute -bottom-2 flex items-center gap-1",
        align === "end" ? "right-2" : "left-2",
        side === "top" && "-top-2 bottom-auto",
        className
      )}
      {...props}
    />
  );
}

export { Bubble, BubbleContent, BubbleReactions, bubbleVariants };

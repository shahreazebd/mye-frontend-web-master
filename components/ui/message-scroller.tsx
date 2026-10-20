"use client";

import * as React from "react";
import {
  MessageScroller as MessageScrollerPrimitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller";
import { ArrowDown, ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function MessageScrollerProvider({
  autoScroll = true,
  defaultScrollPosition = "last-anchor",
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Provider>) {
  return (
    <MessageScrollerPrimitive.Provider
      autoScroll={autoScroll}
      defaultScrollPosition={defaultScrollPosition}
      {...props}
    />
  );
}

function MessageScroller({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Root>) {
  return (
    <MessageScrollerPrimitive.Root
      data-slot="message-scroller"
      className={cn("relative flex size-full flex-col overflow-hidden", className)}
      {...props}
    />
  );
}

function MessageScrollerViewport({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Viewport>) {
  return (
    <MessageScrollerPrimitive.Viewport
      data-slot="message-scroller-viewport"
      className={cn(
        "size-full overflow-y-auto overscroll-contain outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      {...props}
    />
  );
}

function MessageScrollerContent({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Content>) {
  return (
    <MessageScrollerPrimitive.Content
      data-slot="message-scroller-content"
      className={cn("flex min-h-full flex-col gap-4 p-4 sm:p-6", className)}
      {...props}
    />
  );
}

function MessageScrollerItem({
  className,
  ...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Item>) {
  return (
    <MessageScrollerPrimitive.Item
      data-slot="message-scroller-item"
      className={cn(className)}
      {...props}
    />
  );
}

function MessageScrollerButton({
  className,
  direction = "end",
  ...props
}: React.ComponentProps<"button"> & {
  direction?: "start" | "end";
}) {
  const scrollable = useMessageScrollerScrollable();
  const { scrollToEnd, scrollToStart } = useMessageScroller();
  const active = direction === "end" ? scrollable.end : scrollable.start;

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-20 flex justify-center">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => {
          if (direction === "end") {
            scrollToEnd({ behavior: "smooth" });
          } else {
            scrollToStart({ behavior: "smooth" });
          }
        }}
        className={cn(
          "pointer-events-auto size-8 rounded-full border bg-background shadow-md transition-all duration-150 duration-200 animate-in fade-in-0 slide-in-from-bottom-2 hover:bg-accent",
          className
        )}
        {...props}
      >
        {direction === "start" ? (
          <ArrowUp className="size-4" />
        ) : (
          <ArrowDown className="size-4" />
        )}
        <span className="sr-only">
          {direction === "start" ? "Scroll to start" : "Jump to latest"}
        </span>
      </Button>
    </div>
  );
}

export {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
};

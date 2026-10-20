"use client";

import React, { useState } from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

interface LazyHoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
  className?: string;
}

export function LazyHoverCard({
  trigger,
  children,
  openDelay = 50,
  closeDelay = 0,
  className,
}: LazyHoverCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HoverCard
      open={isOpen}
      onOpenChange={setIsOpen}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      <HoverCardTrigger asChild>
        <div onMouseEnter={() => setIsOpen(true)} className="inline-block cursor-pointer">
          {trigger}
        </div>
      </HoverCardTrigger>
      {isOpen && <HoverCardContent className={className}>{children}</HoverCardContent>}
    </HoverCard>
  );
}

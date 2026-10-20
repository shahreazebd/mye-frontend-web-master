import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-[#065089]/80 border-transparent text-primary-foreground",
        secondary:
          "bg-[#fab512] hover:bg-[#fab512]/80 border-transparent text-secondary-foreground",
        destructive:
          "bg-[#ee1e5f] hover:bg-[#ee1e5f]/80 border-transparent text-destructive-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[rgba(16,185,129,0.12)] text-emerald-700 ring-emerald-500/20",
        secondary: "bg-slate-900/[0.04] text-slate-700 ring-slate-900/10",
        warning: "bg-amber-500/10 text-amber-700 ring-amber-500/20",
        danger: "bg-rose-500/10 text-rose-700 ring-rose-500/20"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

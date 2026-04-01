import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-2xl border border-white/65 bg-white/80 px-4 py-2 text-sm text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--ring)] focus:ring-4 focus:ring-[rgba(14,165,233,0.12)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };

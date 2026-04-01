import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SectionCardProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionCard({
  title,
  subtitle,
  actions,
  children,
  className,
  contentClassName
}: SectionCardProps) {
  return (
    <Card className={cn("min-w-0 overflow-hidden", className)}>
      <CardHeader className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <CardTitle>{title}</CardTitle>
          {subtitle ? <p className="mt-1 text-sm text-[var(--muted-foreground)]">{subtitle}</p> : null}
        </div>
        {actions ? <div className="min-w-0">{actions}</div> : null}
      </CardHeader>
      <CardContent className={cn("pt-0", contentClassName)}>{children}</CardContent>
    </Card>
  );
}

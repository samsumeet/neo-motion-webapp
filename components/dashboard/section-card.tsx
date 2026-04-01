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
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{title}</CardTitle>
          {subtitle ? <p className="mt-1 text-sm text-[var(--muted-foreground)]">{subtitle}</p> : null}
        </div>
        {actions}
      </CardHeader>
      <CardContent className={cn("pt-0", contentClassName)}>{children}</CardContent>
    </Card>
  );
}

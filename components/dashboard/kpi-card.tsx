import { ArrowDownRight, ArrowUpRight, CalendarClock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type KpiCardProps = {
  label: string;
  value: number;
  hint: string;
  tone?: "neutral" | "positive" | "warning";
};

export function KpiCard({ label, value, hint, tone = "neutral" }: KpiCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="relative p-5">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500" />
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[var(--muted-foreground)]">{label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{hint}</p>
          </div>
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-2xl",
              tone === "positive" && "bg-emerald-500/10 text-emerald-600",
              tone === "warning" && "bg-amber-500/10 text-amber-600",
              tone === "neutral" && "bg-cyan-500/10 text-cyan-700"
            )}
          >
            {tone === "positive" ? (
              <ArrowUpRight className="size-5" />
            ) : tone === "warning" ? (
              <ArrowDownRight className="size-5" />
            ) : (
              <CalendarClock className="size-5" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

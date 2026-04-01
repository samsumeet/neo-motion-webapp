import { CalendarX2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  onReset: () => void;
};

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300/80 bg-slate-50/70 px-6 py-14 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-white shadow-sm">
        <CalendarX2 className="size-8 text-slate-500" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-950">No appointments match these filters</h3>
      <p className="mt-2 max-w-md text-sm text-[var(--muted-foreground)]">
        Try broadening the search, clearing the date, or switching the appointment status to see more bookings.
      </p>
      <Button className="mt-6" variant="secondary" onClick={onReset}>
        Clear filters
      </Button>
    </div>
  );
}

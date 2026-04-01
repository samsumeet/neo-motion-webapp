"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type FilterBarProps = {
  query: string;
  dateFilter: string;
  serviceFilter: string;
  services: string[];
  onQueryChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onServiceChange: (value: string) => void;
};

export function FilterBar({
  query,
  dateFilter,
  serviceFilter,
  services,
  onQueryChange,
  onDateChange,
  onServiceChange
}: FilterBarProps) {
  return (
    <div className="grid min-w-0 gap-2 md:grid-cols-[minmax(0,1.5fr)_repeat(2,minmax(0,0.8fr))]">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by name, email, phone, or service"
          className="h-10 rounded-xl pl-11"
        />
      </label>

      <label className="min-w-0 rounded-xl border border-white/65 bg-white/80 px-3 shadow-sm">
        <span className="mb-1 block pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
          Date
        </span>
        <input
          type="date"
          value={dateFilter}
          onChange={(event) => onDateChange(event.target.value)}
          className="h-8 w-full bg-transparent pb-2 text-sm outline-none"
        />
      </label>

      <label className="min-w-0 rounded-xl border border-white/65 bg-white/80 px-3 shadow-sm">
        <span className="mb-1 block pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
          Service
        </span>
        <select
          value={serviceFilter}
          onChange={(event) => onServiceChange(event.target.value)}
          className="h-8 w-full bg-transparent pb-2 text-sm outline-none"
        >
          <option value="">All services</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

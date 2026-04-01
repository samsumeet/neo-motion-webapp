"use client";

import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatAppointmentDate } from "@/lib/appointment-utils";
import type { AppointmentDocument } from "@/types/appointment";

type AppointmentCardsProps = {
  appointments: AppointmentDocument[];
  onSelect: (appointment: AppointmentDocument) => void;
};

export function AppointmentCards({ appointments, onSelect }: AppointmentCardsProps) {
  return (
    <div className="grid gap-3">
      {appointments.map((appointment) => (
        <Card key={appointment._id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate text-[15px] font-semibold text-slate-950">
                  {appointment.name}
                </h3>
                <p className="mt-0.5 truncate text-xs text-[var(--muted-foreground)]">
                  {appointment.service}
                </p>
              </div>
              <div className="shrink-0 rounded-2xl bg-sky-500/10 px-3 py-1.5 text-right text-sky-700">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">Time</p>
                <p className="mt-0.5 text-base font-semibold leading-none">{appointment.time}</p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
              <div className="flex min-w-0 items-center gap-1.5">
                <CalendarDays className="size-4" />
                <span className="truncate">{formatAppointmentDate(appointment)}</span>
              </div>
              {appointment.message ? (
                <div className="min-w-0 flex-1 rounded-full bg-slate-100/90 px-2.5 py-1 text-[11px] text-slate-600">
                  <p className="line-clamp-1">{appointment.message}</p>
                </div>
              ) : null}
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                Appointment details
              </p>
              <Button size="sm" variant="secondary" onClick={() => onSelect(appointment)}>
                View details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

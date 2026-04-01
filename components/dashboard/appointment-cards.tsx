"use client";

import { CalendarDays, Clock3 } from "lucide-react";

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
    <div className="grid gap-4">
      {appointments.map((appointment) => (
        <Card key={appointment._id} className="overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-950">{appointment.name}</h3>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">{appointment.service}</p>
              </div>
              <div className="rounded-[22px] bg-sky-500/10 px-4 py-2 text-right text-sky-700">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">Time</p>
                <p className="mt-1 text-lg font-semibold">{appointment.time}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-sm text-[var(--muted-foreground)]">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                <span>{formatAppointmentDate(appointment)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 className="size-4" />
                <span>{appointment.time}</span>
              </div>
            </div>

            <p className="mt-4 line-clamp-2 text-sm text-slate-600">
              {appointment.message || "No message provided"}
            </p>

            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
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

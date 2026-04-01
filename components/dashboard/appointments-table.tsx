"use client";

import { format } from "date-fns";
import { ArrowUpRight, Clock3 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { appointmentDateTime } from "@/lib/appointment-utils";
import type { AppointmentDocument } from "@/types/appointment";

type AppointmentsTableProps = {
  appointments: AppointmentDocument[];
  onSelect: (appointment: AppointmentDocument) => void;
};

export function AppointmentsTable({ appointments, onSelect }: AppointmentsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Message</TableHead>
          <TableHead className="text-right">Open</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment._id} onClick={() => onSelect(appointment)}>
            <TableCell>
              <div className="font-semibold text-slate-950">{appointment.name}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium text-slate-900">{appointment.service}</div>
            </TableCell>
            <TableCell>
              <div>{format(appointmentDateTime(appointment), "MMM d, yyyy")}</div>
            </TableCell>
            <TableCell>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1.5 text-sm font-semibold text-sky-700">
                <Clock3 className="size-4" />
                {format(appointmentDateTime(appointment), "HH:mm")}
              </div>
            </TableCell>
            <TableCell className="max-w-[250px]">
              <div className="line-clamp-2 text-[var(--muted-foreground)]">
                {appointment.message || "No message provided"}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <ArrowUpRight className="ml-auto size-4 text-slate-400" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

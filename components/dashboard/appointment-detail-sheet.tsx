"use client";

import { Copy, Mail, MessageSquare, Phone, UserRound } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  formatAppointmentDate,
  formatCreatedAt,
  getAppointmentStatus
} from "@/lib/appointment-utils";
import type { AppointmentDocument } from "@/types/appointment";

type AppointmentDetailSheetProps = {
  appointment: AppointmentDocument | null;
  referenceDate: string;
  onOpenChange: (open: boolean) => void;
};

function statusVariant(appointment: AppointmentDocument, referenceDate: string) {
  const status = getAppointmentStatus(appointment, new Date(referenceDate));

  if (status === "today") {
    return "warning";
  }

  if (status === "past") {
    return "secondary";
  }

  return "default";
}

export function AppointmentDetailSheet({
  appointment,
  referenceDate,
  onOpenChange
}: AppointmentDetailSheetProps) {
  return (
    <Dialog open={Boolean(appointment)} onOpenChange={onOpenChange}>
      <DialogContent>
        {appointment ? (
          <>
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-3">
                <DialogTitle>{appointment.name}</DialogTitle>
                <Badge variant={statusVariant(appointment, referenceDate)}>
                  {getAppointmentStatus(appointment, new Date(referenceDate))}
                </Badge>
              </div>
              <DialogDescription>
                Appointment scheduled for {formatAppointmentDate(appointment)} at {appointment.time}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-5">
              <div className="grid gap-3 rounded-[24px] bg-white/70 p-4">
                <InfoRow icon={UserRound} label="Service" value={appointment.service} />
                <InfoRow icon={Mail} label="Email" value={appointment.email} />
                <InfoRow icon={Phone} label="Phone" value={appointment.phone} />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={async () => {
                    await navigator.clipboard.writeText(appointment.email);
                    toast.success("Email copied");
                  }}
                >
                  <Copy className="size-4" />
                  Copy email
                </Button>
                <Button
                  variant="secondary"
                  onClick={async () => {
                    await navigator.clipboard.writeText(appointment.phone);
                    toast.success("Phone copied");
                  }}
                >
                  <Copy className="size-4" />
                  Copy phone
                </Button>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                  Patient note
                </h4>
                <div className="mt-3 rounded-[24px] bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  <div className="mb-3 flex items-center gap-2 font-medium text-slate-900">
                    <MessageSquare className="size-4" />
                    Message
                  </div>
                  {appointment.message || "No additional message was provided for this appointment."}
                </div>
              </div>

              <div className="rounded-[24px] bg-slate-950 px-4 py-3 text-sm text-slate-100">
                Booking created on {formatCreatedAt(appointment)}
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/80 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600">
          <Icon className="size-4" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{label}</p>
          <p className="text-sm font-medium text-slate-950">{value}</p>
        </div>
      </div>
    </div>
  );
}

import {
  format,
  isAfter,
  isSameDay,
  parseISO,
  startOfDay,
  startOfWeek
} from "date-fns";

import type {
  AppointmentDocument,
  AppointmentStatus
} from "@/types/appointment";

export function appointmentDateTime(appointment: AppointmentDocument) {
  return new Date(`${appointment.date}T${appointment.time}:00`);
}

export function appointmentCreatedAt(appointment: AppointmentDocument) {
  return parseISO(appointment.createdAt);
}

export function getAppointmentStatus(
  appointment: AppointmentDocument,
  reference = new Date()
): Exclude<AppointmentStatus, "all"> {
  const now = reference;
  const appointmentDate = appointmentDateTime(appointment);
  const today = startOfDay(now);

  if (isSameDay(appointmentDate, today)) {
    return "today";
  }

  if (isAfter(appointmentDate, today)) {
    return "upcoming";
  }

  return "past";
}

export function matchesQuery(appointment: AppointmentDocument, query: string) {
  const value = query.trim().toLowerCase();

  if (!value) {
    return true;
  }

  return [
    appointment.name,
    appointment.email,
    appointment.phone,
    appointment.service
  ].some((field) => field.toLowerCase().includes(value));
}

export function matchesDate(appointment: AppointmentDocument, date: string) {
  if (!date) {
    return true;
  }

  return appointment.date === date;
}

export function matchesService(
  appointment: AppointmentDocument,
  service: string
) {
  if (!service) {
    return true;
  }

  return appointment.service === service;
}

export function matchesStatus(
  appointment: AppointmentDocument,
  status: AppointmentStatus,
  reference = new Date()
) {
  if (status === "all") {
    return true;
  }

  return getAppointmentStatus(appointment, reference) === status;
}

export function groupAppointmentsByService(appointments: AppointmentDocument[]) {
  const grouped = new Map<string, number>();

  appointments.forEach((appointment) => {
    grouped.set(appointment.service, (grouped.get(appointment.service) ?? 0) + 1);
  });

  return [...grouped.entries()]
    .map(([service, total]) => ({ service, total }))
    .sort((left, right) => right.total - left.total);
}

export function groupAppointmentsByDay(appointments: AppointmentDocument[]) {
  const grouped = new Map<string, { label: string; total: number }>();

  appointments.forEach((appointment) => {
    const date = appointmentDateTime(appointment);
    const key = format(date, "yyyy-MM-dd");
    const existing = grouped.get(key);

    grouped.set(key, {
      label: format(date, "MMM d"),
      total: (existing?.total ?? 0) + 1
    });
  });

  return [...grouped.entries()]
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([, value]) => value);
}

export function groupAppointmentsByWeek(appointments: AppointmentDocument[]) {
  const grouped = new Map<string, { label: string; total: number }>();

  appointments.forEach((appointment) => {
    const weekStart = startOfWeek(appointmentDateTime(appointment), { weekStartsOn: 1 });
    const key = format(weekStart, "yyyy-MM-dd");
    const existing = grouped.get(key);

    grouped.set(key, {
      label: format(weekStart, "MMM d"),
      total: (existing?.total ?? 0) + 1
    });
  });

  return [...grouped.entries()]
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([, value]) => value);
}

export function formatAppointmentDate(appointment: AppointmentDocument) {
  return format(appointmentDateTime(appointment), "EEE, MMM d yyyy");
}

export function formatCreatedAt(appointment: AppointmentDocument) {
  return format(appointmentCreatedAt(appointment), "MMM d, yyyy 'at' HH:mm");
}

export function isRecentAppointment(appointment: AppointmentDocument, now = new Date()) {
  const createdAt = appointmentCreatedAt(appointment);
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  return isAfter(createdAt, threeDaysAgo);
}

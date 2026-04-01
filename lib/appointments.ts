import { ObjectId } from "mongodb";

import { getDatabase } from "@/lib/mongodb";
import type { AppointmentDocument } from "@/types/appointment";

type RawAppointment = {
  _id: ObjectId;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
  message?: string;
  createdAt?: Date | string;
};

function normalizeAppointment(document: RawAppointment): AppointmentDocument {
  return {
    _id: document._id.toString(),
    name: document.name ?? "Unknown patient",
    email: document.email ?? "",
    phone: document.phone ?? "",
    service: document.service ?? "General Consultation",
    date: document.date ?? "",
    time: document.time ?? "00:00",
    message: document.message ?? "",
    createdAt:
      document.createdAt instanceof Date
        ? document.createdAt.toISOString()
        : document.createdAt ?? new Date().toISOString()
  };
}

export async function getAppointments() {
  const database = await getDatabase();
  const appointments = await database
    .collection<RawAppointment>("appointments")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return appointments
    .map(normalizeAppointment)
    .filter((appointment) => appointment.date)
    .sort((left, right) => {
      const leftDate = new Date(`${left.date}T${left.time}:00`).getTime();
      const rightDate = new Date(`${right.date}T${right.time}:00`).getTime();
      return leftDate - rightDate;
    });
}

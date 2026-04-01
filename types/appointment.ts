export type AppointmentDocument = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
  createdAt: string;
};

export type AppointmentStatus = "all" | "today" | "upcoming" | "past";

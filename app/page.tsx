import { getAppointments } from "@/lib/appointments";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const appointments = await getAppointments();
  const referenceDate = new Date().toISOString();

  return <DashboardShell appointments={appointments} referenceDate={referenceDate} />;
}

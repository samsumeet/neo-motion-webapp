"use client";

import { startTransition, useDeferredValue, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  CalendarDays,
  ChevronRight,
  Clock3,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";

import { AppointmentCards } from "@/components/dashboard/appointment-cards";
import { AppointmentDetailSheet } from "@/components/dashboard/appointment-detail-sheet";
import { AppointmentsChart } from "@/components/dashboard/appointments-chart";
import { AppointmentsTable } from "@/components/dashboard/appointments-table";
import { EmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SectionCard } from "@/components/dashboard/section-card";
import { ServiceChart } from "@/components/dashboard/service-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  groupAppointmentsByDay,
  groupAppointmentsByService,
  groupAppointmentsByWeek,
  isRecentAppointment,
  matchesDate,
  matchesQuery,
  matchesService,
  matchesStatus
} from "@/lib/appointment-utils";
import type { AppointmentDocument, AppointmentStatus } from "@/types/appointment";

type DashboardShellProps = {
  appointments: AppointmentDocument[];
};

const sectionVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

export function DashboardShell({ appointments }: DashboardShellProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [appointmentsTab, setAppointmentsTab] = useState<Extract<AppointmentStatus, "today" | "upcoming">>("today");
  const [chartGranularity, setChartGranularity] = useState<"daily" | "weekly">("daily");
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentDocument | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pullStartY = useRef<number | null>(null);
  const isPulling = useRef(false);

  const maxPullDistance = 96;
  const refreshThreshold = 72;

  const deferredQuery = useDeferredValue(query);
  const services = [...new Set(appointments.map((appointment) => appointment.service))].sort();
  const analyticsAppointments = appointments.filter(
    (appointment) =>
      matchesQuery(appointment, deferredQuery) &&
      matchesDate(appointment, dateFilter) &&
      matchesService(appointment, serviceFilter)
  );
  const filteredAppointments = analyticsAppointments.filter((appointment) =>
    matchesStatus(appointment, appointmentsTab)
  );

  const totalAppointments = analyticsAppointments.length;
  const todaysAppointments = analyticsAppointments.filter(
    (appointment) => matchesStatus(appointment, "today")
  ).length;
  const upcomingAppointments = analyticsAppointments.filter(
    (appointment) => matchesStatus(appointment, "upcoming")
  ).length;
  const pastAppointments = analyticsAppointments.filter(
    (appointment) => matchesStatus(appointment, "past")
  ).length;
  const servicesData = groupAppointmentsByService(analyticsAppointments).slice(0, 6);
  const appointmentsByTime =
    chartGranularity === "daily"
      ? groupAppointmentsByDay(analyticsAppointments)
      : groupAppointmentsByWeek(analyticsAppointments);
  const recentBookings = [...analyticsAppointments]
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .slice(0, 5);

  const refreshDashboard = () => {
    if (isRefreshing) {
      return;
    }

    setIsRefreshing(true);

    startTransition(() => {
      router.refresh();
    });

    window.setTimeout(() => {
      setPullDistance(0);
      setIsRefreshing(false);
    }, 900);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (window.scrollY > 0 || isRefreshing) {
      pullStartY.current = null;
      isPulling.current = false;
      return;
    }

    pullStartY.current = event.touches[0]?.clientY ?? null;
    isPulling.current = true;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isPulling.current || pullStartY.current === null || isRefreshing) {
      return;
    }

    const currentY = event.touches[0]?.clientY ?? pullStartY.current;
    const delta = currentY - pullStartY.current;

    if (delta <= 0 || window.scrollY > 0) {
      setPullDistance(0);
      return;
    }

    if (event.cancelable) {
      event.preventDefault();
    }

    setPullDistance(Math.min(maxPullDistance, delta * 0.55));
  };

  const handleTouchEnd = () => {
    const shouldRefresh = pullDistance >= refreshThreshold;

    pullStartY.current = null;
    isPulling.current = false;

    if (shouldRefresh) {
      refreshDashboard();
      return;
    }

    setPullDistance(0);
  };

  return (
    <>
      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div className="pointer-events-none sticky top-3 z-40 flex justify-center px-4">
          <div
            className={`flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-semibold text-slate-600 shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-200 ${
              pullDistance > 0 || isRefreshing
                ? "translate-y-0 opacity-100"
                : "-translate-y-6 opacity-0"
            }`}
          >
            <RefreshCw
              className={`size-4 ${
                isRefreshing || pullDistance >= refreshThreshold ? "animate-spin" : ""
              }`}
            />
            <span>
              {isRefreshing
                ? "Refreshing appointments..."
                : pullDistance >= refreshThreshold
                  ? "Release to refresh"
                  : "Pull to refresh"}
            </span>
          </div>
        </div>

        <div
          className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 transition-transform duration-200 sm:px-6 lg:px-8 lg:py-8"
          style={{
            transform:
              pullDistance > 0 || isRefreshing
                ? `translateY(${Math.min(42, pullDistance * 0.45)}px)`
                : "translateY(0px)"
          }}
        >
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[28px] border border-white/60 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.35),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.92),rgba(240,249,255,0.86))] p-5 shadow-[0_22px_60px_rgba(14,116,144,0.12)] sm:p-6"
        >
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.16),transparent_60%)] lg:block" />
          <div className="relative">
            <div className="max-w-xl">
              <Badge variant="secondary" className="bg-white/80 text-sky-700 ring-sky-500/15">
                <Sparkles className="mr-1 size-3.5" />
                Premium clinic command center
              </Badge>
              <h1 className="mt-3 font-serif text-2xl leading-tight text-slate-950 sm:text-3xl">
                Appointments at a glance, with calm clarity for every shift.
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600 sm:text-[15px]">
                Monitor daily load, spot upcoming visits, and drill into patient details from an
                installable dashboard built for reception desks and clinicians on the move.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
          transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <KpiCard label="Total appointments" value={totalAppointments} hint="Filtered result set" />
          <KpiCard
            label="Today"
            value={todaysAppointments}
            hint="Appointments happening today"
            tone="warning"
          />
          <KpiCard
            label="Upcoming"
            value={upcomingAppointments}
            hint="Future bookings on the calendar"
            tone="positive"
          />
          <KpiCard
            label="Past"
            value={pastAppointments}
            hint="Historical visits in the current view"
          />
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
          transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
        >
          <SectionCard
            title="Search and refine"
            subtitle="Quick filters for patient, date, and service."
            className="rounded-[24px]"
            contentClassName="pt-0"
          >
            <FilterBar
              query={query}
              dateFilter={dateFilter}
              serviceFilter={serviceFilter}
              services={services}
              onQueryChange={setQuery}
              onDateChange={setDateFilter}
              onServiceChange={setServiceFilter}
            />
          </SectionCard>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
          transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
          className="grid gap-4 xl:grid-cols-[1.5fr_0.8fr]"
        >
          <SectionCard
            title="Appointments"
            subtitle={`${filteredAppointments.length} ${appointmentsTab === "today" ? "appointments today" : "future appointments"}`}
            actions={
              <div className="flex items-center gap-3">
                <div className="flex rounded-full bg-slate-100 p-1">
                  <button
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      appointmentsTab === "today"
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500"
                    }`}
                    onClick={() => setAppointmentsTab("today")}
                  >
                    Today
                  </button>
                  <button
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      appointmentsTab === "upcoming"
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500"
                    }`}
                    onClick={() => setAppointmentsTab("upcoming")}
                  >
                    Upcoming
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    setDateFilter("");
                    setServiceFilter("");
                    setAppointmentsTab("today");
                  }}
                >
                  Reset filters
                </Button>
              </div>
            }
          >
            {filteredAppointments.length === 0 ? (
              <EmptyState
                onReset={() => {
                  setQuery("");
                  setDateFilter("");
                  setServiceFilter("");
                  setAppointmentsTab("today");
                }}
              />
            ) : (
              <>
                <div className="hidden lg:block">
                  <AppointmentsTable
                    appointments={filteredAppointments}
                    onSelect={setSelectedAppointment}
                  />
                </div>
                <div className="lg:hidden">
                  <AppointmentCards
                    appointments={filteredAppointments}
                    onSelect={setSelectedAppointment}
                  />
                </div>
              </>
            )}
          </SectionCard>

          <SectionCard
            title="Recent bookings"
            subtitle="Fresh activity from the selected result set"
          >
            <div className="grid gap-3">
              {recentBookings.map((appointment) => (
                <button
                  key={appointment._id}
                  onClick={() => setSelectedAppointment(appointment)}
                  className="group rounded-[24px] bg-slate-50/90 p-4 text-left transition hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">{appointment.name}</p>
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                        {appointment.service}
                      </p>
                    </div>
                    <ChevronRight className="size-4 text-slate-400 transition group-hover:translate-x-0.5" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3.5" />
                      {appointment.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="size-3.5" />
                      {appointment.time}
                    </span>
                    {isRecentAppointment(appointment) ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-emerald-700">
                        <Activity className="size-3.5" />
                        New
                      </span>
                    ) : null}
                  </div>
                </button>
              ))}

              {recentBookings.length === 0 ? (
                <div className="rounded-[24px] bg-slate-50/90 p-6 text-sm text-[var(--muted-foreground)]">
                  No recent bookings are available in the current filtered result.
                </div>
              ) : null}
            </div>
          </SectionCard>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
          transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
          className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]"
        >
          <SectionCard
            title="Appointment trend"
            subtitle="Track booking flow by day or week."
            actions={
              <div className="flex rounded-full bg-slate-100 p-1">
                <button
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    chartGranularity === "daily"
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-500"
                  }`}
                  onClick={() => setChartGranularity("daily")}
                >
                  Daily
                </button>
                <button
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    chartGranularity === "weekly"
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-500"
                  }`}
                  onClick={() => setChartGranularity("weekly")}
                >
                  Weekly
                </button>
              </div>
            }
          >
            <AppointmentsChart data={appointmentsByTime} />
          </SectionCard>

          <SectionCard
            title="Most booked services"
            subtitle="Identify which treatments are driving the clinic schedule."
          >
            <ServiceChart data={servicesData} />
            <div className="mt-4 grid gap-2">
              {servicesData.map((item) => (
                <div
                  key={item.service}
                  className="flex items-center justify-between rounded-2xl bg-slate-50/90 px-4 py-3 text-sm"
                >
                  <span className="font-medium text-slate-700">{item.service}</span>
                  <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-950 shadow-sm">
                    {item.total}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </motion.section>
        </div>
      </div>

      <AppointmentDetailSheet
        appointment={selectedAppointment}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAppointment(null);
          }
        }}
      />
    </>
  );
}

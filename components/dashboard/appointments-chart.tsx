"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type AppointmentsChartProps = {
  data: { label: string; total: number }[];
};

export function AppointmentsChart({ data }: AppointmentsChartProps) {
  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="appointmentsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip
            contentStyle={{
              borderRadius: "18px",
              borderColor: "rgba(148, 163, 184, 0.2)",
              boxShadow: "0 20px 45px rgba(15, 23, 42, 0.12)"
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#0284c7"
            strokeWidth={3}
            fill="url(#appointmentsFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

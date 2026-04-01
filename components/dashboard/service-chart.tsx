"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type ServiceChartProps = {
  data: { service: string; total: number }[];
};

const COLORS = ["#0ea5e9", "#0369a1", "#14b8a6", "#22c55e", "#f59e0b", "#f97316"];

export function ServiceChart({ data }: ServiceChartProps) {
  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="service"
            innerRadius={62}
            outerRadius={98}
            paddingAngle={4}
            stroke="rgba(255,255,255,0.8)"
          >
            {data.map((entry, index) => (
              <Cell key={entry.service} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "18px",
              borderColor: "rgba(148, 163, 184, 0.2)",
              boxShadow: "0 20px 45px rgba(15, 23, 42, 0.12)"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#ff6b6b", "#4ecdc4"];

interface Props {
  withGif: number;
  withoutGif: number;
  total: number;
}

export default function GifPieChart({ withGif, withoutGif, total }: Props) {
  if (total === 0) {
    return <p className="no-data">No notes found for this user.</p>;
  }

  const data = [
    { name: "GIFs", value: withGif },
    { name: "Other notes", value: withoutGif },
  ];

  const gifPercent = ((withGif / total) * 100).toFixed(1);

  return (
    <div className="chart-container">
      <h3 className="chart-title">
        GIF Usage: {withGif} of {total} notes ({gifPercent}%)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            label={(props) => {
              const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props as {cx: number; cy: number; midAngle: number; innerRadius: number; outerRadius: number; percent: number};
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              return percent > 0.05 ? (
                <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontWeight="bold" fontSize={14}>
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              ) : null;
            }}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

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
    { name: "Contains .gif", value: withGif },
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
            outerRadius={100}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
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

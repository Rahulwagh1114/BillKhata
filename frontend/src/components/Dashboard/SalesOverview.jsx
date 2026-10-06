import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./SalesOverview.css";

const monthData = [
  { label: "1", sales: 12000 },
  { label: "5", sales: 18000 },
  { label: "10", sales: 15000 },
  { label: "15", sales: 28000 },
  { label: "20", sales: 24000 },
  { label: "25", sales: 38000 },
  { label: "30", sales: 45000 },
];

const weekData = [
  { label: "Mon", sales: 5000 },
  { label: "Tue", sales: 8000 },
  { label: "Wed", sales: 6500 },
  { label: "Thu", sales: 11000 },
  { label: "Fri", sales: 9000 },
  { label: "Sat", sales: 14000 },
  { label: "Sun", sales: 10000 },
];

const yearData = [
  { label: "Jan", sales: 120000 },
  { label: "Feb", sales: 150000 },
  { label: "Mar", sales: 130000 },
  { label: "Apr", sales: 180000 },
  { label: "May", sales: 210000 },
  { label: "Jun", sales: 190000 },
  { label: "Jul", sales: 245000 },
  { label: "Aug", sales: 230000 },
  { label: "Sep", sales: 260000 },
  { label: "Oct", sales: 245000 },
  { label: "Nov", sales: 280000 },
  { label: "Dec", sales: 300000 },
];

const datasets = {
  week: weekData,
  month: monthData,
  year: yearData,
};

const formatRupees = (value) => `₹${value.toLocaleString("en-IN")}`;

const formatAxis = (value) =>
  value >= 1000 ? `₹${value / 1000}k` : `₹${value}`;

function SalesOverview() {
  const [range, setRange] = useState("month");

  return (
    <section className="salesOverview">
      <div className="salesHeader">
        <h3>Sales Overview</h3>

        <select
          className="salesSelect"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="salesChart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={datasets[range]}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e8ebf7" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatAxis}
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip
              formatter={(value) => [formatRupees(value), "Sales"]}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #eef0fa",
                boxShadow: "0 8px 20px rgba(79,70,229,0.12)",
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={3}
              fill="url(#salesGradient)"
              dot={{ r: 3, fill: "#4f46e5" }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default SalesOverview;
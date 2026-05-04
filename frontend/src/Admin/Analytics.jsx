import { useEffect, useState } from "react";
import api from "@/services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Loader2, TrendingUp, ShoppingBag } from "lucide-react";

export default function Analytics() {
  const [data, setData] = useState({ monthlyRevenue: [], topProducts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/products/stats");

        setData({
          monthlyRevenue: res.data?.monthlyRevenue ?? [],
          topProducts: res.data?.topProducts ?? [],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const monthOrder = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

const normalizedRevenueData = [...data.monthlyRevenue]
  .map((item, index) => ({
    ...item,
    revenue: Number(item.revenue || 0),
    sortIndex: item.year
      ? item.year * 12 + monthOrder[item.month]
      : index,
  }))
  .sort((a, b) => a.sortIndex - b.sortIndex)
  .map(({ sortIndex, ...item }) => item);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#F4E7D0] gap-4">
        <Loader2 className="animate-spin text-[var(--primary)]" size={44} />
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6A2F]">
          Loading fashion analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4E7D0] p-4 md:p-6 space-y-8 pb-10">
      <div>
        <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-[0.35em] mb-2">
          Store Intelligence
        </p>

        <h1 className="text-3xl md:text-4xl font-serif text-[#151512]">
          Analytics
        </h1>

        <p className="text-sm text-[#594724] mt-2">
          Track fashion store revenue, product demand, and sales performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Revenue Trend */}
        <div className="bg-[var(--card-bg)]/85 p-5 md:p-8 border border-[#D4AF37]/25 shadow-xl ">
          <ChartHeader
            icon={TrendingUp}
            title="Revenue Trend"
            desc="Monthly fashion store performance"
          />

          <div className="h-[300px] md:h-[400px] w-full ">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.monthlyRevenue}
                margin={{ top: 8, right: 8, left: -18, bottom: 8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(212,175,55,0.25)"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8A6A2F", fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8A6A2F", fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 0,
                    border: " rgba(212,175,55,0.35)",
                    boxShadow: "0 20px 30px rgba(0,0,0,0.12)",
                    color: "#151512",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#D4AF37"
                  strokeWidth={4}
                  dot={{
                    r: 4,
                    fill: "#151512",
                    strokeWidth: 2,
                    stroke: "#D4AF37",
                  }}
                  activeDot={{ r: 8, fill: "#D4AF37", stroke: "#151512" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-[var(--card-bg)]/85 p-5 md:p-8 border border-[#D4AF37]/25 shadow-xl">
          <ChartHeader
            icon={ShoppingBag}
            title="Sales by Product"
            desc="Comparison of top selling clothing styles"
          />

          <div className="h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.topProducts}
                margin={{ top: 8, right: 8, left: -18, bottom: 8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(212,175,55,0.25)"
                />
                <XAxis
                  dataKey="title"
                  axisLine={false}
                  tickLine={false}
                  tick={({ x, y, payload }) => (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={0}
                        y={0}
                        dy={16}
                        textAnchor="middle"
                        fill="#8A6A2F"
                        className="text-[9px] font-bold"
                      >
                        {payload.value.length > 10
                          ? `${payload.value.substring(0, 10)}...`
                          : payload.value}
                      </text>
                    </g>
                  )}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8A6A2F", fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(212,175,55,0.10)" }}
                  contentStyle={{
                    borderRadius: 0,
                    border: "1px solid rgba(212,175,55,0.35)",
                    boxShadow: "0 20px 30px rgba(0,0,0,0.12)",
                    color: "#151512",
                  }}
                />
                <Bar dataKey="totalSold" fill="#D4AF37" radius={[0, 0, 0, 0]} barSize={40}>
                  {data.topProducts.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#151512" : "#D4AF37"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartHeader({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-11 w-11 bg-[#151512] text-[var(--primary)] flex items-center justify-center border border-[#D4AF37]/30 rounded-full">
        <Icon size={20} />
      </div>

      <div>
        <h3 className="text-xs font-black text-[#151512] tracking-widest uppercase">
          {title}
        </h3>
        <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-widest mt-1">
          {desc}
        </p>
      </div>
    </div>
  );
}
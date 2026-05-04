import { useEffect, useState, useMemo } from "react";
import api from "@/services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Loader2,
  ShoppingBag,
  Package,
  RotateCcw,
  ArrowUpRight,
  CreditCard,
} from "lucide-react";

const COLORS = ["#151512", "#D4AF37", "#8A6A2F", "#E8D6B8", "#594724"];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [refundsFromPayments, setRefundsFromPayments] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllDashboardData = async () => {
      try {
        setLoading(true);

        const statsRes = await api.get("/products/stats");
        const paymentsRes = await api.get("/payments");

        const paymentsList = Array.isArray(paymentsRes.data)
          ? paymentsRes.data
          : [];

        const calculatedRefunds = paymentsList
          .filter((p) => p.status?.toLowerCase() === "refunded")
          .reduce((sum, p) => sum + (p.amount || 0), 0);

        setRefundsFromPayments(calculatedRefunds);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Failed to sync dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDashboardData();
  }, []);

  const grossRevenue = stats?.revenue || 0;
  const netVolume = Math.round((grossRevenue - refundsFromPayments) * 100) / 100;

  const ordersData = useMemo(() => {
    return Object.entries(stats?.ordersStatus || {})
      .map(([name, value]) => ({ name: name.toUpperCase(), value }))
      .filter((item) => item.value > 0);
  }, [stats]);

  const topProductsData = stats?.topProducts || [];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#F4E7D0] gap-4">
        <Loader2 className="animate-spin text-[var(--primary)]" size={48} />
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6A2F]">
          Syncing fashion store data...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 no-scrollbar bg-[#F4E7D0] min-h-screen p-4 md:p-6">
      {/* HEADER */}
      <div>
        <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-[0.35em] mb-2">
          Clothing Ecommerce Admin
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-[#151512]">
          Store Performance
        </h1>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 ">
        <StatCard
          title="Net Sales"
          value={`₹${netVolume.toLocaleString("en-IN")}`}
          icon={CreditCard}
        />

        <StatCard
          title="Refunds"
          value={`₹${refundsFromPayments.toLocaleString("en-IN")}`}
          icon={RotateCcw}
        />

        <StatCard
          title="Gross Revenue"
          value={`₹${grossRevenue.toLocaleString("en-IN")}`}
          icon={ShoppingBag}
        />

        <StatCard
          title="Total Orders"
          value={stats?.orders || 0}
          icon={Package}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[var(--card-bg)]/80 p-6 md:p-8 border border-[#D4AF37]/25 shadow-xl h-[430px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-11 w-11 bg-[#151512] flex items-center justify-center text-[var(--primary)] border border-[#D4AF37]/30 rounded-full">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#151512] uppercase tracking-widest">
                Monthly Revenue
              </h2>
              <p className="text-xs text-[#8A6A2F]">Fashion sales growth</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height="78%">
            <BarChart data={stats?.monthlyRevenue || []}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(212,175,55,0.25)"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fontWeight: 700, fill: "#594724" }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis
                tick={{ fontSize: 10, fontWeight: 700, fill: "#594724" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(212,175,55,0.10)" }}
                contentStyle={{
                  borderRadius: 0,
                  border: "1px solid rgba(212,175,55,0.3)",
                  boxShadow: "0 20px 30px rgba(0,0,0,0.12)",
                  padding: "14px",
                }}
              />
              <Bar
                dataKey="revenue"
                fill="#D4AF37"
                radius={[0, 0, 0, 0]}
                barSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[var(--card-bg)]/80 p-6 md:p-8 border border-[#D4AF37]/25 shadow-xl h-[430px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-11 w-11 bg-[#151512] flex items-center justify-center text-[var(--primary)] border border-[#D4AF37]/30 rounded-full">
              <Package size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#151512] uppercase tracking-widest">
                Order Status
              </h2>
              <p className="text-xs text-[#8A6A2F]">Order distribution mix</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height="78%">
            <PieChart>
              <Pie
                data={ordersData}
                dataKey="value"
                innerRadius="58%"
                outerRadius="84%"
                paddingAngle={6}
              >
                {ordersData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{
                  fontSize: "10px",
                  fontWeight: "900",
                  paddingTop: "18px",
                  color: "#594724",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BEST SELLERS */}
      <div className="bg-[var(--card-bg)]/80 p-6 md:p-10 border border-[#D4AF37]/25 shadow-xl ">
        <div className="flex items-center justify-between mb-10 ">
          <div>
            <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-[0.3em] mb-2 ">
              Product Insights
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-[#151512]">
              Best Selling Styles
            </h2>
          </div>

          <div className="h-12 w-12 bg-[#151512] text-[var(--primary)] flex items-center justify-center border border-[#D4AF37]/30 rounded-full">
            <ArrowUpRight size={24} />
          </div>
        </div>

        <div className="space-y-6">
          {topProductsData.length > 0 ? (
            topProductsData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 group border-b border-[#D4AF37]/15 pb-5 last:border-b-0"
              >
                <div className="flex items-center gap-5">
                  <span className="text-2xl font-serif text-[var(--primary)]">
                    0{index + 1}
                  </span>

                  <div>
                    <p className="font-bold text-[#151512] text-sm uppercase tracking-wide">
                      {item.title}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1.5 w-28 bg-[#E8D6B8] overflow-hidden">
                        <div
                          className="h-full bg-[#D4AF37]"
                          style={{
                            width: `${
                              (item.totalSold / 
                                (topProductsData[0]?.totalSold || 1)) *
                              100
                            }%`,
                          }}
                        />
                      </div>

                      <span className="text-[10px] font-bold text-[#8A6A2F]">
                        {item.totalSold} Sold
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs font-bold text-[#151512]">
                 ₹{(item.totalSold * (item.price || 0)).toLocaleString("en-IN")}
                </p>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-[#8A6A2F] font-bold uppercase tracking-widest text-xs">
              No sales records available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-[var(--card-bg)]/85 p-6 border border-[#D4AF37]/25 shadow-md hover:shadow-xl transition relative overflow-hidden group">
      <div className="absolute right-0 top-0 h-24 w-24 bg-[#D4AF37]/10 blur-2xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-widest mb-2">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-serif font-semibold text-[#151512]">
            {value}
          </p>
        </div>

        <div className="h-11 w-11 bg-[#151512] text-[var(--primary)] flex items-center justify-center border border-[#D4AF37]/30 rounded-full">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
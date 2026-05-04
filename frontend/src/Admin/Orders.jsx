import { useEffect, useState, useMemo } from "react";
import api from "@/services/api";
import {
  X,
  Package,
  User,
  MapPin,
  Loader2,
  ArrowUpRight,
  Search,
  CalendarDays,
  Inbox,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const statusStyles = {
  processing: "bg-[#151512] text-[var(--primary)]",
  shipped: "bg-[#E8D6B8] text-[#8A6A2F]",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-600",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await api.get("/orders?limit=1000");
        const allOrders = res.data.data || [];

        const filtered = allOrders.filter((o) => {
          const payment = o.paymentDetails || {};
          const isPaid =
            payment.transactionId?.startsWith("PAY_") ||
            payment.status === "success";
          const isCOD = o.paymentMode === "cod";
          const isActiveStatus = [
            "processing",
            "shipped",
            "delivered",
            "cancelled",
          ].includes(o.status);

          if (o.status === "pending") return false;

          return isPaid || isCOD || isActiveStatus;
        });

        const sorted = filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sorted);
      } catch (err) {
        console.error("Fetch orders failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

 const updateStatus = async (id, status) => {
  try {
    const res = await api.put(`/orders/${id}/status`, { status });

    const updatedOrder = res.data?.data;

    setOrders((prev) =>
      prev.map((o) =>
        o._id === id
          ? { ...o, status: updatedOrder?.status || status }
          : o
      )
    );

    if (selectedOrder?._id === id) {
      setSelectedOrder((prev) =>
        prev ? { ...prev, status: updatedOrder?.status || status } : prev
      );
    }
  } catch (err) {
    console.error("Update status failed:", err);
    alert(err.response?.data?.message || "Update failed");
  }
};

  const processedOrders = useMemo(() => {
    let result = orders;

    if (activeTab !== "all") {
      result = result.filter((o) => o.status === activeTab);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();

      result = result.filter(
        (o) =>
          o.address?.recipientName?.toLowerCase().includes(q) ||
          o.address?.phone?.toLowerCase().includes(q) ||
          o.user?.email?.toLowerCase().includes(q) ||
          o._id?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [orders, activeTab, searchQuery]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#F4E7D0] gap-4">
        <Loader2 className="animate-spin text-[var(--primary)]" size={48} />
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6A2F]">
          Loading fashion orders...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4E7D0] p-4 lg:p-8 space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-[0.35em] mb-2">
            Admin Orders
          </p>

          <h1 className="text-3xl md:text-4xl font-serif text-[#151512]">
            Order Timeline
          </h1>

          <p className="text-sm text-[#594724] mt-2">
            Manage customer purchases, shipping status, and order records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-[var(--card-bg)]/70 p-1.5 border border-[#D4AF37]/25">
          {["all", "processing", "shipped", "delivered", "cancelled"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "bg-[#151512] text-[var(--primary)]"
                    : "text-[#8A6A2F] hover:text-[#151512]"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative group">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8A6A2F] group-focus-within:text-[var(--primary)] transition-colors"
          size={20}
        />

        <Input
          placeholder="Search by customer, phone, email or order ID..."
          className="pl-14 h-14 bg-[var(--card-bg)]/80 border border-[#D4AF37]/25 rounded-none shadow-xl focus-visible:ring-[#D4AF37] text-sm font-semibold"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-[var(--card-bg)]/85 shadow-xl border border-[#D4AF37]/25 overflow-hidden rounded-[2.5rem]">
        <div className="overflow-x-auto no-scrollbar rounded-[2.5rem]">
          <table className="w-full text-left ">
            <thead className="bg-[#151512] border-b border-[var(--border-soft)] ">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-[var(--primary)] tracking-[0.2em]">
                  Transaction
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-[var(--primary)] tracking-[0.2em]">
                  Customer
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-[var(--primary)] tracking-[0.2em]">
                  Revenue
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-[var(--primary)] tracking-[0.2em]">
                  Status
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-[var(--primary)] tracking-[0.2em] text-right">
                  Detail
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#D4AF37]/15">
              {processedOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-28 text-center">
                    <div className="flex flex-col items-center gap-3 text-[#8A6A2F]/45">
                      <Inbox size={64} />
                      <p className="font-black uppercase text-xs tracking-widest">
                        No orders found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                processedOrders.map((o) => (
                  <tr
                    key={o._id}
                    className="group hover:bg-[#F4E7D0]/60 transition-all"
                  >
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#151512] text-[var(--primary)] border border-[#D4AF37]/30 group-hover:scale-110 transition-transform">
                          <CalendarDays size={18} />
                        </div>

                        <div>
                          <p className="text-[11px] font-black text-[#151512] uppercase">
                            {new Date(o.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <p className="font-mono text-[9px] text-[#8A6A2F] mt-1">
                            ID: #{o._id.slice(-10)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-7">
                      <p className="font-black text-[#151512] tracking-tight text-sm uppercase">
                        {o.address?.recipientName || "Customer"}
                      </p>
                      <p className="text-[9px] text-[#8A6A2F] font-bold uppercase tracking-widest mt-0.5">
                        {o.paymentMode || "payment"} gateway
                      </p>
                    </td>

                    <td className="px-8 py-7 font-serif text-[#151512] text-xl">
                      ₹{Number(o.total || 0).toLocaleString("en-IN")}
                    </td>

                    <td className="px-8 py-7">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o._id, e.target.value)}
                        className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.15em] outline-none border-none cursor-pointer transition-all ${
                          statusStyles[o.status] ||
                          "bg-[#E8D6B8] text-[#8A6A2F]"
                        }`}
                      >
                        {["processing", "shipped", "delivered", "cancelled"].map(
                          (s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    <td className="px-8 py-7 text-right">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="p-3 bg-[var(--card-bg)] border border-[#D4AF37]/25 text-[#8A6A2F] hover:text-[#151512] hover:border-[#D4AF37] hover:shadow-lg transition-all"
                      >
                        <ArrowUpRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#F4E7D0] w-full max-w-2xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col border border-[#D4AF37]/30">
            <div className="p-6 md:p-8 border-b border-[#D4AF37]/25 flex items-center justify-between bg-[#151512] sticky top-0 z-10">
              <div>
                <p className="text-[10px] text-[var(--primary)] uppercase tracking-[0.3em]">
                  Order Details
                </p>
                <h2 className="text-xl md:text-2xl font-serif text-white">
                  Fashion Order
                </h2>
                <p className="text-[10px] md:text-xs font-bold text-white/50 uppercase tracking-widest mt-1">
                  ID: #{selectedOrder._id}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 border border-[#D4AF37]/30 text-[var(--primary)] hover:bg-[#D4AF37] hover:text-black transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-6 md:space-y-8 no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <InfoBox
                  icon={User}
                  title="Customer"
                  content={
                    <>
                      <p className="font-bold text-[#151512] text-sm md:text-base">
                        {selectedOrder.address?.recipientName}
                      </p>
                      <p className="text-xs md:text-sm text-[#594724] font-medium">
                        {selectedOrder.user?.email}
                      </p>
                      <p className="text-xs md:text-sm text-[#594724] font-medium">
                        {selectedOrder.address?.phone}
                      </p>
                    </>
                  }
                />

                <InfoBox
                  icon={MapPin}
                  title="Shipping"
                  content={
                    <p className="text-xs md:text-sm text-[#594724] leading-relaxed font-medium">
                      {selectedOrder.address?.line1},{" "}
                      {selectedOrder.address?.city}
                      <br />
                      {selectedOrder.address?.state} -{" "}
                      {selectedOrder.address?.postalCode}
                    </p>
                  }
                />

                
              </div>

              <InfoBox
    icon={Package}
    title="Payment"
    content={
      <>
        <p className="font-bold text-[#151512] text-sm md:text-base uppercase">
          {selectedOrder.payment?.mode ||
            selectedOrder.paymentMode ||
            "Online"}
        </p>

        <p className="text-xs md:text-sm text-[#594724] font-medium">
          Status:{" "}
          <span className="font-black text-[#151512]">
            {selectedOrder.payment?.status || "Pending"}
          </span>
        </p>

        <p className="text-xs md:text-sm text-[#594724] font-medium">
          Transaction ID:{" "}
          <span className="font-black text-[#151512]">
            {selectedOrder.payment?.transactionId ||
              selectedOrder.paymentId ||
              "N/A"}
          </span>
        </p>

        <p className="text-xs md:text-sm text-[#594724] font-medium">
          Amount: ₹
          {Number(
            selectedOrder.payment?.amount || selectedOrder.total || 0
          ).toLocaleString("en-IN")}
        </p>
      </>
    }
  />

              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-[10px] md:text-xs font-black text-[#8A6A2F] uppercase tracking-widest">
                  <Package size={14} /> Items
                </h4>

                <div className="space-y-3">
                  {selectedOrder.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border border-[var(--border-soft)] bg-[var(--card-bg)]/80 gap-4"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-[#151512] text-sm md:text-base line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-[10px] md:text-xs font-bold text-[#8A6A2F]">
                          Qty: {item.quantity} × ₹
                          {Number(item.price || 0).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <p className="font-black text-[#151512] text-sm md:text-base whitespace-nowrap">
                        ₹
                        {Number(
                          (item.price || 0) * (item.quantity || 1)
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#D4AF37]/25">
                <div className="flex justify-between text-xs md:text-sm font-bold text-[#594724]">
                  <span>Shipping</span>
                  <span>
                    ₹{Number(selectedOrder.shipping || 0).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xl md:text-2xl font-serif text-[#151512]">
                  <span>Total</span>
                  <span className="text-[var(--primary)]">
                    ₹{Number(selectedOrder.total || 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 bg-[var(--card-bg)]/60 border-t border-[#D4AF37]/25 flex flex-col md:flex-row gap-3">
              <Button
                onClick={() => setSelectedOrder(null)}
                className="w-full md:w-auto md:ml-auto rounded-none px-8 h-12 font-black uppercase text-xs tracking-widest !bg-[#151512] !text-[var(--primary)] hover:!bg-[#D4AF37] hover:!text-black"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoBox({ icon: Icon, title, content }) {
  return (
    <div className="space-y-3">
      <h4 className="flex items-center gap-2 text-[10px] md:text-xs font-black text-[#8A6A2F] uppercase tracking-widest">
        <Icon size={14} /> {title}
      </h4>

      <div className="bg-[var(--card-bg)]/80 p-4 border border-[var(--border-soft)]">
        {content}
      </div>
    </div>
  );
}
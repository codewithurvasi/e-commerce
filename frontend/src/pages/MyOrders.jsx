import React, { useEffect, useState } from "react";
import api from "@/services/api";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  XCircle,
  AlertCircle,
  MapPin,
  CreditCard,
  Calendar,
  Hash,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get("/orders/me");

      let fetchedOrders = [];
      if (Array.isArray(data)) fetchedOrders = data;
      else if (Array.isArray(data.orders)) fetchedOrders = data.orders;
      else if (Array.isArray(data.data)) fetchedOrders = data.data;

      // Filter out pending orders as per existing logic
      const filteredOrders = fetchedOrders.filter(
        (order) => order.status?.toLowerCase() !== "pending",
      );

      const sortedOrders = filteredOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load your purchase history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const { data } = await api.patch(`/orders/${orderId}/cancel`);
      toast.success(data.message || "Order cancelled successfully");
      loadOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order.");
    }
  };

  const getImage = (product) => {
    const img = product?.images;
    if (!img)
      return "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200";
    if (Array.isArray(img))
      return typeof img[0] === "string" ? img[0] : (img[0]?.url ?? "");
    return typeof img === "string" ? img : (img?.url ?? "");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            My Orders
          </h1>
          <p className="text-slate-500 font-medium">
            Manage and track your industrial equipment shipments
          </p>
        </header>

        {error && (
          <div className="bg-red-50 p-4 rounded-2xl flex items-center gap-3 text-red-600 mb-6 border border-red-100">
            <AlertCircle size={20} /> <p className="font-bold">{error}</p>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-[var(--card-bg)] rounded-[3rem] p-20 text-center border border-dashed border-slate-200">
            <Package size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium text-lg">
              You have no completed or active orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={order._id}
                className="bg-[var(--card-bg)] rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 md:p-8 bg-slate-50/50 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-6 items-center">
                    <div className="hidden sm:flex h-12 w-12 bg-[var(--card-bg)] rounded-xl items-center justify-center text-blue-600 shadow-sm">
                      <Hash size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 leading-none mb-1">
                        Order #{order._id?.slice(-6).toUpperCase()}
                      </h3>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <Calendar size={12} />{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={order.status} />
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Total Amount
                      </p>
                      <p className="text-lg font-black text-slate-900">
                        ₹{order.total?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Items Column */}
                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                      Shipment Items
                    </p>
                    {(order.items || []).map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                      >
                        <img
                          src={getImage(item.product)}
                          className="h-16 w-16 rounded-xl object-contain bg-[var(--card-bg)] border"
                          alt="Product"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 truncate text-sm">
                            {item.title ??
                              item.product?.title ??
                              "Unnamed Product"}
                          </p>
                          {item.variant && (
                            <p className="text-xs font-medium text-slate-500">
                              Size: {item.variant.size}
                            </p>
                          )}
                          <p className="text-xs font-bold text-black/80 mt-1">
                            {item.quantity} × ₹
                            {Number(item.price).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery & Payment Column */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex gap-3">
                      <div className="mt-1 text-slate-400">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                          Delivery Address
                        </p>
                        <div className="text-sm font-bold text-slate-700 leading-relaxed">
                          {order.address?.recipientName} <br />
                          <span className="font-medium text-slate-500">
                            {order.address?.line1}, {order.address?.city} <br />
                            {order.address?.state} - {order.address?.postalCode}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="mt-1 text-slate-400">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                          Payment Method
                        </p>
                        <div className="text-sm font-bold text-slate-700">
                          {(
                            order.payment?.mode ||
                            order.paymentMode ||
                            "online"
                          ).toUpperCase()}

                          <span
                            className={`ml-2 text-[10px] px-2 py-0.5 rounded-full ${
                              order.payment?.status === "paid"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {(order.payment?.status || "pending").toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ✅ Restrict Cancel button: only show when status is specifically 'processing' */}
                    {order.status?.toLowerCase() === "processing" && (
                      <Button
                        onClick={() => handleCancelOrder(order._id)}
                        className="
    w-full mt-4 h-12
    rounded-xl
    bg-gradient-to-r from-red-500 to-red-600
    hover:from-red-600 hover:to-red-700
    text-white font-black tracking-wide
    flex items-center justify-center gap-2
    shadow-md hover:shadow-lg
    transition-all duration-300
    active:scale-[0.97]
  "
                      >
                        <XCircle size={18} className="shrink-0" />
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const s = status?.toLowerCase();

  const config = {
    delivered: { color: "bg-emerald-50 text-emerald-600", icon: CheckCircle2 },
    cancelled: { color: "bg-red-50 text-red-600", icon: XCircle },
    processing: { color: "bg-orange-50 text-orange-600", icon: Clock },
    shipped: { color: "bg-blue-50 text-blue-600", icon: Truck },
  };

  const active = config[s] || config.processing;
  const Icon = active.icon;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-tight ${active.color}`}
    >
      <Icon size={14} />
      {status}
    </div>
  );
}

// import { useEffect, useState, useMemo } from "react"; // Added useMemo for performance
// import api from "@/services/api";
// import {
//   CheckCircle,
//   Clock,
//   Eye,
//   X,
//   CreditCard,
//   User,
//   Hash,
//   Calendar,
//   Loader2,
//   ArrowUpRight,
//   TrendingUp,
//   Wallet,
//   ShieldCheck,
//   RotateCcw,
//   Search, // Added Search icon
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"; // Assuming you have a UI input component

// export default function Payments() {
//   const [payments, setPayments] = useState([]);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState(""); // ✅ New search state

//   useEffect(() => {
//     const loadPayments = async () => {
//       try {
//         setLoading(true);
//         const { data } = await api.get("/payments");
//         setPayments(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error loading payments:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadPayments();
//   }, []);

//   // ✅ 1. Filtered Payments Logic
//   const filteredPayments = useMemo(() => {
//     return payments.filter((p) => {
//       const query = searchQuery.toLowerCase();
//       const transactionId = p.transactionId?.toLowerCase() || "";
//       const orderId = p.order?._id?.toLowerCase() || "";
//       const recipient = p.order?.address?.recipientName?.toLowerCase() || "";
      
//       return (
//         transactionId.includes(query) ||
//         orderId.includes(query) ||
//         recipient.includes(query)
//       );
//     });
//   }, [payments, searchQuery]);

//   // ✅ 2. Calculations (Should be based on ALL data, not just filtered results)
//   const totalRevenue = payments
//     .filter((p) => p.status?.toLowerCase() === "success")
//     .reduce((sum, p) => sum + (p.amount || 0), 0);

//   const refundedVolume = payments
//     .filter((p) => p.status?.toLowerCase() === "refunded")
//     .reduce((sum, p) => sum + (p.amount || 0), 0);

//   const netVolume = Math.round((totalRevenue - refundedVolume) * 100) / 100;

//   const successCount = payments.filter((p) => p.status === "success").length;
//   const pendingCount = payments.filter((p) => p.status === "pending").length;

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen -mt-20">
//         <div className="text-center space-y-4">
//           <Loader2 className="animate-spin text-blue-600 mx-auto" size={48} />
//           <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">
//             Syncing Transactions...
//           </p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="space-y-6 md:space-y-8 pb-20 md:pb-10 max-w-7xl mx-auto">
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
//             Payments
//           </h1>
//           <p className="text-[10px] md:text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">
//             Verified Store Transactions
//           </p>
//         </div>

//         {/* ✅ Search Input Field */}
//         <div className="relative w-full md:w-80">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//           <Input 
//             placeholder="Search ID or Customer..." 
//             className="pl-11 h-12 rounded-2xl bg-[var(--card-bg)] border-slate-200 shadow-sm focus:ring-blue-500"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* 📊 Responsive Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//         <div className="bg-[var(--card-bg)] p-6 rounded-[2rem] shadow-sm border border-slate-100">
//           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Net Volume</p>
//           <p className="text-2xl md:text-3xl font-black text-emerald-600">₹{netVolume.toLocaleString()}</p>
//         </div>
//         <div className="bg-[var(--card-bg)] p-6 rounded-[2rem] shadow-sm border border-slate-100">
//           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Refunded</p>
//           <p className="text-2xl md:text-3xl font-black text-red-500">₹{refundedVolume.toLocaleString()}</p>
//         </div>
//         <div className="bg-[var(--card-bg)] p-6 rounded-[2rem] shadow-sm border border-slate-100">
//           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
//           <p className="text-2xl md:text-3xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</p>
//         </div>
//       </div>

//       {/* 🖥️ DESKTOP VIEW */}
//       <div className="hidden md:block bg-[var(--card-bg)] rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-slate-50/50">
//             <tr className="text-slate-400">
//               <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Transaction</th>
//               <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Method</th>
//               <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Amount</th>
//               <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
//               <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-right">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50">
//             {filteredPayments.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">
//                   No matching transactions found
//                 </td>
//               </tr>
//             ) : (
//               filteredPayments.map((p) => (
//                 <tr key={p._id} className="hover:bg-slate-50/50 transition-colors group">
//                   <td className="px-8 py-6 font-mono text-xs font-bold text-slate-500 uppercase">
//                     {p.transactionId || p._id.slice(-12)}
//                   </td>
//                   <td className="px-8 py-6 uppercase text-xs font-black text-slate-700">{p.mode}</td>
//                   <td className="px-8 py-6 font-black text-slate-900">₹{p.amount?.toLocaleString()}</td>
//                   <td className="px-8 py-6 text-center">
//                     <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
//                         p.status === "success" ? "bg-emerald-50 text-emerald-600" : p.status === "refunded" ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
//                     }`}>
//                       {p.status === "success" && <CheckCircle size={10} />}
//                       {p.status === "refunded" && <RotateCcw size={10} />}
//                       {p.status === "pending" && <Clock size={10} />}
//                       {p.status}
//                     </div>
//                   </td>
//                   <td className="px-8 py-6 text-right">
//                     <button onClick={() => setSelectedPayment(p)} className="p-2.5 bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm">
//                       <Eye size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 📱 MOBILE VIEW */}
//       <div className="md:hidden space-y-4 px-2">
//         {filteredPayments.length === 0 ? (
//              <p className="text-center py-10 text-slate-400 font-black uppercase text-xs">No results</p>
//         ) : (
//             filteredPayments.map((p) => (
//               <div key={p._id} className="bg-[var(--card-bg)] p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-1">
//                     <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Transaction Ref</p>
//                     <p className="font-mono text-xs font-bold text-slate-600 uppercase">#{p.transactionId?.slice(-10) || p._id.slice(-10)}</p>
//                   </div>
//                   <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
//                     p.status === "success" ? "bg-emerald-50 text-emerald-600" : p.status === "refunded" ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
//                   }`}>
//                     {p.status}
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">{p.mode}</span>
//                   <p className="text-xl font-black text-slate-900 italic">₹{p.amount?.toLocaleString()}</p>
//                 </div>
//                 <Button onClick={() => setSelectedPayment(p)} variant="outline" className="w-full rounded-2xl h-11 text-[10px] font-black uppercase tracking-widest border-slate-100">
//                   <Eye size={14} className="mr-2" /> Details
//                 </Button>
//               </div>
//             ))
//         )}
//       </div>

//      {/* ✅ ENHANCED AUDIT MODAL */}
// {selectedPayment && (
//   <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
//     <div className="bg-[var(--card-bg)] w-full max-w-lg sm:rounded-[2.5rem] rounded-t-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative animate-in slide-in-from-bottom duration-300 max-h-[95vh]">
//       {/* Status Bar */}
//       <div
//         className={`h-1.5 w-full ${
//           selectedPayment.status === "success"
//             ? "bg-emerald-500"
//             : selectedPayment.status === "refunded"
//             ? "bg-red-500"
//             : "bg-orange-500"
//         }`}
//       />

//       {/* Header */}
//       <div className="px-8 pt-8 flex justify-between items-start">
//         <div>
//           <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
//             Transaction Audit
//           </h2>
//           <p className="text-[11px] font-bold text-slate-900 mt-1 font-mono uppercase">
//             ID: {selectedPayment.transactionId || selectedPayment._id}
//           </p>
//         </div>
//         <button
//           onClick={() => setSelectedPayment(null)}
//           className="p-2 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full transition-all"
//         >
//           <X size={18} />
//         </button>
//       </div>

//       {/* Content Area - Scrollable */}
//       <div className="p-8 overflow-y-auto space-y-8 no-scrollbar">
//         {/* Big Amount Display */}
//         <div className="text-center py-2">
//           <div
//             className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-3 ${
//               selectedPayment.status === "success"
//                 ? "bg-emerald-50 text-emerald-600"
//                 : selectedPayment.status === "refunded"
//                 ? "bg-red-50 text-red-600"
//                 : "bg-orange-50 text-orange-600"
//             }`}
//           >
//             {selectedPayment.status === "success" ? (
//               <CheckCircle size={12} />
//             ) : selectedPayment.status === "refunded" ? (
//               <RotateCcw size={12} />
//             ) : (
//               <Clock size={12} />
//             )}
//             {selectedPayment.status}
//           </div>
//           <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
//             ₹{selectedPayment.amount?.toLocaleString("en-IN")}
//           </h1>
//           <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
//             Processed on {new Date(selectedPayment.createdAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}
//           </p>
//         </div>

//         <div className="border-t border-dashed border-slate-200" />

//         {/* Detailed Info Grid */}
//         <div className="space-y-5">
//           {/* Customer Info */}
//           <div className="flex justify-between items-start">
//             <span className="font-black text-slate-300 uppercase text-[10px] tracking-widest">Customer</span>
//             <div className="text-right">
//               <p className="font-black text-slate-800 text-xs">
//                 {selectedPayment.order?.address?.recipientName || "Guest User"}
//               </p>
//               <p className="text-[10px] text-slate-400 font-bold">
//                 {selectedPayment.order?.user?.email || "No Email Provided"}
//               </p>
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div className="flex justify-between items-center">
//             <span className="font-black text-slate-300 uppercase text-[10px] tracking-widest">Method</span>
//             <div className="flex items-center gap-2">
//                <Wallet size={12} className="text-slate-400" />
//                <span className="font-black text-slate-700 uppercase text-xs">
//                 {selectedPayment.mode}
//                </span>
//             </div>
//           </div>

//           {/* Associated Order */}
//           <div className="flex justify-between items-center">
//             <span className="font-black text-slate-300 uppercase text-[10px] tracking-widest">Order Ref</span>
//             <span className="font-mono font-bold text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded-lg uppercase">
//               #{selectedPayment.order?._id?.slice(-12) || "N/A"}
//             </span>
//           </div>

//           {/* Security Badge */}
//           <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4">
//              <ShieldCheck className="text-emerald-500" size={20} />
//              <div>
//                <p className="text-[10px] font-black text-slate-800 uppercase tracking-tight">Verified Transaction</p>
//                <p className="text-[9px] text-slate-400 font-bold leading-tight">This payment was authorized via secure gateway protocols.</p>
//              </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Button */}
//       <div className="p-4 sm:p-6 bg-slate-50/80 backdrop-blur-md border-t border-slate-100">
//         <Button
//           onClick={() => setSelectedPayment(null)}
//           className="w-full rounded-2xl h-14 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-lg active:scale-95"
//         >
//           Close Audit
//         </Button>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// }


// New code for PaymentInfo.jsx based on the patterns observed in Analytics.jsx and Login.jsx
import { useEffect, useState, useMemo } from "react";
import api from "@/services/api";
import {
  CheckCircle,
  Clock,
  Eye,
  X,
  Loader2,
  Wallet,
  ShieldCheck,
  RotateCcw,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/payments");
        setPayments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading payments:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPayments();
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const query = searchQuery.toLowerCase();
      const transactionId = p.transactionId?.toLowerCase() || "";
      const orderId = p.order?._id?.toLowerCase() || "";
      const recipient = p.order?.address?.recipientName?.toLowerCase() || "";

      return (
        transactionId.includes(query) ||
        orderId.includes(query) ||
        recipient.includes(query)
      );
    });
  }, [payments, searchQuery]);

  const totalRevenue = payments
    .filter((p) => p.status?.toLowerCase() === "success")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const refundedVolume = payments
    .filter((p) => p.status?.toLowerCase() === "refunded")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const netVolume = Math.round((totalRevenue - refundedVolume) * 100) / 100;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#F4E7D0]">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-[var(--primary)] mx-auto" size={48} />
          <p className="text-xs font-black text-[#8A6A2F] uppercase tracking-widest animate-pulse">
            Syncing Transactions...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F4E7D0] p-4 md:p-6 space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-[0.35em] mb-2">
            Payment Records
          </p>
          <h1 className="text-3xl md:text-4xl font-serif text-[#151512]">
            Payments
          </h1>
          <p className="text-sm text-[#594724] mt-2">
            Verified clothing store transactions and refunds.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A6A2F]"
            size={18}
          />
          <Input
            placeholder="Search ID or Customer..."
            className="pl-11 h-12 rounded-none bg-[var(--card-bg)]/80 border border-[#D4AF37]/25 shadow-sm focus-visible:ring-[#D4AF37]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard title="Net Volume" value={netVolume} tone="gold" />
        <StatCard title="Refunded" value={refundedVolume} tone="red" />
        <StatCard title="Total Revenue" value={totalRevenue} tone="dark" />
      </div>

      <div className="hidden md:block bg-[var(--card-bg)]/85 shadow-xl border border-[#D4AF37]/25 overflow-hidden rounded-[2.5rem]">
        <table className="w-full text-left">
          <thead className="bg-[#151512]">
            <tr>
              {["Transaction", "Method", "Amount", "Status", "Action"].map(
                (head) => (
                  <th
                    key={head}
                    className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--primary)] ${
                      head === "Status" ? "text-center" : ""
                    } ${head === "Action" ? "text-right" : ""}`}
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#D4AF37]/15">
            {filteredPayments.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-8 py-20 text-center text-[#8A6A2F] font-bold uppercase tracking-widest"
                >
                  No matching transactions found
                </td>
              </tr>
            ) : (
              filteredPayments.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-[#F4E7D0]/60 transition-colors group"
                >
                  <td className="px-8 py-6 font-mono text-xs font-bold text-[#594724] uppercase">
                    {p.transactionId || p._id.slice(-12)}
                  </td>

                  <td className="px-8 py-6 uppercase text-xs font-black text-[#151512]">
                    {p.mode}
                  </td>

                  <td className="px-8 py-6 font-serif text-xl text-[#151512]">
                    ₹{Number(p.amount || 0).toLocaleString("en-IN")}
                  </td>

                  <td className="px-8 py-6 text-center">
                    <StatusBadge status={p.status} />
                  </td>

                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => setSelectedPayment(p)}
                      className="p-2.5 bg-[var(--card-bg)] border border-[#D4AF37]/25 text-[#8A6A2F] hover:bg-[#151512] hover:text-[var(--primary)] transition-all shadow-sm"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {filteredPayments.length === 0 ? (
          <p className="text-center py-10 text-[#8A6A2F] font-black uppercase text-xs">
            No results
          </p>
        ) : (
          filteredPayments.map((p) => (
            <div
              key={p._id}
              className="bg-[var(--card-bg)]/85 p-5 border border-[#D4AF37]/25 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-[#8A6A2F] uppercase tracking-[0.2em]">
                    Transaction Ref
                  </p>
                  <p className="font-mono text-xs font-bold text-[#151512] uppercase">
                    #{p.transactionId?.slice(-10) || p._id.slice(-10)}
                  </p>
                </div>
                <StatusBadge status={p.status} />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-[#594724] uppercase tracking-widest">
                  {p.mode}
                </span>
                <p className="text-xl font-serif text-[#151512]">
                  ₹{Number(p.amount || 0).toLocaleString("en-IN")}
                </p>
              </div>

              <Button
                onClick={() => setSelectedPayment(p)}
                variant="outline"
                className="w-full rounded-none h-11 text-[10px] font-black uppercase tracking-widest border-[#D4AF37]/30 text-[#151512]"
              >
                <Eye size={14} className="mr-2" /> Details
              </Button>
            </div>
          ))
        )}
      </div>

      {selectedPayment && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#F4E7D0] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col relative max-h-[95vh] border border-[#D4AF37]/30">
            <div className="h-1.5 w-full bg-[#D4AF37]" />

            <div className="px-8 pt-8 flex justify-between items-start">
              <div>
                <h2 className="text-[10px] font-black text-[#8A6A2F] uppercase tracking-[0.25em]">
                  Transaction Audit
                </h2>
                <p className="text-[11px] font-bold text-[#151512] mt-1 font-mono uppercase">
                  ID: {selectedPayment.transactionId || selectedPayment._id}
                </p>
              </div>

              <button
                onClick={() => setSelectedPayment(null)}
                className="p-2 border border-[#D4AF37]/30 text-[#8A6A2F] hover:bg-[#151512] hover:text-[var(--primary)] transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-8 no-scrollbar">
              <div className="text-center py-2">
                <StatusBadge status={selectedPayment.status} />

                <h1 className="text-5xl font-serif text-[#151512] tracking-tight mt-4">
                  ₹{Number(selectedPayment.amount || 0).toLocaleString("en-IN")}
                </h1>

                <p className="text-[10px] font-bold text-[#8A6A2F] mt-2 uppercase tracking-widest">
                  Processed on{" "}
                  {new Date(selectedPayment.createdAt).toLocaleString("en-IN", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div className="border-t border-dashed border-[#D4AF37]/35" />

              <div className="space-y-5">
                <InfoRow label="Customer">
                  <div className="text-right">
                    <p className="font-black text-[#151512] text-xs">
                      {selectedPayment.order?.address?.recipientName ||
                        "Guest User"}
                    </p>
                    <p className="text-[10px] text-[#594724] font-bold">
                      {selectedPayment.order?.user?.email ||
                        "No Email Provided"}
                    </p>
                  </div>
                </InfoRow>

                <InfoRow label="Method">
                  <div className="flex items-center gap-2">
                    <Wallet size={12} className="text-[#8A6A2F]" />
                    <span className="font-black text-[#151512] uppercase text-xs">
                      {selectedPayment.mode}
                    </span>
                  </div>
                </InfoRow>

                <InfoRow label="Order Ref">
                  <span className="font-mono font-bold text-[#151512] text-xs bg-[var(--card-bg)]/80 border border-[#D4AF37]/25 px-2 py-0.5 uppercase">
                    #{selectedPayment.order?._id?.slice(-12) || "N/A"}
                  </span>
                </InfoRow>

                <div className="bg-[var(--card-bg)]/80 p-4 border border-[#D4AF37]/25 flex items-center gap-4">
                  <ShieldCheck className="text-[var(--primary)]" size={20} />
                  <div>
                    <p className="text-[10px] font-black text-[#151512] uppercase tracking-tight">
                      Verified Transaction
                    </p>
                    <p className="text-[9px] text-[#594724] font-bold leading-tight">
                      This payment was authorized via secure gateway protocols.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-[var(--card-bg)]/60 border-t border-[#D4AF37]/25">
              <Button
                onClick={() => setSelectedPayment(null)}
                className="w-full rounded-none h-14 !bg-[#151512] !text-[var(--primary)] font-black uppercase tracking-widest text-[10px] hover:!bg-[#D4AF37] hover:!text-black transition-all active:scale-95"
              >
                Close Audit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, tone }) {
  const color =
    tone === "red"
      ? "text-red-600"
      : tone === "gold"
        ? "text-[var(--primary)]"
        : "text-[#151512]";

  return (
    <div className="bg-[var(--card-bg)]/85 p-6 shadow-md border border-[#D4AF37]/25">
      <p className="text-[10px] font-black text-[#8A6A2F] uppercase tracking-widest mb-1">
        {title}
      </p>
      <p className={`text-2xl md:text-3xl font-serif ${color}`}>
        ₹{Number(value || 0).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = status?.toLowerCase();

  const styles =
    normalized === "success"
      ? "bg-emerald-50 text-emerald-700"
      : normalized === "refunded"
        ? "bg-red-50 text-red-600"
        : "bg-[#E8D6B8] text-[#8A6A2F]";

  const Icon =
    normalized === "success"
      ? CheckCircle
      : normalized === "refunded"
        ? RotateCcw
        : Clock;

  return (
    <div
      className={`inline-flex items-center gap-1 px-3 py-1 text-[9px] font-black uppercase tracking-widest ${styles}`}
    >
      <Icon size={10} />
      {status}
    </div>
  );
}

function InfoRow({ label, children }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="font-black text-[#8A6A2F] uppercase text-[10px] tracking-widest">
        {label}
      </span>
      {children}
    </div>
  );
}
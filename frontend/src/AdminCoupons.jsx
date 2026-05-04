import React, { useState, useEffect } from "react";
import api from "@/services/api";
import { Ticket, Plus, Trash2, Power, Loader2, Zap, Calendar, Info, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [form, setForm] = useState({ 
    code: "", 
    prefix: "",
    type: "percent", 
    value: 0, 
    minCartValue: 0, 
    expiryDate: "",
    maxUses: 0,
    maxUsesPerUser: 1,
    description: "",
  });

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      // Backend route is /api/coupons, app.use("/api/coupons", couponRoutes)
      // Inside couponRoutes, GET "/" fetches all.
      const res = await api.get("/coupons/admin/all");
      setCoupons(res.data?.coupons || []);
    } catch (err) {
      console.error("Error fetching coupons", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      // ✅ MATCHED BACKEND: The endpoint is /create-coupon
      await api.post("/coupons/admin/create", form);
      toast.success("Coupon created successfully!");
      setForm({ 
        code: "", prefix: "", type: "percent", value: 0, 
        minCartValue: 0, expiryDate: "", maxUses: 0, 
        maxUsesPerUser: 1, description: "" 
      });
      fetchCoupons();
    } catch (err) { 
      toast.error(err.response?.data?.message || "Failed to create coupon"); 
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      // ✅ MATCHED BACKEND: Uses PATCH and specific /activate or /deactivate endpoints
      const action = currentStatus === 'active' ? 'deactivate' : 'activate';
      await api.put(`/coupons/admin/toggle/${id}`);
      toast.success(`Coupon ${action}d successfully`);
      fetchCoupons();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      // ✅ MATCHED BACKEND: DELETE /coupons/:id
      await api.delete(`/coupons/admin/delete/${id}`);
      toast.success("Coupon deleted");
      fetchCoupons();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="space-y-8 pb-20 md:pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Coupons</h1>
        <p className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest">Advanced discount management</p>
      </div>

      {/* Responsive Form */}
      <div className="bg-[var(--card-bg)] p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#D4AF37] rounded-xl flex items-center justify-center text-white shrink-0">
            <Plus size={20} />
          </div>
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Create New Coupon</h2>
        </div>
        
        <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Promo Code</label>
            <Input 
              placeholder="AUTO-GENERATE IF EMPTY" 
              className="rounded-xl h-12 uppercase font-black tracking-widest"
              value={form.code} 
              onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Prefix (For Auto-Gen)</label>
            <Input className="rounded-xl h-12" value={form.prefix} onChange={e => setForm({...form, prefix: e.target.value})} />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Type</label>
            <select 
              value={form.type} 
              onChange={e => setForm({...form, type: e.target.value})} 
              className="w-full border border-slate-200 rounded-xl px-4 h-12 text-sm font-bold bg-[var(--card-bg)] outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="percent">Percentage (%)</option>
              <option value="flat">Fixed Amount (₹)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Discount Value</label>
            <Input type="number" className="rounded-xl h-12 font-bold" value={form.value} onChange={e => setForm({...form, value: e.target.value})} required />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Min Cart Value</label>
            <Input type="number" className="rounded-xl h-12" value={form.minCartValue} onChange={e => setForm({...form, minCartValue: e.target.value})} />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Expiry Date</label>
            <Input type="date" className="rounded-xl h-12" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Max Uses</label>
            <Input type="number" className="rounded-xl h-12" value={form.maxUses} onChange={e => setForm({...form, maxUses: e.target.value})} />
          </div>

          <div className="flex items-end">
            <Button disabled={submitLoading} type="submit" className="bg-[#D4AF37] h-12 w-full rounded-xl font-black uppercase tracking-widest text-xs">
              {submitLoading ? <Loader2 className="animate-spin" /> : "Create Coupon"}
            </Button>
          </div>
        </form>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[var(--primary)] ">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Code</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Value</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {coupons.map(c => (
              <tr key={c._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <span className="font-black text-slate-900 tracking-widest uppercase">{c.code}</span>
                </td>
                <td className="px-8 py-6 font-bold text-slate-600">
                 {c.type === "percent" ? `${c.value}% OFF` : `₹${c.value} OFF`}
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    c.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right space-x-2">
                  <button onClick={() => handleToggleStatus(c._id, c.status)} className="p-2.5 bg-slate-50 hover:bg-slate-200 rounded-xl transition-all">
                    <Power size={16} className={c.status === 'active' ? 'text-orange-500' : 'text-emerald-500'} />
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="p-2.5 bg-slate-50 hover:bg-rose-500 hover:text-white rounded-xl transition-all">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {coupons.map(c => (
          <div key={c._id} className="bg-[var(--card-bg)] p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-black text-slate-900 tracking-widest uppercase">{c.code}</span>
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                c.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {c.status}
              </span>
            </div>
            <p className="text-xl font-black text-slate-900">
              {c.type === 'percent' ? `${c.value}% OFF` : `₹${c.value} OFF`}
            </p>
            <div className="flex gap-2">
              <Button onClick={() => handleToggleStatus(c._id, c.status)} variant="outline" className="flex-1 rounded-xl">
                <Power size={14} className="mr-2" /> {c.status === 'active' ? 'Deactivate' : 'Activate'}
              </Button>
              <Button onClick={() => handleDelete(c._id)} variant="outline" className="text-rose-500 hover:bg-rose-50 rounded-xl">
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
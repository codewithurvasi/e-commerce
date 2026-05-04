import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "@/services/api";
import { X } from "lucide-react";

const CouponBottomSheet = ({ onClose, onApply, cartTotal }) => {
  const { user } = useSelector((state) => state.auth);
  const localUserId = localStorage.getItem("userId");

  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        const token = localStorage.getItem("token");
        const localUserId = localStorage.getItem("userId");

        const res = await api.get("/coupons/active", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("COUPONS RESPONSE:", res.data);

        const allCoupons = res.data.coupons || [];

        // ✅ frontend-only restriction
        const filteredCoupons = allCoupons.filter((cp) => {
          if (
            cp.description?.toLowerCase().includes("wallet") &&
            cp.createdBy?.toString() !== localUserId?.toString()
          ) {
            return false;
          }
          return cp.status === "active";
        });

        const updated = filteredCoupons.map((cp) => {
          const now = new Date();
          let disabled = false;
          let reason = "";

          if (
            cp.usedBy?.some(
              (u) => u.userId?.toString() === localUserId?.toString(),
            )
          ) {
            disabled = true;
            reason = "You have already used this coupon";
          } else if (new Date(cp.expiryDate) < now) {
            disabled = true;
            reason = "This coupon has expired";
          } else if (cp.startDate && now < new Date(cp.startDate)) {
            disabled = true;
            reason = `Starts on ${new Date(cp.startDate).toLocaleDateString()}`;
          } else if (cp.maxUses > 0 && cp.uses >= cp.maxUses) {
            disabled = true;
            reason = "Maximum usage limit reached";
          } else if (cartTotal < cp.minCartValue) {
            disabled = true;
            reason = `Add ₹${cp.minCartValue - cartTotal} more to use this coupon`;
          }

          return { ...cp, disabled, reason };
        });

        setCoupons(updated);
      } catch (err) {
        console.error("Error loading coupons", err);
      } finally {
        setLoading(false);
      }
    };

    loadCoupons();
    console.log("AUTH USER:", user);
  }, [cartTotal, user]);

  return (
    <>
      {/* BACKDROP */}
      <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40" />

      {/* BOTTOM SHEET */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--card-bg)] rounded-t-3xl max-h-[85vh] overflow-hidden shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="mx-auto h-1.5 w-16 rounded-full bg-slate-300 absolute top-2 left-1/2 -translate-x-1/2" />
          <h2 className="text-lg font-black text-slate-800">
            Available Coupons
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-4 overflow-y-auto max-h-[75vh]">
          {loading ? (
            <p className="text-center text-slate-500 py-10">Loading coupons…</p>
          ) : coupons.length === 0 ? (
            <p className="text-center text-slate-400 py-10">
              No coupons available
            </p>
          ) : coupons.every((c) => c.disabled) ? (
            <p className="text-center text-slate-400 py-10">
              Add more items to your cart to unlock available coupons
            </p>
          ) : (
            <div className="space-y-4">
              {coupons.map((cp) => (
                <div
                  key={cp._id}
                  className={`border rounded-2xl p-4 flex justify-between gap-4 ${
                    cp.disabled
                      ? "bg-slate-50 border-slate-200 opacity-70"
                      : "bg-[var(--card-bg)] border-slate-200"
                  }`}
                >
                  {/* LEFT */}
                  <div>
                    <h3 className="font-black text-slate-800">{cp.code}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {cp.description}
                    </p>

                    <p className="mt-2 font-bold text-blue-600">
                      {cp.type === "percent"
                        ? `${cp.value}% OFF`
                        : `₹${cp.value} OFF`}
                    </p>

                    {cp.minCartValue > 0 && (
                      <p className="text-xs text-slate-400 mt-1">
                        Min cart: ₹{cp.minCartValue}
                      </p>
                    )}

                    {cp.disabled && (
                      <p className="text-xs text-red-500 mt-2">{cp.reason}</p>
                    )}
                  </div>

                  {/* RIGHT */}
                  {!cp.disabled ? (
                    <button
                      onClick={() => {
                        let discount = 0;

                        if (cp.type === "percent") {
                          discount =
                            (Number(cp.value) / 100) * Number(cartTotal);
                        } else {
                          discount = Number(cp.value);
                        }

                        discount = Math.min(discount, Number(cartTotal));

                        onApply({
                          code: cp.code,
                          discount: Math.round(discount),
                        });

                        onClose();
                      }}
                      className="h-fit self-center px-4 py-2 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition"
                    >
                      Apply
                    </button>
                  ) : (
                    <span className="self-center text-xs text-slate-400 font-semibold">
                      Unavailable
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CouponBottomSheet;

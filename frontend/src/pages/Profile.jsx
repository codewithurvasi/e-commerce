import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Import setUser if you want to update Redux state manually after a successful API call
import { setUser } from "@/store/slices/authSlice";
import api from "@/services/api";
import { toast } from "sonner";
import {
  Wallet,
  Plus,
  Trash2,
  Loader2,
  UserCircle,
  Mail,
  Phone,
  Lock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emptyAddress = {
  recipientName: "",
  recipientPhone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  isDefault: false,
};

export default function Profile() {
  const dispatch = useDispatch();

  // ✅ USE REDUX USER ONLY
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingAddresses, setSavingAddresses] = useState(false);

  // 🔹 Refer & Earn states
  const [referralLink, setReferralLink] = useState("");
  const [myCoupons, setMyCoupons] = useState([]);
  const [converting, setConverting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    addresses: [emptyAddress],
  });

  /* ==========================
      SYNC FORM WITH REDUX USER
  =========================== */
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        addresses: user.addresses?.length
          ? user.addresses.map((addr) => ({ ...emptyAddress, ...addr }))
          : [emptyAddress],
      });
    }
  }, [user]);

  /* ==========================
   REFER & EARN FUNCTIONS
========================== */

  const fetchMyCoupons = async () => {
    try {
      const res = await api.get("/coupons/my-coupons");
      setMyCoupons(res.data?.coupons || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchMyCoupons();
  }, [isAuthenticated]);

  const generateReferralLink = async () => {
    try {
      const res = await api.get("/auth/generate-referral-link");
      setReferralLink(res.data.referralLink);
      toast.success("Referral link generated");
    } catch {
      toast.error("Failed to generate referral link");
    }
  };

  const convertWalletToCoupon = async () => {
    const amount = prompt("Enter wallet amount to convert");

    if (!amount || isNaN(amount) || amount <= 0) {
      return toast.error("Invalid amount");
    }

    try {
      setConverting(true);
      const res = await api.post("/coupons/convert-wallet", {
        amount: Number(amount),
      });

      // 🔥 update redux wallet
      dispatch(
        setUser({
          ...user,
          wallet: res.data.newWallet,
        })
      );

      toast.success(res.data.message);
      fetchMyCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || "Conversion failed");
    } finally {
      setConverting(false);
    }
  };

  /* ==========================
      ADDRESS HANDLERS
  =========================== */
  const handleAddressChange = (index, field, value) => {
    const updated = [...form.addresses];
    updated[index][field] = value;
    setForm({ ...form, addresses: updated });
  };

  const removeAddress = (index) => {
    if (form.addresses.length === 1) {
      toast.error("At least one address is required");
      return;
    }
    setForm({
      ...form,
      addresses: form.addresses.filter((_, i) => i !== index),
    });
  };

  const addNewAddress = () => {
    setForm({
      ...form,
      addresses: [...form.addresses, { ...emptyAddress }],
    });
  };

  /* ==========================
      UPDATE PROFILE (separated handlers)
  ========================== */
  const handleUpdateProfile = async () => {
    setSavingProfile(true);

    const payload = {
      name: form.name.trim(),
    };

    if (form.password?.trim()) payload.password = form.password;

    try {
      const response = await api.put("/auth/update-profile", payload);

      // Always merge the sent fields (excluding password) into the user object
      // to ensure client reflects changes even if server doesn't update
      const { password, ...payloadWithoutPassword } = payload;
      const updatedUser = response.data?.user
        ? { ...response.data.user, ...payloadWithoutPassword }
        : { ...user, ...payloadWithoutPassword };

      if (updatedUser) dispatch(setUser(updatedUser));

      // Debug: print updated user to console so you can inspect in browser
      console.debug("Updated user:", updatedUser);

      toast.success("Profile updated successfully");
    } catch (err) {
      // log full error for easier debugging
      console.error("Profile update error:", err);
      toast.error(err?.response?.data?.message || err?.message || "Update failed");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdateAddresses = async () => {
    setSavingAddresses(true);

    const validAddresses = form.addresses
      .map((a) => ({
        recipientName: a.recipientName.trim(),
        recipientPhone: a.recipientPhone.trim(),
        line1: a.line1.trim(),
        line2: a.line2.trim(),
        city: a.city.trim(),
        state: a.state.trim(),
        postalCode: a.postalCode.trim(),
        country: "India",
        isDefault: !!a.isDefault,
      }))
      .filter((a) => a.recipientName && a.recipientPhone);

    if (!validAddresses.length) {
      setSavingAddresses(false);
      return toast.error("Recipient name & phone required");
    }

    try {
      const response = await api.put("/auth/update-profile", {
        addresses: validAddresses,
      });

      if (response.data?.user) dispatch(setUser(response.data.user));
      toast.success("Addresses updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSavingAddresses(false);
    }
  };

  /* ==========================
      LOADER
  =========================== */
  if (loading && !user) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* ===== HEADER ===== */}
        <div className="flex flex-col gap-6 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Account Settings
            </h1>
            <p className="text-sm sm:text-base text-slate-500">
              Manage your profile and shipping details
            </p>
          </div>

          {/* REFER + WALLET */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* REFER & EARN */}
            <div className="bg-[var(--card-bg)] p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="font-black text-lg sm:text-xl mb-4">
                Refer & Earn
              </h2>

              <p className="text-sm">
                Referral Code:
                <span className="ml-2 font-bold text-[var(--primary)]">
                  {user?.referralCode || "N/A"}
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button onClick={generateReferralLink}>
                  Generate Referral Link
                </Button>

                {referralLink && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(referralLink);
                      toast.success("Copied");
                    }}
                  >
                    Copy
                  </Button>
                )}
              </div>

              {referralLink && (
                <p className="text-xs mt-2 break-all">{referralLink}</p>
              )}

              <Button
                onClick={convertWalletToCoupon}
                disabled={converting}
                className="mt-5 w-full bg-green-600 hover:bg-green-700"
              >
                {converting ? "Converting..." : "Convert Wallet to Coupon"}
              </Button>

              <div className="mt-6">
                <h3 className="font-bold mb-2 text-sm">My Coupons</h3>

                {myCoupons.length ? (
                  myCoupons.map((c) => (
                    <div
                      key={c._id}
                      className="border p-3 rounded-xl mb-3 bg-slate-50 text-sm"
                    >
                      <p>
                        <b>Code:</b> {c.code}
                      </p>
                      <p>
                        <b>Value:</b> ₹{c.value}
                      </p>
                      <p>
                        <b>Status:</b> {c.status}
                      </p>
                      <p>
                        <b>Expiry:</b> {new Date(c.expiryDate).toDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No coupons yet</p>
                )}
              </div>
            </div>

            {/* WALLET */}
            <div className="bg-[var(--card-bg)] p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="bg-[#D4AF37] p-3 rounded-xl">
                <Wallet className="text-white" size={24} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-slate-400">
                  Wallet Balance
                </p>
                <p className="text-2xl font-black text-slate-900">
                  ₹{user?.wallet || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FORM ===== */}
        <div className="space-y-8">
          {/* PERSONAL DETAILS */}
          <div className="bg-[var(--card-bg)] p-4 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <UserCircle className="text-[var(--primary)]" />
              <h2 className="font-black text-lg sm:text-xl text-slate-900">
                Personal Details
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Full Name
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="h-11 mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  New Password
                </label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Leave blank to keep current"
                  className="h-11 mt-1"
                />
              </div>

              {/* Phone (Read-only) */}
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Phone Number (Not Editable)
                </label>
                <Input
                  value={form.phone}
                  readOnly
                  placeholder="9998887776"
                  className="h-11 mt-1 bg-slate-50"
                />
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                onClick={handleUpdateProfile}
                disabled={savingProfile}
                className="bg-[#D4AF37] hover:bg-[#C09A3D]"
              >
                {savingProfile ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </div>

          {/* ADDRESSES */}
          <div className="bg-[var(--card-bg)] p-4 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-black text-lg sm:text-xl">
                Shipping Addresses
              </h2>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addNewAddress}
                >
                  <Plus size={16} className="mr-1" /> Add
                </Button>

                <Button
                  type="button"
                  onClick={handleUpdateAddresses}
                  disabled={savingAddresses}
                  className="bg-[#D4AF37] hover:bg-[#C09A3D]"
                >
                  {savingAddresses ? "Saving..." : "Save Addresses"}
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {form.addresses.map((a, i) => (
                <div
                  key={i}
                  className="border p-4 rounded-xl bg-slate-50 relative"
                >
                  <button
                    type="button"
                    onClick={() => removeAddress(i)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <Input
                      placeholder="Recipient Name"
                      value={a.recipientName}
                      onChange={(e) =>
                        handleAddressChange(i, "recipientName", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Recipient Phone"
                      value={a.recipientPhone}
                      onChange={(e) =>
                        handleAddressChange(i, "recipientPhone", e.target.value)
                      }
                    />
                    <Input
                      className="md:col-span-2"
                      placeholder="Address Line 1"
                      value={a.line1}
                      onChange={(e) =>
                        handleAddressChange(i, "line1", e.target.value)
                      }
                    />
                    <Input
                      className="md:col-span-2"
                      placeholder="Address Line 2"
                      value={a.line2}
                      onChange={(e) =>
                        handleAddressChange(i, "line2", e.target.value)
                      }
                    />
                    <Input
                      placeholder="City"
                      value={a.city}
                      onChange={(e) =>
                        handleAddressChange(i, "city", e.target.value)
                      }
                    />
                    <Input
                      placeholder="State"
                      value={a.state}
                      onChange={(e) =>
                        handleAddressChange(i, "state", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Postal Code"
                      value={a.postalCode}
                      onChange={(e) =>
                        handleAddressChange(i, "postalCode", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-xs text-slate-400">
            <p>Your data is stored securely. Use the buttons above to save.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

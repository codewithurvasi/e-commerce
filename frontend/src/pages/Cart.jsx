import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeItemFromCart,
} from "@/store/slices/cartSlice";
import { setUser } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Trash2,
  ShoppingBag,
  Plus,
  Minus,
  Loader2,
  ArrowLeft,
  Zap,
  MapPin,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import CouponBottomSheet from "@/pages/CouponBottomSheet";
import api from "@/services/api";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* =========================
      REDUX STATE
  ========================= */
  const { items: cartItems, status } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  /* =========================
      LOCAL STATE
  ========================= */
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [address, setAddress] = useState({
    recipientName: user?.name || "",
    phone: user?.phone || "",
    line1: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /* =========================
      FETCH CART ON PAGE LOAD
  ========================= */
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  /* =========================
      PRICE & STOCK HELPERS
  ========================= */
  const getItemPrice = (item) =>
    Number(item.variant?.price ?? item.product?.price ?? 0);

  const getItemStock = (item) =>
    Number(item.variant?.stock ?? item.product?.stock ?? 0);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + getItemPrice(item) * item.quantity,
      0,
    );
  }, [cartItems]);

  const shipping = subtotal >= 50000 ? subtotal * 0.02 : subtotal * 0.05;
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    // TEMP: backend will calculate final discount
    return 0;
  }, [appliedCoupon]);
  const total = subtotal + shipping - couponDiscount;

  /* =========================
      UPDATE QUANTITY (Fixed 404 & Thunk Params)
  ========================= */
  const handleUpdateQty = (item, qty) => {
    const stock = getItemStock(item);
    const clampedQty = Math.max(1, Math.min(qty, stock));

    if (clampedQty === item.quantity) return;

    dispatch(
      updateCartItem({
        productId: item.productId || item.product?._id,
        variantId: item.variantId ?? null,
        quantity: clampedQty,
        stock,
      }),
    );
  };

  /* =========================
      REMOVE SINGLE ITEM (Fixed 404 & Thunk Params)
  ========================= */
  const handleRemoveItem = (item) => {
    dispatch(
      removeItemFromCart({
        productId: item.product?._id,
        variantId: item.variantId ?? item.variant?._id ?? null,
      }),
    )
      .unwrap()
      .then(() => toast.success("Item removed from cart"))
      .catch(() => toast.error("Failed to remove item"));
  };

  /* =========================
      SAVE ADDRESS 
  ========================= */
  const handleSaveAddress = async () => {
    if (!address.recipientName || !address.line1 || !address.phone) {
      toast.error("Please fill recipient name, phone, and address");
      return;
    }

    try {
      const response = await api.put("/auth/update-profile", { address });
      if (response.data?.user) {
        dispatch(setUser(response.data.user));
      }
      toast.success("Address updated in your profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save address");
    }
  };

  /* =========================
      CHECKOUT
  ========================= */
  const handleCheckout = async () => {
    if (isProcessing) return;

    if (!cartItems.length) return toast.error("Cart is empty");

    if (!address.recipientName || !address.line1 || !address.phone)
      return toast.error("Please provide shipping address");

    setIsProcessing(true);

    try {
      // 1️⃣ Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      // 2️⃣ Prepare items
      const orderItems = cartItems.map((item) => ({
        product: item.productId || item.product?._id,
        variantId: item.variantId ?? null,
        title: item.product?.title,
        price: getItemPrice(item),
        quantity: item.quantity,
      }));

      // 3️⃣ Create order
      const orderRes = await api.post("/orders", {
        items: orderItems,
        total,
        shipping,
        address,
        couponCode: appliedCoupon || null,
      });

      const order =
        orderRes.data?.order || orderRes.data?.data || orderRes.data;

      if (!order?._id) {
        throw new Error("Order not created");
      }

      // 4️⃣ Create Razorpay order
      const paymentRes = await api.post("/payments/create", {
        orderId: order._id,
        amount: Math.round(total * 100), // paise
      });

      const { rzpOrderId, amount, currency, key } = paymentRes.data;

      if (!rzpOrderId || !key) {
        throw new Error("Payment initialization failed");
      }

      // 5️⃣ Open Razorpay
      const options = {
        key,
        amount,
        currency,
        order_id: rzpOrderId,
        name: "Petro Shop",
        description: "Secure Payment",
        notes: { orderId: order._id },
        prefill: {
          name: user?.name || "",
          contact: address.phone,
        },
        theme: { color: "#1E3A8A" },

        handler: async (response) => {
          try {
            await api.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            });

            toast.success("Payment successful!");
            navigate("/order-success");
          } catch {
            toast.error("Payment verification failed");
          }
        },

        modal: {
          ondismiss: () => toast.error("Payment cancelled"),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () =>
        toast.error("Payment failed, please try again"),
      );

      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Checkout failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-12 md:pt-16">
        <Link
          to="/shop"
          className="flex items-center gap-2 mb-4 md:mb-6 text-[#8a6418] font-semibold hover:underline text-sm md:text-base"
        >
          <ArrowLeft size={isMobile ? 14 : 16} /> Back to Shopping
        </Link>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 md:py-32 bg-[var(--card-bg)] rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
            <ShoppingBag
              size={isMobile ? 60 : 80}
              className="mx-auto text-slate-200"
            />
            <h2 className="text-xl md:text-3xl font-black mt-4 md:mt-6 text-slate-400 uppercase tracking-tight">
              Your Cart is Empty
            </h2>
            <Button
              className="mt-6 md:mt-8 rounded-full px-6 md:px-8 bg-blue-600 text-sm md:text-base"
              onClick={() => navigate("/shop")}
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-6 md:gap-12">
            <div className="lg:col-span-8 space-y-4 md:space-y-6">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={`${item.product?._id}-${
                      item.variantId ?? "novariant"
                    }`}
                    layout
                    initial={isMobile ? {} : { opacity: 0, y: 20 }}
                    animate={isMobile ? {} : { opacity: 1, y: 0 }}
                    exit={isMobile ? {} : { opacity: 0, scale: 0.95 }}
                  >
                    <Card className="rounded-2xl md:rounded-3xl border-none shadow-sm overflow-hidden bg-[var(--card-bg)]">
                      <CardContent className="p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6">
                        <div className="h-24 w-24 md:h-32 md:w-32 shrink-0 bg-slate-50 rounded-xl md:rounded-2xl overflow-hidden flex items-center justify-center p-2">
                          <img
                            src={
                              item.product?.images?.[0]?.url ||
                              "/placeholder.png"
                            }
                            className="max-h-full max-w-full object-contain"
                            alt={item.product?.title}
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-bold text-slate-800 line-clamp-1">
                            {item.product?.title}
                          </h3>
                          {item.variant && (
                            <p className="text-xs text-slate-500 font-medium mt-1">
                              Variant:{" "}
                              {Object.entries(item.variant)
                                .filter(
                                  ([k]) =>
                                    !["_id", "price", "stock"].includes(k),
                                )
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(", ")}
                            </p>
                          )}
                          <p className="text-black font-black text-base md:text-lg mt-1 tracking-tight">
                            ₹{getItemPrice(item).toLocaleString()}
                          </p>

                          <div className="flex items-center gap-4 md:gap-6 mt-3 md:mt-4">
                            <div className="flex items-center border border-slate-200 rounded-full px-2 py-1 bg-[var(--card-bg)] shadow-sm">
                              <button
                                className="p-1 hover:text-black-600 transition-colors disabled:opacity-30"
                                onClick={() =>
                                  handleUpdateQty(item, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={isMobile ? 16 : 18} />
                              </button>
                              <span className="w-8 md:w-10 text-center font-black text-slate-700 text-sm md:text-base">
                                {item.quantity}
                              </span>
                              <button
                                className="p-1 hover:text-black-600 transition-colors disabled:opacity-30"
                                onClick={() =>
                                  handleUpdateQty(item, item.quantity + 1)
                                }
                                disabled={item.quantity >= getItemStock(item)}
                              >
                                <Plus size={isMobile ? 16 : 18} />
                              </button>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {getItemStock(item)} in stock
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between">
                          <Button
                            variant="ghost"
                            className="flex items-center justify-center text-red-300 hover:text-red-600 hover:bg-red-50 h-10 w-10 md:h-12 md:w-12"
                            onClick={() => handleRemoveItem(item)}
                          >
                            <Trash2 className="w-6 h-6 md:w-7 md:h-7" />
                          </Button>
                          <div className="text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              Subtotal
                            </p>
                            <p className="font-black text-slate-800 text-base md:text-lg tracking-tighter">
                              ₹
                              {(
                                getItemPrice(item) * item.quantity
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <Card className="rounded-3xl border-none shadow-sm bg-[var(--card-bg)] overflow-hidden">
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-xl font-black flex items-center gap-2 mb-4 text-slate-800">
                    <MapPin className="text-black" /> Shipping Address
                  </h3>

                  <div className="space-y-3">
                    <input
                      placeholder="Recipient Name"
                      value={address.recipientName}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          recipientName: e.target.value,
                        })
                      }
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37] bg-slate-50/50"
                    />
                    <input
                      placeholder="Phone Number"
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37] bg-slate-50/50"
                    />
                    <textarea
                      placeholder="Full Address (House No, Street, Landmark)"
                      rows={3}
                      value={address.line1}
                      onChange={(e) =>
                        setAddress({ ...address, line1: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37] bg-slate-50/50"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder="City"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                        className="border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37] bg-slate-50/50"
                      />
                      <input
                        placeholder="State"
                        value={address.state}
                        onChange={(e) =>
                          setAddress({ ...address, state: e.target.value })
                        }
                        className="border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37] bg-slate-50/50"
                      />
                    </div>
                    <input
                      placeholder="Pincode"
                      value={address.postalCode}
                      onChange={(e) =>
                        setAddress({ ...address, postalCode: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37] bg-slate-50/50"
                    />
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleSaveAddress}
                    className="w-full rounded-xl border-blue-100 text-blue-600 hover:bg-black font-bold"
                  >
                    Update Profile Address
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-none shadow-lg bg-[#1E3A8A]">
                <CardContent className="p-8 text-slate-100">
                  <h3 className="text-2xl font-black mb-6 uppercase tracking-tight text-black">
                    Order Summary
                  </h3>

                  <div className="space-y-4 border-b border-white/30 pb-6 mb-6">
                    {/* Coupon Section */}
                    <div className="bg-[var(--card-bg)]/10 rounded-xl p-3">
                      <Button
                        onClick={() => setShowCoupons(true)}
                        className="w-full bg-[#D4AF37] text-white font-black rounded-xl hover:bg-black transition"
                      >
                        View & Apply Coupons
                      </Button>

                      {appliedCoupon && (
                        <p className="text-green-300 text-sm font-bold mt-2 text-center">
                          Applied Coupon: {appliedCoupon}
                        </p>
                      )}
                    </div>

                    {/* Price Details */}
                    <div className="flex justify-between font-medium">
                      <span className="text-black">Subtotal</span>
                      <span className="text-black font-semibold">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between font-medium">
                      <span className="text-black">Estimated Shipping</span>
                      <span className="text-black font-semibold">
                        ₹{shipping.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-3xl font-black mt-6 tracking-tighter text-black">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full h-16 mt-8 bg-[#D4AF37] hover:bg-black rounded-2xl text-lg font-black shadow-xl shadow-blue-900/50 transition-all active:scale-95 text-white"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" /> Processing Order...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Secure Checkout{" "}
                        <Zap size={20} className="ml-2 fill-current" />
                      </div>
                    )}
                  </Button>

                  <p className="text-[10px] text-center mt-4 text-slate-300 font-bold uppercase tracking-widest">
                    Bank-grade encryption | 100% Secure
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {showCoupons && (
        <CouponBottomSheet
          cartTotal={subtotal}
          onClose={() => setShowCoupons(false)}
          onApply={(code) => {
            setAppliedCoupon(code);
            toast.success(`Coupon ${code} applied`);
          }}
        />
      )}
    </div>
  );
}

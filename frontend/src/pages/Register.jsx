import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "@/services/api";
import { auth } from "@/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Lock,
  Ticket,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  KeyRound,
  LogIn,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    referral: "",
  });

  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) setForm((prev) => ({ ...prev, referral: ref }));
  }, [searchParams]);

  const setupRecaptcha = () => {
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => console.log("reCAPTCHA verified"),
          "expired-callback": () => {
            toast.error("reCAPTCHA expired. Please try again.");
            window.recaptchaVerifier = null;
          },
        }
      );

      return window.recaptchaVerifier;
    } catch (err) {
      console.error("Recaptcha initialization error:", err);
      return null;
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();

    if (!form.phone || form.phone.length !== 10) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }

    try {
      setLoading(true);

      const appVerifier = setupRecaptcha();
      if (!appVerifier) {
        throw new Error("Security check initialization failed.");
      }

      const phoneNumber = "+91" + form.phone;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      setConfirmation(confirmationResult);
      setIsOtpSent(true);
      setResendTimer(60);
      toast.success("OTP sent successfully");
    } catch (error) {
      console.error("Firebase Auth Error:", error);

      if (error.code === "auth/invalid-app-credential") {
        toast.error(
          "Security check failed. Check if localhost is whitelisted in Firebase."
        );
      } else {
        toast.error(error.message || "Failed to send OTP");
      }

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        referralCode: form.referral.trim() || null,
      });

      if (res.data.success || res.status === 200) {
        toast.success(`Welcome ${form.name.split(" ")[0]}!`);
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e) => {
    if (e) e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Enter valid 6-digit OTP");
      return;
    }

    if (!confirmation) {
      toast.error("OTP session expired. Please resend OTP.");
      return;
    }

    try {
      setLoading(true);

      await confirmation.confirm(otp);

      const res = await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        referralCode: form.referral.trim() || null,
      });

      if (res.data.success || res.status === 200) {
        toast.success(`Welcome ${form.name.split(" ")[0]}!`);
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(
        error?.response?.data?.message || "Verification or registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;

    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [resendTimer]);

  return (
    <div className="min-h-screen bg-[#f3e6cf] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-[560px] bg-[#fffdf8] border border-[#ead7ae] shadow-[0_30px_80px_rgba(20,18,13,0.12)] px-8 sm:px-12 py-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f7edd9_0%,transparent_38%)] pointer-events-none" />

        <div className="relative z-10 text-center">
          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center bg-[#11110f] text-[var(--primary)] shadow-[0_20px_40px_rgba(0,0,0,0.18)]">
            {isOtpSent ? <ShieldCheck size={34} /> : <LogIn size={34} />}
          </div>

          <p className="mb-4 text-[13px] font-bold tracking-[0.42em] text-[var(--text-accent)] uppercase">
            Premium Member Access
          </p>

          <h1 className="text-4xl sm:text-5xl font-normal text-black tracking-tight">
            {isOtpSent ? "Verify OTP" : "Create Account"}
          </h1>

          <p className="mt-3 text-base sm:text-lg text-[#4b371a]">
            {isOtpSent
              ? `We've sent a code to +91 ${form.phone}`
              : "Join your Webix Ecommerce account"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isOtpSent ? (
            <motion.form
              key="register-step"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              onSubmit={handleRegister}
              className="relative z-10 mt-10 space-y-5"
            >
              <div className="premium-input-group">
                <User className="premium-input-icon" size={21} />
                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="premium-input"
                />
              </div>

              <div className="premium-input-group">
                <Mail className="premium-input-icon" size={21} />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="premium-input"
                />
              </div>

              <div className="premium-input-group">
                <Phone className="premium-input-icon" size={21} />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Mobile Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="premium-input"
                  maxLength={10}
                />
              </div>

              <div className="premium-input-group">
                <Lock className="premium-input-icon" size={21} />
                <input
                  name="password"
                  type="password"
                  placeholder="Create Password"
                  value={form.password}
                  onChange={handleChange}
                  className="premium-input"
                />
              </div>

              <div className="premium-input-group">
                <Ticket className="premium-input-icon" size={21} />
                <input
                  name="referral"
                  placeholder="Referral Code (Optional)"
                  value={form.referral}
                  onChange={handleChange}
                  className="premium-input"
                  readOnly={!!searchParams.get("ref")}
                />
              </div>

              <div id="recaptcha-container"></div>

              <button type="submit" disabled={loading} className="premium-btn">
                {loading ? (
                  "Registering..."
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    Create Account <ArrowRight size={22} />
                  </span>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="otp-step"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              className="relative z-10 mt-10 space-y-6"
            >
              <div className="premium-input-group h-[64px]">
                <KeyRound className="premium-input-icon" size={22} />
                <input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  maxLength={6}
                  className="premium-input text-center text-2xl tracking-[0.5em] font-black placeholder:tracking-normal"
                />
              </div>

              <button
                onClick={handleVerifyAndRegister}
                disabled={loading}
                className="premium-btn"
              >
                {loading ? (
                  "Verifying..."
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    Complete Registration <CheckCircle2 size={20} />
                  </span>
                )}
              </button>

              <div className="text-center pt-1">
                {resendTimer > 0 ? (
                  <p className="text-sm text-[#6b4b1d] font-semibold">
                    Resend code available in{" "}
                    <span className="text-[var(--text-accent)] font-black">
                      {resendTimer}s
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-sm text-[#8a6418] font-bold hover:text-black underline underline-offset-4"
                  >
                    Didn't receive code? Resend OTP
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 mt-10 text-center">
          <p className="text-[#5d421d] font-semibold text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-black hover:text-[var(--text-accent)] transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .premium-input-group {
              position: relative;
              width: 100%;
              height: 58px;
              display: flex;
              align-items: center;
            }

            .premium-input-icon {
              position: absolute;
              left: 24px;
              color: #9a6c17;
              z-index: 5;
              pointer-events: none;
            }

            .premium-input {
              width: 100%;
              height: 100%;
              border: 1px solid #dfc791;
              background: #eaf1ff;
              color: #050505;
              padding-left: 68px;
              padding-right: 18px;
              font-size: 16px;
              font-weight: 700;
              outline: none;
              transition: all 0.25s ease;
              border-radius: 0;
            }

            .premium-input::placeholder {
              color: #7e8794;
              font-weight: 600;
            }

            .premium-input:focus {
              background: #eef4ff;
              border-color: #d4af37;
              box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.16);
            }

            .premium-btn {
              width: 100%;
              height: 70px;
              margin-top: 12px;
              background: #11110f;
              color: #d4af37;
              border: none;
              outline: none;
              font-size: 15px;
              font-weight: 900;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              cursor: pointer;
              transition: all 0.25s ease;
              box-shadow: 0 22px 45px rgba(17, 17, 15, 0.18);
            }

            .premium-btn:hover {
              background: #000;
              color: #f1c94c;
              transform: translateY(-1px);
            }

            .premium-btn:active {
              transform: scale(0.985);
            }

            .premium-btn:disabled {
              opacity: 0.65;
              cursor: not-allowed;
              transform: none;
            }

            #recaptcha-container {
              margin-top: 10px;
            }
          `,
        }}
      />
    </div>
  );
}
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  LogIn,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.emailOrPhone || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const resultAction = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      toast.success(`Welcome back, ${user.name || "User"}!`);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } else {
      const payload = resultAction.payload;
      const errorMsg =
        typeof payload === "object" && payload !== null
          ? payload.message || "Login failed. Please verify your credentials."
          : payload || "Login failed. Please try again later.";

      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4E7D0] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] bg-[var(--card-bg)]/85 border border-[#D4AF37]/25 p-8 md:p-10 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-[#151512]/10 rounded-full blur-3xl pointer-events-none" />

        <header className="relative z-10 text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#151512] mb-5 text-[var(--primary)] border border-[#D4AF37]/30">
            <LogIn size={30} />
          </div>

          <p className="text-[#8A6A2F] text-[10px] tracking-[0.35em] uppercase font-bold mb-3">
            Premium Member Access
          </p>

          <h2 className="text-3xl md:text-4xl font-serif text-[#151512]">
            Welcome Back
          </h2>

          <p className="text-[#594724] mt-2 font-medium text-sm">
            Sign in to your FashionHub account
          </p>
        </header>

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div className="input-group">
            <Mail className="input-icon" size={18} />
            <input
              id="emailOrPhone"
              name="emailOrPhone"
              type="text"
              autoComplete="username"
              placeholder="Email or Phone Number"
              className="input-field"
              value={formData.emailOrPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={18} />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-xs font-bold text-[#8A6A2F] hover:text-[#151512] transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" disabled={loading} className="btn-main group">
            {loading ? (
              <span className="flex items-center gap-2 font-black">
                <Loader2 className="animate-spin" size={18} />
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2 uppercase tracking-widest font-black">
                Login
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            )}
          </Button>
        </form>

        <footer className="mt-10 text-center relative z-10 space-y-4">
          <p className="text-[#594724] font-medium text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-[#151512] font-bold hover:text-[var(--primary)] transition-colors"
            >
              Join FashionHub
            </Link>
          </p>

          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-[#8A6A2F] uppercase tracking-widest">
            <ShieldCheck size={14} className="text-[var(--primary)]" />
            Encrypted Secure Login
          </div>
        </footer>
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .input-group {
              position: relative;
              height: 3.25rem;
              display: flex;
              align-items: center;
              width: 100%;
            }

            .input-icon {
              position: absolute;
              left: 1.25rem;
              color: #8A6A2F;
              z-index: 10;
              pointer-events: none;
            }

            .input-field {
              width: 100%;
              height: 100%;
              border-radius: 0;
              border: 1px solid rgba(212, 175, 55, 0.28);
              background-color: rgba(244, 231, 208, 0.45);
              padding-left: 3.25rem;
              padding-right: 1rem;
              font-weight: 600;
              color: #151512;
              transition: all 0.2s;
              outline: none;
              font-size: 0.875rem;
            }

            .input-field::placeholder {
              color: rgba(89, 71, 36, 0.65);
            }

            .input-field:focus {
              background-color: #fff;
              border-color: #D4AF37;
              box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.14);
            }

            .btn-main {
              width: 100%;
              height: 3.5rem;
              border-radius: 0 !important;
              background-color: #151512 !important;
              color: #D4AF37 !important;
              font-weight: 900 !important;
              font-size: 0.8rem !important;
              box-shadow: 0 12px 24px rgba(21, 21, 18, 0.18);
              transition: all 0.25s !important;
              border: 1px solid rgba(212, 175, 55, 0.35) !important;
              cursor: pointer;
            }

            .btn-main:hover {
              background-color: #D4AF37 !important;
              color: #151512 !important;
              transform: translateY(-1px);
            }

            .btn-main:active {
              transform: scale(0.98);
            }

            .btn-main:disabled {
              opacity: 0.8;
              cursor: not-allowed;
            }
          `,
        }}
      />
    </div>
  );
}
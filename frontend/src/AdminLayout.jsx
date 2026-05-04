import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "@/store/slices/authSlice";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  CreditCard,
  Ticket,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/admin/products", label: "Products", icon: <Package size={20} /> },
    { to: "/admin/orders", label: "Orders", icon: <ShoppingCart size={20} /> },
    { to: "/admin/analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { to: "/admin/payments", label: "Payments", icon: <CreditCard size={20} /> },
    { to: "/admin/coupons", label: "Coupons", icon: <Ticket size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F4E7D0] overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#151512] text-white px-5 flex justify-between items-center z-[60] shadow-md border-b border-[#D4AF37]/25">
        <h2 className="text-lg font-serif text-white">
          Webix <span className="text-[var(--primary)]">Admin</span>
        </h2>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 border border-[#D4AF37]/30 text-[var(--primary)] hover:bg-[#D4AF37] hover:text-black transition"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[50] lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[55] w-72 bg-[#151512] text-white flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:h-full lg:min-w-[280px]
          border-r border-[#D4AF37]/25
        `}
      >
        <div className="p-8">
          <h2 className="text-2xl font-serif text-white">
            Webix <span className="text-[var(--primary)]">Ecommerce</span>
          </h2>

          <div className="mt-5 p-4 bg-[var(--card-bg)]/5 border border-[var(--border-soft)]">
            <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-widest">
              Active Admin
            </p>
            <p className="text-sm font-bold text-[var(--primary)] mt-1">
              {user?.name || "Administrator"}
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3.5 transition-all duration-200 group ${
                  isActive
                    ? "bg-[#D4AF37] text-black font-bold shadow-lg"
                    : "text-white/55 hover:bg-[var(--card-bg)]/5 hover:text-[var(--primary)]"
                }`
              }
            >
              <span className="group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="text-sm uppercase tracking-wide">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-[var(--border-soft)]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-5 py-4 text-red-400 hover:bg-red-500/10 transition-all font-black uppercase tracking-widest text-[10px]"
          >
            <LogOut size={18} />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden scroll-smooth bg-[#F4E7D0] no-scrollbar">
        <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 pt-24 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { fetchCart } from "@/store/slices/cartSlice";
import {
  ShoppingCart,
  ChevronDown,
  Heart,
  Package,
  LogOut,
  UserCircle,
  User,
  Baby,
  ShoppingBag,
  Footprints,
  Watch,
  Sparkles,
  Crown,
  Shirt,
  Menu,
  X,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import HeaderSearch from "@/components/HeaderSearch";

const categories = [
  { name: "Men", icon: User },
  { name: "Women", icon: Sparkles },
  { name: "Kids", icon: Baby },
  { name: "Clothing", icon: Shirt },
  { name: "Footwear", icon: Footprints },
  { name: "Accessories", icon: Watch },
  { name: "New Arrivals", icon: ShoppingBag },
  { name: "Trending", icon: Crown },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const [localSearch, setLocalSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: allProducts } = useSelector(
    (state) => state.products || { items: [] },
  );
  const { ids: wishlistIds } = useSelector(
    (state) => state.wishlist || { ids: [] },
  );

  const marqueeItems = [
    ...categories,
    ...categories,
    ...categories,
    ...categories,
  ];

  const suggestions = useMemo(() => {
    const q = localSearch.trim().toLowerCase();
    if (q.length < 2) return [];

    return allProducts
      .filter((p) => (p.title || p.name || "").toLowerCase().includes(q))
      .slice(0, 5);
  }, [localSearch, allProducts]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setLocalSearch(params.get("search") || "");
  }, [location.search]);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchCart());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }

      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();

    setShowSuggestions(false);

    navigate(
      localSearch.trim()
        ? `/shop?search=${encodeURIComponent(localSearch.trim())}`
        : "/shop",
    );
  };

  const handleCategoryClick = (name) => {
    navigate(`/shop?category=${name.toLowerCase().replace(/\s+/g, "-")}`);
    setIsMobileDrawerOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    setIsMobileDrawerOpen(false);
    navigate("/login");
  };

  const [openSection, setOpenSection] = useState(null);

const toggleSection = (section) => {
  setOpenSection(openSection === section ? null : section);
};

  const closeDrawer = () => setIsMobileDrawerOpen(false);

  return (
    <>
      <style>
        {`
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }

          .hide-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}

      </style>

      <header className="sticky top-0 z-50 bg-[#FBF6EA]/95 backdrop-blur border-b border-[var(--border-soft)]">
        {/* TOP BAR */}
        <div className="bg-[var(--dark-bg)] py-1.5 text-center text-[var(--primary)] text-[8px] sm:text-xs font-semibold tracking-[0.18em] uppercase">
          Premium Fashion Store | Quality Guaranteed
        </div>

        {/* DESKTOP HEADER */}

        <div className="hidden md:flex w-full px-8 h-20 items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-1 shrink-0 min-w-[280px]"
          >
            <span className="text-2xl md:text-3xl font-extrabold italic text-[var(--text-main)] font-heading italic tracking-wide">
              Webix
            </span>
            <span className="text-2xl md:text-3xl font-extrabold italic text-[var(--primary)] font-heading italic tracking-wide">
              Ecommerce
            </span>
          </Link>

          <div className="flex flex-1 justify-center">
            <div className="w-full max-w-3xl">
              <HeaderSearch
                searchRef={searchRef}
                localSearch={localSearch}
                setLocalSearch={setLocalSearch}
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
                suggestions={suggestions}
                handleSearchSubmit={handleSearchSubmit}
                navigate={navigate}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto shrink-0">
            {isAuthenticated ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-[#EFE2C6] transition-colors"
                >
                  <div className="w-8 h-8 bg-[var(--dark-bg)] text-[var(--primary)] rounded-full flex items-center justify-center font-bold border border-[var(--border-gold)]">
                    {user?.name?.charAt(0)}
                  </div>
                  <ChevronDown size={14} className="text-[#151512]" />
                </button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-3 w-56 bg-[var(--card-bg)] rounded-xl shadow-xl border border-[var(--border-soft)] z-[100] overflow-hidden"
                    >
                      <DropdownItem
                        to="/profile"
                        icon={<UserCircle size={18} />}
                        label="My Profile"
                        onClick={() => setIsMenuOpen(false)}
                      />
                      <DropdownItem
                        to="/wishlist"
                        icon={<Heart size={18} />}
                        label="Wishlist"
                        badge={wishlistIds?.length}
                        onClick={() => setIsMenuOpen(false)}
                      />
                      {console.log("Wishlist IDs in Dropdown:", wishlistIds)}
                      <DropdownItem
                        to="/my-orders"
                        icon={<Package size={18} />}
                        label="Orders"
                        onClick={() => setIsMenuOpen(false)}
                      />

                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-[var(--dark-bg)] flex gap-2 items-center"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <Button className="rounded-lg bg-[var(--dark-bg)] text-[var(--primary)] hover:bg-[#D4AF37] hover:text-black px-6">
                  Sign In
                </Button>
              </Link>
            )}

            <Link to="/cart">
              <Button
                size="icon"
                className="relative rounded-lg bg-[#D4AF37] hover:bg-[#c49d2e] text-white border-0"
              >
                <ShoppingCart />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-[var(--dark-bg)] text-[var(--primary)] border-0">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* ================= MOBILE HEADER ================= */}
        <div className="md:hidden">
          {/* TOP ROW FIXED */}
          <div className="h-14 px-3 flex items-center justify-between">
            {/* LEFT: Menu */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="h-9 w-9 flex items-center justify-center text-[#151512]"
            >
              <Menu size={22} />
            </button>

            {/* CENTER: LOGO (slightly left biased) */}
            <Link to="/" className="flex items-center gap-1 flex-1 ml-2">
              <span className="text-base font-extrabold italic text-[var(--text-main)]">
                Webix
              </span>
              <span className="text-base font-extrabold italic text-[var(--primary)]">
                Ecommerce
              </span>
            </Link>

            {/* RIGHT: CART ONLY (clean) */}
            <Link to="/cart" className="mr-4 shrink-0">
              <Button
                size="icon"
                className="relative h-10 w-15 rounded-lg bg-[#D4AF37] text-black"
              >
                <ShoppingCart size={20} />

                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-[var(--dark-bg)] text-[var(--primary)] text-[10px] px-1.5">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* SEARCH ROW */}
          <div className="px-3 pb-2">
            <HeaderSearch
              searchRef={searchRef}
              localSearch={localSearch}
              setLocalSearch={setLocalSearch}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              suggestions={suggestions}
              handleSearchSubmit={handleSearchSubmit}
              navigate={navigate}
            />
          </div>
        </div>

        

      {/* CATEGORY MARQUEE */}
<div
  className="bg-[var(--card-bg)]/80 border-t border-[var(--border-soft)] py-2.5"
  onMouseEnter={() => !isMobile && setIsMarqueePaused(true)}
  onMouseLeave={() => !isMobile && setIsMarqueePaused(false)}
>
  <div
    className={
      isMobile
        ? "w-full overflow-x-auto scroll-smooth [touch-action:pan-x]"
        : "w-full overflow-hidden"
    }
  >
    {isMobile ? (
      <div className="flex gap-4 w-max px-4">
        {categories.map((cat, i) => (
          <button
            key={`${cat.name}-${i}`}
            onClick={() => handleCategoryClick(cat.name)}
            className="
              flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-[#FBF6EA] border border-[#D4AF37]/30
              text-[#151512] text-[11px] font-bold uppercase
              hover:bg-[var(--dark-bg)] hover:text-[var(--primary)]
              transition-all duration-300 shadow-sm shrink-0
            "
          >
            <cat.icon size={13} />
            {cat.name}
          </button>
        ))}
      </div>
    ) : (
      <motion.div
        className="flex w-max"
        animate={
          isMarqueePaused
            ? { x: 0 }
            : { x: ["0%", "-50%"] }
        }
        transition={
          isMarqueePaused
            ? { duration: 0 }
            : {
                x: {
                  duration: 45,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                },
              }
        }
      >
        {[0, 1].map((group) => (
          <div key={group} className="flex gap-4 pr-4 shrink-0">
            {marqueeItems.map((cat, i) => (
              <button
                key={`${group}-${cat.name}-${i}`}
                onClick={() => handleCategoryClick(cat.name)}
                className="
                  flex items-center gap-2 px-4 py-1.5 rounded-full
                  bg-[#FBF6EA] border border-[#D4AF37]/30
                  text-[#151512] text-[11px] font-bold uppercase
                  hover:bg-[var(--dark-bg)] hover:text-[var(--primary)]
                  transition-all duration-300 shadow-sm shrink-0
                "
              >
                <cat.icon size={13} />
                {cat.name}
              </button>
            ))}
          </div>
        ))}
      </motion.div>
    )}
  </div>
</div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/50 z-[90] md:hidden"
            />

            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed top-0 left-0 h-full w-[82%] max-w-[320px] bg-[#FBF6EA] z-[100] md:hidden shadow-2xl border-r border-[#D4AF37]/30 overflow-y-auto"
            >
              <div className="bg-[var(--dark-bg)] px-5 py-5 flex items-center justify-between">
                <Link
                  to="/"
                  onClick={closeDrawer}
                  className="flex items-center gap-1"
                >
                  <span className="text-xl font-extrabold italic text-white">
                    Webix
                  </span>
                  <span className="text-xl font-extrabold italic text-[var(--primary)]">
                    Ecommerce
                  </span>
                </Link>

                <button
                  onClick={closeDrawer}
                  className="h-9 w-9 rounded-full border border-[var(--border-gold)] text-[var(--primary)] flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>

              {isAuthenticated && (
                <div className="px-5 py-5 border-b border-[var(--border-soft)]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-[var(--dark-bg)] text-[var(--primary)] rounded-full flex items-center justify-center font-bold border border-[var(--border-gold)]">
                      {user?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[#151512]">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-[#8A6A2F]">Welcome back</p>
                    </div>
                  </div>
                </div>
              )}

             <nav className="px-4 py-5 space-y-2">

  {/* MAIN */}
  <MobileDrawerLink to="/" icon={<Home size={18} />} label="Home" onClick={closeDrawer} />
  <MobileDrawerLink to="/shop" icon={<ShoppingBag size={18} />} label="Shop" onClick={closeDrawer} />

  
{/* COMPANY */}
<div className="pt-3 mt-3 border-t border-[#ead7ae]">
  <button
    onClick={() => toggleSection("company")}
    className="w-full flex justify-between items-center px-2 py-2 text-sm font-bold text-[var(--text-accent)] uppercase"
  >
    Company
    <span>{openSection === "company" ? "▲" : "▼"}</span>
  </button>

  {openSection === "company" && (
    <div className="pl-3 space-y-1">
      <MobileDrawerLink to="/about" label="About Us" onClick={closeDrawer} />
      <MobileDrawerLink to="/careers" label="Careers" onClick={closeDrawer} />
      <MobileDrawerLink to="/contact" label="Contact Us" onClick={closeDrawer} />
      <MobileDrawerLink to="/stories" label="Fashion Stories" onClick={closeDrawer} />
      <MobileDrawerLink to="/corporate" label="Corporate Info" onClick={closeDrawer} />
    </div>
  )}
</div>

{/* SUPPORT */}
<div className="pt-3 mt-3 border-t border-[#ead7ae]">
  <button
    onClick={() => toggleSection("support")}
    className="w-full flex justify-between items-center px-2 py-2 text-sm font-bold text-[var(--text-accent)] uppercase"
  >
    Support
    <span>{openSection === "support" ? "▲" : "▼"}</span>
  </button>

  {openSection === "support" && (
    <div className="pl-3 space-y-1">
      <MobileDrawerLink to="/help" label="Help Center" onClick={closeDrawer} />
      <MobileDrawerLink to="/shipping-policy" label="Shipping Policy" onClick={closeDrawer} />
      <MobileDrawerLink to="/refund-policy" label="Returns & Refund" onClick={closeDrawer} />
      <MobileDrawerLink to="/terms-and-conditions" label="Terms of Use" onClick={closeDrawer} />
      <MobileDrawerLink to="/privacy-policy" label="Privacy Policy" onClick={closeDrawer} />
    </div>
  )}
</div>


  {/* AUTH */}
  {isAuthenticated && (
    <div className="pt-3 mt-3 border-t border-[#ead7ae]">
      <MobileDrawerLink to="/profile" icon={<UserCircle size={18} />} label="My Profile" onClick={closeDrawer} />
      <MobileDrawerLink to="/wishlist" icon={<Heart size={18} />} label="Wishlist" badge={wishlistIds?.length} onClick={closeDrawer} />
      <MobileDrawerLink to="/my-orders" icon={<Package size={18} />} label="Orders" onClick={closeDrawer} />
    </div>
  )}

 

</nav>

              <div className="px-5 py-4 border-t border-[var(--border-soft)]">
                <p className="text-xs font-bold tracking-widest uppercase text-[#8A6A2F] mb-3">
                  Categories
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryClick(cat.name)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border-soft)] text-[#151512] text-xs font-bold uppercase hover:bg-[var(--dark-bg)] hover:text-[var(--primary)]"
                    >
                      <cat.icon size={14} />
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

               {!isAuthenticated && (
                  <Link to="/login" onClick={closeDrawer}>
                    <Button className="w-full mt-3 bg-[var(--dark-bg)] text-[var(--primary)] hover:bg-[#D4AF37] hover:text-black">
                      Sign In
                    </Button>
                  </Link>
                )}

              {isAuthenticated && (
                <div className="px-5 py-5">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 rounded-lg text-red-600 bg-[var(--dark-bg)] hover:bg-red-100 flex items-center justify-center gap-2 font-semibold"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function DropdownItem({ to, icon, label, badge, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center justify-between px-4 py-2 text-[#151512] theme-hover hover:text-[var(--primary)] transition-colors"
    >
      <div className="flex gap-3 items-center">
        {icon}
        <span>{label}</span>
      </div>

      {badge > 0 && (
        <span className="bg-[#D4AF37] text-black text-[10px] px-2 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}

function MobileDrawerLink({ to, icon, label, badge, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center justify-between px-4 py-3 rounded-lg text-[#151512] hover:bg-[var(--dark-bg)] hover:text-[var(--primary)] transition-colors"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-semibold">{label}</span>
      </div>

      {badge > 0 && (
        <span className="bg-[#D4AF37] text-black text-[10px] px-2 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}

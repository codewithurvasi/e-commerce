import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Sparkles,
  CreditCard,
} from "lucide-react";

export default function Footer() {
  const linkClass =
    "text-[#B8B0A0] hover:text-[var(--primary)] transition-colors duration-300";

  const iconClass =
    "h-9 w-9 rounded-full border border-[#D4AF37]/25 flex items-center justify-center text-[#B8B0A0] hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300";

  return (
    <footer className="bg-[#151512] text-[#E8E0D2] border-t border-[var(--border-soft)]">
      {/* TOP BRAND STRIP */}
      <div className="border-b border-[#D4AF37]/15 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs tracking-[0.35em] uppercase font-semibold">
              Premium Clothing Store
            </span>
          </div>

          <p className="text-xs text-[#B8B0A0] tracking-widest uppercase">
            Luxury Fashion • Premium Fabric • Modern Style
          </p>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* BRAND INFO */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif text-[var(--primary)] mb-4">
              FashionHub
            </h2>

            <p className="text-sm leading-7 text-[#B8B0A0] max-w-md font-heading italic tracking-wide">
              Discover premium clothing crafted for elegance, comfort and modern
              lifestyle. Shop luxury-inspired fashion collections made for every
              occasion.
            </p>

            <div className="flex items-center gap-3 mt-7">
              <a href="https://www.instagram.com" className={iconClass}>
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.facebook.com" className={iconClass}>
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com" className={iconClass}>
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com" className={iconClass}>
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-[var(--primary)] text-xs font-bold mb-6 tracking-[0.25em] uppercase">
              Shop
            </h3>

            <ul className="space-y-3 text-sm font-medium font-heading italic tracking-wide">
  <li>
    <Link to="/shop?category=new-arrivals" className={linkClass}>
      New Arrivals
    </Link>
  </li>

  <li>
    <Link to="/shop?category=men" className={linkClass}>
      Men Collection
    </Link>
  </li>

  <li>
    <Link to="/shop?category=women" className={linkClass}>
      Women Collection
    </Link>
  </li>

  <li>
    <Link to="/shop?category=luxury-picks" className={linkClass}>
      Luxury Picks
    </Link>
  </li>

  <li>
    <Link to="/shop?category=sale-offers" className={linkClass}>
      Sale Offers
    </Link>
  </li>
</ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-[var(--primary)] text-xs font-bold mb-6 tracking-[0.25em] uppercase">
              Company
            </h3>

            <ul className="space-y-3 text-sm font-medium font-heading italic tracking-wide">
              <li>
                <Link to={createPageUrl("About")} className={linkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Careers")} className={linkClass}>
                  Careers
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Contact")} className={linkClass}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Stories")} className={linkClass}>
                  Fashion Stories
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Corporate")} className={linkClass}>
                  Corporate Info
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT + CONTACT */}
          <div>
            <h3 className="text-[var(--primary)] text-xs font-bold mb-6 tracking-[0.25em] uppercase">
              Support
            </h3>

            <ul className="space-y-3 text-sm font-medium font-heading italic tracking-wide mb-7">
              <li>
                <Link to={createPageUrl("Help")} className={linkClass}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("ShippingPolicy")} className={linkClass}>
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("RefundPolicy")} className={linkClass}>
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to={createPageUrl("TermsAndConditions")}
                  className={linkClass}
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("PrivacyPolicy")} className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <div className="space-y-4 text-sm font-heading italic tracking-wide">
              <div className="flex gap-3 text-[#B8B0A0]">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--primary)] mt-1" />
                <span className="leading-relaxed">
                  Indore, Madhya Pradesh, India
                </span>
              </div>

              <div className="flex items-center gap-3 font-heading italic tracking-wide">
                <Phone className="h-4 w-4 text-[var(--primary)]" />
                <a href="tel:+917389654447" className={linkClass}>
                  +91-7389654447
                </a>
              </div>

              <div className="flex items-center gap-3 font-heading italic tracking-wide">
                <Mail className="h-4 w-4 text-[var(--primary)]" />
                <a
                  href="mailto:support@fashionhub.com"
                  className={`${linkClass} break-all`}
                >
                  support@fashionhub.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="mt-14 border border-[var(--border-soft)] bg-black/25 p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-serif text-[var(--primary)]">
              Join Our Luxury Club
            </h3>
            <p className="text-sm text-[#B8B0A0] mt-2 font-heading italic tracking-wide">
              Get updates on new arrivals, exclusive drops and premium offers.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-80 bg-[#F4E7D0] text-[#151512] px-5 py-3 outline-none placeholder:text-[#7A6A50]"
            />
            <button className="bg-[#D4AF37] text-black px-8 py-3 font-semibold tracking-widest uppercase hover:bg-[#c49d2e] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#D4AF37]/15 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-7 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-xs text-[#8F8778] tracking-widest uppercase text-center md:text-left">
            © 2024–2025 FashionHub. All rights reserved.
          </p>

          <div className="flex items-center gap-3 text-[#8F8778] text-xs uppercase tracking-widest">
            <CreditCard className="h-4 w-4 text-[var(--primary)]" />
            <span>Secure Payments</span>

            <div className="flex gap-4 ml-3 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
              <img
                src="https://www.svgrepo.com/show/508730/visa-classic.svg"
                alt="Visa"
                className="h-4 object-contain"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                className="h-4 object-contain"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                className="h-4 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
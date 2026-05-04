import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Star,
  Crown,
  Sparkles,
  Shirt,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { number: "10K+", label: "Happy Customers" },
  { number: "500+", label: "Luxury Styles" },
  { number: "50+", label: "Premium Brands" },
  { number: "4.8★", label: "Customer Rating" },
];

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery on premium orders above ₹999.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "7-day smooth return and exchange support.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "Safe payments with trusted protection.",
  },
  {
    icon: Crown,
    title: "Premium Quality",
    description: "Curated fabrics, elegant fits, and timeless designs.",
  },
];

const categories = [
  {
    name: "Silk Shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
  },
  {
    name: "Luxury Dresses",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500",
  },
  {
    name: "Premium Jackets",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
  },
  {
    name: "Designer Wear",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500",
  },
];

const brands = ["Zara", "H&M", "Nike", "Adidas", "Puma"];

export default function About() {
  return (
    <div className="bg-[#F4E7D0] text-[#151512]">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[#151512] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22),transparent_35%)]" />
        <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-[var(--primary)] text-xs tracking-[0.45em] uppercase mb-6"
          >
            <Sparkles className="h-4 w-4" />
            Premium Clothing Store
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-semibold mb-5"
          >
            Feel The Luxury
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-7 font-heading italic tracking-wide"
          >
            Discover elegant clothing crafted for comfort, softness, and modern
            premium style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-center"
          >
            <Button className="bg-[#D4AF37] hover:bg-[#c49d2e] text-black rounded-none px-10 py-6 font-semibold tracking-widest uppercase">
              Shop Collection
            </Button>
          </motion.div>
        </div>

        <div className="h-14 bg-[#F4E7D0] rounded-t-[50%]" />
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-[#F4E7D0] py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="border-r border-[#151512]/10 last:border-r-0"
            >
              <p className="text-3xl md:text-4xl font-serif font-semibold text-[#151512]">
                {item.number}
              </p>
              <p className="text-xs tracking-[0.25em] uppercase text-[#7a6130] mt-2">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-16 bg-[#F4E7D0]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
            Our Collections
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group text-center"
              >
                <div className="bg-[#E8D6B8] p-4 border border-[#151512]/10 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-44 w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <p className="mt-4 font-serif text-lg">{item.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="bg-[#151512] text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900"
            alt="Luxury fashion"
            className="h-full min-h-[420px] w-full object-cover"
          />

          <div className="p-8 md:p-16 flex flex-col justify-center">
            <span className="text-[var(--primary)] tracking-[0.35em] uppercase text-xs mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Designed For Modern Elegance
            </h2>
            <p className="text-white/70 leading-7 mb-4 font-heading italic tracking-wide">
              We bring premium clothing collections that balance comfort,
              quality, and timeless fashion. Every product is selected to give
              you a refined shopping experience.
            </p>
            <p className="text-white/70 leading-7">
              From everyday essentials to statement pieces, our store helps you
              build a wardrobe that feels soft, confident, and luxurious.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-16 bg-[#F4E7D0]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
            Why Shop With Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#151512] text-white border border-[var(--border-soft)] rounded-none hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition">
                  <CardContent className="pt-10 pb-7 px-7 text-center">
                    <item.icon className="mx-auto mb-6 mt-1 text-[var(--primary)] bg-[#151512] p-2 rounded-full w-12 h-12" />
                    <h3 className="font-serif text-xl mb-3 text-[var(--primary)]">
                      {item.title}
                    </h3>
                    <p className="text-black text-sm leading-6 font-heading italic tracking-wide">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRANDS ===== */}
      <section className="py-16 bg-[#151512] text-center text-white">
        <h2 className="text-3xl md:text-4xl font-serif mb-8">
          Featured Brands
        </h2>

        <div className="flex flex-wrap justify-center gap-4 px-4">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              whileHover={{ y: -5, scale: 1.05 }}
              className="px-8 py-4 border border-[#D4AF37]/30 text-[var(--primary)] tracking-widest uppercase text-sm hover:bg-[#D4AF37] hover:text-black transition"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="py-16 bg-[#F4E7D0] text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-6">
          Customer Love
        </h2>

        <p className="max-w-xl mx-auto text-[#594724] mb-6 leading-7 font-heading italic tracking-wide">
          “The fabric quality feels premium and the packaging gives a luxury
          brand experience. Perfect fit and fast delivery.”
        </p>

        <div className="flex justify-center gap-1 text-[var(--primary)]">
          <Star fill="currentColor" />
          <Star fill="currentColor" />
          <Star fill="currentColor" />
          <Star fill="currentColor" />
          <Star fill="currentColor" />
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-[#151512] text-center text-white">
        <Shirt className="mx-auto mb-5 text-[var(--primary)] h-10 w-10" />
        <h2 className="text-3xl md:text-5xl font-serif mb-4">
          Upgrade Your Wardrobe
        </h2>

        <p className="text-white/60 mb-8 leading-7 max-w-xl mx-auto font-heading italic tracking-wide">
          Shop premium styles made for elegance and comfort.
        </p>

        <Button className="bg-[#D4AF37] hover:bg-[#c49d2e] text-black rounded-none px-10 py-6 font-semibold tracking-widest uppercase">
          Explore Now
        </Button>
      </section>
    </div>
  );
}
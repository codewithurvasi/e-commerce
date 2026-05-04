import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

const brands = [
  { name: "Zara", logo: "/brands/Zara_Logo.svg" },
  { name: "H&M", logo: "/brands/H&M-Logo.svg" },
  { name: "Nike", logo: "/brands/Logo_NIKE.svg" },
  { name: "Adidas", logo: "/brands/Adidas_Logo.svg" },
  { name: "Puma", logo: "/brands/Puma-logo-(text).svg" },
];

export default function BrandLogos() {
  return (
    <section className="py-20 bg-[#F4E7D0]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
            <span className="text-xs font-semibold tracking-[0.35em] uppercase text-[#8A6A2F]">
              Premium Fashion Partners
            </span>
            <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-[#151512]">
            Loved by Iconic Fashion Brands
          </h2>

         <p className="mt-4 text-base md:text-lg text-[#594724] max-w-xl mx-auto leading-8 font-heading italic tracking-wide opacity-90">
  Premium apparel collections inspired by world-class fashion,
  elegant styling, and timeless quality.
</p>
        </motion.div>

        {/* Brand Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.08,
                duration: 0.01,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.04 }}
              className="relative group overflow-hidden flex items-center justify-center
                         bg-[#151512] border border-[#D4AF37]/25
                         p-8 min-h-[145px] shadow-xl
                         transition-all duration-500
                         hover:border-[#D4AF37]/70
                         hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
            >
              {/* Gold Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                           bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.28),transparent_45%)]"
              />

              {/* Shine Effect */}
              <div
                className="absolute -left-24 top-0 h-full w-20 rotate-12 bg-[#D4AF37]/25
                           opacity-0 group-hover:opacity-100 group-hover:translate-x-[360px]
                           transition-all duration-700"
              />

              {/* Icon */}
              <Sparkles className="absolute top-4 right-4 h-4 w-4 text-[var(--primary)]/40 group-hover:text-[var(--primary)] transition" />

              {/* Logo */}
              <img
                src={brand.logo}
                alt={brand.name}
                className="relative z-10 h-12 md:h-16 object-contain
                           brightness-0 invert opacity-90
                           transition-all duration-500
                           group-hover:scale-110 group-hover:opacity-100
                           group-hover:drop-shadow-[0_8px_18px_rgba(212,175,55,0.25)]"
              />

              {/* Brand Name */}
              <span
                className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4
                           opacity-0 group-hover:opacity-100 group-hover:translate-y-0
                           transition-all duration-500 text-xs font-semibold tracking-widest
                           text-[var(--primary)] uppercase"
              >
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
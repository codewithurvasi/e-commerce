import React from "react";
import { ShieldCheck, Truck, Award, Users } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    desc: "Carefully curated fabrics & designs",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "PAN India shipping available",
  },
  {
    icon: Award,
    title: "Top Fashion Picks",
    desc: "Latest trending collections",
  },
  {
    icon: Users,
    title: "10K+ Happy Customers",
    desc: "Trusted by fashion lovers",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-[#151512]">
      <div className="max-w-7xl mx-auto px-4">

        {/* ===== Badges ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl bg-black/30 border border-[var(--border-soft)]
                         px-6 py-7 text-center transition-all duration-300
                         hover:border-[#D4AF37]/60 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
            >
              {/* Icon */}
              <div className="mx-auto mb-4 h-14 w-14 rounded-full
                              bg-[#D4AF37] flex items-center justify-center
                              shadow-md">
                <badge.icon className="h-7 w-7 text-black" />
              </div>

              {/* Text */}
              <p className="text-white font-semibold text-base">
                {badge.title}
              </p>
              <p className="mt-1 text-white/60 text-sm font-heading italic tracking-wide">
                {badge.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
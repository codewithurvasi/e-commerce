import React from "react";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function BulkOrderCTA() {
  const benefits = [
    "Bulk fashion orders for boutiques & retailers",
    "Customized pricing for 10+ pieces",
    "Premium packaging support",
    "Priority dispatch & dedicated assistance",
  ];

  return (
    <section className="py-20 bg-[#F4E7D0]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-[#151512] border border-[#D4AF37]/25 shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* LEFT */}
            <div className="p-6 sm:p-8 md:p-12 lg:p-14 lg:border-r border-[#D4AF37]/15">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-14 w-14 bg-[#D4AF37] flex items-center justify-center shadow-lg shrink-0">
                  <Package className="h-7 w-7 text-black" />
                </div>

                <h2 className="text-2xl md:text-4xl font-serif text-white leading-tight">
                  Bulk Orders & <br /> Fashion Retail Supply
                </h2>
              </div>

              <p className="text-white/60 text-sm sm:text-base md:text-lg mb-10 max-w-md leading-7 font-heading italic tracking-wide">
                Get special pricing and premium support for boutiques,
                resellers, events, uniforms, and large clothing requirements.
              </p>

              <ul className="space-y-4">
                {benefits.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider font-heading italic tracking-wide"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[var(--primary)] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT */}
            <div className="bg-black/25 p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <div className="bg-[#F4E7D0] p-6 sm:p-8 border border-[#D4AF37]/30 shadow-sm">
                <h3 className="text-xl font-serif text-[#151512] mb-2">
                  Get a Custom Fashion Quote
                </h3>

                <p className="text-[#594724] text-sm mb-8 leading-6 font-heading italic tracking-wide">
                  Share your clothing requirements and our team will contact you
                  with the best bulk pricing.
                </p>

                <Link to={createPageUrl("Contact")}>
                  <Button className="w-full h-12 md:h-16 bg-[#D4AF37] hover:bg-[#151512] text-[#151512] hover:text-white flex items-center justify-center gap-3 text-sm sm:text-base md:text-lg font-bold transition-all active:scale-[0.98] group rounded-none">
                    <span>Request Bulk Quote</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <div className="mt-8 pt-8 border-t border-[#151512]/15 text-center">
                  <p className="text-xs font-bold text-[#8A6A2F] uppercase tracking-widest mb-3">
                    Direct Support Line
                  </p>

                  <a
                    href="tel:+917389654447"
                    className="inline-flex items-center gap-3 text-[#151512] hover:text-[var(--primary)] transition-colors font-extrabold text-lg sm:text-xl md:text-2xl tracking-tighter"
                  >
                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-[var(--primary)]" />
                    +91-73896-54447
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
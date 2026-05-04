import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const banners = [
  {
    title: "Refined Luxury Wear",
    subtitle: "Crafted for elegance. Designed for presence.",
    cta: "Explore Collection",
    link: "/shop",
    bgImage:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  },
  {
    title: "Minimal. Modern. Timeless.",
    subtitle: "Elevated essentials for everyday luxury.",
    cta: "Shop Now",
    link: "/shop",
    bgImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  },
  {
    title: "Exclusive Sale",
    subtitle: "Up to 40% off on premium collections.",
    cta: "Grab Deals",
    link: "/shop",
    bgImage:
      "https://images.unsplash.com/photo-1445205170230-053b83016050",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 8000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  const next = () => {
    stopAutoPlay();
    setCurrent((prev) => (prev + 1) % banners.length);
    startAutoPlay();
  };

  const prev = () => {
    stopAutoPlay();
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
    startAutoPlay();
  };

  return (
    <section
      className="relative h-[85vh] md:h-[calc(100vh-100px)] overflow-hidden"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* 🔥 BACKGROUND WITH ZOOM */}
          <motion.div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${banners[current].bgImage})`,
            }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 8, ease: "easeOut" }}
          >
            {/* 💎 LUXURY OVERLAY */}
            <div className="h-full w-full bg-gradient-to-r from-[#151512]/95 via-[#151512]/70 to-transparent flex items-center">
              <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
                {/* TEXT BLOCK */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.15 } },
                  }}
                  className="max-w-xl"
                >
                  {/* TAG */}
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-5 font-body"
                  >
                    Premium Collection
                  </motion.p>

                  {/* TITLE */}
                  <motion.h1
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                   className="text-4xl sm:text-5xl md:text-6xl font-heading font-semibold text-white leading-tight tracking-wide"
                  >
                    {banners[current].title}
                  </motion.h1>

                  {/* SUBTITLE */}
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  className="mt-5 text-base md:text-xl text-white/80 leading-8 font-heading italic tracking-wide"
                  >
                    {banners[current].subtitle}
                  </motion.p>

                  {/* CTA */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Button
                      onClick={() => navigate(banners[current].link)}
                     className="group mt-8 px-8 py-3 rounded-none 
           bg-[#D4AF37] text-black font-body font-bold uppercase tracking-widest text-xs
                                 hover:bg-[#D4AF37] transition-all duration-300 shadow-xl relative overflow-hidden"
                    >
                      <span className="relative z-10">
                        {banners[current].cta}
                      </span>

                      {/* ✨ SHINE */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                                       -translate-x-full group-hover:translate-x-full transition duration-700" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* LEFT */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 
                   h-12 w-12 rounded-full 
                   bg-[#151512]/70 border border-[#D4AF37]/30 
                   hover:bg-[#151512] text-[#D4AF37] backdrop-blur transition"
      >
        <ChevronLeft className="mx-auto" />
      </button>

      {/* RIGHT */}
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 
                   h-12 w-12 rounded-full 
                   bg-[#151512]/70 border border-[#D4AF37]/30 
                   hover:bg-[#151512] text-[#D4AF37] backdrop-blur transition"
      >
        <ChevronRight className="mx-auto" />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[6px] rounded-full transition-all duration-300 ${
              current === i
                ? "w-10 bg-[#D4AF37]"
                : "w-3 bg-[#D4AF37]/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const banners = [
  {
    title: 'Fuel Dispensers',
    description: 'High-precision electronic fuel dispensers from trusted manufacturers',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600',
    cta: 'Explore Range',
  },
  {
    title: 'Safety Equipment',
    description: 'Fire extinguishers, safety signs & emergency equipment',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    cta: 'View Products',
  },
];

export default function EquipmentBanners() {
  return (
    <section className="py-8 bg-[var(--card-bg)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-5 md:grid-cols-2">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl
                         border border-slate-200 hover:border-orange-400
                         transition-all duration-300 bg-[var(--card-bg)]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 h-full">

                {/* ===== Content ===== */}
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                    {banner.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {banner.description}
                  </p>

                  <Button
                    className="mt-5 w-fit bg-orange-500 hover:bg-orange-600
                               text-white text-sm font-semibold px-5 py-4 rounded-lg"
                  >
                    {banner.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                {/* ===== Image ===== */}
                <div className="relative h-48 sm:h-auto">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover
                               transition-transform duration-500
                               group-hover:scale-105"
                  />

                  {/* Soft overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t
                                  from-black/10 via-transparent to-transparent" />
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const promos = [
  {
    title: 'IOCL Equipment',
    subtitle: 'Uniforms & Accessories',
    discount: 'Up to 20% Off',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
    accent: 'bg-blue-600',
  },
  {
    title: 'Safety First',
    subtitle: 'Fire Extinguishers',
    discount: 'Starting ₹999',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    accent: 'bg-slate-900',
  },
  {
    title: 'Water Solutions',
    subtitle: 'Coolers & Dispensers',
    discount: 'Flat 15% Off',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    accent: 'bg-blue-500',
  },
];

export default function PromoBanners() {
  return (
    <section className="py-12 bg-[var(--card-bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.map((promo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-[var(--card-bg)] p-8 transition-all duration-500 hover:shadow-2xl hover:border-blue-100"
            >
              {/* Subtle Decorative Accent */}
              <div className={`absolute top-0 left-0 w-1 h-full ${promo.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className="relative z-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                  {promo.subtitle}
                </p>
                <h3 className="text-slate-900 text-2xl font-extrabold tracking-tight mb-2">
                  {promo.title}
                </h3>
                <p className="text-blue-600 text-lg font-bold mb-6 italic">
                  {promo.discount}
                </p>
                
                <Button 
                  size="sm" 
                  className="bg-slate-900 hover:bg-blue-600 text-white rounded-lg px-6 py-5 transition-all group/btn"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Refined Image Background Treatment */}
              <div className="absolute right-[-10%] bottom-[-10%] w-40 h-40 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                <img
                  src={promo.image}
                  alt=""
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
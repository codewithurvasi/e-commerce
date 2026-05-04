import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Eye,
  Award,
  MapPin,
  Users,
  TrendingUp,
  Shirt,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To make premium fashion accessible with high-quality clothing, elegant designs, and a smooth shopping experience.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To become a trusted online fashion destination known for style, comfort, quality, and customer satisfaction.",
  },
  {
    icon: Award,
    title: "Quality Commitment",
    desc: "We carefully select fabrics, fits, and collections to deliver authentic, comfortable, and long-lasting fashion products.",
  },
];

const services = [
  "Men’s Clothing",
  "Women’s Clothing",
  "Premium Shirts",
  "Luxury Dresses",
  "Designer Jackets",
  "Ethnic Wear",
  "Casual Wear",
  "Accessories",
  "Seasonal Collections",
];

const brands = ["Zara", "H&M", "Nike", "Adidas", "Puma"];

export default function Corporate() {
  return (
    <div className="min-h-screen bg-[#F4E7D0] text-[#151512]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#151512] py-20 text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22),transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--primary)] text-xs tracking-[0.35em] uppercase mb-5"
          >
            Corporate Profile
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-semibold mb-4"
          >
            Corporate Information
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto leading-7 font-heading italic tracking-wide"
          >
            About FashionHub — your premium online destination for modern,
            elegant, and comfortable clothing.
          </motion.p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-[#F4E7D0]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#8A6A2F] text-xs tracking-[0.3em] uppercase">
              About Brand
            </span>

            <h2 className="text-3xl md:text-4xl font-serif text-[#151512] mt-3 mb-6">
              About FashionHub
            </h2>

            <div className="space-y-4 text-[#594724] leading-7 font-heading italic tracking-wide">
              <p>
                FashionHub is a premium clothing ecommerce brand focused on
                elegant fashion, quality fabrics, and a seamless online shopping
                experience.
              </p>
              <p>
                We curate modern collections for men and women, including
                everyday essentials, luxury-inspired outfits, seasonal styles,
                and statement pieces.
              </p>
              <p>
                Our goal is to deliver style, comfort, and confidence through
                reliable service, secure shopping, and customer-first support.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900"
              alt="Premium clothing ecommerce"
              className="rounded-none shadow-2xl h-[420px] w-full object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#151512] text-white p-6 border border-[#D4AF37]/30">
              <p className="text-4xl font-serif text-[var(--primary)]">10K+</p>
              <p className="text-xs tracking-widest uppercase text-white/60">
                Happy Customers
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-[#151512]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="h-full rounded-none bg-white border border-[var(--border-soft)] text-white">
                <CardContent className="p-7">
                  <div className="h-14 w-14 bg-[#D4AF37] flex items-center justify-center mb-5">
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-serif text-[var(--primary)] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-black leading-6 text-sm font-heading italic tracking-wide">
                    {value.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Operations */}
      <section className="py-16 bg-[#F4E7D0]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900"
              alt="Fashion store operations"
              className="rounded-none shadow-2xl h-[420px] w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-8 w-8 text-[var(--primary)]" />
              <h2 className="text-3xl md:text-4xl font-serif text-[#151512]">
                PAN India Delivery
              </h2>
            </div>

            <div className="space-y-4 text-[#594724] leading-7 font-heading italic tracking-wide">
              <p>
                We deliver fashion collections across India with reliable
                logistics partners and customer-focused support.
              </p>
              <p>
                Our ecommerce operations are designed for smooth order
                processing, secure payments, quick dispatch, and easy return
                support.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[var(--primary)]" />
                  <span>10K+ Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[var(--primary)]" />
                  <span>500+ Styles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[var(--primary)]" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shirt className="h-5 w-5 text-[var(--primary)]" />
                  <span>Premium Fabric</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products & Collections */}
      <section className="py-16 bg-[#151512] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center text-[var(--primary)] mb-12">
            Products & Collections
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="rounded-none bg-white border border-[var(--border-soft)] hover:border-[#D4AF37]/60 transition">
                  <CardContent className="pt-8 pb-7 px-7 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#D4AF37] flex-shrink-0" />
                    <p className="text-black font-medium font-heading italic tracking-wide">
                      {service}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 bg-[#F4E7D0] text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-[#151512] mb-6">
            Featured Fashion Brands
          </h2>

          <p className="text-[#594724] max-w-3xl mx-auto mb-12 font-heading italic tracking-wide">
            We showcase premium and trend-focused fashion inspired by leading
            clothing brands and modern style culture.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {brands.map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="px-8 py-4 bg-[#151512] border border-[#D4AF37]/30 text-[var(--primary)] font-semibold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-black transition"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
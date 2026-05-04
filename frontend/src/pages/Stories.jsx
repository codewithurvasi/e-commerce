import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, TrendingUp, CheckCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, number: "10K+", label: "Happy Customers" },
  { icon: Award, number: "500+", label: "Premium Styles" },
  { icon: TrendingUp, number: "50+", label: "Fashion Brands" },
  { icon: Star, number: "4.8/5", label: "Customer Rating" },
];

const testimonials = [
  {
    name: "Aarav Sharma",
    location: "Mumbai, Maharashtra",
    company: "Verified Customer",
    text: "The fabric quality feels premium and the fit is perfect. Packaging was also very classy.",
    rating: 5,
  },
  {
    name: "Priya Mehta",
    location: "Delhi NCR",
    company: "Verified Customer",
    text: "Loved the collection! The dresses look elegant and delivery was fast.",
    rating: 5,
  },
  {
    name: "Rohan Verma",
    location: "Bangalore, Karnataka",
    company: "Verified Customer",
    text: "Great quality shirts at a good price. The overall shopping experience was smooth.",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    location: "Ahmedabad, Gujarat",
    company: "Verified Customer",
    text: "The product looked exactly like the photos. Very happy with the premium feel.",
    rating: 5,
  },
  {
    name: "Karan Singh",
    location: "Jaipur, Rajasthan",
    company: "Verified Customer",
    text: "Fast delivery and excellent customer support. Will definitely shop again.",
    rating: 5,
  },
  {
    name: "Ananya Gupta",
    location: "Pune, Maharashtra",
    company: "Verified Customer",
    text: "Beautiful collection, soft fabric, and perfect size. Highly recommended.",
    rating: 5,
  },
];

const achievements = [
  {
    icon: CheckCircle,
    title: "PAN India Delivery",
    desc: "Fast shipping across major Indian cities",
  },
  {
    icon: CheckCircle,
    title: "Premium Quality",
    desc: "Curated fabrics, elegant fits, and modern styles",
  },
  {
    icon: CheckCircle,
    title: "Easy Returns",
    desc: "Smooth return and exchange support",
  },
  {
    icon: CheckCircle,
    title: "Secure Shopping",
    desc: "Safe checkout and trusted payment experience",
  },
];

export default function Stories() {
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
            Fashion Stories
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-semibold mb-4"
          >
            Customer Success Stories
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto leading-7 font-heading italic tracking-wide"
          >
            Loved by fashion shoppers for premium quality, elegant styles, fast
            delivery, and a smooth shopping experience.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#F4E7D0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="text-center rounded-none bg-white/70 border border-[#D4AF37]/25 hover:shadow-xl transition">
                  <CardContent className="pt-8">
                    <div className="h-16 w-16 bg-[#151512] mx-auto flex items-center justify-center mb-4 border border-[#D4AF37]/40  rounded-full">
                      <stat.icon className="h-8 w-8 text-[var(--primary)] " />
                    </div>
                    <p className="text-3xl font-serif font-semibold text-[#151512] mb-2">
                      {stat.number}
                    </p>
                    <p className="text-[#594724] text-sm font-heading italic tracking-wide">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-[#151512] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--primary)] text-center mb-12">
            Why Customers Trust Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="h-full rounded-none bg-white border border-[var(--border-soft)] hover:border-[#D4AF37]/60 transition">
                  <CardContent className="pt-8 pb-7 px-7">
                    <item.icon className="h-11 w-11 text-[var(--primary)] mb-4" />
                    <h3 className="text-lg font-serif text-[var(--primary)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-black text-sm leading-6 font-heading italic tracking-wide">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-[#F4E7D0]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-[#151512] text-center mb-4">
            Customer Testimonials
          </h2>

          <p className="text-[#594724] text-center mb-12 max-w-2xl mx-auto font-heading italic tracking-wide">
            Real stories from shoppers who love our premium clothing collections.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="h-full rounded-none bg-white/75 border border-[#D4AF37]/25 hover:shadow-xl transition">
                  <CardContent className="pt-8 pb-7 px-7">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-[#D4AF37] text-[var(--primary)]"
                        />
                      ))}
                    </div>

                    <p className="text-[#594724] mb-6 italic leading-7">
                      “{testimonial.text}”
                    </p>

                    <div className="border-t border-[var(--border-soft)] pt-4">
                      <p className="font-semibold text-[#151512]">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-[#8A6A2F]">
                        {testimonial.company}
                      </p>
                      <p className="text-xs text-[#8A6A2F]/80">
                        {testimonial.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#151512] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--primary)] mb-4">
            Join 10K+ Happy Customers
          </h2>

          <p className="text-white/70 mb-8 font-heading italic tracking-wide">
            Experience premium clothing, elegant designs, secure shopping, and
            fast delivery.
          </p>

          <a href="tel:+917389654447">
            <button className="text-white text-black px-8 py-4 text-lg font-semibold hover:bg-[#c49d2e] hover:scale-105 transition-transform">
              Shop With Us Today
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
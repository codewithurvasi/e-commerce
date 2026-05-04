import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Package, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ShippingPolicy() {
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
            Delivery Information
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-semibold mb-4"
          >
            Shipping Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto leading-7 font-heading italic tracking-wide"
          >
            Fast, safe, and reliable delivery for your fashion orders across
            India.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Highlights */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 font-heading italic tracking-wide">
            {[
              {
                icon: Clock,
                title: "Delivery Timeline",
                desc: "3–7 working days",
              },
              {
                icon: MapPin,
                title: "Coverage",
                desc: "PAN India shipping",
              },
              {
                icon: Package,
                title: "Packaging",
                desc: "Premium & protective",
              },
              {
                icon: Truck,
                title: "Tracking",
                desc: "Order updates after dispatch",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="rounded-none bg-[var(--card-bg)]/75 border border-[#D4AF37]/25"
              >
                <CardContent className="pt-8 pb-6 px-6 flex items-start gap-4">
                  <div className="h-12 w-12 bg-[#151512] flex items-center justify-center flex-shrink-0 border border-[#D4AF37]/30">
                    <item.icon className="h-6 w-6 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#151512] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[#594724] text-sm">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Policy */}
          <div className="bg-[var(--card-bg)]/80 border border-[#D4AF37]/25 p-6 md:p-10">
            <h2 className="text-2xl font-serif text-[#151512] mb-4">
              Delivery Timeline
            </h2>
            <p className="text-[#594724] mb-6 leading-7 font-heading italic tracking-wide">
              Standard delivery usually takes <strong>3–7 working days</strong>{" "}
              from order confirmation. Delivery time may vary depending on your
              location, courier availability, sale periods, festivals, or
              unforeseen delays.
            </p>

            <h2 className="text-2xl font-serif text-[#151512] mb-4">
              PAN India Shipping
            </h2>
            <p className="text-[#594724] mb-6 leading-7 font-heading italic tracking-wide">
              We deliver clothing and fashion accessories across India through
              trusted logistics partners. Delivery is available for metro cities,
              tier 2/tier 3 cities, and most serviceable pin codes.
            </p>

            <h2 className="text-2xl font-serif text-[#151512] mb-4">
              Premium Packaging
            </h2>
            <p className="text-[#594724] mb-4 leading-7 font-heading italic tracking-wide">
              Every order is packed carefully to protect fabric quality and
              maintain a premium unboxing experience.
            </p>
            <ul className="list-disc pl-6 text-[#594724] mb-8 space-y-2">
              <li>Clothing is packed in protective polybags or boxes.</li>
              <li>Premium items may include additional branded packaging.</li>
              <li>Fragile accessories are packed with extra cushioning.</li>
              <li>All parcels are sealed before dispatch.</li>
            </ul>

            <h2 className="text-2xl font-serif text-[#151512] mb-4">
              Order Tracking
            </h2>
            <p className="text-[#594724] mb-6 leading-7 font-heading italic tracking-wide">
              Once your order is shipped, tracking details will be shared via
              email/SMS/WhatsApp where available. You can use the tracking link
              to check the latest delivery status.
            </p>

            <h2 className="text-2xl font-serif text-[#151512] mb-4">
              Shipping Charges
            </h2>
            <p className="text-[#594724] mb-6 leading-7 font-heading italic tracking-wide">
              Shipping charges may vary based on order value, delivery location,
              and selected shipping method.
            </p>

            <div className="bg-[#F4E7D0] border border-[#D4AF37]/25 overflow-hidden mb-8 max-w-md">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#151512] text-[var(--primary)] font-bold">
                  <tr>
                    <th className="px-6 py-3">Order Value</th>
                    <th className="px-6 py-3 text-right">Delivery Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4AF37]/20">
                  <tr>
                    <td className="px-6 py-3 text-[#594724]">Above ₹999</td>
                    <td className="px-6 py-3 text-right font-bold text-[#151512]">
                      Free
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-[#594724]">Below ₹999</td>
                    <td className="px-6 py-3 text-right font-bold text-[#151512]">
                      ₹49–₹99
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-[#594724]">
                      Express Delivery
                    </td>
                    <td className="px-6 py-3 text-right font-bold text-[#151512]">
                      Extra charges
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-serif text-[#151512] mb-4">
              Delivery Instructions
            </h2>
            <ul className="list-disc pl-6 text-[#594724] mb-8 space-y-2 font-heading italic tracking-wide">
              <li>Please provide a complete and correct delivery address.</li>
              <li>Keep your phone reachable for courier updates.</li>
              <li>Check the package condition at delivery.</li>
              <li>
                If the package appears damaged, please record photos/video and
                contact support.
              </li>
            </ul>

            <h2 className="text-2xl font-serif text-[#151512] mb-4">
              Delayed or Failed Delivery
            </h2>
            <p className="text-[#594724] mb-6 leading-7 font-heading italic tracking-wide">
              Delivery may be delayed due to incorrect address, customer
              unavailability, weather, courier restrictions, or high order
              volume. If delivery fails after multiple attempts, the order may be
              returned to our warehouse.
            </p>

            <h2 className="text-2xl font-serif text-[#151512] mb-4">
              Contact Us
            </h2>
            <div className="bg-[#151512] p-6 text-white border border-[#D4AF37]/25">
              <p className="text-white/70 leading-7">
                <strong className="text-[var(--primary)]">Phone:</strong>{" "}
                <a href="tel:+917389654447" className="hover:underline">
                  +91-7389654447
                </a>
                <br />
                <strong className="text-[var(--primary)]">Email:</strong>{" "}
                <a
                  href="mailto:support@fashionhub.com"
                  className="hover:underline"
                >
                  support@fashionhub.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
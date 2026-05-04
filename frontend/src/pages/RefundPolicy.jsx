import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#F4E7D0] text-[#151512]">

      {/* HERO */}
      <section className="relative bg-[#151512] py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22),transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--primary)] text-xs tracking-[0.35em] uppercase mb-5"
          >
            Returns & Refunds
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-semibold mb-4"
          >
            Refund & Return Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto leading-7 font-heading italic tracking-wide"
          >
            Easy returns, smooth exchanges, and hassle-free refunds for your fashion orders.
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-8">

          {/* SECTION CARD */}
          {[
            {
              title: "Return Eligibility",
              content: (
                <>
                  <p className="mb-4 text-[#594724]">
                    Products can be returned within <strong>7 days</strong> of delivery if:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-[#594724] ">
                    <li>Item is damaged, defective, or incorrect</li>
                    <li>Wrong size or wrong product delivered</li>
                    <li>Product is unused with original tags intact</li>
                  </ul>
                </>
              ),
            },
            {
              title: "Non-Returnable Items",
              content: (
                <ul className="list-disc pl-6 space-y-2 text-[#594724]">
                  <li>Used or washed clothing</li>
                  <li>Items without original tags</li>
                  <li>Customized or altered products</li>
                  <li>Products damaged due to misuse</li>
                </ul>
              ),
            },
            {
              title: "Return Process",
              content: (
                <ol className="list-decimal pl-6 space-y-2 text-[#594724]">
                  <li>Contact support within 7 days</li>
                  <li>Share order details & issue</li>
                  <li>Upload product photos if needed</li>
                  <li>Pack item in original packaging</li>
                  <li>Ship as per instructions</li>
                </ol>
              ),
            },
            {
              title: "Refund Process",
              content: (
                <ul className="list-disc pl-6 space-y-2 text-[#594724]">
                  <li>Inspection within 2–3 days</li>
                  <li>Refund approved after verification</li>
                  <li>Processed to original payment method</li>
                  <li>5–7 days (online), 10–15 days (others)</li>
                </ul>
              ),
            },
            {
              title: "Replacement Options",
              content: (
                <ul className="list-disc pl-6 space-y-2 text-[#594724]">
                  <li><strong>Replacement:</strong> Same item</li>
                  <li><strong>Refund:</strong> Full amount</li>
                  <li><strong>Store Credit:</strong> +10% bonus</li>
                </ul>
              ),
            },
            {
              title: "Order Cancellation",
              content: (
                <ul className="list-disc pl-6 space-y-2 text-[#594724]">
                  <li>Within 24 hrs → Full refund</li>
                  <li>Before dispatch → Full refund</li>
                  <li>After dispatch → Return policy applies</li>
                </ul>
              ),
            },
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-none bg-[var(--card-bg)]/80 border border-[#D4AF37]/25 shadow-md hover:shadow-xl transition">
                <CardContent className="pt-10 pb-8 px-8">

                  <h2 className="text-2xl font-serif text-[#151512] mb-4">
                    {section.title}
                  </h2>

                  {section.content}

                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-[#151512] text-white border border-[#D4AF37]/25">
              <CardContent className="pt-10 pb-8 px-8 text-center">

                <h2 className="text-2xl font-serif text-[var(--primary)] mb-4">
                  Need Help?
                </h2>

                <p className="text-[#594724] mb-6 ">
                  Contact our support team for returns, exchanges, or refunds.
                </p>

                <p className="text-sm leading-6">
                  <strong className="text-[var(--primary)]">Phone:</strong>{" "}
                  <a href="tel:+917389654447" className="hover:underlin text-[#594724]">
                    +91-7389654447
                  </a>
                  <br />
                  <strong className="text-[var(--primary)]">Email:</strong>{" "}
                  <a href="mailto:support@fashionhub.com" className="hover:underline text-[#594724]">
                    support@fashionhub.com
                  </a>
                </p>

              </CardContent>
            </Card>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
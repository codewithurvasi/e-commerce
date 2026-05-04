import React from "react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using our clothing ecommerce website and services, you agree to these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.",
  },
  {
    title: "Use of Website",
    list: [
      "You must provide accurate information while placing orders.",
      "You are responsible for maintaining your account confidentiality.",
      "You must not use the website for fraudulent or illegal activities.",
      "We may restrict access if suspicious activity is detected.",
    ],
  },
  {
    title: "Product Information",
    list: [
      "We try to display product images, colors, sizes, and descriptions accurately.",
      "Actual product colors may vary slightly due to screen settings or lighting.",
      "Size, fit, and fabric details should be checked before placing an order.",
      "Prices and availability may change without prior notice.",
    ],
  },
  {
    title: "Orders and Payments",
    list: [
      "All orders are subject to acceptance and product availability.",
      "Order confirmation may be sent via email/SMS/WhatsApp where available.",
      "All prices are listed in Indian Rupees (₹), unless stated otherwise.",
      "Shipping charges, if applicable, will be shown at checkout.",
      "We reserve the right to cancel orders due to pricing errors, stock issues, or suspicious transactions.",
    ],
  },
  {
    title: "Shipping and Delivery",
    list: [
      "Standard delivery usually takes 3–7 working days depending on location.",
      "Delivery timelines are estimates and may vary due to courier delays, festivals, or unavoidable circumstances.",
      "Please provide a complete and correct delivery address.",
      "Refer to our Shipping Policy for full delivery details.",
    ],
  },
  {
    title: "Returns, Exchanges and Refunds",
    list: [
      "Returns or exchanges may be accepted within 7 days of delivery for eligible products.",
      "Items must be unused, unwashed, and returned with original tags and packaging.",
      "Customized, altered, used, washed, or damaged-by-customer products are not returnable.",
      "Refunds are processed after quality inspection as per our Refund Policy.",
    ],
  },
  {
    title: "Cancellations",
    list: [
      "Orders can be cancelled before dispatch where available.",
      "Once dispatched, cancellation may not be possible and return policy will apply.",
      "Refunds for cancelled orders will be processed to the original payment method.",
    ],
  },
  {
    title: "Intellectual Property",
    list: [
      "All website content, designs, logos, images, product descriptions, and branding are protected.",
      "Unauthorized copying, reproduction, or commercial use of our content is prohibited.",
      "Third-party brand names and logos belong to their respective owners.",
    ],
  },
  {
    title: "Limitation of Liability",
    list: [
      "We are not responsible for indirect, incidental, or consequential damages.",
      "We are not liable for delays caused by courier partners or circumstances beyond our control.",
      "Our liability is limited to the value of the order placed by the customer.",
    ],
  },
  {
    title: "Changes to Terms",
    content:
      "We may update these Terms & Conditions at any time. Continued use of the website after changes means you accept the updated terms.",
  },
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#F4E7D0] text-[#151512]">
      {/* Hero */}
      <section className="relative bg-[#151512] py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22),transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--primary)] text-xs tracking-[0.35em] uppercase mb-5"
          >
            Legal Information
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-semibold mb-4"
          >
            Terms & Conditions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto leading-7"
          >
            Please read these terms carefully before shopping with us.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8 bg-[var(--card-bg)]/75 border border-[#D4AF37]/25 p-6">
            <p className="text-[#594724]">
              <strong className="text-[#151512]">Last Updated:</strong>{" "}
              December 2024
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                viewport={{ once: true }}
                className="bg-[var(--card-bg)]/80 border border-[#D4AF37]/25 p-6 md:p-8 hover:shadow-xl transition"
              >
                <h2 className="text-2xl font-serif text-[#151512] mb-4">
                  {section.title}
                </h2>

                {section.content && (
                  <p className="text-[#594724] leading-7">
                    {section.content}
                  </p>
                )}

                {section.list && (
                  <ul className="list-disc pl-6 text-[#594724] space-y-2 leading-7">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-[#151512] text-white border border-[#D4AF37]/25 p-6 md:p-8"
          >
            <h2 className="text-2xl font-serif text-[var(--primary)] mb-4">
              Contact Information
            </h2>

            <p className="text-white/70 leading-7">
              <strong className="text-[var(--primary)]">Company:</strong> FashionHub
              <br />
              <strong className="text-[var(--primary)]">Email:</strong>{" "}
              <a href="mailto:support@fashionhub.com" className="hover:underline">
                support@fashionhub.com
              </a>
              <br />
              <strong className="text-[var(--primary)]">Phone:</strong>{" "}
              <a href="tel:+917389654447" className="hover:underline">
                +91-7389654447
              </a>
              <br />
              <strong className="text-[var(--primary)]">Website:</strong>{" "}
              <span>fashionhub.com</span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
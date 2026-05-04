import React from "react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Introduction",
    content:
      "We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you shop with us.",
  },
  {
    title: "Information We Collect",
    list: [
      "Name, email address, phone number",
      "Shipping and billing address",
      "Order details and purchase history",
      "Device information and browsing behavior",
      "Cookies and tracking data",
    ],
  },
  {
    title: "How We Use Your Information",
    list: [
      "To process and deliver your orders",
      "To provide customer support",
      "To improve our products and services",
      "To send updates, offers, and notifications",
      "To prevent fraud and ensure security",
    ],
  },
  {
    title: "Information Sharing",
    list: [
      "We do not sell your personal data",
      "Shared with delivery partners for shipping",
      "Shared with payment gateways for transactions",
      "Shared with authorities if legally required",
    ],
  },
  {
    title: "Data Security",
    list: [
      "Secure encrypted connections (SSL)",
      "Protected servers and databases",
      "Limited access to sensitive data",
      "Secure payment processing",
    ],
  },
  {
    title: "Your Rights",
    list: [
      "Access your personal data",
      "Update or correct information",
      "Request deletion of your data",
      "Opt out of marketing communication",
    ],
  },
  {
    title: "Cookies Policy",
    list: [
      "Used to improve user experience",
      "Helps track usage and preferences",
      "Can be disabled from browser settings",
    ],
  },
  {
    title: "Changes to Policy",
    content:
      "We may update this Privacy Policy at any time. Continued use of the website means you accept the updated policy.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F4E7D0] text-[#151512]">
      {/* HERO */}
      <section className="relative bg-[#151512] py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.2),transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--primary)] text-xs tracking-[0.35em] uppercase mb-5"
          >
            Legal
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-semibold mb-4"
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto leading-7 font-heading italic tracking-wide  "
          >
            Your privacy matters. Learn how we protect your information.
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* DATE */}
          <div className="mb-8 bg-[var(--card-bg)]/80 border border-[#D4AF37]/30 p-6">
            <p className="text-[#594724]">
              <strong className="text-[#151512]">Last Updated:</strong> December 2024
            </p>
          </div>

          {/* SECTIONS */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-[var(--card-bg)]/80 border border-[#D4AF37]/25 p-6 md:p-8 hover:shadow-xl transition"
              >
                <h2 className="text-2xl font-serif text-[#151512] mb-4">
                  {section.title}
                </h2>

                {section.content && (
                  <p className="text-[#594724] leading-7 font-heading italic tracking-wide">
                    {section.content}
                  </p>
                )}

                {section.list && (
                  <ul className="list-disc pl-6 text-[#594724] space-y-2 leading-7 font-heading italic tracking-wide">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-[#151512] text-white border border-[#D4AF37]/25 p-6 md:p-8"
          >
            <h2 className="text-2xl font-serif text-[var(--primary)] mb-4 ">
              Contact Us
            </h2>

            <p className="text-white/70 leading-7">
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
              <strong className="text-[var(--primary)]">Website:</strong> fashionhub.com
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
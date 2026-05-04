import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  CreditCard,
  Truck,
  RotateCcw,
  Phone,
  Mail,
  MessageCircle,
  Shirt,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const helpTopics = [
  {
    icon: CreditCard,
    title: "Payments",
    desc: "UPI, Cards, Net Banking and secure checkout options.",
    link: "#payments",
  },
  {
    icon: Truck,
    title: "Shipping & Delivery",
    desc: "Fast PAN India delivery with safe premium packaging.",
    link: createPageUrl("ShippingPolicy"),
  },
  {
    icon: RotateCcw,
    title: "Returns & Exchanges",
    desc: "Easy return and exchange support for eligible products.",
    link: createPageUrl("RefundPolicy"),
  },
];

const paymentMethods = [
  { name: "UPI", desc: "Google Pay, PhonePe, Paytm, BHIM UPI" },
  { name: "Credit/Debit Cards", desc: "Visa, Mastercard, RuPay, Amex" },
  { name: "Net Banking", desc: "All major banks supported" },
  { name: "Cash on Delivery", desc: "Available on selected locations/orders" },
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Standard delivery usually takes 3–7 working days depending on your location.",
  },
  {
    q: "Do you deliver across India?",
    a: "Yes, we provide PAN India delivery through trusted logistics partners.",
  },
  {
    q: "How can I choose the right size?",
    a: "Please check the size chart on the product page before placing your order. For help, contact our support team.",
  },
  {
    q: "Can I return or exchange a product?",
    a: "Yes, eligible products can be returned or exchanged as per our return policy. Items must be unused, unwashed, and with original tags.",
  },
  {
    q: "What if I receive a damaged or wrong item?",
    a: "Contact us with order details and product photos. We will help with replacement, exchange, or refund as per policy.",
  },
  {
    q: "Do you take bulk clothing orders?",
    a: "Yes, we accept bulk orders for boutiques, events, teams, and corporate clothing requirements.",
  },
];

const processSteps = [
  {
    title: "Choose Your Style",
    desc: "Browse collections, select size, color, and add products to cart.",
  },
  {
    title: "Secure Checkout",
    desc: "Complete payment using UPI, cards, net banking, or available options.",
  },
  {
    title: "Order Confirmation",
    desc: "Receive confirmation and updates via email/SMS.",
  },
  {
    title: "Packing & Dispatch",
    desc: "Your order is quality checked, packed safely, and shipped.",
  },
  {
    title: "Delivery",
    desc: "Receive your clothing order at your doorstep.",
  },
];

export default function Help() {
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
            Customer Support
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-semibold mb-4"
          >
            Help Center
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto leading-7 font-heading italic tracking-wide"
          >
            Find answers about clothing orders, size selection, payments,
            delivery, returns, exchanges, and support.
          </motion.p>
        </div>
      </section>

      {/* Help Topics */}
      <section className="py-16 bg-[#F4E7D0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {helpTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Link to={topic.link}>
                  <Card className="h-full rounded-none bg-[var(--card-bg)]/75 border border-[#D4AF37]/25 hover:shadow-xl transition cursor-pointer">
                    <CardContent className="pt-8 pb-7">
                      <div className="h-14 w-14 bg-[#151512] flex items-center justify-center mb-5 border border-[var(--border-gold)] rounded-full">
                        <topic.icon className="h-7 w-7 text-[var(--primary)]" />
                      </div>
                      <h3 className="text-xl font-serif text-[#151512] mb-2">
                        {topic.title}
                      </h3>
                      <p className="text-[#594724] text-sm leading-6 font-heading italic tracking-wide">
                        {topic.desc}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section id="payments" className="py-16 bg-[#151512] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--primary)] mb-8">
            Payment Methods
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="rounded-none bg-white border border-[var(--border-soft)] hover:border-[#D4AF37]/60 transition min-h-full">
                  <CardContent className="pt-8 pb-6 px-6">
                    <h3 className="font-serif text-lg text-[var(--primary)] mb-2">
                      {method.name}
                    </h3>
                    <p className="text-sm text-black leading-6 font-heading italic tracking-wide">
                      {method.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Order & Delivery Process */}
      <section className="py-16 bg-[#F4E7D0]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-[#151512] mb-8">
            Order & Delivery Process
          </h2>

          <Card className="rounded-none bg-[var(--card-bg)]/75 border border-[#D4AF37]/25">
            <CardContent className="p-8">
              <div className="space-y-7">
                {processSteps.map((step, index) => (
                  <div key={step.title} className="flex mt-8 gap-4">
                    <div className="h-10 w-10 bg-[#151512] text-[var(--primary)] flex items-center justify-center font-bold flex-shrink-0 border border-[#D4AF37]/30">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="font-serif text-lg text-[#151512] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-[#594724] leading-6">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#151512] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--primary)] mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="rounded-none bg-white border border-[var(--border-soft)]">
                  <CardContent className="pt-8 pb-6 px-6">
                    <h3 className="font-serif text-lg text-[var(--primary)] mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-black leading-6">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-[#F4E7D0]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shirt className="h-10 w-10 text-[var(--primary)] mx-auto mb-4" />

          <h2 className="text-3xl md:text-4xl font-serif text-[#151512] mb-4">
            Still Need Help?
          </h2>

          <p className="text-[#594724] mb-8 font-heading italic tracking-wide">
            Our fashion support team is here to help you.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-none bg-[var(--card-bg)]/75 border border-[#D4AF37]/25">
              <CardContent className="pt-8 pb-6 px-6">
                <Phone className="h-8 w-8 text-[var(--primary)] mx-auto mb-4 mt-1" />
                <h3 className="font-serif text-lg text-[#151512] mb-2">
                  Call Us
                </h3>
                <a
                  href="tel:+917389654447"
                  className="text-[#594724] hover:text-[var(--primary)]"
                >
                  +91-7389654447
                </a>
              </CardContent>
            </Card>

            <Card className="rounded-none !bg-black border border-[#D4AF37]/25">
              <CardContent className="pt-8 pb-6 px-6">
                <Mail className="h-8 w-8 text-[var(--primary)] mx-auto mb-3" />
                <h3 className="font-serif text-lg text-[#594724] mb-2">
                  Email Us
                </h3>
                <a
                  href="mailto:support@fashionhub.com"
                  className="text-[#594724] hover:text-[var(--primary)]"
                >
                  support@fashionhub.com
                </a>
              </CardContent>
            </Card>

            <Link to={createPageUrl("Contact")}>
              <Card className="rounded-none bg-[var(--card-bg)]/75 border border-[#D4AF37]/25 cursor-pointer hover:border-[#D4AF37]/70 transition h-full">
                <CardContent className="pt-8 pb-6 px-6">
                  <MessageCircle className="h-8 w-8 text-[var(--primary)] mx-auto mb-3" />
                  <h3 className="font-serif text-lg text-[#151512] mb-2">
                    Contact Form
                  </h3>
                  <p className="text-[#594724] hover:text-[var(--primary)]">Send us a message</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-[#8A6A2F] text-sm">
            <ShieldCheck className="h-4 w-4 text-[var(--primary)]" />
            Secure shopping support for all orders
          </div>
        </div>
      </section>
    </div>
  );
}
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  Clock,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const SALES_EMAIL = "support@fashionhub.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(
      `Fashion Inquiry - ${formData.fullName}`
    );

    const body = encodeURIComponent(
      `Customer Inquiry Details:\n` +
        `---------------------------\n` +
        `Full Name: ${formData.fullName}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n\n` +
        `Message:\n${formData.message}`
    );

    window.location.href = `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`;

    toast.success("Opening your email client...");

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ fullName: "", email: "", phone: "", message: "" });
    }, 1000);
  };

  const contactItems = [
    {
      icon: Phone,
      title: "Customer Support",
      value: "+91-7389654447",
      link: "tel:+917389654447",
    },
    {
      icon: Mail,
      title: "Official Email",
      value: SALES_EMAIL,
      link: `mailto:${SALES_EMAIL}`,
    },
    {
      icon: Clock,
      title: "Support Hours",
      value: "Mon - Sat: 10AM - 7PM",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4E7D0] text-[#151512]">
      {/* Hero */}
      <section className="relative bg-[#151512] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22),transparent_35%)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--primary)] text-xs tracking-[0.35em] uppercase mb-5"
          >
            Contact Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-semibold text-white mb-6"
          >
            Connect With Our Style Team
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto leading-7 font-heading italic tracking-wide"
          >
            Need help with orders, sizes, returns, bulk clothing requirements,
            or styling support? Our fashion support team is here to help.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-[#8A6A2F] uppercase tracking-[0.3em] mb-4">
                  Support Channels
                </h3>

                <div className="space-y-4">
                  {contactItems.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <Card className="border border-[var(--border-soft)] shadow-sm hover:shadow-xl transition rounded-none bg-[var(--card-bg)]/80">
                        <CardContent className="pt-7 flex items-center gap-5">
                          <div className="h-12 w-12 bg-[#151512] flex items-center justify-center text-[var(--primary)] shrink-0 border border-[#D4AF37]/30">
                            <item.icon size={20} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-widest">
                              {item.title}
                            </p>

                            {item.link ? (
                              <a
                                href={item.link}
                                className="text-sm font-bold text-[#151512] hover:text-[var(--primary)] truncate block"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-sm font-bold text-[#151512]">
                                {item.value}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-[#151512] text-white space-y-4 shadow-xl border border-[#D4AF37]/25">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-[var(--primary)]" size={24} />
                  <h4 className="font-bold uppercase tracking-widest text-sm">
                    Premium Fashion Support
                  </h4>
                </div>

                <p className="text-xs text-white/60 font-medium leading-relaxed font-heading italic tracking-wide">
                  We assist with order queries, size guidance, product details,
                  delivery tracking, returns, exchanges, and bulk fashion
                  requirements.
                </p>

                <div className="pt-4 flex items-start gap-3 border-t border-[var(--border-soft)]">
                  <MapPin className="text-[var(--primary)] shrink-0" size={18} />
                  <p className="text-xs font-bold text-white/70 font-heading italic tracking-wide">
                    Operations: Online Clothing Store, India
                  </p>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="rounded-none border border-[var(--border-soft)] shadow-2xl overflow-hidden bg-[var(--card-bg)]/90">
                <CardContent className="p-8 md:p-12">
                  <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#151512]">
                      Send Your Inquiry
                    </h2>

                    <p className="text-sm text-[#8A6A2F] font-medium mt-2 uppercase tracking-wide">
                      Fields marked with (*) are required
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className="text-[10px] font-bold uppercase tracking-widest text-[#8A6A2F] ml-1"
                      >
                        Full Name *
                      </Label>

                      <Input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fullName: e.target.value,
                          })
                        }
                        className="h-14 rounded-none bg-[#F4E7D0]/60 border border-[var(--border-soft)] font-semibold focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-[10px] font-bold uppercase tracking-widest text-[#8A6A2F] ml-1"
                        >
                          Email Address *
                        </Label>

                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                          className="h-14 rounded-none bg-[#F4E7D0]/60 border border-[var(--border-soft)] font-semibold focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-[10px] font-bold uppercase tracking-widest text-[#8A6A2F] ml-1"
                        >
                          Contact Number *
                        </Label>

                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value,
                            })
                          }
                          className="h-14 rounded-none bg-[#F4E7D0]/60 border border-[var(--border-soft)] font-semibold focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                          placeholder="+91 00000 00000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-[10px] font-bold uppercase tracking-widest text-[#8A6A2F] ml-1"
                      >
                        Message *
                      </Label>

                      <Textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          })
                        }
                        className="rounded-none bg-[#F4E7D0]/60 border border-[var(--border-soft)] font-semibold focus-visible:ring-2 focus-visible:ring-[#D4AF37] resize-none p-5"
                        placeholder="Tell us about your order, size query, return request, or bulk clothing requirement..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative overflow-hidden group w-full md:w-auto h-14 px-10 rounded-none border-none bg-[#151512] text-[var(--primary)] font-bold uppercase tracking-[0.18em] text-[11px] shadow-xl transition-all duration-300 hover:bg-[#D4AF37] hover:text-black active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                      <div className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Inquiry</span>
                            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </>
                        )}
                      </div>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
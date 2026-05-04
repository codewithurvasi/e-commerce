import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/Label";
import { Upload, Users, TrendingUp, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import api from "@/services/api";

export default function Careers() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setResume(file);
    } else {
      toast.error("File size should be less than 5MB");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", resume);

      const uploadRes = await api.post("/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileUrl = uploadRes.data.file_url;

      await api.post("/applications", {
        ...formData,
        resumeUrl: fileUrl,
      });

      toast.success("Application submitted successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setResume(null);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Sparkles,
      title: "Creative Growth",
      desc: "Work on fashion trends & innovative designs",
    },
    {
      icon: Users,
      title: "Amazing Team",
      desc: "Collaborate with passionate fashion experts",
    },
    {
      icon: TrendingUp,
      title: "Career Opportunities",
      desc: "Grow with a fast-scaling fashion brand",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4E7D0] text-[#151512]">

      {/* HERO */}
      <section className="bg-[#151512] text-white py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif mb-4"
        >
          Join Our Fashion Team ✨
        </motion.h1>

        <p className="text-white/70 max-w-2xl mx-auto font-heading italic tracking-wide">
          Be part of a premium clothing brand shaping the future of fashion.
        </p>
      </section>

      {/* BENEFITS */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {benefits.map((item, i) => (
            <Card key={i} className="bg-[#151512] text-white border border-[#D4AF37]/30">
              <CardContent className="pt-10 pb-7 px-7text-center">
                <item.icon className="mb-6 text-[var(--primary)] h-14 w-14 " />
                <h3 className="text-lg font-serif mb-2 text-[var(--primary)] ">
                  {item.title}
                </h3>
                <p className="text-black text-sm font-heading italic tracking-wide">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="bg-[var(--card-bg)] shadow-xl border-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif mb-6 text-[#151512]">
                Apply Now
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <Input
                    type="tel"
                    placeholder="Phone"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                {/* Upload */}
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#D4AF37]">
                  <div className="text-center">
                    <Upload className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {resume ? resume.name : "Upload Resume"}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                <Textarea
                  rows={4}
                  placeholder="Why do you want to join our brand?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D4AF37] hover:bg-[#c49d2e] text-black py-5"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
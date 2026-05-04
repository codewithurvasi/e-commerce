import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ConsumerPolicy() {
  return (
    <div className="min-h-screen bg-[var(--card-bg)]">

      {/* Hero */}
      <section className="bg-[#1E3A8A] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Consumer Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90"
          >
            Your rights and our commitments
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[var(--card-bg)]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Our Commitment to Consumers</h2>
            <p className="text-gray-700 mb-8">
              At Webix-Ecommerce, we are committed to providing high-quality products, transparent pricing, and excellent customer service. This Consumer Policy outlines your rights and our responsibilities as a responsible business.
            </p>

            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Product Quality Assurance</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
              <li>All products are 100% genuine and authentic</li>
              <li>Direct sourcing from authorized manufacturers</li>
              <li>Quality checks before dispatch</li>
              <li>Manufacturer warranties honored</li>
              <li>Compliance with Indian quality standards</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Pricing Transparency</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
              <li>Clear pricing with no hidden charges</li>
              <li>All taxes and fees disclosed at checkout</li>
              <li>Competitive pricing across the industry</li>
              <li>Special discounts clearly marked</li>
              <li>Price match consideration on request</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Consumer Rights</h2>
            <p className="text-gray-700 mb-4">
              As a consumer, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
              <li><strong>Right to Information:</strong> Complete product details and specifications</li>
              <li><strong>Right to Choose:</strong> Wide range of products and brands</li>
              <li><strong>Right to Safety:</strong> Products meeting safety standards</li>
              <li><strong>Right to be Heard:</strong> Voice concerns and complaints</li>
              <li><strong>Right to Redressal:</strong> Fair resolution of complaints</li>
              <li><strong>Right to Education:</strong> Information about products and usage</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Customer Support</h2>
            <p className="text-gray-700 mb-4">
              We provide comprehensive customer support:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
              <li>Multiple contact channels (phone, email, contact form)</li>
              <li>Support hours: Monday to Saturday, 10 AM - 6 PM IST</li>
              <li>Response within 24 hours for emails</li>
              <li>Order tracking and status updates</li>
              <li>Post-purchase assistance and guidance</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Complaint Handling</h2>
            <p className="text-gray-700 mb-4">
              We take all complaints seriously:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 mb-8 space-y-2">
              <li>Report complaint via phone, email, or contact form</li>
              <li>Receive acknowledgment within 24 hours</li>
              <li>Investigation and resolution within 5-7 business days</li>
              <li>Escalation to senior management if unresolved</li>
              <li>Final response provided in writing</li>
            </ol>

            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Data Protection</h2>
            <p className="text-gray-700 mb-8">
              Your personal information is protected as per our <Link to={createPageUrl('PrivacyPolicy')} className="text-[#F9A825] hover:underline">Privacy Policy</Link>. We never share or sell customer data to third parties for marketing purposes.
            </p>

            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Fair Business Practices</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
              <li>No misleading advertising or false claims</li>
              <li>Honest representation of products and services</li>
              <li>Transparent terms and conditions</li>
              <li>Fair cancellation and return policies</li>
              <li>No discrimination in service delivery</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Related Policies</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <ul className="space-y-2">
                <li>
                  📋 <Link to={createPageUrl('TermsAndConditions')} className="text-[#F9A825] hover:underline font-medium">Terms & Conditions</Link>
                </li>
                <li>
                  🔒 <Link to={createPageUrl('PrivacyPolicy')} className="text-[#F9A825] hover:underline font-medium">Privacy Policy</Link>
                </li>
                <li>
                  🚚 <Link to={createPageUrl('ShippingPolicy')} className="text-[#F9A825] hover:underline font-medium">Shipping Policy</Link>
                </li>
                <li>
                  ↩️ <Link to={createPageUrl('RefundPolicy')} className="text-[#F9A825] hover:underline font-medium">Refund & Return Policy</Link>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Grievance Redressal</h2>
            <p className="text-gray-700 mb-4">
              If you are not satisfied with our complaint resolution:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong className="text-[#1E3A8A]">Grievance Officer:</strong> Standard Petro India Pvt. Ltd.<br />
                <strong className="text-[#1E3A8A]">Email:</strong> <a href="mailto:ceospipl@standardpetro.in" className="text-[#F9A825] hover:underline">ceospipl@standardpetro.in</a><br />
                <strong className="text-[#1E3A8A]">Phone:</strong> <a href="tel:+917389654447" className="text-[#F9A825] hover:underline">+91-7389654447</a><br />
                <strong className="text-[#1E3A8A]">Response Time:</strong> Within 7 business days
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
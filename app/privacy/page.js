"use client";
import React from "react";
import Sidebar from "../components/sidebar";

const PrivacyPolicy = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly, including when you create an account, make a purchase, 
              or contact us. This may include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Personal details (name, email address, contact information)</li>
              <li>Payment and transaction details</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Respond to your requests and provide customer support</li>
              <li>Send technical notices, updates, and security alerts</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Data Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Service providers who perform services on our behalf</li>
              <li>Legal authorities when required by law</li>
              <li>Business transfers (in case of merger or acquisition)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Access, correct, or delete your personal information</li>
              <li>Object to or restrict certain data processing</li>
              <li>Receive your data in a portable format</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information.
              However, no system can be 100% secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Changes to This Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this policy periodically. We'll notify you of significant changes by posting the new policy 
              on our website with a new "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
            <p className="text-gray-600">
              For questions about this policy, please contact us at:
              <a href="mailto:privacy@yourdomain.com" className="text-indigo-600 hover:underline ml-1">
                privacy@yourdomain.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { initializePayment } from "../../services/payment.services";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCreditCard,
  FiArrowLeft,
} from "react-icons/fi";

interface Zone {
  id: number;
  name: string;
  lga: string;
  price: number;
  locations: string[];
  phoneNumber: string;
}

interface CheckoutFormProps {
  zone: Zone;
}

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

const CheckoutForm = ({ zone }: CheckoutFormProps) => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isValid =
    fullName.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    phoneNumber.trim().length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitting(true);
    setError("");

    try {
      const data = await initializePayment({
        fullName,
        email,
        phoneNumber,
        zoneId: zone.id,
      });

      if (data.success && data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        setError(data.message || "Unable to start payment. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to start payment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8 cursor-pointer"
      >
        <FiArrowLeft size={14} /> Back
      </button>

      <div className="text-center mb-8">
        <p className="text-[#333992] text-xs font-bold uppercase tracking-widest mb-2">
          Checkout
        </p>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
          {zone.name}
        </h1>
        <p className="text-gray-500 text-sm">{zone.lga}</p>
      </div>

      <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-5 py-4 mb-8">
        <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
          Amount due
        </span>
        <span className="text-[#00a057] text-xl font-extrabold">
          {formatNaira(zone.price)}
        </span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <FiUser
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#333992]/20 focus:border-[#333992]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <FiMail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#333992]/20 focus:border-[#333992]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <FiPhone
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="080XXXXXXXX"
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#333992]/20 focus:border-[#333992]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || submitting}
          className="w-full flex items-center justify-center gap-2 bg-[#00a057] text-white font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-[#008f4c] transition-colors mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiCreditCard />
          {submitting ? "Processing..." : `Pay ${formatNaira(zone.price)}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;

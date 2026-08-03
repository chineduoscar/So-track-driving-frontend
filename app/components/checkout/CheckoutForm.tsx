"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { initializePayment } from "../../services/payment.services";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCreditCard,
  FiArrowLeft,
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiBookOpen,
  FiGlobe,
} from "react-icons/fi";

interface PriceTier {
  nonExperience: number;
  partialExperience: number;
  refresher?: number;
}

interface ZonePricing {
  standard: PriceTier;
  executive: PriceTier;
  weekend: PriceTier;
  weekendExecutive: PriceTier;
}

interface Zone {
  id: number;
  name: string;
  lga: string;
  pricing: ZonePricing;
  locations: string[];
  phoneNumber: string;
}

interface CheckoutFormProps {
  zone: Zone;
}

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

const PACKAGE_LABELS: Record<keyof ZonePricing, string> = {
  standard: "Standard",
  executive: "Executive",
  weekend: "Weekend",
  weekendExecutive: "Weekend Executive",
};

const TIER_LABELS: Record<keyof PriceTier, string> = {
  nonExperience: "New driver",
  partialExperience: "Some experience",
  refresher: "Refresher",
};

const isValidPackage = (value: string | null): value is keyof ZonePricing =>
  !!value && value in PACKAGE_LABELS;

const isValidTier = (value: string | null): value is keyof PriceTier =>
  !!value && value in TIER_LABELS;

const Required = () => <span className="text-red-500">*</span>;

const CheckoutForm = ({ zone }: CheckoutFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // These came from the link SingleLocation built (?package=...&tier=...).
  // Fall back to Standard / New driver if the URL is missing or malformed
  // (e.g. someone typed the checkout URL by hand) rather than crashing.
  const rawPackage = searchParams.get("package");
  const rawTier = searchParams.get("tier");
  const selectedPackage: keyof ZonePricing = isValidPackage(rawPackage)
    ? rawPackage
    : "standard";
  const tierPrices = zone.pricing[selectedPackage];
  const selectedTier: keyof PriceTier =
    isValidTier(rawTier) && tierPrices[rawTier] !== undefined
      ? rawTier
      : "nonExperience";

  const price = tierPrices[selectedTier] as number;

  // --- Core payment/contact fields ---
  const [surname, setSurname] = useState("");
  const [otherName, setOtherName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // "Tel" on the paper form
  const [contactAddress, setContactAddress] = useState("");

  // --- Fields matching the SO-Track paper registration form ---
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [stateOfOrigin, setStateOfOrigin] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [homeTown, setHomeTown] = useState("");
  const [qualification, setQualification] = useState("");
  const [previousExperience, setPreviousExperience] = useState("");
  const [languageSpoken, setLanguageSpoken] = useState("");
  const [agreeToRules, setAgreeToRules] = useState(false);

  // Referee section
  const [refereeName, setRefereeName] = useState("");
  const [refereeAddress, setRefereeAddress] = useState("");
  const [refereePhone, setRefereePhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isValid =
    surname.trim().length > 1 &&
    otherName.trim().length > 0 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    phoneNumber.trim().length >= 10 &&
    contactAddress.trim().length > 3 &&
    dateOfBirth.trim().length > 0 &&
    stateOfOrigin.trim().length > 0 &&
    maritalStatus.trim().length > 0 &&
    homeTown.trim().length > 0 &&
    languageSpoken.trim().length > 0 &&
    agreeToRules;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitting(true);
    setError("");

    try {
      const data = await initializePayment({
        fullName: `${surname} ${otherName}`.trim(),
        surname,
        otherName,
        email,
        phoneNumber,
        contactAddress,
        dateOfBirth,
        stateOfOrigin,
        maritalStatus,
        homeTown,
        qualification,
        previousExperience,
        languageSpoken,
        agreeToRules,
        referee: {
          name: refereeName,
          address: refereeAddress,
          phoneNumber: refereePhone,
        },
        zoneId: zone.id,
        package: selectedPackage,
        tier: selectedTier,
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

  const inputClass =
    "w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#333992]/20 focus:border-[#333992]";
  const plainInputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#333992]/20 focus:border-[#333992]";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5";

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

      <div className="bg-green-50 border border-green-100 rounded-xl px-5 py-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
            Amount due
          </span>
          <span className="text-[#00a057] text-xl font-extrabold">
            {formatNaira(price)}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-green-100/80 pt-2">
          <span>{PACKAGE_LABELS[selectedPackage]}</span>
          <span>{TIER_LABELS[selectedTier]}</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <p className="text-xs text-gray-400 mb-4">
        Fields marked <span className="text-red-500">*</span> are required.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal details */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Personal Details
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>
                Surname <Required />
              </label>
              <div className="relative">
                <FiUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Doe"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Other Name(s) <Required />
              </label>
              <input
                type="text"
                value={otherName}
                onChange={(e) => setOtherName(e.target.value)}
                placeholder="John"
                required
                className={plainInputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Email Address <Required />
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
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Tel <Required />
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
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Contact Address <Required />
            </label>
            <div className="relative">
              <FiMapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                value={contactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
                placeholder="No. 1, Sample Street, Port Harcourt"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>
                Date of Birth <Required />
              </label>
              <div className="relative">
                <FiCalendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                State of Origin <Required />
              </label>
              <input
                type="text"
                value={stateOfOrigin}
                onChange={(e) => setStateOfOrigin(e.target.value)}
                placeholder="Rivers"
                required
                className={plainInputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>
                Marital Status <Required />
              </label>
              <div className="relative">
                <FiUsers
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <select
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  required
                  className={inputClass}
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Home Town <Required />
              </label>
              <input
                type="text"
                value={homeTown}
                onChange={(e) => setHomeTown(e.target.value)}
                placeholder="e.g. Bonny"
                required
                className={plainInputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Qualification</label>
            <div className="relative">
              <FiBookOpen
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="e.g. SSCE, HND, B.Sc"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Previous Experience</label>
            <input
              type="text"
              value={previousExperience}
              onChange={(e) => setPreviousExperience(e.target.value)}
              placeholder="e.g. None, or brief driving history"
              className={plainInputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Language Spoken <Required />
            </label>
            <div className="relative">
              <FiGlobe
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                value={languageSpoken}
                onChange={(e) => setLanguageSpoken(e.target.value)}
                placeholder="e.g. English, Pidgin, Ikwerre"
                required
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Referee section */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Referee
          </h2>

          <div>
            <label className={labelClass}>Referee Name</label>
            <input
              type="text"
              value={refereeName}
              onChange={(e) => setRefereeName(e.target.value)}
              placeholder="Full name of referee"
              className={plainInputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Referee Address</label>
            <input
              type="text"
              value={refereeAddress}
              onChange={(e) => setRefereeAddress(e.target.value)}
              placeholder="Referee's address"
              className={plainInputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Referee Phone Number</label>
            <input
              type="tel"
              value={refereePhone}
              onChange={(e) => setRefereePhone(e.target.value)}
              placeholder="080XXXXXXXX"
              className={plainInputClass}
            />
          </div>
        </div>

        {/* Declaration */}
        <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeToRules}
            onChange={(e) => setAgreeToRules(e.target.checked)}
            required
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#333992] focus:ring-[#333992]/30"
          />
          <span>
            I declare that the above particulars are complete and true to the
            best of my knowledge, and I agree to abide by the rules and
            regulations of the company. I understand that the remuneration is
            not refundable.
          </span>
        </label>

        <button
          type="submit"
          disabled={!isValid || submitting}
          className="w-full flex items-center justify-center gap-2 bg-[#00a057] text-white font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-[#008f4c] transition-colors mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiCreditCard />
          {submitting ? "Processing..." : `Pay ${formatNaira(price)}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;

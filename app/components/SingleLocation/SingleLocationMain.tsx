"use client";
import { useState } from "react";
import {
  FiMapPin,
  FiPhone,
  FiCreditCard,
  FiClock,
  FiCheckCircle,
  FiUsers,
  FiAward,
  FiTruck,
  FiCheck,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

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
  phoneNumber: string;
  locations: string[];
  pricing: ZonePricing;
}

interface SingleLocationProps {
  zone: Zone;
}

const included = [
  "Practical lessons with a certified instructor",
  "Training vehicle provided",
  "Highway code & theory class",
  "Road test preparation",
  "Certificate on completion",
];

const stats = [
  { icon: FiUsers, value: "3000+", label: "Students trained" },
  { icon: FiAward, value: "98%", label: "Pass rate" },
  { icon: FiTruck, value: "8", label: "Zones citywide" },
];

// TODO: replace these descriptions with the real differences between your
// packages (e.g. car type, instructor grade, class size, day/time slots).
// Plain language here is what makes the price feel earned, not arbitrary.
const packageOptions: {
  key: keyof ZonePricing;
  label: string;
  description: string;
}[] = [
  {
    key: "standard",
    label: "Standard",
    description: "Weekday lessons, our regular training vehicle",
  },
  {
    key: "executive",
    label: "Executive",
    description: "Weekday lessons, premium vehicle & flexible timing",
  },
  {
    key: "weekend",
    label: "Weekend",
    description: "Saturday & Sunday lessons, regular training vehicle",
  },
  {
    key: "weekendExecutive",
    label: "Weekend Executive",
    description: "Saturday & Sunday lessons, premium vehicle & flexible timing",
  },
];

// TODO: confirm this matches how you actually define each level — this is
// what stops "Refresher" and "Partial Experience" from being unexplained jargon.
const tierOptions: {
  key: keyof PriceTier;
  label: string;
  description: string;
}[] = [
  {
    key: "nonExperience",
    label: "New driver",
    description: "Never driven before",
  },
  {
    key: "partialExperience",
    label: "Some experience",
    description: "Have driven before, not yet confident",
  },
  {
    key: "refresher",
    label: "Refresher",
    description: "Already licensed, need a refresher",
  },
];

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

const SingleLocation = ({ zone }: SingleLocationProps) => {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] =
    useState<keyof ZonePricing>("standard");
  const [selectedTier, setSelectedTier] =
    useState<keyof PriceTier>("nonExperience");

  const currentTierPrices = zone.pricing[selectedPackage];
  // Weekend Executive has no "refresher" tier — fall back to nonExperience if it was selected
  const activeTier =
    currentTierPrices[selectedTier] !== undefined
      ? selectedTier
      : "nonExperience";
  const price = currentTierPrices[activeTier] as number;

  const activePackageLabel = packageOptions.find(
    (p) => p.key === selectedPackage,
  )?.label;
  const activeTierLabel = tierOptions.find((t) => t.key === activeTier)?.label;

  const handlePay = () => {
    router.push(
      `/zones/${zone.id}/checkout?package=${selectedPackage}&tier=${activeTier}`,
    );
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Location header */}
        <div className="text-center mb-12">
          <p className="text-[#333992] text-xs font-bold uppercase tracking-widest mb-3">
            Zone
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            {zone.name}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <FiMapPin className="text-[#00a057]" />
              {zone.lga}
            </span>
            <a
              href={`tel:${zone.phoneNumber}`}
              className="flex items-center gap-2 hover:text-gray-900 transition-colors"
            >
              <FiPhone className="text-[#00a057]" />
              {zone.phoneNumber}
            </a>
            <span className="flex items-center gap-2">
              <FiClock className="text-[#00a057]" />
              Mon - Sat, 8:00am - 5:00pm
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {zone.locations.map((location) => (
              <span
                key={location}
                className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-700"
              >
                {location}
              </span>
            ))}
          </div>
        </div>

        {/* Trust stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-12">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-[#1a2d56]/3 border border-gray-100 rounded-2xl py-5 px-3 text-center"
            >
              <Icon className="text-[#00a057] mx-auto mb-2" size={20} />
              <p className="font-extrabold text-gray-900 text-xl sm:text-2xl">
                {value}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Main card: what's included + payment */}
        <div className="grid md:grid-cols-5 border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Left: what's included + package/tier selectors */}
          <div className="md:col-span-3 p-6 sm:p-8">
            <h2 className="font-bold text-gray-900 text-lg mb-1">
              Driving Lessons
            </h2>

            {/* Step 1: package — full cards, not bare pills, so each choice is self-explanatory */}
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
              1. Choose when you&apos;d like to train
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5 mb-7">
              {packageOptions.map(({ key, label, description }) => {
                const isSelected = selectedPackage === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedPackage(key)}
                    aria-pressed={isSelected}
                    className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#1a2f5e]/5 border-[#1a2f5e]"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="flex items-center gap-2 mb-1">
                      {isSelected && (
                        <FiCheck
                          className="text-[#1a2f5e] shrink-0"
                          size={14}
                        />
                      )}
                      <span className="text-sm font-bold text-gray-900">
                        {label}
                      </span>
                    </span>
                    <span className="text-xs text-gray-500 leading-snug">
                      {description}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Step 2: experience level — plain-language labels with the jargon in small print */}
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
              2. Tell us your driving experience
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
              {tierOptions.map(({ key, label, description }) => {
                const available = currentTierPrices[key] !== undefined;
                if (!available) return null;
                const isSelected = activeTier === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedTier(key)}
                    aria-pressed={isSelected}
                    className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#00a057]/5 border-[#00a057]"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="flex items-center gap-2 mb-1">
                      {isSelected && (
                        <FiCheck
                          className="text-[#00a057] shrink-0"
                          size={14}
                        />
                      )}
                      <span className="text-sm font-bold text-gray-900">
                        {label}
                      </span>
                    </span>
                    <span className="text-xs text-gray-500 leading-snug">
                      {description}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
              What&apos;s included
            </p>
            <ul className="space-y-2.5">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-gray-600"
                >
                  <FiCheckCircle className="text-[#00a057] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: price + pay */}
          <div className="md:col-span-2 bg-[#1a2f5e] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wide mb-1">
                Course fee
              </p>
              <p className="font-extrabold text-white text-3xl mb-3">
                {formatNaira(price)}
              </p>

              {/* Plain-language recap of the two choices made above, so the
                  price is never disconnected from what it's paying for */}
              <div className="border-t border-white/10 pt-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Package</span>
                  <span className="text-white/80 font-medium">
                    {activePackageLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Experience level</span>
                  <span className="text-white/80 font-medium">
                    {activeTierLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handlePay}
                className="w-full flex items-center justify-center gap-2 bg-[#00a057] text-white font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-[#008f4c] transition-colors mb-3 cursor-pointer"
              >
                <FiCreditCard /> Pay {formatNaira(price)}
              </button>
              <a
                href={`tel:${zone.phoneNumber}`}
                className="w-full flex items-center justify-center gap-2 border border-white/20 text-white/80 font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/5 transition-colors"
              >
                <FiPhone size={14} /> Call for Enquiries
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleLocation;

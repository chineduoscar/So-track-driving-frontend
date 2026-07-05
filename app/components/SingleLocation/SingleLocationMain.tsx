"use client";
import {
  FiMapPin,
  FiPhone,
  FiCreditCard,
  FiClock,
  FiCheckCircle,
  FiUsers,
  FiAward,
  FiTruck,
} from "react-icons/fi";

interface Zone {
  id: number;
  name: string;
  lga: string;
  price: number;
  locations: string[];
  phoneNumber: string;
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
  { icon: FiTruck, value: "9", label: "Zones citywide" },
];

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

const SingleLocation = ({ zone }: SingleLocationProps) => {
  const handlePay = () => {
    // TODO: hook up real payment provider (Paystack/Flutterwave etc.)
    console.log("Pay for zone:", zone.id);
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
          {/* Left: what's included */}
          <div className="md:col-span-3 p-6 sm:p-8">
            <h2 className="font-bold text-gray-900 text-lg mb-1">
              Driving Lessons
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              2 weeks course · {zone.name}
            </p>

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
          <div className="md:col-span-2 bg-[#1a2d56] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wide mb-1">
                Course fee
              </p>
              <p className="font-extrabold text-white text-3xl mb-6">
                {formatNaira(zone.price)}
              </p>
            </div>

            <div>
              <button
                onClick={handlePay}
                className="w-full flex items-center justify-center gap-2 bg-[#00a057] text-white font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-[#008f4c] transition-colors mb-3 cursor-pointer"
              >
                <FiCreditCard /> Pay {formatNaira(zone.price)}
              </button>
              <a
                href={`tel:${zone.phoneNumber}`}
                className="w-full flex items-center justify-center gap-2 border border-white/20 text-white/80 font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/5 transition-colors"
              >
                <FiPhone size={14} /> Call to book instead
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleLocation;

"use client";

import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import services from "../../data/services";
import ServiceModal from "../modal/ServiceModal";

const ServiceCard = ({
  s,
  onLearnMore,
}: {
  s: (typeof services)[number];
  onLearnMore: () => void;
}) => {
  const Icon = s.icon;

  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col">
      <div className="w-10 h-10 rounded-xl bg-[#00a057] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5 text-white" />
      </div>

      <h3 className="font-extrabold text-gray-900 text-base mb-2">{s.title}</h3>

      <p className="text-gray-500 text-xs leading-relaxed mb-5">{s.desc}</p>

      <ul className="space-y-2 mb-6 flex-1">
        {s.perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 text-xs text-gray-700"
          >
            <FiCheckCircle className="text-[#00a057] shrink-0" />
            {perk}
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-100 mb-4" />

      <button
        onClick={onLearnMore}
        className="flex items-center gap-1 text-xs font-semibold text-[#00a057] hover:gap-2 transition-all duration-150 w-fit cursor-pointer"
      >
        Learn more →
      </button>
    </div>
  );
};

const OurServices = () => {
  const [activeService, setActiveService] = useState<
    (typeof services)[number] | null
  >(null);

  return (
    <>
      <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#00a057] text-xs font-bold uppercase tracking-widest mb-3">
              Our Services
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Our Full Range of Services
            </h2>

            <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
              Professional driving training, driver&apos;s license processing,
              vehicle licensing, defensive driving courses, and expert driver
              services all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {services.map((s) => (
              <ServiceCard
                key={s.title}
                s={s}
                onLearnMore={() => setActiveService(s)}
              />
            ))}
          </div>
        </div>
      </section>

      <ServiceModal
        service={activeService}
        onClose={() => setActiveService(null)}
      />
    </>
  );
};

export default OurServices;

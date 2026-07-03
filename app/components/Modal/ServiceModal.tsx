"use client";
import { useEffect } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";
import Link from "next/link";

export type ServiceModalData = {
  icon: React.ElementType;
  title: string;
  desc: string;
  about: string;
  perks: string[];
};

const ServiceModal = ({
  service,
  onClose,
}: {
  service: ServiceModalData | null;
  onClose: () => void;
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!service) return null;
  const Icon = service.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1a2350]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl animate-[fadeIn_0.2s_ease]">
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <FiX className="text-gray-500" />
        </button>

        <div className="w-11 h-11 rounded-xl bg-[#00a057] flex items-center justify-center mb-5">
          <Icon className="w-5 h-5 text-white" />
        </div>

        <h3
          id="service-modal-title"
          className="font-extrabold text-gray-900 text-xl mb-3"
        >
          {service.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-5">
          {service.about}
        </p>

        <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">
          What&apos;s included
        </p>
        <ul className="space-y-2.5 mb-6">
          {service.perks.map((perk) => (
            <li
              key={perk}
              className="flex items-center gap-2.5 text-sm text-gray-700"
            >
              <FiCheckCircle className="text-[#00a057] shrink-0" />
              {perk}
            </li>
          ))}
        </ul>

        <Link
          href={"/contact"}
          className="block text-center bg-[#00a057] hover:bg-[#008f4c] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-200"
        >
          Book this service
        </Link>
      </div>
    </div>
  );
};

export default ServiceModal;

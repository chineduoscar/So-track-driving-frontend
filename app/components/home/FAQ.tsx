"use client";
import { useState } from "react";

const faqs = [
  {
    q: "How do I book my first lesson?",
    a: "You can book your first lesson by selecting your nearest zone, filling in your details, and choosing a time that works for you. You can also reach us by call or WhatsApp.",
  },
  {
    q: "Do you offer both automatic and manual cars?",
    a: "Yes! We have a fleet of both automatic and manual dual-control vehicles. You can choose whichever suits your learning goals when booking.",
  },
  {
    q: "Are your instructors certified?",
    a: "Absolutely. All our instructors are fully certified, FRSC-compliant, and undergo regular training to ensure the highest standard of teaching.",
  },
  {
    q: "What if I need to reschedule a lesson?",
    a: "No problem. You can reschedule up to 24 hours before your lesson at no extra charge. Just contact your zone directly or use our online portal.",
  },
  {
    q: "Do you help with the official driving test?",
    a: "Yes. We help learners prepare for their driving test through practical driving lessons, guidance from experienced instructors, and training focused on safe and confident driving.",
  },
  {
    q: "How long does it take to get a driver's licence?",
    a: "It depends on your pace and prior experience. Most students complete the process within 4-8 weeks. We handle the full licence processing on your behalf.",
  },
  {
    q: "Do you provide drivers for hire?",
    a: "Yes. We supply vetted, professional drivers for personal, corporate, and event use. Contact us to discuss your requirements and availability.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#00a057] text-xs font-bold uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Frequently asked questions
          </h2>
        </div>

        {/* Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-gray-800">
                  {faq.q}
                </span>
                <span
                  className={`ml-4 shrink-0 w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center transition-transform duration-300 ${
                    open === i ? "rotate-180 bg-[#00a057] border-[#00a057]" : ""
                  }`}
                >
                  <svg
                    className={`w-3 h-3 ${open === i ? "text-white" : "text-gray-400"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

import { FiCheckCircle } from "react-icons/fi";

const services = [
  {
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 4.418-4.03 8-9 8s-9-3.582-9-8c0-.54.06-1.064.168-1.574L12 14z"
        />
      </svg>
    ),
    title: "Professional Driving Training",
    desc: "Learn from certified instructors with structured programmes designed to build real-world confidence behind the wheel.",
    perks: [
      "Certified instructors",
      "Structured curriculum",
      "Beginner to advanced",
    ],
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: "Vehicle Licensing & Renewal",
    desc: "We handle the full licensing process for your vehicle, from fresh registration to timely renewals, helping you stay compliant.",
    perks: ["Fresh registrations", "Renewal reminders", "Hassle-free process"],
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Defensive Driving Training",
    desc: "Master advanced techniques to anticipate hazards, react safely, and protect yourself and others in any road condition.",
    perks: [
      "Hazard perception",
      "All-weather driving",
      "Certificate of completion",
    ],
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    title: "Provision of Expert Drivers",
    desc: "Need a reliable, professional driver? We supply vetted, experienced drivers for personal, corporate, or event use.",
    perks: [
      "Vetted professionals",
      "Corporate & personal",
      "Flexible availability",
    ],
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
        />
      </svg>
    ),
    title: "Driver's License Processing",
    desc: "We handle the full licensing process for your vehicle, from fresh registration to timely renewals, helping you stay compliant.",
    perks: ["Document preparation", "FRSC liaison", "Fast turnaround"],
  },
];

const ServiceCard = ({ s }: { s: (typeof services)[number] }) => (
  <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col">
    <div className="w-10 h-10 rounded-xl bg-[#00a057] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
      {s.icon}
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
    <a
      href="#"
      className="flex items-center gap-1 text-xs font-semibold text-[#00a057] hover:gap-2 transition-all duration-150 w-fit"
    >
      Learn more →
    </a>
  </div>
);

const OurServices = () => {
  return (
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
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;

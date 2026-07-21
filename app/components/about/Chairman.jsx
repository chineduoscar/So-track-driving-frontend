import Image from "next/image";
import { FiBookOpen, FiAward, FiUsers } from "react-icons/fi";

const chairman = {
  image: "/chairman.png",
  name: "Barango Sobere Lloyd",
  role: "Chairman, So-Track Driving School Ltd",
  bio: "An accomplished security and business executive with over 16 years of professional experience in security management, logistics, operational leadership, and risk management within Nigeria's oil and gas industry. He provides strategic leadership focused on excellence, safety, professionalism, and innovation in driver education — having led complex operations in high-risk environments and implemented safety systems with an exceptional safety record.",
  education: [
    "MBA in Security Management - Babcock University",
    "M.Sc. Environmental Management - Ignatius Ajuru University of Education",
    "B.Sc. Geology - University of Port Harcourt",
  ],
  certifications: [
    "Certified Protection Professional (CPP)",
    "Professional Certified Investigator (PCI)",
    "Certified Protection Officer (CPO)",
    "Certified Physical Security Manager (CPSM)",
    "Certified Safety Specialist",
    "Certified Designated First Aider",
    "Facility Emergency Response Certification",
    "Certified Port Facility Security Officer (PFSO)",
    "Certified Security Specialist (CSS)",
  ],
  memberships: [
    "ASIS International",
    "Nigerian Institute for Industrial Security (NIIS)",
    "AISSON",
  ],
  quote:
    "Our commitment is to develop competent, confident, and safety-conscious drivers through quality training, professional instruction, and a culture of responsibility.",
};

const Chairman = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#22c55e] text-xs font-semibold tracking-widest uppercase mb-3">
            Governance
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Meet our Chairman
          </h2>
        </div>

        <div className="bg-[#f8f9fc] rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-sm">
          {/* Photo — right on desktop, top on mobile */}
          <div className="relative w-full lg:w-2/5 h-80 sm:h-96 lg:h-auto shrink-0">
            <Image
              src={chairman.image}
              alt={chairman.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          {/* Text — left on desktop */}
          <div className="p-8 sm:p-10 flex flex-col flex-1">
            <h3 className="text-2xl font-bold text-gray-900 leading-tight">
              {chairman.name}
            </h3>
            <p className="text-sm text-[#22c55e] font-semibold mb-5">
              {chairman.role}
            </p>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {chairman.bio}
            </p>

            {chairman.education.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <FiBookOpen className="text-[#1a2d56] text-base" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                    Education
                  </h4>
                </div>
                <ul className="space-y-1">
                  {chairman.education.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-gray-500 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {chairman.certifications.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <FiAward className="text-[#1a2d56] text-base" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                    Certifications
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {chairman.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="text-xs font-medium bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {chairman.memberships.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <FiUsers className="text-[#1a2d56] text-base" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                    Professional Memberships
                  </h4>
                </div>
                <ul className="space-y-1">
                  {chairman.memberships.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-gray-500 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto pt-5 border-t border-gray-200">
              <p className="text-sm text-gray-700 italic leading-relaxed">
                &ldquo;{chairman.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chairman;

import Image from "next/image";
import { FiBookOpen, FiAward, FiUsers } from "react-icons/fi";

const leaders = [
  {
    image: "/thechairman.jpg",
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
  },
  {
    image: "/thechairman.jpg",
    name: "Mrs. Ibingo Sobere Barango",
    role: "Chief Executive Officer, So-Track Driving School Ltd",
    bio: "Since founding the company in 2015, Mrs. Barango has provided visionary leadership driving its growth, reputation, and commitment to excellence in driver education. With over a decade of leadership and management experience, she oversees strategic direction, operational planning, customer service, instructor coordination, client relations, and regulatory compliance. She began her career during NYSC as a teacher at Community Secondary School, Alode, Eleme, and also leads Goodngo Food and Investment Limited.",
    education: [
      "B.Sc. (Hons.) Banking and Finance - Rivers State University, Port Harcourt",
    ],
    certifications: [],
    memberships: [],
    focusAreas: [
      "Delivering exceptional customer service",
      "Maintaining operational excellence",
      "Promoting road safety",
      "Developing and empowering instructors",
    ],
    quote:
      "At So-Track Driving School, our mission is to equip every learner with the skills, confidence, and discipline needed to become a safe and responsible driver.",
  },
];

const Leadership = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#22c55e] text-xs font-semibold tracking-widest uppercase mb-3">
            Leadership
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Meet the people behind So-Track
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="bg-[#f8f9fc] rounded-3xl overflow-hidden flex flex-col shadow-sm"
            >
              {/* Big photo banner */}
              <div className="relative w-full h-80 sm:h-96 shrink-0">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Gradient + name overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {leader.name}
                  </h3>
                  <p className="text-sm text-[#4ade80] font-semibold">
                    {leader.role}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                {/* Bio */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {leader.bio}
                </p>

                {/* Education */}
                {leader.education.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FiBookOpen className="text-[#1a2d56] text-base" />
                      <h4 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                        Education
                      </h4>
                    </div>
                    <ul className="space-y-1">
                      {leader.education.map((item) => (
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

                {/* Certifications */}
                {leader.certifications.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FiAward className="text-[#1a2d56] text-base" />
                      <h4 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                        Certifications
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {leader.certifications.map((cert) => (
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

                {/* Memberships */}
                {leader.memberships.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FiUsers className="text-[#1a2d56] text-base" />
                      <h4 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                        Professional Memberships
                      </h4>
                    </div>
                    <ul className="space-y-1">
                      {leader.memberships.map((item) => (
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

                {/* Focus Areas (CEO only) */}
                {leader.focusAreas && (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FiUsers className="text-[#1a2d56] text-base" />
                      <h4 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                        Key Focus Areas
                      </h4>
                    </div>
                    <ul className="space-y-1">
                      {leader.focusAreas.map((item) => (
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

                {/* Quote */}
                <div className="mt-auto pt-5 border-t border-gray-200">
                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    &ldquo;{leader.quote}&rdquo;
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

export default Leadership;

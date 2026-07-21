import Image from "next/image";
import { FiBookOpen, FiUsers } from "react-icons/fi";

const ceo = {
  image: "/ceo.png",
  name: "Mrs. Ibingo Sobere Barango",
  role: "Chief Executive Officer, So-Track Driving School Ltd",
  bio: "Since founding the company in 2015, Mrs. Barango has provided visionary leadership driving its growth, reputation, and commitment to excellence in driver education. With over a decade of leadership and management experience, she oversees strategic direction, operational planning, customer service, instructor coordination, client relations, and regulatory compliance. She began her career during NYSC as a teacher at Community Secondary School, Alode, Eleme, and also leads Goodngo Food and Investment Limited.",
  education: [
    "B.Sc. (Hons.) Banking and Finance - Rivers State University, Port Harcourt",
  ],
  focusAreas: [
    "Delivering exceptional customer service",
    "Maintaining operational excellence",
    "Promoting road safety",
    "Developing and empowering instructors",
  ],
  quote:
    "At So-Track Driving School, our mission is to equip every learner with the skills, confidence, and discipline needed to become a safe and responsible driver.",
};

const CEO = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#22c55e] text-xs font-semibold tracking-widest uppercase mb-3">
            Executive Office
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Meet our CEO
          </h2>
        </div>

        <div className="bg-[#f8f9fc] rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-sm">
          {/* Photo — right on desktop, top on mobile */}
          <div className="relative w-full lg:w-2/5 h-80 sm:h-96 lg:h-auto shrink-0">
            <Image
              src={ceo.image}
              alt={ceo.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          {/* Text — left on desktop */}
          <div className="p-8 sm:p-10 flex flex-col flex-1">
            <h3 className="text-2xl font-bold text-gray-900 leading-tight">
              {ceo.name}
            </h3>
            <p className="text-sm text-[#22c55e] font-semibold mb-5">
              {ceo.role}
            </p>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {ceo.bio}
            </p>

            {ceo.education.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <FiBookOpen className="text-[#1a2d56] text-base" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                    Education
                  </h4>
                </div>
                <ul className="space-y-1">
                  {ceo.education.map((item) => (
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

            {ceo.focusAreas.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <FiUsers className="text-[#1a2d56] text-base" />
                  <h4 className="text-xs font-bold uppercase tracking-wide text-gray-800">
                    Key Focus Areas
                  </h4>
                </div>
                <ul className="space-y-1">
                  {ceo.focusAreas.map((item) => (
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
                &ldquo;{ceo.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEO;

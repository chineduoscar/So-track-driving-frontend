import { FiTarget, FiEye } from "react-icons/fi";

const MissionVision = () => {
  return (
    <section className="bg-[#f8f9fc] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-0">
          {/* Center divider on desktop */}
          <div className="hidden lg:block absolute top-2 bottom-2 left-1/2 w-px bg-gray-300" />

          {/* Mission */}
          <div className="flex flex-col items-start lg:pr-14">
            <FiTarget className="text-[#1a2d56] text-4xl mb-5" />

            <p className="text-[#22c55e] text-xs font-semibold tracking-widest uppercase mb-2">
              Our Mission
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-snug">
              Building confident,
              <span className="text-[#1a2d56]"> safe drivers</span> every day
            </h2>

            <p className="text-gray-500 text-base leading-relaxed">
              To provide quality driver training and road safety education that
              equips every student with the skills and confidence to drive
              responsibly.
            </p>
          </div>

          {/* Vision */}
          <div className="flex flex-col items-start lg:pl-14">
            <FiEye className="text-[#22c55e] text-4xl mb-5" />

            <p className="text-[#1a2d56] text-xs font-semibold tracking-widest uppercase mb-2">
              Our Vision
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-snug">
              Creating <span className="text-[#22c55e]">safer roads</span> for
              everyone
            </h2>

            <p className="text-gray-500 text-base leading-relaxed">
              To be a trusted driving school known for developing skilled,
              responsible, and safety-conscious drivers across Nigeria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;

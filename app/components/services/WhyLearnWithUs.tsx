import { FiClock, FiCreditCard, FiAward } from "react-icons/fi";
import { TbSteeringWheel } from "react-icons/tb";

const benefits = [
  {
    icon: TbSteeringWheel,
    title: "Practical Classes",
    desc: "Hands-on, road-ready training with real driving time in every session.",
  },
  {
    icon: FiClock,
    title: "Flexible Times",
    desc: "Evening and weekend slots that work around your schedule.",
  },
  {
    icon: FiCreditCard,
    title: "Transparent Pricing",
    desc: "Clear lesson packages with no hidden fees or surprises.",
  },
  {
    icon: FiAward,
    title: "Proven Results",
    desc: "94% of our students pass their test on the first attempt.",
  },
];

const WhyLearnWithUs = () => {
  return (
    <section className="bg-[#f8f9fc] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#00a057] text-xs font-bold uppercase tracking-widest mb-3">
            Why Learn With Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            The benefits of every lesson
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <div className="w-11 h-11 rounded-xl bg-[#333992] flex items-center justify-center mb-5">
                <Icon className="text-white" size={18} />
              </div>
              <h3 className="font-extrabold text-gray-900 text-base mb-2">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearnWithUs;

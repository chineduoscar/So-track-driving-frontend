"use client";

import Image from "next/image";

const vehicles = [
  {
    image: "/automatic-car.png",
    badge: "Most Popular",
    title: "Automatic Driving Lessons",
    desc: "Learn to drive confidently in modern automatic vehicles. Ideal for beginners looking for a simpler and more comfortable driving experience.",
  },
  {
    image: "/manual-car.png",
    badge: "Full Training",
    title: "Manual Driving Lessons",
    desc: "Master manual transmission driving and gain complete vehicle control with hands-on practical training from certified instructors.",
  },
];

const TrainingVehicles = () => {
  return (
    <section className="bg-[#f8f9fc] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[#00a057] text-xs font-bold uppercase tracking-widest mb-3">
            Our Training Programs
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Learn with automatic or manual vehicles
          </h2>

          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            Choose the training option that suits you best and learn from
            experienced instructors using well-maintained vehicles.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.title}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-300 border border-gray-100 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden bg-gray-100">
                <Image
                  src={vehicle.image}
                  alt={vehicle.title}
                  height={500}
                  width={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <span className="absolute top-4 left-4 bg-[#333992] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow">
                  {vehicle.badge}
                </span>
              </div>

              {/* Content */}
              <div className="px-6 py-6 flex flex-col flex-1">
                <h3 className="font-extrabold text-gray-900 text-lg mb-2">
                  {vehicle.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {vehicle.desc}
                </p>

                {/* CTA */}
                <div className="mt-auto">
                  <a
                    href="#find-branch"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#00a057] hover:gap-3 transition-all duration-150"
                  >
                    Enrol Now
                    <span className="text-base">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingVehicles;

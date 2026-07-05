"use client";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

const About = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* ── LEFT: Dual Image Cluster ── */}
          <div className="relative w-full lg:w-115 h-95 shrink-0">
            {/* Main image — back, tilted left */}
            <div className="absolute top-0 left-0 w-75 h-85 rounded-[28px] overflow-hidden shadow-xl rotate-[-4deg] z-1">
              <Image
                width={500}
                height={350}
                src="/aboutImg.jpg"
                alt="Driving instructor with student"
                className="w-full h-full object-cover bg-white"
              />
            </div>

            {/* Secondary image — front, tilted right */}
            <div className="absolute bottom-0 right-0 w-60 h-70 rounded-[28px] overflow-hidden shadow-xl rotate-[5deg] z-2 border-4 border-white">
              <Image
                width={240}
                height={280}
                src="/aboutImg2.jpg"
                alt="Student behind the wheel"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating stat badge — sits between the two images */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-3 bg-[#333992] text-white rounded-full px-5 py-3 text-center border-[3px] border-white whitespace-nowrap shadow-lg">
              <p className="text-xl font-extrabold leading-none">3,000+</p>
              <p className="text-[11px] text-blue-100 mt-1">Students taught</p>
            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div className="flex-1">
            <p className="text-[#00a057] text-xs font-bold uppercase tracking-widest mb-3">
              About Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
              Building Safe and Confident Drivers
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              So-Track Driving School is one of Port Harcourt&apos;s most
              trusted driving schools. Our training is thorough, professional,
              and designed to build real confidence behind the wheel.
            </p>

            {/* Feature list */}
            <ul className="space-y-3 mb-8">
              {[
                "Professional and certified instructors with years of experience",
                "Flexible scheduling tailored to your availability",
                "Theory and practical training included in every course",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <FiCheckCircle className="text-[#00a057] shrink-0" />
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>

            <Link
              href={"/about"}
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#333992] hover:opacity-80 text-white font-semibold text-sm transition-opacity duration-200 shadow-lg"
            >
              Read more
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

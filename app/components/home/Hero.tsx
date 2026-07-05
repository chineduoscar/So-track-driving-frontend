"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { FiCheckCircle } from "react-icons/fi";

const rules = [
  {
    title: "Always Fasten Your Seatbelt",
    desc: "Both driver and passengers should wear seatbelts before the vehicle moves. It is required by law and can save lives during accidents.",
  },
  {
    title: "Respect FRSC Traffic Rules",
    desc: "Obey traffic signs, road markings, and speed limits. Violations can lead to fines, penalties, or license suspension.",
  },
  {
    title: "Avoid Using Your Phone While Driving",
    desc: "Calls, texting, and social media can distract you from the road. Pull over safely if you need to use your phone.",
  },
  {
    title: "Watch Out for Motorcycles and Tricycles",
    desc: "Always check your mirrors and blind spots. Motorcycles and tricycles can appear suddenly from either side.",
  },
  {
    title: "Drive Carefully During Rainy Season",
    desc: "Wet roads reduce tire grip and visibility. Slow down, increase following distance, and use your headlights when necessary.",
  },
  {
    title: "Be Alert Around Markets and Schools",
    desc: "Pedestrians may cross unexpectedly. Reduce speed and stay attentive in busy areas, especially during peak hours.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number, dir: "left" | "right") => {
      if (animating) return;
      setAnimDir(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 250);
    },
    [animating],
  );

  const next = useCallback(
    () => goTo((current + 1) % rules.length, "right"),
    [goTo, current],
  );

  const prev = useCallback(
    () => goTo((current - 1 + rules.length) % rules.length, "left"),
    [goTo, current],
  );

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % rules.length, "right");
    }, 4000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, goTo]);

  const rule = rules[current];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/mobile-heroImage.jpg')] md:bg-[url('/heroImage.jpg')] bg-cover bg-center bg-no-repeat" />

      <div className="absolute inset-0 bg-linear-to-r from-[#040222]/70 via-[#040222]/75 to-[#040222]/90" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── LEFT ── */}
          <div className="flex-1 text-white">
            <div className="inline-flex items-center gap-2 bg-[#0f17121a] backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-[#00a057] text-sm">★</span>
              <span className="text-sm font-medium text-white">
                4.7 / 5 Google Rating
              </span>
            </div>
            <h1 className="text-3xl sm:text-[54px] font-extrabold leading-tight mb-5 tracking-tight">
              Learn to Drive with Confidence
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-md">
              Friendly, certified instructors. Flexible scheduling. Find your
              nearest location and book your first driving lesson in minutes.
            </p>

            <div className="flex gap-3 mb-8">
              <a
                href="#find-branch"
                className="px-6 py-3 rounded-full bg-[#333992] hover:bg-[#222765] text-white font-semibold text-sm transition-colors duration-200 shadow-lg"
              >
                Get started
              </a>

              <Link
                href={"/contact"}
                className="px-6 py-3 rounded-full border-2 border-white text-white font-semibold text-sm hover:bg-white hover:text-gray-900 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>

            <div className="flex flex-wrap gap-5">
              {["94% first-time pass rate", "Certified instructors"].map(
                (f) => (
                  <span
                    key={f}
                    className="flex items-center gap-2 text-sm font-bold text-white"
                  >
                    <FiCheckCircle className="text-sm text-[#00a057]" />
                    {f}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* ── RIGHT: Single Rule Slideshow ── */}
          <div className="w-full lg:w-95 shrink-0">
            <div className="bg-gray-300/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl">
              {/* Badge */}
              <div className="mb-5">
                <span className="bg-[#333992] text-white text-xs font-bold px-3 py-2 rounded-full uppercase tracking-wide">
                  Know Before You Go
                </span>
              </div>

              <h2 className="text-white text-xl font-bold mb-1">
                Essential Driving Rules
              </h2>
              <p className="text-white/60 text-sm mb-6">
                Rule {current + 1} of {rules.length}
              </p>

              {/* Slide */}
              <div
                className="min-h-40 flex flex-col justify-center"
                style={{
                  animation: animating
                    ? `slideOut${animDir === "right" ? "Left" : "Right"} 0.25s ease forwards`
                    : `slideIn${animDir === "right" ? "Right" : "Left"} 0.25s ease forwards`,
                }}
              >
                <style>{`
                  @keyframes slideOutLeft  { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(-30px); } }
                  @keyframes slideOutRight { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(30px); } }
                  @keyframes slideInRight  { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }
                  @keyframes slideInLeft   { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }
                `}</style>

                <div className="bg-gray-200/5 border border-white/10 rounded-xl px-5 py-5">
                  <h3 className="text-white font-bold text-lg mb-2">
                    {rule.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                  aria-label="Previous rule"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  {rules.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i, i > current ? "right" : "left")}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === current ? "20px" : "8px",
                        height: "8px",
                        backgroundColor:
                          i === current ? "#333992" : "rgba(255,255,255,0.3)",
                      }}
                      aria-label={`Go to rule ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                  aria-label="Next rule"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

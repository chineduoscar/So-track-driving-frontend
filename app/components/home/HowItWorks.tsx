const steps = [
  {
    number: "01",
    title: "Select Location",
    desc: "Find the So-track zone closest to you and choose your preferred training centre.",
  },
  {
    number: "02",
    title: "Make Payment",
    desc: "Complete your payment online to confirm your enrolment.",
  },
  {
    number: "03",
    title: "Fill Details",
    desc: "Provide your personal information after online payment.",
  },
  {
    number: "04",
    title: "We Contact You",
    desc: "Our team will get in touch to confirm your registration, and guide you on the next steps.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#f8f9fc] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#00a057] text-xs font-bold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Get driving in four simple steps
          </h2>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between gap-10 sm:gap-4">
          {/* Connector line (desktop only) */}
          <div className="hidden sm:block absolute top-10 left-[12%] right-[12%] h-px border-t-2 border-dashed border-gray-200 z-0" />

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative z-10 flex flex-col items-center text-center w-full sm:w-1/4"
            >
              {/* Circle */}
              <div className="w-20 h-20 rounded-full border-2 border-[#00a057] bg-white flex flex-col items-center justify-center mb-5 shadow-sm">
                <span className="text-[#00a057] text-xs font-bold tracking-widest">
                  {step.number}
                </span>
              </div>

              {/* Text */}
              <h3 className="font-extrabold text-gray-900 text-sm mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed max-w-40">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <a
            href="#find-zone"
            className="px-8 py-3 rounded-full bg-[#333992] hover:opacity-90 text-white text-sm font-semibold transition-opacity duration-200 shadow"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

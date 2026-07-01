const ServicesCTA = () => {
  return (
    <section className="bg-[#f8f9fc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-[#1a2f5e] rounded-3xl py-14 text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Not sure which lesson is right for you?
        </h2>
        <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto mb-8">
          Talk to our team and we&apos;ll recommend the perfect programme for
          your goals.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="#"
            className="px-6 py-2.5 rounded-lg bg-[#22c55e] hover:opacity-90 text-white text-sm font-semibold transition-opacity duration-200 shadow"
          >
            Contact Us
          </a>
          <a
            href="#"
            className="px-6 py-2.5 rounded-lg border border-white/30 hover:bg-white/10 text-white text-sm font-semibold transition-colors duration-200"
          >
            Find A Location
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;

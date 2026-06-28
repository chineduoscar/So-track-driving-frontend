const CTA = () => {
  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-[#1a2f5e] rounded-3xl py-14 text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Ready To Start Your Driving Journey?
        </h2>
        <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto mb-8">
          Join thousands of confident drivers who started right here. Book your
          first lesson today.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="#"
            className="px-6 py-2.5 rounded-lg bg-[#00a057] hover:opacity-90 text-white text-sm font-semibold transition-opacity duration-200 shadow"
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

export default CTA;

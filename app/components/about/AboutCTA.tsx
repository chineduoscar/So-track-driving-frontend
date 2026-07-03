import Link from "next/link";

const AboutCTA = () => {
  return (
    <section className="bg-[#f8f9fc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-[#1a2f5e] rounded-3xl py-14 text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Want to learn with our team?
        </h2>
        <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto mb-8">
          Book your first lesson and meet an instructor who&apos;ll get you
          driving with confidence.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-lg bg-[#22c55e] hover:opacity-90 text-white text-sm font-semibold transition-opacity duration-200 shadow"
          >
            Contact Us
          </Link>
          <Link
            href="/location"
            className="px-6 py-2.5 rounded-lg border border-white/30 hover:bg-white/10 text-white text-sm font-semibold transition-colors duration-200"
          >
            Find A Location
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;

const LocationHero = ({
  locationName = "Downtown",
}: {
  locationName?: string;
}) => {
  return (
    <section className="bg-[#1a2d56] py-24 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <span className="inline-block bg-white/10 text-white text-[10px] sm:text-xs tracking-wider uppercase rounded-full px-4 py-1.5 mb-6">
          Location
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
          {locationName} Driving School
        </h1>

        <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Your trusted driving school in {locationName}, helping local drivers
          hit the road with confidence.
        </p>
      </div>
    </section>
  );
};

export default LocationHero;

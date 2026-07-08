"use client";

import { useEffect, useState } from "react";
import { FiMapPin, FiPhone, FiTag, FiArrowRight } from "react-icons/fi";
import { getAllZones } from "../../services/zone.servies";
import { useRouter } from "next/navigation";
import ZoneSearch from "../../components/location/LocationSearch";

interface Zone {
  id: number;
  name: string;
  lga: string;
  price: number;
  locations: string[];
  phoneNumber: string;
}

const AllLocations = () => {
  const [query, setQuery] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadZones = async () => {
      try {
        const data = await getAllZones();
        setZones(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadZones();
  }, []);

  const handleSearchChange = (newQuery: string, zoneId: number | null) => {
    setQuery(newQuery);
    setSelectedZoneId(zoneId);
  };

  const filteredZones = selectedZoneId
    ? zones.filter((zone) => zone.id === selectedZoneId)
    : zones.filter((zone) => {
        const search = query.toLowerCase();

        return (
          zone.name.toLowerCase().includes(search) ||
          zone.lga.toLowerCase().includes(search) ||
          zone.locations.some((location) =>
            location.toLowerCase().includes(search),
          )
        );
      });

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-[#333992] text-xs font-bold uppercase tracking-widest mb-3">
            All Zones
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Find a So-track zone near you
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            {zones.length} training centres across Port Harcourt. Search by area
            to find the zone closest to you.
          </p>
        </div>

        {/* Search */}
        <ZoneSearch onSearchChange={handleSearchChange} />

        {loading ? (
          <div className="text-center py-14 text-gray-500 text-sm">
            Loading zones...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredZones.map((zone) => (
              <div
                key={zone.id}
                className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-[#00a057]/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="mb-5">
                  <h3 className="flex items-center gap-1.5 text-xl text-gray-900 leading-snug mb-3">
                    <span className="font-bold">{zone.name}</span>
                    <span className="text-gray-400 font-medium">/</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-gray-400">
                      <FiMapPin size={13} />
                      {zone.lga}
                    </span>
                  </h3>

                  <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    <span className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold uppercase tracking-wide">
                      <FiTag size={13} className="text-[#00a057]" />
                      Price
                    </span>
                    <span className="text-[#00a057] text-lg font-extrabold">
                      ₦{zone.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl p-4 bg-gray-50 mb-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Covered Locations
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {zone.locations.map((location) => (
                      <span
                        key={location}
                        className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm text-gray-700"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-5">
                  <a
                    href={`tel:${zone.phoneNumber}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <FiPhone size={15} />
                    {zone.phoneNumber}
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/zones/${zone.id}`);
                    }}
                    className="group flex items-center gap-1.5 text-sm font-bold text-[#00a057] hover:text-[#008c4b] transition-colors cursor-pointer"
                  >
                    Book Now
                    <FiArrowRight
                      className="group-hover:translate-x-0.5 transition-transform"
                      size={15}
                    />
                  </button>
                </div>
              </div>
            ))}

            {query.trim() && filteredZones.length === 0 && (
              <div className="col-span-full text-center py-14 text-gray-500">
                No zone found for &ldquo;{query}&rdquo;.
                <br />
                <span className="text-sm">
                  Try searching for a popular location around you.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllLocations;

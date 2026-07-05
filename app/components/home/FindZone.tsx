"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMapPin, FiPhone, FiTag, FiArrowRight } from "react-icons/fi";
import { zones } from "../../data/zones";
import ZoneSearch from "../location/LocationSearch";
import { useRouter } from "next/navigation";

const FindZone = () => {
  const [query, setQuery] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const router = useRouter();

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

  const displayedZones = query.trim()
    ? filteredZones.slice(0, 3)
    : zones.slice(0, 3);

  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8" id="find-zone">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 text-[#00a057] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Find Your Zone
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Find the nearest So-track zone
          </h2>

          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Search by area, neighbourhood, or zone name to find the closest
            training centre to you.
          </p>
        </div>

        {/* Search */}
        <ZoneSearch onSearchChange={handleSearchChange} />

        {/* Zone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedZones.map((zone) => (
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

        {/* See all zones */}
        <div className="flex justify-center mt-12">
          <Link
            href="/zones"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white border border-gray-300 px-6 py-3 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            View all locations
            <FiArrowRight
              className="group-hover:translate-x-0.5 transition-transform"
              size={16}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FindZone;

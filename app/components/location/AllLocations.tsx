"use client";
import { useState } from "react";
import { FiSearch, FiMapPin, FiPhone } from "react-icons/fi";

const locations = [
  {
    name: "SO-TRACK Mile 3",
    address: "Mile 3, Port Harcourt",
    phone: "08074627327",
  },
  {
    name: "SO-TRACK Choba",
    address: "Choba, Port Harcourt",
    phone: "08074627327",
  },
  {
    name: "SO-TRACK Rumuokoro",
    address: "Rumuokoro, Port Harcourt",
    phone: "08074627327",
  },
  {
    name: "SO-TRACK Ada George",
    address: "Ada George, Port Harcourt",
    phone: "08074627327",
  },
  {
    name: "SO-TRACK Woji",
    address: "Woji, Port Harcourt",
    phone: "08074627327",
  },
  {
    name: "SO-TRACK Eliozu",
    address: "Eliozu, Port Harcourt",
    phone: "08074627327",
  },
  {
    name: "SO-TRACK GRA",
    address: "GRA Phase 2, Port Harcourt",
    phone: "08074627327",
  },
  {
    name: "SO-TRACK Trans Amadi",
    address: "Trans Amadi, Port Harcourt",
    phone: "08074627327",
  },
  {
    name: "SO-TRACK Borokiri",
    address: "Borokiri, Port Harcourt",
    phone: "08074627327",
  },
];

const AllLocations = () => {
  const [query, setQuery] = useState("");

  const filtered = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.address.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-[#333992] text-xs font-bold uppercase tracking-widest mb-3">
            All Branches
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Find a So-track branch near you
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            {locations.length} training centres across Port Harcourt. Search by
            area to find the branch closest to you.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-3 shadow-sm">
            <FiSearch className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city or neighbourhood..."
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((loc) => (
            <div
              key={loc.name}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                {loc.name}
              </h3>

              <p className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                <FiMapPin className="text-[#00a057] shrink-0" />
                {loc.address}
              </p>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <a
                  href={`tel:${loc.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FiPhone />
                  {loc.phone}
                </a>

                <button className="text-[#00a057] font-semibold text-sm hover:underline">
                  Book Now →
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-400 text-sm py-10">
              No locations found for &quot;{query}&quot;.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllLocations;

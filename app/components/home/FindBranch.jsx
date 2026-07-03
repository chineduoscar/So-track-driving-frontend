"use client";
import { useState } from "react";
import { FiSearch, FiMapPin, FiPhone } from "react-icons/fi";

const locations = [
  {
    name: "SO-TRACK Mile 3",
    address: "Mile 3, Port Harcourt",
    phone: "08074627327",
    price: "₦45,000",
  },
  {
    name: "SO-TRACK Choba",
    address: "Choba, Port Harcourt",
    phone: "08074627327",
    price: "₦45,000",
  },
  {
    name: "SO-TRACK Rumuokoro",
    address: "Rumuokoro, Port Harcourt",
    phone: "08074627327",
    price: "₦45,000",
  },
  {
    name: "SO-TRACK Ada George",
    address: "Ada George, Port Harcourt",
    phone: "08074627327",
    price: "₦45,000",
  },
  {
    name: "SO-TRACK Woji",
    address: "Woji, Port Harcourt",
    phone: "08074627327",
    price: "₦45,000",
  },
  {
    name: "SO-TRACK Eliozu",
    address: "Eliozu, Port Harcourt",
    phone: "08074627327",
    price: "₦45,000",
  },
  {
    name: "SO-TRACK GRA",
    address: "GRA Phase 2, Port Harcourt",
    phone: "08074627327",
    price: "₦45,000",
  },
  {
    name: "SO-TRACK Trans Amadi",
    address: "Trans Amadi, Port Harcourt",
    phone: "08074627327",
    price: "₦45,000",
  },
  {
    name: "SO-TRACK Borokiri",
    address: "Borokiri, Port Harcourt",
    phone: "08074627327",
    price: "₦45,000",
  },
];

const FindBranch = () => {
  const [query, setQuery] = useState("");

  const filtered = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.address.toLowerCase().includes(query.toLowerCase()),
  );

  const displayedLocations = query.trim() ? filtered : locations.slice(0, 3);

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8" id="find-branch">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-[#00a057] text-xs font-bold uppercase tracking-widest mb-3">
            Find Your Branch
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Find the nearest So-track branch
          </h2>
          <p className="text-gray-500 text-sm">
            We have multiple training centres across Port Harcourt. Search by
            area to find the branch closest to you.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2 max-w-lg mx-auto mb-12">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 shadow-sm">
            <FiSearch className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city or neighbourhood..."
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
          <button className="px-5 py-2.5 bg-[#333992] hover:opacity-90 text-white text-sm font-semibold rounded-lg transition-opacity duration-200 shadow-sm">
            Search
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {displayedLocations.map((loc) => (
            <div
              key={loc.name}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                {loc.name}
              </h3>

              <p className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <FiMapPin className="text-[#00a057] shrink-0" />
                {loc.address}
              </p>

              <p className="text-sm text-gray-900 font-bold mb-5">
                {loc.price}{" "}
                <span className="text-gray-400 font-normal text-xs">
                  full course
                </span>
              </p>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <a
                  href={`tel:${loc.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FiPhone />
                  {loc.phone}
                </a>

                <button className="text-[#00a057] font-semibold text-sm hover:underline cursor-pointer">
                  Book Now →
                </button>
              </div>
            </div>
          ))}

          {query.trim() && filtered.length === 0 && (
            <p className="col-span-3 text-center text-gray-400 text-sm py-10">
              No locations found for {query}.
            </p>
          )}
        </div>

        {/* View all */}
        <div className="flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-6 py-2.5 rounded-full transition-colors duration-150"
          >
            View all locations →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FindBranch;

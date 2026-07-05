"use client";

import { useState, useRef, useEffect } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { areaToZone } from "../../data/phAreas";

interface ZoneSearchProps {
  onSearchChange: (query: string, zoneId: number | null) => void;
}

const ZoneSearch = ({ onSearchChange }: ZoneSearchProps) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const areaNames = Object.keys(areaToZone);

  const suggestions = query.trim()
    ? areaNames
        .filter((area) => area.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8)
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (area: string) => {
    setQuery(area);
    setShowSuggestions(false);
    setActiveIndex(-1);

    // Only lock onto a zone if this area actually has a known mapping
    const zoneId = areaToZone[area as keyof typeof areaToZone];

    if (zoneId !== undefined) {
      onSearchChange(area, zoneId);
    } else {
      onSearchChange(area, null);
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    setShowSuggestions(true);
    setActiveIndex(-1);

    const matchedArea = areaNames.find(
      (area) => area.toLowerCase() === value.trim().toLowerCase(),
    );

    if (matchedArea) {
      const zoneId = areaToZone[matchedArea as keyof typeof areaToZone];
      onSearchChange(value, zoneId);
    } else {
      onSearchChange(value, null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mb-14 relative" ref={wrapperRef}>
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm focus-within:border-[#00a057] focus-within:ring-2 focus-within:ring-[#00a057]/15 transition">
        <FiSearch className="text-gray-400 shrink-0" size={18} />

        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (query.trim()) setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search by area, zone or LGA..."
          className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          autoComplete="off"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden py-2">
          {suggestions.map((area, index) => (
            <li key={area}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelectSuggestion(area)}
                className={`w-full flex items-center gap-2.5 px-5 py-2.5 text-sm text-left transition-colors ${
                  index === activeIndex
                    ? "bg-green-50 text-[#00a057]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FiMapPin
                  size={14}
                  className={
                    index === activeIndex ? "text-[#00a057]" : "text-gray-400"
                  }
                />
                <span>{area}</span>
                <span className="ml-auto text-xs text-gray-400">
                  Zone {areaToZone[area as keyof typeof areaToZone]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ZoneSearch;

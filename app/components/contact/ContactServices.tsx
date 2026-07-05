"use client";
import { useState } from "react";

const zones = [
  "Mile 3",
  "Choba",
  "Rumuokoro",
  "Ada George",
  "Woji",
  "Eliozu",
  "GRA Phase 2",
  "Trans Amadi",
  "Borokiri",
];

const services = [
  "Beginner Lessons",
  "Refresher Course",
  "Defensive Driving",
  "Highway Code Test Prep",
];

const OPENING_HOURS = [
  {
    day: "Monday - Friday",
    time: "7:00 AM - 6:00 PM",
  },
  {
    day: "Saturday",
    time: "9:00 AM - 4:00 PM",
  },
  {
    day: "Sunday",
    time: "Closed",
  },
];

const ContactSection = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    zone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // wire up to your booking endpoint here
    console.log(form);
  };

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Form card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-6">
            Send us a message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#333992]/30 focus:border-[#333992] placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="08012345678"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#333992]/30 focus:border-[#333992] placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@email.com"
                className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#333992]/30 focus:border-[#333992] placeholder-gray-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Preferred location
                </label>
                <select
                  name="zone"
                  value={form.zone}
                  onChange={handleChange}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#333992]/30 focus:border-[#333992] text-gray-500 bg-white"
                >
                  <option value="">Select a zone</option>
                  {zones.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Service
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#333992]/30 focus:border-[#333992] text-gray-500 bg-white"
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us when you'd like to start..."
                className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#333992]/30 focus:border-[#333992] placeholder-gray-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#333992] hover:opacity-90 text-white text-sm font-semibold rounded-full py-3.5 transition-opacity duration-200 cursor-pointer"
            >
              Book My Lesson
            </button>
          </form>
        </div>

        {/* Sidebar: live map + hours */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-48">
            <iframe
              title="SO-TRACK Driving School location"
              src="https://www.google.com/maps?q=SO-TRACK+Driving+School,4.7994059,7.0510359&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="text-center -mt-2">
            <a
              href="https://maps.app.goo.gl/DjiBpGeKdDkmY2FW8"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-[#333992] hover:underline cursor-pointer"
            >
              Open in Google Maps →
            </a>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Operating hours</h3>
            <div className="space-y-2.5 text-sm">
              {OPENING_HOURS.map(({ day, time }) => (
                <div key={day} className="flex justify-between">
                  <span className="text-gray-500">{day}</span>
                  <span className="text-gray-800 font-medium">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

"use client";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const SOCIAL_LINKS = [
  {
    icon: <FaFacebookF />,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61572962137338&sk=directory_contact_info",
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    href: "https://www.instagram.com/sotrackdrivingschool/",
  },
  {
    icon: <SiTiktok />,
    label: "TikTok",
    href: "https://www.tiktok.com/@sotrackdrivingschool",
  },
];

const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our Branches", href: "/locations" },
  { name: "Contact", href: "/contact" },
];

const CONTACT_INFO = [
  {
    icon: <FiPhone className="text-[#00a057]" />,
    text: "08037466270",
    href: "tel:08037466270",
  },
  {
    icon: <FiMail className="text-[#00a057]" />,
    text: "sotrackdrivingschool@gmail.com",
    href: "mailto:sotrackdrivingschool@gmail.com",
  },
  {
    icon: <FiMapPin className="text-[#00a057]" />,
    text: "Port Harcourt, Rivers State",
    href: "https://maps.app.goo.gl/DjiBpGeKdDkmY2FW8",
  },
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

const Footer = () => {
  return (
    <footer className="bg-[#0d1b2a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 shrink-0 p-2">
              <Image
                src="/logo.png"
                alt="SO-TRACK Logo"
                className="h-15 w-27"
                loading="eager"
                width={200}
                height={100}
              />
            </Link>

            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-60">
              Government-approved driving school in Port Harcourt providing
              professional driving lessons, driver&apos;s license processing,
              vehicle licensing, and renewal services.
            </p>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-[#333992] hover:border-[#333992] flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 text-sm"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/65 hover:text-white text-sm transition-colors duration-150"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Contact
            </h4>

            <ul className="space-y-4">
              {CONTACT_INFO.map(({ icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-white/65 hover:text-white text-sm transition-colors duration-150"
                  >
                    <span className="text-base shrink-0">{icon}</span>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Opening Hours
            </h4>

            <ul className="space-y-2 text-sm text-white/65">
              {OPENING_HOURS.map((item) => (
                <li key={item.day} className="flex justify-between gap-4">
                  <span>{item.day}</span>
                  <span
                    className={
                      item.time === "Closed" ? "text-white/40" : "text-white/90"
                    }
                  >
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>
            © {new Date().getFullYear()} SO-TRACK Driving School. All rights
            reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="/privacy-policy"
              className="hover:text-white/70 transition-colors duration-150"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-of-service"
              className="hover:text-white/70 transition-colors duration-150"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";
import { FiPhone, FiMessageCircle, FiMail, FiClock } from "react-icons/fi";

const contactItems = [
  {
    icon: FiPhone,
    label: "Call Us",
    value: "08037466270",
    href: "tel:08037466270",
  },
  {
    icon: FiMessageCircle,
    label: "WhatsApp",
    value: "08037466270",
    href: "https://wa.me/2348037466270",
  },
  {
    icon: FiMail,
    label: "Email",
    value: "sotrackdrivingschool@gmail.com",
    href: "mailto:sotrackdrivingschool@gmail.com",
  },
  {
    icon: FiClock,
    label: "Hours",
    value: "Mon - Fri: 7AM - 6PM",
    href: undefined,
  },
];

const ContactInfo = () => {
  return (
    <section className="bg-gray-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {contactItems.map(({ icon: Icon, label, value, href }) => {
          const content = (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 h-full min-w-0 overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-[#333992] flex items-center justify-center mb-4">
                <Icon className="text-white" size={18} />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                {label}
              </p>
              <p className="text-sm font-semibold text-gray-800 wrap-break-word">
                {value}
              </p>
            </div>
          );

          return href ? (
            <a key={label} href={href} className="block">
              {content}
            </a>
          ) : (
            <div key={label}>{content}</div>
          );
        })}
      </div>
    </section>
  );
};

export default ContactInfo;

import {
  FiAward,
  FiFileText,
  FiShield,
  FiUser,
  FiCreditCard,
  FiRefreshCw,
} from "react-icons/fi";

export interface ServiceModalData {
  icon: React.ElementType;
  title: string;
  desc: string;
  about: string;
  perks: string[];
}

const services: ServiceModalData[] = [
  {
    icon: FiAward,
    title: "Professional Driving Training",
    desc: "Learn from certified instructors...",
    about: "Our driving training programme...",
    perks: [
      "Certified instructors",
      "Structured curriculum",
      "Beginner to advanced",
    ],
  },
  {
    icon: FiFileText,
    title: "Vehicle Licensing & Renewal",
    desc: "We handle the full licensing process...",
    about: "Skip the queues and paperwork stress...",
    perks: ["Fresh registrations", "Renewal reminders", "Hassle-free process"],
  },
  {
    icon: FiShield,
    title: "Defensive Driving Training",
    desc: "Master advanced techniques...",
    about: "Go beyond the basics...",
    perks: [
      "Hazard perception",
      "All-weather driving",
      "Certificate of completion",
    ],
  },
  {
    icon: FiUser,
    title: "Provision of Expert Drivers",
    desc: "Need a reliable, professional driver?",
    about: "Whether you need a daily personal driver...",
    perks: [
      "Vetted professionals",
      "Corporate & personal",
      "Flexible availability",
    ],
  },
  {
    icon: FiCreditCard,
    title: "Driver's License Processing",
    desc: "We handle the FRSC documentation process...",
    about: "We handle the FRSC documentation process...",
    perks: ["Document preparation", "FRSC liaison", "Fast turnaround"],
  },
  {
    icon: FiRefreshCw,
    title: "Refresher Driving Lessons",
    desc: "Perfect for drivers who want to rebuild confidence...",
    about: "Our refresher driving lessons are designed...",
    perks: [
      "Confidence building",
      "Practical road training",
      "Flexible schedules",
    ],
  },
];

export default services;
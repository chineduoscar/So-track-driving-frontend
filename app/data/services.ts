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
    desc:
      "Comprehensive driving lessons designed to help learners gain the skills, confidence, and knowledge required to drive safely and responsibly.",
    about:
      "Our professional driving training programme combines classroom instruction with practical road experience. Whether you are a complete beginner or preparing for your driving test, our certified instructors provide personalized guidance to help you become a confident and responsible driver.",
    perks: [
      "Certified and experienced instructors",
      "Practical hands-on driving sessions",
      "Road safety and traffic law education",
    ],
  },
  {
    icon: FiFileText,
    title: "Vehicle Licensing & Renewal",
    desc:
      "Fast and reliable assistance with vehicle registration, licensing, and renewal processes to keep your documents up to date.",
    about:
      "We simplify the vehicle licensing process by handling the paperwork, documentation checks, and renewal procedures on your behalf. Our team ensures your vehicle remains legally compliant without the stress of navigating complex administrative requirements.",
    perks: [
      "Vehicle registration support",
      "Timely license renewals",
      "Accurate documentation processing",
    ],
  },
  {
    icon: FiShield,
    title: "Defensive Driving Training",
    desc:
      "Advanced driving instruction focused on hazard awareness, accident prevention, and safe decision-making on the road.",
    about:
      "Our defensive driving course equips drivers with the techniques needed to anticipate risks, respond effectively to dangerous situations, and maintain control in challenging driving conditions. It is ideal for both personal and corporate drivers seeking to improve safety standards.",
    perks: [
      "Hazard recognition skills",
      "Emergency response techniques",
      "Improved road safety awareness",
    ],
  },
  {
    icon: FiUser,
    title: "Provision of Expert Drivers",
    desc:
      "Access professionally trained and thoroughly vetted drivers for personal, corporate, or temporary transportation needs.",
    about:
      "We provide skilled drivers who meet high standards of professionalism, reliability, and road safety. Whether you require a personal chauffeur, corporate driver, or short-term driving support, we connect you with qualified personnel you can trust.",
    perks: [
      "Professionally trained drivers",
      "Background and qualification verification",
      "Flexible short and long-term engagements",
    ],
  },
  {
    icon: FiCreditCard,
    title: "Driver's License Processing",
    desc:
      "End-to-end support for obtaining, renewing, or replacing your driver's license with minimal hassle.",
    about:
      "Our team assists with every stage of the driver's license application process, from document preparation and verification to coordinating with the relevant authorities. We help ensure a smooth and efficient experience while reducing unnecessary delays.",
    perks: [
      "Application document guidance",
      "License renewal assistance",
      "Efficient processing support",
    ],
  },
  {
    icon: FiRefreshCw,
    title: "Refresher Driving Lessons",
    desc:
      "Tailored driving sessions for individuals looking to regain confidence, improve skills, or return to driving after a long break.",
    about:
      "Our refresher lessons are designed for licensed drivers who want to sharpen their driving abilities, overcome driving anxiety, or become more comfortable navigating modern traffic conditions. Lessons are customized to your experience level and goals.",
    perks: [
      "Confidence rebuilding sessions",
      "Personalized driving assessment",
      "Flexible lesson scheduling",
    ],
  },
];

export default services;
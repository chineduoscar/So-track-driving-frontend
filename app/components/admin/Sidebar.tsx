"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  FiHome,
  FiMail,
  FiUsers,
  FiCreditCard,
  FiLogOut,
  FiArrowLeft,
  FiMenu,
  FiX,
} from "react-icons/fi";
import api from "../../lib/axois";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/admin", icon: FiHome },
  { label: "Contact Messages", href: "/admin/contacts", icon: FiMail },
  { label: "Students", href: "/admin/students", icon: FiUsers },
  { label: "Payments", href: "/admin/payments", icon: FiCreditCard },
];

interface SidebarProps {
  user?: {
    fullName: string;
    email: string;
  };
}

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Lock body scroll while mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await api.post("/auth/logout");
      toast.success("Logged out successfully.");
      router.push("/admin-login");
    } catch {
      toast.error("Failed to logout. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  const initial = user?.fullName?.charAt(0).toUpperCase() || "A";

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
        <Image
          src="/logo.png"
          alt="SO-TRACK Logo"
          className="h-15 w-27"
          loading="eager"
          width={200}
          height={100}
        />

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-600 hover:text-[#333992] active:scale-95 transition"
            aria-label="Open menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[80%] max-w-xs transform flex-col border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out sm:w-72 md:static md:h-screen md:w-64 md:max-w-none md:translate-x-0 md:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5">
          <Image
            src="/logo.png"
            alt="SO-TRACK Logo"
            className="h-12 w-25"
            loading="eager"
            width={200}
            height={100}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-[#333992] active:scale-95 transition md:hidden"
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto px-3">
          <ul className="space-y-1">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#333992] text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-[#333992]"
                    }`}
                  >
                    <Icon size={18} className="shrink-0" />
                    <span className="truncate">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="space-y-3 border-t border-gray-200 px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-[#333992]"
          >
            <FiArrowLeft size={18} className="shrink-0" />
            <span className="truncate">Back to website</span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
          >
            <FiLogOut size={18} className="shrink-0" />
            <span className="truncate">
              {loggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>

          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#333992] text-sm font-semibold text-white">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-800">
                {user?.fullName || "Admin User"}
              </p>
              <p className="truncate text-xs text-gray-500">
                {user?.email || "admin@example.com"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

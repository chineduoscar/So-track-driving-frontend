import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "So-track Driving School | Best Driving School in Port Harcourt",
  description:
    "Government-approved driving school in Port Harcourt. Trained over 3000+ students. Professional driving lessons, driver's license processing, vehicle licensing, and renewal services.",
  keywords: [
    "Driving School Port Harcourt",
    "Driving School in Port Harcourt",
    "Driving School in Nigeria",
    "SO-TRACK Driving School",
    "Driving Lessons Port Harcourt",
    "Driver's License Processing",
    "Vehicle License Renewal",
    "Government Approved Driving School",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${poppins.className} min-h-full flex flex-col font-sans`}
      >
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}

import React from "react";
import { FiUserCheck } from "react-icons/fi";

const page = () => {
  return (
    <div className="p-2 md:p-6">
      <h1 className="text-xl font-extrabold text-gray-900 mb-6">
        Assign Drivers
      </h1>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center py-20 px-6">
        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-5">
          <FiUserCheck className="text-[#333992] text-2xl" />
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Ability to assign drivers coming soon
        </h2>

        <p className="text-sm text-gray-500 max-w-sm">
          This feature is still in development. You&apos;ll soon be able to
          assign drivers directly from here.
        </p>
      </div>
    </div>
  );
};

export default page;

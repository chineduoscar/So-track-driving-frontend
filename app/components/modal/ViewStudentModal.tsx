"use client";
import { FiX } from "react-icons/fi";
import { Student } from "@/app/types/student";

interface ViewStudentModalProps {
  student: Student;
  onClose: () => void;
}

const PACKAGE_LABELS: Record<NonNullable<Student["package"]>, string> = {
  standard: "Standard",
  executive: "Executive",
  weekend: "Weekend",
  weekendExecutive: "Weekend Executive",
};

const TIER_LABELS: Record<NonNullable<Student["tier"]>, string> = {
  nonExperience: "New driver",
  partialExperience: "Some experience",
  refresher: "Refresher",
};

const Row = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="flex justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
    <span className="text-gray-400 text-xs">{label}</span>
    <span className="text-gray-800 text-xs font-medium text-right">
      {value && value.trim() ? value : <span className="text-gray-300">—</span>}
    </span>
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-5 mb-1 first:mt-0">
    {children}
  </h3>
);

const ViewStudentModal = ({ student, onClose }: ViewStudentModalProps) => {
  const hasReferee =
    student.referee &&
    (student.referee.name ||
      student.referee.address ||
      student.referee.phoneNumber);

  return (
    <div className="fixed inset-0 bg-[#1a2350]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg max-h-[85vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">
            {student.fullName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          <SectionTitle>Personal Details</SectionTitle>
          <Row label="Surname" value={student.surname} />
          <Row label="Other Name(s)" value={student.otherName} />
          <Row label="Email" value={student.email} />
          <Row label="Tel" value={student.phoneNumber} />
          <Row label="Contact Address" value={student.contactAddress} />
          <Row label="Date of Birth" value={student.dateOfBirth} />
          <Row label="State of Origin" value={student.stateOfOrigin} />
          <Row label="Marital Status" value={student.maritalStatus} />
          <Row label="Home Town" value={student.homeTown} />
          <Row label="Qualification" value={student.qualification} />
          <Row label="Previous Experience" value={student.previousExperience} />
          <Row label="Language Spoken" value={student.languageSpoken} />
          <Row
            label="Agreed to Rules"
            value={student.agreeToRules ? "Yes" : "No"}
          />

          {hasReferee && (
            <>
              <SectionTitle>Referee</SectionTitle>
              <Row label="Name" value={student.referee?.name} />
              <Row label="Address" value={student.referee?.address} />
              <Row label="Phone Number" value={student.referee?.phoneNumber} />
            </>
          )}

          <SectionTitle>Enrollment</SectionTitle>
          <Row label="Zone" value={student.zone} />
          <Row
            label="Package"
            value={
              student.package
                ? (PACKAGE_LABELS[student.package] ?? student.package)
                : undefined
            }
          />
          <Row
            label="Experience Level"
            value={
              student.tier
                ? (TIER_LABELS[student.tier] ?? student.tier)
                : undefined
            }
          />
          {student.courseName && (
            <Row label="Course" value={student.courseName} />
          )}
          <Row label="Amount Paid" value={student.amount?.toLocaleString?.()} />
          <Row label="Reference" value={student.reference} />
          <Row label="Status" value={student.status} />
          <Row
            label="Date"
            value={new Date(student.createdAt).toLocaleString()}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewStudentModal;

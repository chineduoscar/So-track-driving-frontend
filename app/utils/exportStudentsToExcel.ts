import * as XLSX from "xlsx";
import { Student } from "@/app/types/student";

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

const UNASSIGNED = "Unassigned";

const buildStudentRow = (student: Student) => ({
  "Full Name": student.fullName,
  "Surname": student.surname,
  "Other Name(s)": student.otherName,
  "Email": student.email,
  "Phone Number": student.phoneNumber,
  "Contact Address": student.contactAddress,
  "Date of Birth": student.dateOfBirth,
  "State of Origin": student.stateOfOrigin,
  "Marital Status": student.maritalStatus,
  "Home Town": student.homeTown,
  "Qualification": student.qualification || "",
  "Previous Experience": student.previousExperience || "",
  "Language Spoken": student.languageSpoken,
  "Agreed to Rules": student.agreeToRules ? "Yes" : "No",
  "Referee Name": student.referee?.name || "",
  "Referee Address": student.referee?.address || "",
  "Referee Phone": student.referee?.phoneNumber || "",
  "Zone": student.zone?.trim() || UNASSIGNED,
  "Package": student.package
    ? (PACKAGE_LABELS[student.package] ?? student.package)
    : "",
  "Experience Level": student.tier
    ? (TIER_LABELS[student.tier] ?? student.tier)
    : "",
  "Course": student.courseName || "",
  "Amount Paid": student.amount ?? "",
  "Reference": student.reference || "",
  "Status": student.status,
  "Date": new Date(student.createdAt).toLocaleString(),
});

/**
 * Builds and triggers a download of an .xlsx workbook containing
 * full details for the given students, one row per student.
 */
export const exportStudentsToExcel = (
  students: Student[],
  filename = `students_${new Date().toISOString().slice(0, 10)}.xlsx`,
) => {
  if (students.length === 0) return;

  const rows = students.map(buildStudentRow);

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto-size columns roughly based on header/content length
  const colWidths = Object.keys(rows[0]).map((key) => {
    const maxLen = Math.max(
      key.length,
      ...rows.map((r) => String(r[key as keyof typeof r] ?? "").length),
    );
    return { wch: Math.min(maxLen + 2, 40) };
  });
  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  XLSX.writeFile(workbook, filename);
};
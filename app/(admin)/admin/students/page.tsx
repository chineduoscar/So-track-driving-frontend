"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../lib/axois";
import ViewStudentModal from "../../../components/modal/ViewStudentModal";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";

interface Student {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  zone?: string;
  package?: "standard" | "executive" | "weekend" | "weekendExecutive";
  tier?: "nonExperience" | "partialExperience" | "refresher";
  amount: number;
  courseName?: string;
  status: string;
  createdAt: string;
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

const UNASSIGNED = "Unassigned";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Student | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await api.get("/student");
        setStudents(res.data.students);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load students.");
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const handleDelete = async () => {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;

    setDeletingId(id);
    try {
      await api.delete(`/student/${id}`);
      toast.success("Student deleted.");
      setStudents((prev) => prev.filter((s) => s._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete student.");
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
    }
  };

  // Group students by zone. Zone names sort alphabetically, but "Unassigned"
  // (missing/legacy records with no zone) always sits last so real zones
  // stay at the top where admins are actually looking.
  const groups = useMemo(() => {
    const map = new Map<string, Student[]>();
    students.forEach((student) => {
      const key = student.zone?.trim() || UNASSIGNED;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(student);
    });

    return Array.from(map.entries()).sort(([a], [b]) => {
      if (a === UNASSIGNED) return 1;
      if (b === UNASSIGNED) return -1;
      return a.localeCompare(b);
    });
  }, [students]);

  const toggleGroup = (zone: string) => {
    setCollapsed((prev) => ({ ...prev, [zone]: !prev[zone] }));
  };

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading students...</div>;
  }

  return (
    <div className="p-2 md:p-6">
      <h1 className="text-xl font-extrabold text-gray-900 mb-6">
        Students ({students.length})
      </h1>

      {students.length === 0 ? (
        <p className="text-sm text-gray-500">No students yet.</p>
      ) : (
        <div className="space-y-5">
          {groups.map(([zone, zoneStudents]) => {
            const isCollapsed = collapsed[zone];
            return (
              <div
                key={zone}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleGroup(zone)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    {zone}
                    <span className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded-full px-2 py-0.5">
                      {zoneStudents.length}
                    </span>
                  </span>
                  <span className="text-gray-400 text-xs font-semibold">
                    {isCollapsed ? "Show" : "Hide"}
                  </span>
                </button>

                {!isCollapsed && (
                  <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                    <table className="w-full text-sm min-w-160">
                      <thead className="text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-100">
                        <tr>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Phone</th>
                          <th className="px-4 py-3">Package</th>
                          <th className="px-4 py-3">Experience</th>
                          <th className="px-4 py-3">Amount</th>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {zoneStudents.map((student) => (
                          <tr key={student._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                              {student.fullName}
                            </td>
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                              {student.email}
                            </td>
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                              {student.phoneNumber}
                            </td>
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                              {student.package ? (
                                (PACKAGE_LABELS[student.package] ??
                                student.package)
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                              {student.tier ? (
                                (TIER_LABELS[student.tier] ?? student.tier)
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                              {student.amount?.toLocaleString?.() ??
                                student.amount}
                            </td>
                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                              {new Date(student.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                              <button
                                onClick={() => setSelected(student)}
                                className="text-[#333992] font-semibold hover:underline cursor-pointer"
                              >
                                View
                              </button>
                              <button
                                onClick={() => setPendingDeleteId(student._id)}
                                disabled={deletingId === student._id}
                                className="text-red-600 font-semibold hover:underline cursor-pointer disabled:opacity-50"
                              >
                                {deletingId === student._id
                                  ? "Deleting..."
                                  : "Delete"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selected && (
        <ViewStudentModal
          student={selected}
          onClose={() => setSelected(null)}
        />
      )}

      {pendingDeleteId && (
        <DeleteConfirmModal
          isDeleting={deletingId === pendingDeleteId}
          onConfirm={handleDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}
    </div>
  );
};

export default StudentsPage;

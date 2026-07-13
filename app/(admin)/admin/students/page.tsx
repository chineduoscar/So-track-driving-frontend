"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../lib/axois";
import ViewStudentModal from "../../../components/modal/ViewStudentModal";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";

interface Student {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  amount: number;
  courseName?: string;
  status: string;
  createdAt: string;
}

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Student | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
            <table className="w-full text-sm min-w-160">
              <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student) => (
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
                      {student.amount?.toLocaleString?.() ?? student.amount}
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
                        {deletingId === student._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

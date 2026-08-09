"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../lib/axois";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import { useAdminUser } from "../../../context/AdminUserContext";

type UserRole = "user" | "admin" | "superadmin";

interface AppUser {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

const ROLE_OPTIONS: UserRole[] = ["user", "admin", "superadmin"];

const getErrorMessage = (err: unknown, fallback: string): string => {
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: unknown }).response === "object" &&
    (err as { response?: { data?: unknown } }).response !== null
  ) {
    const data = (err as { response?: { data?: { message?: unknown } } })
      .response?.data;
    if (data && typeof data.message === "string") {
      return data.message;
    }
  }
  return fallback;
};

const UserManagementPage = () => {
  const { role, id: userId } = useAdminUser();
  const canManage = role === "superadmin";

  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await api.get("/user");
        setUsers(res.data.users);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleRoleChange = async (id: string, newRole: UserRole) => {
    const previous = users.find((u) => u._id === id)?.role;
    if (!previous || previous === newRole) return;

    // Optimistic update
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role: newRole } : u)),
    );
    setUpdatingId(id);

    try {
      const res = await api.patch(`/user/${id}/role`, { role: newRole });
      toast.success(res.data.message || "Role updated.");
      setUsers((prev) => prev.map((u) => (u._id === id ? res.data.user : u)));
    } catch (err: unknown) {
      console.error(err);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: previous } : u)),
      );
      toast.error(getErrorMessage(err, "Failed to update role."));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async () => {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;

    setDeletingId(id);
    try {
      await api.delete(`/user/${id}`);
      toast.success("User deleted.");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err: unknown) {
      console.error(err);
      toast.error(getErrorMessage(err, "Failed to delete user."));
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
    }
  };

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading users...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            User Management ({users.length})
          </h1>
          <p className="text-sm text-gray-500">
            {canManage ? "Assign staff roles." : "View staff roles."}
          </p>
        </div>
      </div>

      {users.length === 0 ? (
        <p className="text-sm text-gray-500">No users yet.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-160">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  {canManage && (
                    <th className="px-5 py-3 text-right">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => {
                  const isSelf = u._id === userId;
                  return (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-800 whitespace-nowrap">
                        {u.fullName}
                        {isSelf && (
                          <span className="ml-2 text-xs font-semibold text-gray-400">
                            (you)
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                        {u.email}
                      </td>
                      <td className="px-5 py-3">
                        {canManage && !isSelf ? (
                          <select
                            value={u.role}
                            disabled={updatingId === u._id}
                            onChange={(e) =>
                              handleRoleChange(
                                u._id,
                                e.target.value as UserRole,
                              )
                            }
                            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-[#333992] focus:outline-none focus:ring-1 focus:ring-[#333992] disabled:opacity-50"
                          >
                            {ROLE_OPTIONS.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-700">
                            {u.role}
                          </span>
                        )}
                      </td>
                      {canManage && (
                        <td className="px-5 py-3 text-right whitespace-nowrap">
                          {!isSelf && (
                            <button
                              onClick={() => setPendingDeleteId(u._id)}
                              disabled={deletingId === u._id}
                              className="text-red-600 font-semibold hover:underline cursor-pointer disabled:opacity-50"
                            >
                              {deletingId === u._id ? "Deleting..." : "Delete"}
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
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

export default UserManagementPage;

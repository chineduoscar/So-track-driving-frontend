"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../lib/axois";
import ViewPaymentModal from "../../../components/modal/ViewPaymentModal";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";
import { useAdminUser } from "../../../context/AdminUserContext";
import { Payment } from "@/app/types/payment";

export interface RefereeInfo {
  name?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
}

const STATUS_OPTIONS = ["all", "success", "pending", "failed"];

const statusStyles: Record<string, string> = {
  success: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  failed: "bg-red-50 text-red-700 border-red-200",
};

const PACKAGE_LABELS: Record<Payment["package"], string> = {
  standard: "Standard",
  executive: "Executive",
  weekend: "Weekend",
  weekendExecutive: "Weekend Executive",
};

const TIER_LABELS: Record<Payment["tier"], string> = {
  nonExperience: "New driver",
  partialExperience: "Some experience",
  refresher: "Refresher",
};

const PaymentsPage = () => {
  const { role } = useAdminUser();
  const canDelete = role === "superadmin";

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<Payment | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const loadPayments = async () => {
      setLoading(true);
      try {
        const res = await api.get("/payment", {
          params: status !== "all" ? { status } : {},
        });
        setPayments(res.data.payments);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load payments.");
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [status]);

  const handleDelete = async () => {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;

    setDeletingId(id);
    try {
      await api.delete(`/payment/${id}`);
      toast.success("Payment deleted.");
      setPayments((prev) => prev.filter((p) => p._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete payment.");
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="p-2 md:p-6">
      <div className="flex flex-col gap-3 mb-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-extrabold text-gray-900">
          Payments ({payments.length})
        </h1>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2 md:mx-0 md:px-0 md:overflow-visible [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setStatus(option)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border cursor-pointer transition shrink-0 ${
                status === option
                  ? "bg-[#333992] text-white border-[#333992]"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading payments...</div>
      ) : payments.length === 0 ? (
        <p className="text-sm text-gray-500">No payments found.</p>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Zone</th>
                  <th className="px-4 py-3">Package</th>
                  <th className="px-4 py-3">Experience</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900 text-[10px] whitespace-nowrap">
                      {payment.fullName}
                    </td>
                    <td className="px-4 py-3">
                      {payment.phoneNumber ? (
                        <a
                          href={`tel:${payment.phoneNumber}`}
                          className="text-[#333992] font-medium text-[10px] hover:underline"
                        >
                          {payment.phoneNumber}
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-[10px]">
                      {payment.zone}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-[10px] whitespace-nowrap">
                      {payment.package ? (
                        (PACKAGE_LABELS[payment.package] ?? payment.package)
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-[10px] whitespace-nowrap">
                      {payment.tier ? (
                        (TIER_LABELS[payment.tier] ?? payment.tier)
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-[10px] whitespace-nowrap">
                      {payment.currency ?? "NGN"}{" "}
                      {payment.amount?.toLocaleString?.() ?? payment.amount}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full border text-[10px] font-semibold capitalize ${
                          statusStyles[payment.status] ??
                          "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-[10px] whitespace-nowrap">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                      <button
                        onClick={() => setSelected(payment)}
                        className="text-[#333992] font-semibold text-[10px] hover:underline cursor-pointer"
                      >
                        View
                      </button>
                      {canDelete && (
                        <button
                          onClick={() => setPendingDeleteId(payment._id)}
                          disabled={deletingId === payment._id}
                          className="text-red-600 font-semibold text-[10px] hover:underline cursor-pointer disabled:opacity-50"
                        >
                          {deletingId === payment._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected && (
        <ViewPaymentModal
          payment={selected}
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

export default PaymentsPage;

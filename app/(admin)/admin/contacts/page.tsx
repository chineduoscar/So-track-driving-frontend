"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../lib/axois";
import ViewContactModal from "../../../components/modal/ViewContactModal";
import DeleteConfirmModal from "../../../components/modal/DeleteConfirmModal";

interface Contact {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
}

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const res = await api.get("/contact");
        setContacts(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  const handleDelete = async () => {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;

    setDeletingId(id);
    try {
      await api.delete(`/contact/${id}`);
      toast.success("Message deleted.");
      setContacts((prev) => prev.filter((c) => c._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete message.");
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
    }
  };

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading messages...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-extrabold text-gray-900 mb-6">
        Contact Messages ({contacts.length})
      </h1>

      {contacts.length === 0 ? (
        <p className="text-sm text-gray-500">No messages yet.</p>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {contact.fullName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{contact.email}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {contact.phoneNumber}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      onClick={() => setSelected(contact)}
                      className="text-[#333992] font-semibold hover:underline cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setPendingDeleteId(contact._id)}
                      disabled={deletingId === contact._id}
                      className="text-red-600 font-semibold hover:underline cursor-pointer disabled:opacity-50"
                    >
                      {deletingId === contact._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <ViewContactModal
          contact={selected}
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

export default ContactsPage;

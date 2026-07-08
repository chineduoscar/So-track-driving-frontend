"use client";

interface Contact {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
}

interface ViewContactModalProps {
  contact: Contact;
  onClose: () => void;
}

const ViewContactModal = ({ contact, onClose }: ViewContactModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-[#1a2350]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {contact.fullName}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date(contact.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Contact details */}
        <div className="space-y-2.5 mb-5 bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-3 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="w-4 h-4 text-[#333992] shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0-.828.672-1.5 1.5-1.5h16.5c.828 0 1.5.672 1.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6.75z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22.5 7.5l-9.75 6.75a1.5 1.5 0 01-1.5 0L1.5 7.5"
              />
            </svg>
            <span className="text-gray-700 break-all">{contact.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="w-4 h-4 text-[#333992] shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 4.5c0-.828.672-1.5 1.5-1.5h2.086c.612 0 1.157.393 1.35.976l1.116 3.348a1.5 1.5 0 01-.417 1.567l-1.24 1.115a12.06 12.06 0 005.652 5.652l1.115-1.24a1.5 1.5 0 011.567-.417l3.348 1.116c.583.193.976.738.976 1.35V19.5a1.5 1.5 0 01-1.5 1.5h-1.5C9.264 21 3 14.736 3 6.75V4.5z"
              />
            </svg>
            <span className="text-gray-700">{contact.phoneNumber}</span>
          </div>
        </div>

        {/* Message */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
            Message
          </p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {contact.message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#333992] hover:opacity-90 text-white text-sm font-semibold rounded-full py-2.5 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewContactModal;

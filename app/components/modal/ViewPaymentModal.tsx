"use client";
import { FiX } from "react-icons/fi";
import { Payment } from "@/app/types/payment";

interface ViewPaymentModalProps {
  payment: Payment;
  onClose: () => void;
  onDelete?: () => void;
  canDelete?: boolean;
  isDeleting?: boolean;
}

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

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

const ViewPaymentModal = ({
  payment,
  onClose,
  onDelete,
  canDelete,
  isDeleting,
}: ViewPaymentModalProps) => {
  const hasReferee =
    payment.referee &&
    (payment.referee.name ||
      payment.referee.address ||
      payment.referee.phoneNumber);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">
            {payment.fullName}
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
          <Row label="Surname" value={payment.surname} />
          <Row label="Other Name(s)" value={payment.otherName} />
          <Row label="Email" value={payment.email} />
          <Row label="Tel" value={payment.phoneNumber} />
          <Row label="Contact Address" value={payment.contactAddress} />
          <Row label="Date of Birth" value={payment.dateOfBirth} />
          <Row label="State of Origin" value={payment.stateOfOrigin} />
          <Row label="Marital Status" value={payment.maritalStatus} />
          <Row label="Home Town" value={payment.homeTown} />
          <Row label="Qualification" value={payment.qualification} />
          <Row label="Previous Experience" value={payment.previousExperience} />
          <Row label="Language Spoken" value={payment.languageSpoken} />
          <Row
            label="Agreed to Rules"
            value={payment.agreeToRules ? "Yes" : "No"}
          />

          {hasReferee && (
            <>
              <SectionTitle>Referee</SectionTitle>
              <Row label="Name" value={payment.referee?.name} />
              <Row label="Address" value={payment.referee?.address} />
              <Row label="Phone Number" value={payment.referee?.phoneNumber} />
            </>
          )}

          <SectionTitle>Booking</SectionTitle>
          <Row label="Zone" value={payment.zone} />
          <Row
            label="Package"
            value={PACKAGE_LABELS[payment.package] ?? payment.package}
          />
          <Row
            label="Experience Level"
            value={TIER_LABELS[payment.tier] ?? payment.tier}
          />
          <Row label="Amount" value={formatNaira(payment.amount)} />
          <Row label="Reference" value={payment.reference} />
          <Row label="Payment Method" value={payment.paymentMethod} />
          <Row label="Currency" value={payment.currency ?? "NGN"} />
          <Row label="Status" value={payment.status} />
          <Row
            label="Paid At"
            value={
              payment.paidAt
                ? new Date(payment.paidAt).toLocaleString()
                : undefined
            }
          />
          <Row
            label="Created At"
            value={new Date(payment.createdAt).toLocaleString()}
          />
        </div>

        {canDelete && onDelete && (
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end">
            <button
              onClick={onDelete}
              disabled={isDeleting}
              className="text-red-600 font-semibold text-xs hover:underline cursor-pointer disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Payment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPaymentModal;

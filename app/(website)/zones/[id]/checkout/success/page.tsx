"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiCheckCircle, FiXCircle, FiLoader, FiDownload } from "react-icons/fi";
import { verifyPayment } from "../../../../../services/payment.services";
import { downloadReceipt } from "../../../../../utils/downloadReceipt";

interface Payment {
  fullName: string;
  zone: string;
  package: "standard" | "executive" | "weekend" | "weekendExecutive";
  tier: "nonExperience" | "partialExperience" | "refresher";
  amount: number;
  reference: string;
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

const CheckoutSuccessPage = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    reference ? "loading" : "failed",
  );
  const [payment, setPayment] = useState<Payment | null>(null);
  const [message, setMessage] = useState(
    reference ? "" : "No payment reference found.",
  );
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!reference) return;

    let cancelled = false;

    const verify = async () => {
      try {
        const data = await verifyPayment(reference);

        if (cancelled) return;

        if (data.success) {
          setStatus("success");
          setPayment(data.payment);
        } else {
          setStatus("failed");
          setMessage(data.message || "Payment could not be verified.");
        }
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setStatus("failed");
        setMessage("Something went wrong while verifying your payment.");
      }
    };

    verify();

    return () => {
      cancelled = true;
    };
  }, [reference]);

  const handleDownload = async () => {
    if (!payment) return;
    setDownloading(true);
    try {
      await downloadReceipt(payment);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-md mx-auto text-center">
        {status === "loading" && (
          <>
            <FiLoader
              className="text-[#333992] mx-auto mb-4 animate-spin"
              size={40}
            />
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              Verifying your payment...
            </h1>
            <p className="text-gray-500 text-sm">
              Please wait, this will only take a moment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <FiCheckCircle className="text-[#00a057] mx-auto mb-4" size={48} />
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
              Payment Successful
            </h1>
            <p className="text-gray-500 text-sm mb-1">
              Thank you{payment?.fullName ? `, ${payment.fullName}` : ""}. Your
              booking has been confirmed.
            </p>

            {payment && (
              <>
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 mt-6 mb-8 text-left text-sm space-y-1.5">
                  <p className="flex justify-between">
                    <span className="text-gray-400">Zone</span>
                    <span className="font-semibold text-gray-800">
                      {payment.zone}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Package</span>
                    <span className="font-semibold text-gray-800">
                      {PACKAGE_LABELS[payment.package] ?? payment.package}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Experience level</span>
                    <span className="font-semibold text-gray-800">
                      {TIER_LABELS[payment.tier] ?? payment.tier}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Amount</span>
                    <span className="font-semibold text-gray-800">
                      {formatNaira(payment.amount)}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Reference</span>
                    <span className="font-semibold text-gray-800">
                      {payment.reference}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="w-full flex items-center justify-center gap-2 bg-[#00a057] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#008f4c] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <FiDownload size={15} />{" "}
                    {downloading ? "Preparing..." : "Download Receipt"}
                  </button>
                  <Link
                    href="/"
                    className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold text-sm px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Back to home
                  </Link>
                </div>
              </>
            )}
          </>
        )}

        {status === "failed" && (
          <>
            <FiXCircle className="text-red-500 mx-auto mb-4" size={48} />
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
              Payment Not Confirmed
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              {message || "We couldn't confirm this payment."}
            </p>
            <Link
              href="/zones"
              className="inline-flex items-center gap-2 bg-[#333992] text-white font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Back to zones
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default CheckoutSuccessPage;

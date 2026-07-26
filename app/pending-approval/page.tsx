import Link from "next/link";

export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fc] p-6">
      <div className="max-w-md text-center bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          Account pending approval
        </h1>
        <p className="text-sm text-gray-500">
          Your account has been created but hasn&apos;t been approved yet.
          Please check back later.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-[#333992] hover:opacity-80"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

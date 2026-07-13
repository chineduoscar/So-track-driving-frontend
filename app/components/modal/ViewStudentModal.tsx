"use client";

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

interface ViewStudentModalProps {
  student: Student;
  onClose: () => void;
}

const ViewStudentModal = ({ student, onClose }: ViewStudentModalProps) => {
  return (
    <div className="fixed inset-0 bg-[#1a2350]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Student Details
        </h2>

        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="font-medium text-gray-900">{student.fullName}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{student.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium text-gray-900">{student.phoneNumber}</p>
          </div>
          <div>
            <p className="text-gray-500">Amount Paid</p>
            <p className="font-medium text-gray-900">{student.amount}</p>
          </div>
          {student.courseName && (
            <div>
              <p className="text-gray-500">Course</p>
              <p className="font-medium text-gray-900">{student.courseName}</p>
            </div>
          )}
          <div>
            <p className="text-gray-500">Status</p>
            <p className="font-medium text-green-600 capitalize">
              {student.status}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-medium text-gray-900">
              {new Date(student.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentModal;

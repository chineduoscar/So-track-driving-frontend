import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import Sidebar from "../../components/admin/Sidebar";

interface DecodedToken {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  iat: number;
  exp: number;
}

async function getUser(): Promise<DecodedToken | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string, {
      algorithms: ["HS256"],
    }) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("JWT verify failed:", error);
    return null;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  console.log(user?.role);

  if (!user || user.role !== "admin") {
    redirect("/admin-login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fc] md:h-screen md:flex-row md:overflow-hidden">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
    </div>
  );
}

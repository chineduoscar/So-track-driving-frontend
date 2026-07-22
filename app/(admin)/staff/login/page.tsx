"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../../../lib/axois";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.success) {
        toast.success(res.data.message || "Login successful.");
        router.push("/admin");
      }
    } catch (error: unknown) {
      let message = "Something went wrong. Please try again.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fc] px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg border border-gray-200">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[#333992]">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Log in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#333992] focus:outline-none focus:ring-1 focus:ring-[#333992] disabled:bg-gray-50"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-16 text-sm text-gray-900 placeholder-gray-400 focus:border-[#333992] focus:outline-none focus:ring-1 focus:ring-[#333992] disabled:bg-gray-50"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#333992] hover:opacity-80 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#333992] py-2.5 text-sm font-medium text-white transition hover:bg-[#2b307f] cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/staff/register"
            className="font-medium text-[#333992] hover:opacity-80"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../lib/axois";
import {
  FiDollarSign,
  FiUsers,
  FiClock,
  FiXCircle,
  FiTrendingUp,
  FiMapPin,
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ZoneStat {
  _id: string;
  amount: number;
  count: number;
}

interface TrendPoint {
  _id: string;
  amount: number;
  count: number;
}

interface RecentPayment {
  _id: string;
  fullName: string;
  zone: string;
  amount: number;
  createdAt: string;
}

interface Stats {
  totalRevenue: number;
  totalStudents: number;
  pendingCount: number;
  failedCount: number;
  totalAttempts: number;
  conversionRate: string;
  byZone: ZoneStat[];
  dailyTrend: TrendPoint[];
  recentPayments: RecentPayment[];
}

const currency = (n: number) => `₦${n?.toLocaleString?.() ?? n}`;

const HomePage = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/payment/stats/dashboard");
        setStats(res.data.stats);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">Loading dashboard...</div>
    );
  }

  if (!stats) {
    return <div className="p-6 text-sm text-gray-500">No data available.</div>;
  }

  const cards = [
    {
      label: "Total Revenue",
      value: currency(stats.totalRevenue),
      icon: FiDollarSign,
      accent: "bg-[#333992]",
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: FiUsers,
      accent: "bg-emerald-600",
    },
    {
      label: "Pending Payments",
      value: stats.pendingCount,
      icon: FiClock,
      accent: "bg-amber-500",
    },
    {
      label: "Failed Payments",
      value: stats.failedCount,
      icon: FiXCircle,
      accent: "bg-red-500",
    },
  ];

  return (
    <div className="p-2 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of payments and student enrollment
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex items-start justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                {card.label}
              </p>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">
                {card.value}
              </p>
            </div>
            <div className={`${card.accent} p-2.5 rounded-xl text-white`}>
              <card.icon size={18} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">
              Revenue — Last 7 Days
            </h2>
            <FiTrendingUp size={16} className="text-[#333992]" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={stats.dailyTrend}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#333992" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#333992" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="_id"
                tick={{ fontSize: 11 }}
                tickFormatter={(v) =>
                  new Date(v).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value) => currency(Number(value ?? 0))}
                labelFormatter={(v) => new Date(v).toDateString()}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#333992"
                fill="url(#revenueFill)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion + Zones */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
              Conversion Rate
            </p>
            <p className="text-2xl font-extrabold text-gray-900">
              {stats.conversionRate}%
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {stats.totalStudents} of {stats.totalAttempts} attempts paid
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <FiMapPin size={14} className="text-[#333992]" />
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Revenue by Zone
              </p>
            </div>
            <div className="space-y-2">
              {stats.byZone.map((zone) => (
                <div
                  key={zone._id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-700">{zone._id}</span>
                  <span className="font-semibold text-gray-900">
                    {currency(zone.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900">Recent Payments</h2>
        </div>
        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
          <table className="w-full text-sm min-w-150">
            <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Zone</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentPayments.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {p.fullName}
                  </td>
                  <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                    {p.zone}
                  </td>
                  <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                    {currency(p.amount)}
                  </td>
                  <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

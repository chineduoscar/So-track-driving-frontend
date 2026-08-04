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
  FiTag,
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

interface PackageStat {
  _id: "standard" | "executive" | "weekend" | "weekendExecutive" | null;
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
  package?: "standard" | "executive" | "weekend" | "weekendExecutive";
  tier?: "nonExperience" | "partialExperience" | "refresher";
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
  byPackage: PackageStat[];
  dailyTrend: TrendPoint[];
  recentPayments: RecentPayment[];
}

type Period = "all" | "today" | "yesterday" | "month";

const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: "General", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Month", value: "month" },
];

const currency = (n: number) => `₦${n?.toLocaleString?.() ?? n}`;

const PACKAGE_LABELS: Record<string, string> = {
  standard: "Standard",
  executive: "Executive",
  weekend: "Weekend",
  weekendExecutive: "Weekend Executive",
};

const TIER_LABELS: Record<string, string> = {
  nonExperience: "New driver",
  partialExperience: "Some experience",
  refresher: "Refresher",
};

const buildPlaceholderTrend = (period: Period): TrendPoint[] => {
  const pad = (n: number) => String(n).padStart(2, "0");

  if (period === "today" || period === "yesterday") {
    const d = new Date();
    if (period === "yesterday") d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const dateStr = `${y}-${m}-${day}`;
    return [
      { _id: `${dateStr} 00:00`, amount: 0, count: 0 },
      { _id: `${dateStr} 23:00`, amount: 0, count: 0 },
    ];
  }

  if (period === "month") {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const fmt = (d: Date) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    return [
      { _id: fmt(first), amount: 0, count: 0 },
      { _id: fmt(last), amount: 0, count: 0 },
    ];
  }

  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 6);
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  return [
    { _id: fmt(start), amount: 0, count: 0 },
    { _id: fmt(end), amount: 0, count: 0 },
  ];
};

const HomePage = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("all");

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const res = await api.get("/payment/stats/dashboard", {
          params: { period },
        });
        setStats(res.data.stats);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [period]);

  const trendLabel =
    period === "today"
      ? "Revenue — Today (Hourly)"
      : period === "yesterday"
        ? "Revenue — Yesterday (Hourly)"
        : period === "month"
          ? "Revenue — This Month"
          : "Revenue — Overview";

  const isHourlyTrend = period === "today" || period === "yesterday";

  const hasTrendData = !!stats && stats.dailyTrend.length > 0;
  const chartData =
    stats && hasTrendData ? stats.dailyTrend : buildPlaceholderTrend(period);

  const cards = stats
    ? [
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
      ]
    : [];

  return (
    <div className="p-2 md:p-6 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Overview of payments and student enrollment
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2 md:mx-0 md:px-0 md:overflow-visible [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          {PERIOD_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setPeriod(option.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border cursor-pointer transition shrink-0 ${
                period === option.value
                  ? "bg-[#333992] text-white border-[#333992]"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {loading || !stats ? (
        <div className="text-sm text-gray-500">Loading dashboard...</div>
      ) : (
        <>
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
                  {trendLabel}
                </h2>
                <FiTrendingUp size={16} className="text-[#333992]" />
              </div>

              {/* Chart always renders (with axis lines) — an overlay
                  message shows on top when there's no real data. */}
              <div className="relative">
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="revenueFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#333992"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#333992"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="_id"
                      tick={{ fontSize: 11 }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={{ stroke: "#e5e7eb" }}
                      tickFormatter={(v) =>
                        isHourlyTrend
                          ? v.split(" ")[1]
                          : new Date(v).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })
                      }
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={{ stroke: "#e5e7eb" }}
                      domain={hasTrendData ? undefined : [0, 100]}
                    />
                    <Tooltip
                      formatter={(value) => currency(Number(value ?? 0))}
                      labelFormatter={(v) =>
                        isHourlyTrend ? v : new Date(v).toDateString()
                      }
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

                {!hasTrendData && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-gray-400 bg-white/70 px-3 py-1 rounded">
                      No revenue in this period.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Conversion + Zones + Packages */}
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
                {stats.byZone.length === 0 ? (
                  <p className="text-xs text-gray-400">No data yet.</p>
                ) : (
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
                )}
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FiTag size={14} className="text-[#333992]" />
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Revenue by Package
                  </p>
                </div>
                {stats.byPackage.length === 0 ? (
                  <p className="text-xs text-gray-400">No data yet.</p>
                ) : (
                  <div className="space-y-2">
                    {stats.byPackage.map((pkg) => (
                      <div
                        key={pkg._id ?? "unknown"}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-700">
                          {pkg._id
                            ? (PACKAGE_LABELS[pkg._id] ?? pkg._id)
                            : "Unknown"}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {currency(pkg.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">
                Recent Payments
              </h2>
            </div>
            {stats.recentPayments.length === 0 ? (
              <p className="text-sm text-gray-400 px-5 py-6">
                No payments in this period.
              </p>
            ) : (
              <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                <table className="w-full text-sm min-w-150">
                  <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase">
                    <tr>
                      <th className="px-5 py-3">Name</th>
                      <th className="px-5 py-3">Zone</th>
                      <th className="px-5 py-3">Package</th>
                      <th className="px-5 py-3">Experience</th>
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
                          {p.package ? (
                            (PACKAGE_LABELS[p.package] ?? p.package)
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                          {p.tier ? (
                            (TIER_LABELS[p.tier] ?? p.tier)
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
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
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

import { memo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { TrendingUp } from "lucide-react";

import CustomTooltip from "./CustomTooltip";

import Dropdown from "@/components/ui/Dropdown";

import formatChartCurrency from "@/utils/formatChartCurrency";

import { useLanguage } from "@/contexts/LanguageContext";

function CashFlowChart({ data, summary, months, setMonths }) {
  const { language } = useLanguage();

  const cards = [
    {
      title: language === "id" ? "Pemasukan" : "Income",

      value: summary?.income ?? 0,

      color: "text-green-600 dark:text-green-400",
    },

    {
      title: language === "id" ? "Pengeluaran" : "Expense",

      value: summary?.expense ?? 0,

      color: "text-red-600 dark:text-red-400",
    },

    {
      title: language === "id" ? "Arus Kas Bersih" : "Net Cash Flow",

      value: summary?.cashflow ?? 0,

      color:
        (summary?.cashflow ?? 0) >= 0
          ? "text-indigo-600 dark:text-indigo-400"
          : "text-red-600 dark:text-red-400",
    },
  ];

  const monthOptions = [
    {
      value: 3,
      label: language === "id" ? "3 Bulan Terakhir" : "Last 3 Months",
    },

    {
      value: 6,
      label: language === "id" ? "6 Bulan Terakhir" : "Last 6 Months",
    },

    {
      value: 12,
      label: language === "id" ? "12 Bulan Terakhir" : "Last 12 Months",
    },
  ];

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
            <TrendingUp size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              {language === "id" ? "Arus Kas" : "Cash Flow"}
            </h2>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {language === "id"
                ? "Pantau pemasukan dan pengeluaran Anda dari waktu ke waktu."
                : "Track your income and expenses over time."}
            </p>
          </div>
        </div>

        <Dropdown
          value={months}

          onChange={setMonths}

          options={monthOptions}
        />
      </div>

      {/* SUMMARY */}

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}

            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
          >
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{card.title}</p>

            <h3 className={`mt-3 text-2xl font-bold ${card.color} `}>
              {card.title === (language === "id" ? "Arus Kas Bersih" : "Net Cash Flow") &&
              card.value > 0
                ? "+"
                : ""}

              {formatChartCurrency(card.value, language)}
            </h3>
          </div>
        ))}
      </div>

      {/* LEGEND */}

      <div className="mb-6 flex gap-6">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />

          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {language === "id" ? "Pemasukan" : "Income"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />

          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {language === "id" ? "Pengeluaran" : "Expense"}
          </span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
          <TrendingUp size={36} />

          <h3 className="mt-5 text-xl font-semibold text-zinc-900 dark:text-white">
            {language === "id" ? "Tidak ada data transaksi" : "No transaction data"}
          </h3>
        </div>
      ) : (
        <div className="h-64 sm:h-72 lg:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}

              margin={{
                top: 10,
                right: 5,
                left: -10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />

                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35} />

                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#3f3f46"

                strokeDasharray="4 4"

                vertical={false}

                opacity={0.2}
              />

              <XAxis
                dataKey="label"

                tick={{
                  fill: "#a1a1aa",

                  fontSize: 12,
                }}

                axisLine={false}

                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#a1a1aa",

                  fontSize: 12,
                }}

                tickFormatter={(value) => formatChartCurrency(value, language)}

                axisLine={false}

                tickLine={false}
              />

              <Tooltip
                cursor={{
                  stroke: "#52525b",

                  strokeDasharray: "4 4",
                }}

                content={<CustomTooltip />}
              />

              <Area
                type="monotone"

                dataKey="income"

                stroke="#22c55e"

                fill="url(#income)"

                strokeWidth={3}

                animationDuration={900}
              />

              <Area
                type="monotone"

                dataKey="expense"

                stroke="#ef4444"

                fill="url(#expense)"

                strokeWidth={3}

                animationDuration={900}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default memo(CashFlowChart);

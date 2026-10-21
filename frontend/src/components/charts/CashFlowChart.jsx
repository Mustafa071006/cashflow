import { memo } from "react";
import { CHART_COLORS, CHART_UI } from "@/constants/chartColors";
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

      color: "text-income",
    },

    {
      title: language === "id" ? "Pengeluaran" : "Expense",

      value: summary?.expense ?? 0,

      color: "text-expense",
    },

    {
      title: language === "id" ? "Arus Kas Bersih" : "Net Cash Flow",

      value: summary?.cashflow ?? 0,

      color:
        (summary?.cashflow ?? 0) >= 0
          ? "text-porcelain"
          : "text-expense",
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
    <div className="rounded-card bg-carbon p-5 sm:p-8">
      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-obsidian text-porcelain">
            <TrendingUp size={20} strokeWidth={1.75} />
          </div>

          <div>
            <h2 className="font-display text-hero-name font-semibold text-porcelain">
              {language === "id" ? "Arus Kas" : "Cash Flow"}
            </h2>

            <p className="mt-1 text-body text-ash">
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

            className="rounded-card bg-obsidian p-6"
          >
            <p className="text-body text-ash">{card.title}</p>

            <h3 className={`mt-3 font-display text-feature-stat font-semibold ${card.color}`}>
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
          <span className="h-2 w-2 rounded-full bg-income" />

          <span className="text-utility text-ash">
            {language === "id" ? "Pemasukan" : "Income"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-expense" />

          <span className="text-utility text-ash">
            {language === "id" ? "Pengeluaran" : "Expense"}
          </span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-card bg-obsidian text-ash">
          <TrendingUp size={32} strokeWidth={1.5} />

          <h3 className="mt-4 font-display text-product-label font-semibold text-porcelain">
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
                  <stop offset="5%" stopColor={CHART_COLORS.income} stopOpacity={0.25} />

                  <stop offset="95%" stopColor={CHART_COLORS.income} stopOpacity={0} />
                </linearGradient>

                <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.expense} stopOpacity={0.25} />

                  <stop offset="95%" stopColor={CHART_COLORS.expense} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke={CHART_UI.grid}

                vertical={false}
              />

              <XAxis
                dataKey="label"

                tick={{
                  fill: CHART_UI.axis,

                  fontSize: 12,
                }}

                axisLine={false}

                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: CHART_UI.axis,

                  fontSize: 12,
                }}

                tickFormatter={(value) => formatChartCurrency(value, language)}

                axisLine={false}

                tickLine={false}
              />

              <Tooltip
                cursor={{
                  stroke: CHART_UI.grid,

                  strokeDasharray: "4 4",
                }}

                content={<CustomTooltip />}
              />

              <Area
                type="monotone"

                dataKey="income"

                stroke={CHART_COLORS.income}

                fill="url(#income)"

                strokeWidth={2}

                animationDuration={900}
              />

              <Area
                type="monotone"

                dataKey="expense"

                stroke={CHART_COLORS.expense}

                fill="url(#expense)"

                strokeWidth={2}

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

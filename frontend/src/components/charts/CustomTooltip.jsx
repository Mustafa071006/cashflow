import { memo } from "react";

import formatChartCurrency from "@/utils/formatChartCurrency";

import { useLanguage } from "@/contexts/LanguageContext";

function CustomTooltip({ active, payload, label }) {
  const { language } = useLanguage();

  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const income = payload.find((item) => item.dataKey === "income")?.value ?? 0;

  const expense = payload.find((item) => item.dataKey === "expense")?.value ?? 0;

  const cashflow = income - expense;

  return (
    <div className="min-[220px] rounded-2xl border border-zinc-700 bg-zinc-900 p-4 shadow-2xl">
      <p className="mb-4 text-sm font-semibold text-zinc-300">📅 {label}</p>

      <div className="space-y-3">
        {/* INCOME */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />

            <span className="text-sm text-zinc-400">
              {language === "id" ? "Pemasukan" : "Income"}
            </span>
          </div>

          <span className="font-semibold text-green-400">
            {formatChartCurrency(income, language)}
          </span>
        </div>

        {/* EXPENSE */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />

            <span className="text-sm text-zinc-400">
              {language === "id" ? "Pengeluaran" : "Expense"}
            </span>
          </div>

          <span className="font-semibold text-red-400">
            {formatChartCurrency(expense, language)}
          </span>
        </div>

        <div className="my-2 border-t border-zinc-700" />

        {/* NET CASH FLOW */}

        <div className="flex items-center justify-between">
          <span className="font-medium text-white">
            {language === "id" ? "Arus Kas Bersih" : "Net Cash Flow"}
          </span>

          <span className={`font-bold ${cashflow >= 0 ? "text-green-400" : "text-red-400"} `}>
            {cashflow >= 0 ? "+" : "-"}

            {formatChartCurrency(Math.abs(cashflow), language)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomTooltip);

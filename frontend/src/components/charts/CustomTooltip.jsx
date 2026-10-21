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
    <div className="min-w-55 rounded-nav bg-graphite/95 p-4 ring-1 ring-keyline backdrop-blur-xl">
      <p className="mb-3 text-utility font-semibold text-ash">{label}</p>

      <div className="space-y-2.5">
        {/* INCOME */}

        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-income" />

            <span className="text-body text-ash">{language === "id" ? "Pemasukan" : "Income"}</span>
          </div>

          <span className="text-body font-semibold text-income">
            {formatChartCurrency(income, language)}
          </span>
        </div>

        {/* EXPENSE */}

        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-expense" />

            <span className="text-body text-ash">{language === "id" ? "Pengeluaran" : "Expense"}</span>
          </div>

          <span className="text-body font-semibold text-expense">
            {formatChartCurrency(expense, language)}
          </span>
        </div>

        <div className="my-2 border-t border-steel" />

        {/* NET CASH FLOW */}

        <div className="flex items-center justify-between gap-6">
          <span className="text-body font-medium text-porcelain">
            {language === "id" ? "Arus Kas Bersih" : "Net Cash Flow"}
          </span>

          <span className={`text-body font-semibold ${cashflow >= 0 ? "text-income" : "text-expense"}`}>
            {cashflow >= 0 ? "+" : "-"}

            {formatChartCurrency(Math.abs(cashflow), language)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomTooltip);

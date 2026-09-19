import { memo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

import ChartCard from "@/components/ui/ChartCard";
import Skeleton from "@/components/ui/Skeleton";

import { CHART_COLORS } from "@/constants/chartColors";

import formatCurrency from "@/utils/formatCurrency";
import formatChartCurrency from "@/utils/formatChartCurrency";

import { useLanguage } from "@/contexts/LanguageContext";


function IncomeExpenseChart({
  monthly,
  loading,
}) {

  const { language } = useLanguage();



  const title =
    language === "id"
      ? "Pemasukan vs Pengeluaran"
      : "Income vs Expense";


  const subtitle =
    language === "id"
      ? "Performa keuangan bulanan"
      : "Monthly financial performance";



  if (loading) {
    return (
      <ChartCard
        title={title}
        subtitle={subtitle}
      >
        <Skeleton className="h-full" />
      </ChartCard>
    );
  }



  if (!monthly || monthly.length === 0) {
    return (
      <ChartCard
        title={title}
        subtitle={subtitle}
      >
        <div
          className="
            flex
            h-full
            items-center
            justify-center
            text-sm
            text-zinc-500
            dark:text-zinc-400
          "
        >
          {
            language === "id"
              ? "Tidak ada data transaksi"
              : "No transaction data available"
          }
        </div>
      </ChartCard>
    );
  }



  return (
    <ChartCard
      title={title}
      subtitle={subtitle}
    >

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <BarChart
          data={monthly}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >


          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272a"
            opacity={0.15}
          />



          <XAxis
            dataKey="label"
            tick={{
              fill: "#71717a",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />



          <YAxis
            tickFormatter={(value) =>
              formatChartCurrency(
                value,
                language
              )
            }
            tick={{
              fill: "#71717a",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />



          <Tooltip
            formatter={(value) =>
              formatCurrency(value)
            }

            contentStyle={{
              backgroundColor:
                "#18181b",

              border:
                "1px solid #27272a",

              borderRadius:
                "12px",

              color:
                "#fff",
            }}
          />



          <Legend />



          <Bar
            dataKey="income"

            name={
              language === "id"
                ? "Pemasukan"
                : "Income"
            }

            fill={CHART_COLORS.income}

            radius={[6, 6, 0, 0]}

            animationDuration={800}
          />



          <Bar
            dataKey="expense"

            name={
              language === "id"
                ? "Pengeluaran"
                : "Expense"
            }

            fill={CHART_COLORS.expense}

            radius={[6, 6, 0, 0]}

            animationDuration={800}
          />


        </BarChart>


      </ResponsiveContainer>


    </ChartCard>
  );
}


export default memo(IncomeExpenseChart);
import { memo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import ChartCard from "@/components/ui/ChartCard";
import Skeleton from "@/components/ui/Skeleton";

import { CHART_TOOLTIP, CHART_UI, PIE_COLORS } from "@/constants/chartColors";

import formatCurrency from "@/utils/formatCurrency";

import { useLanguage } from "@/contexts/LanguageContext";


function ExpenseCategoryChart({
  categories,
  loading,
}) {


  const {
    language,
  } = useLanguage();




  const title =
    language === "id"
      ? "Pengeluaran Berdasarkan Kategori"
      : "Expense by Category";



  const subtitle =
    language === "id"
      ? "Distribusi pengeluaran Anda"
      : "Distribution of your spending";





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





  if (!categories || categories.length === 0) {
    return (
      <ChartCard
        title={title}
        subtitle={subtitle}
      >

        <div className="flex h-full items-center justify-center rounded-nav bg-obsidian text-body text-ash">

          {
            language === "id"
              ? "Tidak ada data pengeluaran"
              : "No expense data available"
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


        <PieChart>


          <Pie
            data={categories}

            dataKey="amount"

            nameKey="name"

            cx="50%"

            cy="45%"

            innerRadius={55}

            outerRadius={95}

            paddingAngle={3}

            stroke="#1d1d1f"

            strokeWidth={2}

            animationDuration={800}
          >


            {categories.map((_, index) => (

              <Cell

                key={index}

                fill={
                  PIE_COLORS[
                    index % PIE_COLORS.length
                  ]
                }

              />

            ))}


          </Pie>





          <Tooltip

            formatter={(value) =>
              formatCurrency(value)
            }


            {...CHART_TOOLTIP}

          />





          <Legend

            verticalAlign="bottom"

            height={36}

            iconType="circle"

            iconSize={8}

            wrapperStyle={{
              fontSize: "12px",
              color: CHART_UI.axis,
            }}

          />



        </PieChart>


      </ResponsiveContainer>


    </ChartCard>
  );
}


export default memo(ExpenseCategoryChart);
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

import { PIE_COLORS } from "@/constants/chartColors";

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


            contentStyle={{
              backgroundColor: "#18181b",

              border:
                "1px solid #27272a",

              borderRadius:
                "12px",

              color: "#fff",
            }}

          />





          <Legend

            verticalAlign="bottom"

            height={36}

            wrapperStyle={{
              fontSize: "12px",
            }}

          />



        </PieChart>


      </ResponsiveContainer>


    </ChartCard>
  );
}


export default memo(ExpenseCategoryChart);
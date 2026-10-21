import { memo } from "react";
import { Tags } from "lucide-react";

import ChartCard from "@/components/ui/ChartCard";
import Skeleton from "@/components/ui/Skeleton";

import formatCurrency from "@/utils/formatCurrency";

import { useLanguage } from "@/contexts/LanguageContext";


function TopCategoryList({
  categories,
  loading,
}) {


  const {
    language,
  } = useLanguage();




  if (loading) {

    return (
      <ChartCard
        title="Top Spending Categories"
        subtitle="Highest expense categories"
      >

        <div className="space-y-4">

          {[...Array(5)].map((_, index) => (

            <Skeleton
              key={index}
              className="h-20"
            />

          ))}

        </div>

      </ChartCard>
    );

  }




  const topCategories = [...(categories || [])]
    .sort(
      (a, b) =>
        Number(b.amount) -
        Number(a.amount)
    )
    .slice(0, 5);






  if (topCategories.length === 0) {

    return (

      <ChartCard
        title="Top Spending Categories"
        subtitle="Highest expense categories"
      >

        <div className="flex h-full items-center justify-center rounded-nav bg-obsidian text-body text-ash">

          {
            language === "id"
              ? "Tidak ada kategori pengeluaran"
              : "No expense categories available"
          }

        </div>


      </ChartCard>

    );

  }






  return (

    <ChartCard

      title={
        language === "id"
          ? "Kategori Pengeluaran Teratas"
          : "Top Spending Categories"
      }


      subtitle={
        language === "id"
          ? "Kategori dengan pengeluaran tertinggi"
          : "Highest expense categories"
      }

    >



      <div className="scroll-area h-full space-y-2 overflow-y-auto">



        {topCategories.map((category) => (


          <div

            key={category.id}

            className="flex items-center justify-between gap-4 rounded-nav bg-obsidian p-4"

          >




            <div className="flex min-w-0 items-center gap-3">




              <div

                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-carbon text-porcelain"

              >

                <Tags size={18} strokeWidth={1.75} />

              </div>






              <div>


                <h3

                  className="truncate text-body font-semibold text-porcelain"

                >

                  {category.name}

                </h3>





                <p

                  className="text-utility text-ash"

                >

                  {
                    language === "id"
                      ? "Kategori Pengeluaran"
                      : "Expense Category"
                  }

                </p>




              </div>




            </div>







            <span

              className="text-body font-semibold whitespace-nowrap text-expense"

            >

              {formatCurrency(category.amount)}

            </span>





          </div>



        ))}



      </div>



    </ChartCard>

  );

}



export default memo(TopCategoryList);
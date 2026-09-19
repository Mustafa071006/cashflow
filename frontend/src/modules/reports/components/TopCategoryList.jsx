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



      <div
        className="
          space-y-4
        "
      >



        {topCategories.map((category) => (


          <div

            key={category.id}

            className="
              flex
              items-center
              justify-between

              rounded-xl

              border
              border-zinc-200

              p-4

              transition

              hover:bg-zinc-50


              dark:border-zinc-800

              dark:hover:bg-zinc-900
            "

          >




            <div
              className="
                flex
                items-center
                gap-3
              "
            >




              <div

                className="
                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-xl


                  bg-zinc-100

                  text-zinc-900


                  transition


                  dark:bg-zinc-800

                  dark:text-zinc-100
                "

              >

                <Tags
                  size={22}
                />

              </div>






              <div>


                <h3

                  className="
                    font-medium

                    text-zinc-900

                    dark:text-white
                  "

                >

                  {category.name}

                </h3>





                <p

                  className="
                    text-sm

                    text-zinc-500

                    dark:text-zinc-400
                  "

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

              className="
                font-semibold

                text-red-500
              "

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
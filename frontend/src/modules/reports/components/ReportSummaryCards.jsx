import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
} from "lucide-react";

import SummaryCard from "@/components/ui/SummaryCard";
import Skeleton from "@/components/ui/Skeleton";

import { useLanguage } from "@/contexts/LanguageContext";



function formatCurrency(value = 0) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}





function ReportSummaryCards({
  overview,
  loading,
}) {


  const {
    language,
  } = useLanguage();




  if (loading) {

    return (
      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {[...Array(4)].map((_, index) => (

          <Skeleton
            key={index}
            className="h-32"
          />

        ))}

      </div>
    );

  }




  const cards = [

    {
      title:
        language === "id"
          ? "Total Pemasukan"
          : "Total Income",

      value:
        formatCurrency(
          overview?.totalIncome
        ),

      icon: TrendingUp,

      color:
        "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    },



    {
      title:
        language === "id"
          ? "Total Pengeluaran"
          : "Total Expense",

      value:
        formatCurrency(
          overview?.totalExpense
        ),

      icon: TrendingDown,

      color:
        "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
    },



    {
      title:
        language === "id"
          ? "Saldo Bersih"
          : "Net Balance",

      value:
        formatCurrency(
          overview?.netBalance
        ),

      icon: Wallet,

      color:
        "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    },



    {
      title:
        language === "id"
          ? "Transaksi"
          : "Transactions",

      value:
        overview?.transactionCount ?? 0,

      icon: Receipt,

      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
    },

  ];





  return (

    <div
      className="
        grid
        gap-5
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >

      {cards.map((card) => (

        <SummaryCard

          key={card.title}

          title={card.title}

          value={card.value}

          icon={card.icon}

          color={card.color}

        />

      ))}


    </div>

  );
}



export default ReportSummaryCards;
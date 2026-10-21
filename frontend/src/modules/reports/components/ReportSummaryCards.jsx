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
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

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
        "text-income",
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
        "text-expense",
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
        "text-electric-link",
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
        "text-porcelain",
    },

  ];





  return (

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

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
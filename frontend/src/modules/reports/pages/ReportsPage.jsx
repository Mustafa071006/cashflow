import { BarChart3 } from "lucide-react";

import EmptyState from "@/components/ui/EmptyState";

import ReportHeader from "../components/ReportHeader";
import ReportSummaryCards from "../components/ReportSummaryCards";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import ExpenseCategoryChart from "../components/ExpenseCategoryChart";
import TopCategoryList from "../components/TopCategoryList";

import useReport from "../hooks/useReport";
import { useLanguage } from "@/contexts/LanguageContext";


function ReportsPage() {
  const {
    overview,
    monthly,
    categories,
    loading,
    error,
    refresh,
  } = useReport();

  const { language } = useLanguage();


  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950">

        <h2 className="text-lg font-semibold text-red-600 dark:text-red-300">
          {language === "id" ? "Gagal memuat laporan" : "Unable to load reports"}
        </h2>


        <p className="mt-2 text-sm text-red-500 dark:text-red-400">
          {language === "id"
            ? "Terjadi kesalahan saat memuat data laporan Anda."
            : "Something went wrong while loading your report data."}
        </p>


        <button
          onClick={refresh}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          {language === "id" ? "Coba Lagi" : "Retry"}
        </button>

      </div>
    );
  }


  const hasTransactions =
    (overview?.transactionCount ?? 0) > 0;



  return (
    <div className="space-y-6">

      <ReportHeader />


      {!loading && !hasTransactions ? (

        <EmptyState
          icon={BarChart3}
          title={language === "id" ? "Belum Ada Laporan" : "No Reports Yet"}
          description={
            language === "id"
              ? "Mulai tambahkan transaksi pemasukan dan pengeluaran untuk melihat laporan keuangan Anda."
              : "Start adding your income and expense transactions to see your financial reports."
          }
        />


      ) : (

        <>

          <ReportSummaryCards
            overview={overview}
            loading={loading}
          />


          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

            <IncomeExpenseChart
              monthly={monthly}
              loading={loading}
            />


            <ExpenseCategoryChart
              categories={categories}
              loading={loading}
            />

          </div>


          <TopCategoryList
            categories={categories}
            loading={loading}
          />

        </>

      )}

    </div>
  );
}


export default ReportsPage;
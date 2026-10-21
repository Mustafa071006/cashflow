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
      <div className="rounded-card bg-carbon p-8">

        <h2 className="font-display text-product-label font-semibold text-porcelain">
          {language === "id" ? "Gagal memuat laporan" : "Unable to load reports"}
        </h2>


        <p className="mt-2 text-body text-ash">
          {language === "id"
            ? "Terjadi kesalahan saat memuat data laporan Anda."
            : "Something went wrong while loading your report data."}
        </p>


        <button
          onClick={refresh}
          className="mt-6 h-10 rounded-full bg-porcelain px-5 text-body font-medium text-obsidian transition hover:bg-white"
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
import { useLanguage } from "@/contexts/LanguageContext";


function ReportHeader() {

  const {
    language,
  } = useLanguage();



  return (
    <div
      className="
        flex
        flex-col
        gap-2
      "
    >

      <h1
        className="
          text-3xl
          font-bold
          tracking-tight

          text-gray-900
          dark:text-white
        "
      >
        {
          language === "id"
            ? "Laporan"
            : "Reports"
        }
      </h1>



      <p
        className="
          text-sm

          text-gray-500
          dark:text-gray-400
        "
      >
        {
          language === "id"
            ? "Pantau pemasukan, pengeluaran, dan performa keuangan Anda."
            : "Track your income, expenses, and financial performance."
        }
      </p>


    </div>
  );
}


export default ReportHeader;
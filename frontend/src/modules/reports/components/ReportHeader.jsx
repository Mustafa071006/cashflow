import { useLanguage } from "@/contexts/LanguageContext";


function ReportHeader() {

  const {
    language,
  } = useLanguage();



  return (
    <div className="flex flex-col gap-2">

      <h1 className="font-display text-hero-name font-semibold text-porcelain md:text-headline">
        {
          language === "id"
            ? "Laporan"
            : "Reports"
        }
      </h1>



      <p className="text-section-nav text-ash">
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
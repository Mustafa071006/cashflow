import Button from "@/components/ui/Button/Button";

import { useLanguage } from "@/contexts/LanguageContext";

import en from "@/locales/en";
import id from "@/locales/id";


function CategoryHeader({
  onAddCategory,
}) {

  const { language } = useLanguage();


  const t =
    language === "id"
      ? id
      : en;



  return (
    <div
      className="
        mb-8
        flex
        flex-col
        gap-6
        lg:flex-row
        lg:items-end
        lg:justify-between
      "
    >

      <div>


        <p
          className="
            text-sm
            font-medium
            uppercase
            tracking-widest
            text-zinc-900
            dark:text-zinc-100
          "
        >
          {t.category.label}
        </p>



        <h1
          className="
            mt-2
            text-4xl
            font-bold
            tracking-tight
            text-zinc-900
            dark:text-white
          "
        >
          {t.category.title}
        </h1>



        <p
          className="
            mt-3
            max-w-2xl
            text-zinc-500
            dark:text-zinc-400
          "
        >
          {language === "id"
            ? "Atur kategori pemasukan dan pengeluaran agar setiap transaksi tetap terstruktur dan mudah dikelola."
            : "Organize your income and expense categories to keep every transaction well structured and easy to manage."
          }
        </p>


      </div>




      <Button
        onClick={onAddCategory}
        size="lg"
        variant="primary"
        className="w-full lg:w-auto"
      >
        + {t.category.addCategory}
      </Button>



    </div>
  );
}


export default CategoryHeader;
import Button from "@/components/ui/Button/Button";

import { useLanguage } from "@/contexts/LanguageContext";

import en from "@/locales/en";
import id from "@/locales/id";

function TransactionHeader({ onAddTransaction }) {
  const { language } = useLanguage();

  const t = language === "id" ? id : en;

  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="font-display text-product-label font-semibold text-ash">
          {t.transaction.label}
        </p>

        <h1 className="mt-2 font-display text-hero-name font-semibold text-porcelain md:text-headline">
          {t.transaction.title}
        </h1>

        <p className="mt-3 max-w-2xl text-section-nav text-ash">
          {language === "id"
            ? "Lacak setiap pemasukan dan pengeluaran agar keuangan Anda tetap terorganisir dan selalu diperbarui."
            : "Track every income and expense to keep your finances organized and always up to date."}
        </p>
      </div>

      <Button onClick={onAddTransaction} variant="primary" className="w-full lg:w-auto">
        + {t.transaction.addTransaction}
      </Button>
    </div>
  );
}

export default TransactionHeader;

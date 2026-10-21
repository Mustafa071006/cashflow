import Button from "@/components/ui/Button/Button";

import calculateTotalBalance from "@/utils/calculateTotalBalance";
import formatCurrency from "@/utils/formatCurrency";

import { useLanguage } from "@/contexts/LanguageContext";

import en from "@/locales/en";
import id from "@/locales/id";

function WalletHeader({ wallets, onAddWallet }) {
  const totalBalance = calculateTotalBalance(wallets);

  const { language } = useLanguage();

  const t = language === "id" ? id : en;

  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="font-display text-product-label font-semibold text-ash">{t.wallet.label}</p>

        <h1 className="mt-2 font-display text-hero-name font-semibold text-porcelain md:text-headline">
          {t.wallet.title}
        </h1>

        <p className="mt-3 max-w-xl text-section-nav text-ash">{t.wallet.description}</p>

        <div className="mt-10">
          <p className="text-body text-ash">{t.wallet.totalBalance}</p>

          <h2 className="mt-2 font-display text-headline font-semibold text-porcelain md:text-display-sm">
            {formatCurrency(totalBalance)}
          </h2>

          <p className="mt-2 text-body text-ash">
            {language === "id"
              ? `Di ${wallets.length} dompet`
              : `Across ${wallets.length} wallet${wallets.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      <Button onClick={onAddWallet} variant="primary" className="w-full lg:w-auto">
        + {t.wallet.addWallet}
      </Button>
    </div>
  );
}

export default WalletHeader;

import Button from "@/components/ui/Button/Button";

import calculateTotalBalance from "@/utils/calculateTotalBalance";
import formatCurrency from "@/utils/formatCurrency";

import { useLanguage } from "@/contexts/LanguageContext";

import en from "@/locales/en";
import id from "@/locales/id";


function WalletHeader({
  wallets,
  onAddWallet,
}) {

  const totalBalance = calculateTotalBalance(wallets);


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
          {t.wallet.label}
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
          {t.wallet.title}
        </h1>



        <p
          className="
            mt-3
            max-w-xl
            text-zinc-500
            dark:text-zinc-400
          "
        >
          {t.wallet.description}
        </p>




        <div
          className="
            mt-8
          "
        >

          <p
            className="
              text-sm
              font-medium
              text-zinc-500
              dark:text-zinc-400
            "
          >
            {t.wallet.totalBalance}
          </p>



          <h2
            className="
              mt-2
              text-5xl
              font-bold
              tracking-tight
              text-zinc-900
              dark:text-white
            "
          >
            {formatCurrency(totalBalance)}
          </h2>



          <p
            className="
              mt-2
              text-sm
              text-zinc-500
              dark:text-zinc-400
            "
          >
            {language === "id"
              ? `Di ${wallets.length} dompet`
              : `Across ${wallets.length} wallet${wallets.length !== 1 ? "s" : ""}`
            }
          </p>



        </div>


      </div>




      <Button
        onClick={onAddWallet}
        size="lg"
        variant="primary"
        className="w-full lg:w-auto"
      >
        + {t.wallet.addWallet}
      </Button>



    </div>
  );
}


export default WalletHeader;
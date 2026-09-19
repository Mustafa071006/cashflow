import {
  Wallet,
  Building2,
  Smartphone,
} from "lucide-react";

import Card from "@/components/ui/Card";
import ActionMenu from "@/components/common/ActionMenu";

import formatCurrency from "@/utils/formatCurrency";

import { useLanguage } from "@/contexts/LanguageContext";


function getWalletIcon(name) {

  const walletName =
    name?.toLowerCase();



  if (walletName === "cash") {
    return Wallet;
  }



  if (
    walletName?.includes("bca") ||
    walletName?.includes("mandiri") ||
    walletName?.includes("bri") ||
    walletName?.includes("bni")
  ) {
    return Building2;
  }



  if (
    walletName?.includes("ovo") ||
    walletName?.includes("dana") ||
    walletName?.includes("gopay") ||
    walletName?.includes("shopeepay")
  ) {
    return Smartphone;
  }



  return Wallet;
}




function WalletCard({
  wallet,
  onDelete,
  onEdit,
}) {


  const Icon = getWalletIcon(
    wallet.name
  );


  const {
    language,
  } = useLanguage();




  return (
    <Card
      hover
      className="
        relative
        overflow-hidden
      "
    >


      <div
        className="
          absolute
          right-4
          top-4
        "
      >

        <ActionMenu
          onEdit={() => onEdit(wallet)}
          onDelete={() => onDelete(wallet)}
        />

      </div>





      <div
        className="
          mb-6
          flex
          h-14
          w-14
          items-center
          justify-center

          rounded-2xl

          bg-zinc-100
          text-zinc-900

          transition-all
          duration-300

          dark:bg-zinc-800
          dark:text-zinc-100
        "
      >

        <Icon
          className="
            h-7
            w-7
          "
        />

      </div>





      <h2
        className="
          text-xl
          font-semibold

          text-zinc-900
          dark:text-white
        "
      >
        {wallet.name}
      </h2>





      <p
        className="
          mt-2
          text-sm

          text-zinc-500
          dark:text-zinc-400
        "
      >

        {
          language === "id"
            ? "Saldo Tersedia"
            : "Available Balance"
        }

      </p>





      <p
        className="
          mt-3

          text-3xl

          font-bold

          tracking-tight

          text-zinc-900
          dark:text-white
        "
      >

        {formatCurrency(wallet.balance)}

      </p>



    </Card>
  );
}


export default WalletCard;
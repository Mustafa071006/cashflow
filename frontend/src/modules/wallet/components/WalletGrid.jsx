import { Wallet } from "lucide-react";

import EmptyState from "@/components/ui/EmptyState";
import WalletCard from "./WalletCard";
import { useLanguage } from "@/contexts/LanguageContext";


function WalletGrid({
  wallets,
  onDelete,
  onEdit,
}) {
  const { language } = useLanguage();

  if (wallets.length === 0) {
    return (
      <EmptyState
        icon={Wallet}
        title={language === "id" ? "Belum Ada Dompet" : "No Wallet Yet"}
        description={
          language === "id"
            ? "Buat dompet pertama Anda untuk mulai mengelola keuangan."
            : "Create your first wallet to start managing your finances."
        }
      />
    );
  }


  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        2xl:grid-cols-3
      "
    >

      {wallets.map((wallet) => (

        <WalletCard
          key={wallet.id}
          wallet={wallet}
          onDelete={onDelete}
          onEdit={onEdit}
        />

      ))}

    </div>
  );
}


export default WalletGrid;
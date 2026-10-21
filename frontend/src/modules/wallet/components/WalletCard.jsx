import { Wallet, Building2, Smartphone } from "lucide-react";

import Card from "@/components/ui/Card";
import ActionMenu from "@/components/common/ActionMenu";

import formatCurrency from "@/utils/formatCurrency";

import { useLanguage } from "@/contexts/LanguageContext";

function getWalletIcon(name) {
  const walletName = name?.toLowerCase();

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

function WalletCard({ wallet, onDelete, onEdit }) {
  const Icon = getWalletIcon(wallet.name);

  const { language } = useLanguage();

  return (
    <Card hover className="relative">
      <div className="absolute top-4 right-4">
        <ActionMenu onEdit={() => onEdit(wallet)} onDelete={() => onDelete(wallet)} />
      </div>

      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-obsidian text-porcelain">
        <Icon size={22} strokeWidth={1.5} />
      </div>

      <h2 className="font-display text-product-label font-semibold text-porcelain">{wallet.name}</h2>

      <p className="mt-1 text-body text-ash">
        {language === "id" ? "Saldo Tersedia" : "Available Balance"}
      </p>

      <p className="mt-4 truncate font-display text-feature-stat font-semibold text-porcelain">
        {formatCurrency(wallet.balance)}
      </p>
    </Card>
  );
}

export default WalletCard;

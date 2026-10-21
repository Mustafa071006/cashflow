import { Wallet, Landmark, Smartphone } from "lucide-react";

import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

import formatChartCurrency from "@/utils/formatChartCurrency";

import { useLanguage } from "@/contexts/LanguageContext";

function WalletSummary({ wallets }) {
  const { language } = useLanguage();

  const getWalletIcon = (name) => {
    const walletName = name.toLowerCase();

    if (walletName.includes("cash")) {
      return Wallet;
    }

    if (
      walletName.includes("bca") ||
      walletName.includes("mandiri") ||
      walletName.includes("bni") ||
      walletName.includes("bri")
    ) {
      return Landmark;
    }

    return Smartphone;
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="font-display text-product-label font-semibold text-porcelain">
          {language === "id" ? "Ringkasan Dompet" : "Wallet Summary"}
        </h2>

        <p className="mt-1 text-body text-ash">
          {language === "id" ? "Saldo tersedia Anda" : "Your available balances"}
        </p>
      </div>

      {wallets.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title={language === "id" ? "Dompet Tidak Ditemukan" : "No Wallet Found"}
          description={
            language === "id"
              ? "Buat dompet pertama Anda untuk mulai mencatat keuangan."
              : "Create your first wallet to start tracking your finances."
          }
          className="h-56 bg-obsidian"
        />
      ) : (
        <div className="space-y-3">
          {wallets.map((wallet) => {
            const Icon = getWalletIcon(wallet.name);

            return (
              <div
                key={wallet.id}
                className="flex items-center justify-between rounded-nav bg-obsidian p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-carbon">
                    <Icon size={18} strokeWidth={1.75} className="text-porcelain" />
                  </div>

                  <div>
                    <p className="text-body font-semibold text-porcelain">{wallet.name}</p>

                    <p className="text-utility text-ash">
                      {language === "id" ? "Saldo Tersedia" : "Available Balance"}
                    </p>
                  </div>
                </div>

                <h3 className="font-display text-product-label font-semibold text-porcelain">
                  {formatChartCurrency(wallet.balance, language)}
                </h3>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

export default WalletSummary;

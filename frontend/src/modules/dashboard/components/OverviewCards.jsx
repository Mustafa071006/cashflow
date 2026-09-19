import { Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

import StatCard from "./StatCard";

import formatCurrency from "@/utils/formatCurrency";

import { useLanguage } from "@/contexts/LanguageContext";

function OverviewCards({ summary }) {
  const { language } = useLanguage();

  if (!summary) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <StatCard
        title={language === "id" ? "Total Saldo" : "Total Balance"}

        value={formatCurrency(summary.totalBalance)}

        subtitle={`${summary.walletCount} ${language === "id" ? "Dompet" : "Wallet"}`}

        icon={Wallet}

        variant="balance"
      />

      <StatCard
        title={language === "id" ? "Pemasukan" : "Income"}

        value={formatCurrency(summary.totalIncome)}

        subtitle={`${summary.transactionCount} ${language === "id" ? "Transaksi" : "Transactions"}`}

        icon={ArrowDownCircle}

        variant="income"
      />

      <StatCard
        title={language === "id" ? "Pengeluaran" : "Expense"}

        value={formatCurrency(summary.totalExpense)}

        subtitle={
          language === "id"
            ? `Arus Kas ${formatCurrency(summary.cashflow)}`
            : `Cashflow ${formatCurrency(summary.cashflow)}`
        }

        icon={ArrowUpCircle}

        variant="expense"
      />
    </div>
  );
}

export default OverviewCards;

import { memo } from "react";
import { Pencil, Trash2, Receipt } from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button/Button";
import EmptyState from "@/components/ui/EmptyState";

import formatCurrency from "@/utils/formatCurrency";
import { useLanguage } from "@/contexts/LanguageContext";

const headerCell = "px-6 py-4 text-utility font-semibold text-ash";

function TransactionTable({ transactions, onEdit, onDelete }) {
  const { language } = useLanguage();

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title={language === "id" ? "Belum Ada Transaksi" : "No Transactions Yet"}
        description={
          language === "id"
            ? "Buat transaksi pertama Anda untuk mulai melacak keuangan."
            : "Create your first transaction to start tracking your finances."
        }
      />
    );
  }

  return (
    <Card padding="p-0" className="overflow-hidden">
      <div className="scroll-area overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-steel">
            <tr>
              <th scope="col" className={`${headerCell} text-left`}>
                {language === "id" ? "Judul" : "Title"}
              </th>

              <th scope="col" className={`${headerCell} text-left`}>
                {language === "id" ? "Dompet" : "Wallet"}
              </th>

              <th scope="col" className={`${headerCell} text-left`}>
                {language === "id" ? "Kategori" : "Category"}
              </th>

              <th scope="col" className={`${headerCell} text-left`}>
                {language === "id" ? "Tipe" : "Type"}
              </th>

              <th scope="col" className={`${headerCell} text-right`}>
                {language === "id" ? "Jumlah" : "Amount"}
              </th>

              <th scope="col" className={`${headerCell} text-center`}>
                {language === "id" ? "Aksi" : "Action"}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-steel/60">
            {transactions.map((transaction) => {
              const isIncome = transaction.type === "INCOME";

              return (
                <tr key={transaction.id} className="transition-colors hover:bg-white/3">
                  <td className="px-6 py-4 text-body font-medium text-porcelain">
                    {transaction.title}
                  </td>

                  <td className="px-6 py-4 text-body text-ash">{transaction.wallet?.name}</td>

                  <td className="px-6 py-4 text-body text-ash">{transaction.category?.name}</td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 text-body text-ash">
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full ${isIncome ? "bg-income" : "bg-expense"}`}
                      />
                      {isIncome
                        ? language === "id"
                          ? "Pemasukan"
                          : "Income"
                        : language === "id"
                          ? "Pengeluaran"
                          : "Expense"}
                    </span>
                  </td>

                  <td
                    className={`px-6 py-4 text-right text-body font-semibold whitespace-nowrap ${
                      isIncome ? "text-income" : "text-expense"
                    }`}
                  >
                    {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 px-0"
                        aria-label={`${language === "id" ? "Ubah" : "Edit"} ${transaction.title}`}
                        onClick={() => onEdit(transaction)}
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 px-0 hover:text-expense"
                        aria-label={`${language === "id" ? "Hapus" : "Delete"} ${transaction.title}`}
                        onClick={() => onDelete(transaction)}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default memo(TransactionTable);

import { ArrowDownCircle, ArrowUpCircle, MoreHorizontal, Receipt } from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button/Button";
import EmptyState from "@/components/ui/EmptyState";

import formatCurrency from "@/utils/formatCurrency";

import { useLanguage } from "@/contexts/LanguageContext";

function RecentTransaction({ transactions }) {
  const { language } = useLanguage();

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-zinc-900 dark:text-white">
            {language === "id" ? "Transaksi Terbaru" : "Recent Transactions"}
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {language === "id" ? "Aktivitas terbaru Anda" : "Your latest activity"}
          </p>
        </div>

        <Button variant="ghost" size="sm" className="rounded-xl">
          <MoreHorizontal size={18} />
        </Button>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          icon={Receipt}

          title={language === "id" ? "Belum Ada Transaksi" : "No Transactions Yet"}

          description={
            language === "id"
              ? "Mulai mencatat pemasukan dan pengeluaran Anda untuk melihat aktivitas terbaru."
              : "Start recording your income and expenses to see your latest activity."
          }

          className="h-56"
        />
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "INCOME";

            return (
              <div
                key={transaction.id}

                className="flex flex-col gap-4 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-zinc-200 hover:bg-zinc-50 sm:flex-row sm:items-center sm:justify-between dark:hover:border-zinc-800 dark:hover:bg-zinc-950"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                      isIncome
                        ? `bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400`
                        : `bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400`
                    } `}
                  >
                    {isIncome ? <ArrowDownCircle size={22} /> : <ArrowUpCircle size={22} />}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-zinc-900 dark:text-white">
                      {transaction.title}
                    </h3>

                    <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                      {transaction.category?.name ?? "-"}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <p
                    className={`font-semibold ${
                      isIncome
                        ? `text-green-600 dark:text-green-400`
                        : `text-red-600 dark:text-red-400`
                    } `}
                  >
                    {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
                  </p>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {new Date(transaction.transactionDate).toLocaleDateString(
                      language === "id" ? "id-ID" : "en-US",

                      {
                        day: "2-digit",

                        month: "short",

                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

export default RecentTransaction;

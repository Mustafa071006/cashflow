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
          <h2 className="truncate font-display text-product-label font-semibold text-porcelain">
            {language === "id" ? "Transaksi Terbaru" : "Recent Transactions"}
          </h2>

          <p className="mt-1 text-body text-ash">
            {language === "id" ? "Aktivitas terbaru Anda" : "Your latest activity"}
          </p>
        </div>

        <Button variant="ghost" size="sm" aria-label="More">
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

          className="h-56 bg-obsidian"
        />
      ) : (
        <div className="divide-y divide-steel/70">
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "INCOME";

            return (
              <div
                key={transaction.id}

                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-obsidian ${
                      isIncome ? `text-income` : `text-expense`
                    }`}
                  >
                    {isIncome ? (
                      <ArrowDownCircle size={18} strokeWidth={1.75} />
                    ) : (
                      <ArrowUpCircle size={18} strokeWidth={1.75} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-body font-semibold text-porcelain">
                      {transaction.title}
                    </h3>

                    <p className="truncate text-utility text-ash">
                      {transaction.category?.name ?? "-"}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <p
                    className={`text-body font-semibold ${isIncome ? `text-income` : `text-expense`}`}
                  >
                    {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
                  </p>

                  <p className="text-utility text-ash">
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

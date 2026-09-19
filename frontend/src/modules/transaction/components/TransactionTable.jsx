import { memo } from "react";
import {
  Pencil,
  Trash2,
  Receipt,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button/Button";
import EmptyState from "@/components/ui/EmptyState";

import formatCurrency from "@/utils/formatCurrency";
import { useLanguage } from "@/contexts/LanguageContext";


function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}) {
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
    <Card
      padding="p-0"
      className="overflow-hidden"
    >

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead
            className="
              border-b
              border-zinc-200
              bg-zinc-50
              dark:border-zinc-800
              dark:bg-zinc-900
            "
          >

            <tr>

              <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {language === "id" ? "Judul" : "Title"}
              </th>


              <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {language === "id" ? "Dompet" : "Wallet"}
              </th>


              <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {language === "id" ? "Kategori" : "Category"}
              </th>


              <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {language === "id" ? "Tipe" : "Type"}
              </th>


              <th scope="col" className="px-6 py-4 text-right text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {language === "id" ? "Jumlah" : "Amount"}
              </th>


              <th scope="col" className="px-6 py-4 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {language === "id" ? "Aksi" : "Action"}
              </th>


            </tr>

          </thead>



          <tbody>

            {transactions.map((transaction) => (

              <tr
                key={transaction.id}
                className="
                  border-b
                  border-zinc-100
                  transition-colors
                  hover:bg-zinc-50
                  dark:border-zinc-800
                  dark:hover:bg-zinc-900/60
                "
              >

                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                  {transaction.title}
                </td>


                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
                  {transaction.wallet?.name}
                </td>


                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
                  {transaction.category?.name}
                </td>


                <td className="px-6 py-4">

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold

                      ${
                        transaction.type === "INCOME"
                          ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                      }
                    `}
                  >

                    {transaction.type === "INCOME"
                      ? (language === "id" ? "Pemasukan" : "Income")
                      : (language === "id" ? "Pengeluaran" : "Expense")}

                  </span>

                </td>


                <td className="px-6 py-4 text-right font-semibold text-zinc-900 dark:text-white">
                  {formatCurrency(transaction.amount)}
                </td>


                <td className="px-6 py-4">

                  <div className="flex justify-center gap-2">

                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`${language === "id" ? "Ubah" : "Edit"} ${transaction.title}`}
                      onClick={() =>
                        onEdit(transaction)
                      }
                    >

                      <Pencil size={16} aria-hidden="true" />

                    </Button>



                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`${language === "id" ? "Hapus" : "Delete"} ${transaction.title}`}
                      onClick={() =>
                        onDelete(transaction)
                      }
                    >

                      <Trash2 size={16} aria-hidden="true" />

                    </Button>


                  </div>

                </td>


              </tr>

            ))}

          </tbody>


        </table>

      </div>

    </Card>
  );
}


export default memo(TransactionTable);
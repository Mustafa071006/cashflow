import { useEffect, useState } from "react";
import * as TransactionService from "../services/transactionService";

export default function useTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const data =
        await TransactionService.getTransactions();

      setTransactions(data);
    } catch (error) {
      console.error(
        "Gagal mengambil transaksi:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (
    transactionData
  ) => {
    await TransactionService.createTransaction(
      transactionData
    );

    await fetchTransactions();
  };

  const updateTransaction = async (
    id,
    transactionData
  ) => {
    await TransactionService.updateTransaction(
      id,
      transactionData
    );

    await fetchTransactions();
  };

  const removeTransaction = async (id) => {
    await TransactionService.deleteTransaction(id);

    await fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    removeTransaction,
  };
}
import { useState } from "react";
import toast from "react-hot-toast";

import useTransaction from "../hooks/useTransaction";
import useWallet from "@/modules/wallet/hooks/useWallet";
import useCategory from "@/modules/category/hooks/useCategory";

import TransactionHeader from "../components/TransactionHeader";
import TransactionTable from "../components/TransactionTable";
import AddTransactionModal from "../components/AddTransactionModal";

import ConfirmModal from "@/components/common/ConfirmModal";
import Skeleton from "@/components/ui/Skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

function TransactionPage() {
  const {
    transactions,
    loading,
    createTransaction,
    updateTransaction,
    removeTransaction,
  } = useTransaction();

  const { wallets } = useWallet();
  const { categories } = useCategory();
  const { language } = useLanguage();

  const [openModal, setOpenModal] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const handleCreateTransaction = async (data) => {
    try {
      await createTransaction({
        ...data,
        amount: Number(data.amount),
        walletId: Number(data.walletId),
        categoryId: Number(data.categoryId),
      });

      toast.success(
        language === "id"
          ? "Transaksi berhasil dibuat"
          : "Transaction created successfully"
      );

      setOpenModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setEditOpen(true);
  };

  const handleDeleteClick = (transaction) => {
    setSelectedTransaction(transaction);
    setDeleteOpen(true);
  };

  const handleDeleteTransaction = async () => {
    try {
      setDeleteLoading(true);

      await removeTransaction(
        selectedTransaction.id
      );

      toast.success(
        language === "id"
          ? "Transaksi berhasil dihapus"
          : "Transaction deleted successfully"
      );

      setDeleteOpen(false);
      setSelectedTransaction(null);
    } catch (err) {
      console.error(err);

      toast.error(
        language === "id"
          ? "Gagal menghapus transaksi"
          : "Failed to delete transaction"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const loadingLabel = language === "id" ? "Memuat transaksi" : "Loading transactions";

  if (loading) {
    return (
      <div role="status" aria-live="polite" aria-label={loadingLabel} className="space-y-6">
        <span className="sr-only">{loadingLabel}…</span>
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <>
      <TransactionHeader
        onAddTransaction={() =>
          setOpenModal(true)
        }
      />

      <TransactionTable
        transactions={transactions}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <AddTransactionModal
        open={openModal || editOpen}
        onClose={() => {
          setOpenModal(false);
          setEditOpen(false);
          setSelectedTransaction(null);
        }}
        wallets={wallets}
        categories={categories}
        transaction={selectedTransaction}
        createTransaction={
          handleCreateTransaction
        }
        updateTransaction={
          updateTransaction
        }
      />

      <ConfirmModal
        open={deleteOpen}
        title={language === "id" ? "Hapus Transaksi" : "Delete Transaction"}
        description={
          language === "id"
            ? `Apakah Anda yakin ingin menghapus transaksi "${selectedTransaction?.title}"?`
            : `Are you sure you want to delete the transaction "${selectedTransaction?.title}"?`
        }
        onClose={() =>
          setDeleteOpen(false)
        }
        onConfirm={
          handleDeleteTransaction
        }
        loading={deleteLoading}
      />
    </>
  );
}

export default TransactionPage;
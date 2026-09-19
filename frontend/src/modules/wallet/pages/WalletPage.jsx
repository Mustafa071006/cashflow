import { useState } from "react";

import useWallet from "../hooks/useWallet";
import toast from "react-hot-toast";
import WalletHeader from "../components/WalletHeader";
import WalletGrid from "../components/WalletGrid";
import AddWalletModal from "../components/AddWalletModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import Skeleton from "@/components/ui/Skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

function WalletPage() {
  const { wallets, loading, createWallet, removeWallet, updateWallet,} = useWallet();
  const { language } = useLanguage();
  const [openModal, setOpenModal] = useState(false);

  // STATE DELETE
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteClick = (wallet) => {
  setSelectedWallet(wallet);
  setDeleteOpen(true);
};

  const handleEditClick = (wallet) => {
  setSelectedWallet(wallet);
  setEditOpen(true);
};

const handleDeleteWallet = async () => {
  try {
    setDeleteLoading(true);

    await removeWallet(selectedWallet.id);
    toast.success(language === "id" ? "Dompet berhasil dihapus" : "Wallet deleted successfully");
    setDeleteOpen(false);
    setSelectedWallet(null);
  } catch (error) {
    console.error(error);
    toast.error(language === "id" ? "Gagal menghapus dompet" : "Failed to delete wallet");
  } finally {
    setDeleteLoading(false);
  }
};

  const loadingLabel = language === "id" ? "Memuat dompet" : "Loading wallets";

  if (loading) {
    return (
      <div role="status" aria-live="polite" aria-label={loadingLabel} className="space-y-6">
        <span className="sr-only">{loadingLabel}…</span>
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  return (
    <>
      <WalletHeader
        wallets={wallets}
        onAddWallet={() => setOpenModal(true)}
      />

      <WalletGrid
        wallets={wallets}
        onDelete={handleDeleteClick}
        onEdit={handleEditClick}
      />

      <AddWalletModal
        open={openModal || editOpen}
        onClose={() => {
        setOpenModal(false);
        setEditOpen(false);
        setSelectedWallet(null);}}
        wallet={selectedWallet}
        createWallet={createWallet}
        updateWallet={updateWallet}
        />

      <ConfirmModal
  open={deleteOpen}
  title={language === "id" ? "Hapus Dompet" : "Delete Wallet"}
  description={
    language === "id"
      ? `Apakah Anda yakin ingin menghapus dompet "${selectedWallet?.name}"?`
      : `Are you sure you want to delete the wallet "${selectedWallet?.name}"?`
  }
  onClose={() => setDeleteOpen(false)}
  onConfirm={handleDeleteWallet}
  loading={deleteLoading}
/>
    </>
  );
}

export default WalletPage;
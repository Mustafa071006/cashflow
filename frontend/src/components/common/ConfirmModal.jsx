import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import { useLanguage } from "@/contexts/LanguageContext";

function ConfirmModal({ open, title, description, onClose, onConfirm, loading = false }) {
  const { language } = useLanguage();

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <p className="mb-8 text-body text-ash">{description}</p>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          {language === "id" ? "Batal" : "Cancel"}
        </Button>

        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading
            ? language === "id"
              ? "Menghapus..."
              : "Deleting..."
            : language === "id"
              ? "Hapus"
              : "Delete"}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;

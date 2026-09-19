import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import { useLanguage } from "@/contexts/LanguageContext";


function ConfirmModal({
  open,
  title,
  description,
  onClose,
  onConfirm,
  loading = false,
}) {


  const {
    language,
  } = useLanguage();



  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
    >


      <p
        className="
          mb-8
          text-sm
          text-zinc-500

          dark:text-zinc-400
        "
      >
        {description}
      </p>



      <div
        className="
          flex
          justify-end
          gap-3
        "
      >


        <Button
          variant="secondary"
          onClick={onClose}
        >
          {
            language === "id"
              ? "Batal"
              : "Cancel"
          }
        </Button>




        <Button

          onClick={onConfirm}

          disabled={loading}

          className="
            bg-red-600
            text-white

            hover:bg-red-700

            dark:bg-red-500
            dark:hover:bg-red-600
          "

        >

          {
            loading

              ? (
                  language === "id"
                    ? "Menghapus..."
                    : "Deleting..."
                )

              : (
                  language === "id"
                    ? "Hapus"
                    : "Delete"
                )
          }


        </Button>


      </div>


    </Modal>
  );
}


export default ConfirmModal;
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { useLanguage } from "@/contexts/LanguageContext";

import en from "@/locales/en";
import id from "@/locales/id";

import {
  formatNumberInput,
  unformatNumberInput,
} from "@/utils/formatNumberInput";


function AddWalletModal({
  open,
  onClose,
  createWallet,
  updateWallet,
  wallet = null,
}) {


  const {
    register,
    handleSubmit,
    reset,
  } = useForm();



  const {
    language,
  } = useLanguage();



  const t =
    language === "id"
      ? id
      : en;



  const [balance, setBalance] = useState("");



  useEffect(() => {

    if (!open) return;


    if (wallet) {

      reset({
        name: wallet.name,
      });


      setBalance(
        formatNumberInput(wallet.balance)
      );


    } else {

      reset({
        name: "",
      });


      setBalance("");

    }

  }, [
    wallet,
    open,
    reset,
  ]);




  const onSubmit = async (data) => {

    try {

      const payload = {
        name: data.name,

        balance: Number(
          unformatNumberInput(balance)
        ),
      };



      if (wallet) {

        await updateWallet(
          wallet.id,
          payload
        );


        toast.success(
          language === "id"
            ? "Dompet berhasil diperbarui"
            : "Wallet updated successfully"
        );


      } else {


        await createWallet(payload);


        toast.success(
          language === "id"
            ? "Dompet berhasil dibuat"
            : "Wallet created successfully"
        );

      }



      reset();

      setBalance("");

      onClose();



    } catch (error) {

      console.error(error);


      toast.error(
        error.response?.data?.message ||
        error.message ||
        (
          language === "id"
            ? "Gagal menyimpan dompet"
            : "Failed to save wallet"
        )
      );

    }

  };




  return (

    <Modal

      open={open}

      title={
        wallet
          ? (
              language === "id"
                ? "Edit Dompet"
                : "Edit Wallet"
            )
          : (
              language === "id"
                ? "Buat Dompet"
                : "Create Wallet"
            )
      }

      onClose={onClose}

    >


      <form

        onSubmit={
          handleSubmit(onSubmit)
        }

        className="space-y-6"

      >



        <Input

          label={
            language === "id"
              ? "Nama Dompet"
              : "Wallet Name"
          }


          placeholder={
            language === "id"
              ? "contoh: Cash, Bank BCA, DANA"
              : "e.g. Cash, Bank BCA, DANA"
          }


          {...register(
            "name",
            {
              required:
                language === "id"
                  ? "Nama dompet wajib diisi"
                  : "Wallet name is required",
            }
          )}

        />




        <Input

          label={
            language === "id"
              ? "Saldo Awal"
              : "Initial Balance"
          }


          placeholder={
            language === "id"
              ? "contoh: 50000"
              : "e.g. 50000"
          }


          value={balance}


          onChange={(e) =>
            setBalance(
              formatNumberInput(
                e.target.value
              )
            )
          }

        />




        <div
          className="
            flex
            flex-col-reverse
            gap-3
            pt-2

            sm:flex-row
            sm:justify-end
          "
        >


          <Button

            type="button"

            variant="secondary"

            onClick={onClose}

            className="w-full sm:w-auto"

          >

            {t.common.cancel}

          </Button>





          <Button

            type="submit"

            className="w-full sm:w-auto"

          >

            {
              wallet
                ? (
                    language === "id"
                      ? "Perbarui Dompet"
                      : "Update Wallet"
                  )
                : (
                    language === "id"
                      ? "Buat Dompet"
                      : "Create Wallet"
                  )
            }

          </Button>



        </div>



      </form>


    </Modal>

  );
}


export default AddWalletModal;
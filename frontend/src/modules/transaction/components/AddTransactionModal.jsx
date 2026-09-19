import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";

import { useLanguage } from "@/contexts/LanguageContext";

import en from "@/locales/en";
import id from "@/locales/id";

import {
  formatNumberInput,
  unformatNumberInput,
} from "@/utils/formatNumberInput";


function AddTransactionModal({
  open,
  onClose,
  wallets,
  categories,
  createTransaction,
  updateTransaction,
  transaction = null,
}) {


  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      transactionDate: new Date()
        .toISOString()
        .split("T")[0],
    },
  });



  const {
    language,
  } = useLanguage();



  const t =
    language === "id"
      ? id
      : en;



  const [amount, setAmount] = useState("");

  const [type, setType] = useState("EXPENSE");





  useEffect(() => {

    if (!open) return;


    if (transaction) {

      reset({
        title: transaction.title,
        walletId: transaction.walletId,
        categoryId: transaction.categoryId,
        transactionDate:
          transaction.transactionDate?.split("T")[0],
        note: transaction.note ?? "",
      });


      setAmount(
        formatNumberInput(
          String(transaction.amount)
        )
      );


      setType(transaction.type);


    } else {


      reset({
        title: "",
        walletId: "",
        categoryId: "",
        transactionDate: new Date()
          .toISOString()
          .split("T")[0],
        note: "",
      });


      setAmount("");

      setType("EXPENSE");

    }


  }, [
    transaction,
    open,
    reset,
  ]);






  const onSubmit = async (data) => {

    try {

      const payload = {
        ...data,

        amount: Number(
          unformatNumberInput(amount)
        ),

        type,

        walletId: Number(data.walletId),

        categoryId: Number(data.categoryId),
      };



      if (transaction) {

        await updateTransaction(
          transaction.id,
          payload
        );


      } else {

        await createTransaction(payload);

      }



      reset({

        title: "",

        walletId: "",

        categoryId: "",

        note: "",

        transactionDate: new Date()
          .toISOString()
          .split("T")[0],

      });



      setAmount("");

      setType("EXPENSE");

      onClose();



    } catch (err) {

      console.error(err);

    }

  };






  return (

    <Modal

      open={open}

      onClose={onClose}

      title={
        transaction
          ? (
              language === "id"
                ? "Edit Transaksi"
                : "Edit Transaction"
            )
          : (
              language === "id"
                ? "Tambah Transaksi"
                : "Add Transaction"
            )
      }

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
              ? "Judul"
              : "Title"
          }


          placeholder={
            language === "id"
              ? "Contoh: Makan, Gaji, Belanja"
              : "Example: Lunch, Salary, Shopping"
          }


          {...register("title")}

        />





        <Input

          label={
            language === "id"
              ? "Jumlah"
              : "Amount"
          }


          placeholder="0"


          value={amount}


          onChange={(e) =>
            setAmount(
              formatNumberInput(
                e.target.value
              )
            )
          }

        />






        <div className="space-y-2">


          <label
            className="
              text-sm
              font-medium
              text-zinc-700
              dark:text-zinc-200
            "
          >

            {
              language === "id"
                ? "Tipe"
                : "Type"
            }

          </label>





          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >



            <button

              type="button"

              onClick={() =>
                setType("EXPENSE")
              }


              className={`

                rounded-xl

                border

                px-4

                py-3

                text-sm

                font-medium

                transition


                ${
                  type === "EXPENSE"

                    ? `
                      border-red-500
                      bg-red-500/10
                      text-red-500
                    `

                    : `
                      border-zinc-300
                      text-zinc-500
                      hover:bg-zinc-100

                      dark:border-zinc-700
                      dark:text-zinc-400
                      dark:hover:bg-zinc-800
                    `
                }

              `}

            >

              {
                language === "id"
                  ? "Pengeluaran"
                  : "Expense"
              }

            </button>





            <button

              type="button"

              onClick={() =>
                setType("INCOME")
              }


              className={`

                rounded-xl

                border

                px-4

                py-3

                text-sm

                font-medium

                transition


                ${
                  type === "INCOME"

                    ? `
                      border-green-500
                      bg-green-500/10
                      text-green-500
                    `

                    : `
                      border-zinc-300
                      text-zinc-500
                      hover:bg-zinc-100

                      dark:border-zinc-700
                      dark:text-zinc-400
                      dark:hover:bg-zinc-800
                    `
                }

              `}

            >

              {
                language === "id"
                  ? "Pemasukan"
                  : "Income"
              }

            </button>



          </div>


        </div>





        <Select

          label={
            language === "id"
              ? "Dompet"
              : "Wallet"
          }


          {...register("walletId")}

        >

          <option value="">

            {
              language === "id"
                ? "Pilih Dompet"
                : "Select Wallet"
            }

          </option>



          {wallets.map((wallet) => (

            <option
              key={wallet.id}
              value={wallet.id}
            >
              {wallet.name}
            </option>

          ))}


        </Select>






        <Select

          label={
            language === "id"
              ? "Kategori"
              : "Category"
          }


          {...register("categoryId")}

        >

          <option value="">

            {
              language === "id"
                ? "Pilih Kategori"
                : "Select Category"
            }

          </option>



          {categories.map((category) => (

            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>

          ))}


        </Select>






        <Input

          type="date"


          label={
            language === "id"
              ? "Tanggal Transaksi"
              : "Transaction Date"
          }


          {...register("transactionDate")}

        />






        <Input

          label={
            language === "id"
              ? "Catatan"
              : "Note"
          }


          placeholder={
            language === "id"
              ? "Catatan opsional"
              : "Optional note"
          }


          {...register("note")}

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
              transaction

                ? (
                    language === "id"
                      ? "Perbarui Transaksi"
                      : "Update Transaction"
                  )

                : (
                    language === "id"
                      ? "Simpan"
                      : "Save"
                  )
            }


          </Button>



        </div>




      </form>


    </Modal>


  );
}


export default AddTransactionModal;
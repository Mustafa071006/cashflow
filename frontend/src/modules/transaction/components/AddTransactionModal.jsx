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
          <p id="transaction-type-label" className="text-utility font-semibold text-ash">
            {language === "id" ? "Tipe" : "Type"}
          </p>

          <div
            role="radiogroup"
            aria-labelledby="transaction-type-label"
            className="grid grid-cols-2 gap-1 rounded-full border border-slate bg-white/4 p-1"
          >
            <button
              type="button"
              role="radio"
              aria-checked={type === "EXPENSE"}
              onClick={() => setType("EXPENSE")}
              className={`flex h-9 items-center justify-center gap-2 rounded-full text-body font-medium transition-colors ${
                type === "EXPENSE" ? "bg-steel text-porcelain" : "text-ash hover:text-porcelain"
              }`}
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-expense" />
              {language === "id" ? "Pengeluaran" : "Expense"}
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={type === "INCOME"}
              onClick={() => setType("INCOME")}
              className={`flex h-9 items-center justify-center gap-2 rounded-full text-body font-medium transition-colors ${
                type === "INCOME" ? "bg-steel text-porcelain" : "text-ash hover:text-porcelain"
              }`}
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-income" />
              {language === "id" ? "Pemasukan" : "Income"}
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
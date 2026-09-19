import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { useLanguage } from "@/contexts/LanguageContext";

import en from "@/locales/en";
import id from "@/locales/id";


function AddCategoryModal({
  open,
  onClose,
  createCategory,
  updateCategory,
  category = null,
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




  useEffect(() => {

    if (!open) return;



    if (category) {

      reset({
        name: category.name,
        type: category.type,
      });


    } else {

      reset({
        name: "",
        type: "EXPENSE",
      });

    }


  }, [
    open,
    category,
    reset,
  ]);





  const onSubmit = async (data) => {


    if (category) {

      await updateCategory(
        category.id,
        data
      );


    } else {

      await createCategory(data);

    }


    onClose();

  };





  return (

    <Modal

      open={open}

      title={
        category
          ? (
              language === "id"
                ? "Edit Kategori"
                : "Edit Category"
            )
          : (
              language === "id"
                ? "Buat Kategori"
                : "Create Category"
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
              ? "Nama Kategori"
              : "Category Name"
          }


          placeholder={
            language === "id"
              ? "contoh: Makanan, Gaji, Transportasi"
              : "e.g. Food, Salary, Transportation"
          }


          {...register(
            "name",
            {
              required: true,
            }
          )}

        />





        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-zinc-900
              dark:text-white
            "
          >
            {language === "id"
              ? "Tipe"
              : "Type"
            }
          </label>




          <select

            {...register("type")}

            className="
              w-full
              rounded-xl

              border
              border-zinc-300

              bg-white

              p-3

              text-zinc-900

              transition

              focus:border-zinc-900
              focus:outline-none


              dark:border-zinc-700

              dark:bg-zinc-900

              dark:text-white

              dark:focus:border-white
            "

          >


            <option value="INCOME">

              {language === "id"
                ? "Pemasukan"
                : "Income"
              }

            </option>



            <option value="EXPENSE">

              {language === "id"
                ? "Pengeluaran"
                : "Expense"
              }

            </option>



          </select>



        </div>





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
              category
                ? (
                    language === "id"
                      ? "Perbarui Kategori"
                      : "Update Category"
                  )
                : (
                    language === "id"
                      ? "Buat Kategori"
                      : "Create Category"
                  )
            }

          </Button>



        </div>



      </form>


    </Modal>

  );
}


export default AddCategoryModal;
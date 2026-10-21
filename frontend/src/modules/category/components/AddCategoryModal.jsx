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


          <label htmlFor="category-type" className="mb-2 block text-utility font-semibold text-ash">
            {language === "id"
              ? "Tipe"
              : "Type"
            }
          </label>




          <select

            id="category-type"

            {...register("type")}

            className="h-11 w-full rounded-full border border-slate bg-white/4 pr-10 pl-6 text-body text-porcelain transition-colors duration-200 hover:border-ash focus:outline-1 focus:outline-offset-1 focus:outline-apple-blue"

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
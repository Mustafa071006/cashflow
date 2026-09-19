import { Tags } from "lucide-react";

import EmptyState from "@/components/ui/EmptyState";
import CategoryCard from "./CategoryCard";
import { useLanguage } from "@/contexts/LanguageContext";


function CategoryGrid({
  categories,
  onEdit,
  onDelete,
}) {
  const { language } = useLanguage();


  if (categories.length === 0) {

    return (

      <EmptyState
        icon={Tags}
        title={language === "id" ? "Belum Ada Kategori" : "No Categories Yet"}
        description={
          language === "id"
            ? "Buat kategori pertama Anda untuk mengatur transaksi."
            : "Create your first category to organize your transactions."
        }
      />

    );

  }



  return (

    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        2xl:grid-cols-3
      "
    >

      {
        categories.map((category) => (

          <CategoryCard
            key={category.id}
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
          />

        ))
      }

    </div>

  );

}


export default CategoryGrid;
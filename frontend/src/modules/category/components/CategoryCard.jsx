import {
  Pencil,
  Trash2,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";


function CategoryCard({
  category,
  onEdit,
  onDelete,
}) {
  const { language } = useLanguage();

  return (
    <Card
      hover
      className="
        transition-all
        duration-300
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h3
            className="
              text-lg
              font-bold
              text-zinc-900
              dark:text-white
            "
          >
            {category.name}
          </h3>


          <p
            className="
              mt-1
              text-sm
              text-zinc-500
              dark:text-zinc-400
            "
          >
            {
              category.type === "INCOME"
                ? (language === "id" ? "Pemasukan" : "Income")
                : (language === "id" ? "Pengeluaran" : "Expense")
            }
          </p>

        </div>



        <div
          className="
            flex
            gap-2
          "
        >

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onEdit(category)
            }
          >

            <Pencil size={16} />

          </Button>



          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onDelete(category.id)
            }
          >

            <Trash2 size={16} />

          </Button>

        </div>


      </div>


    </Card>
  );
}


export default CategoryCard;
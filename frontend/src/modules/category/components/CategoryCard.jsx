import { Pencil, Trash2 } from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

function CategoryCard({ category, onEdit, onDelete }) {
  const { language } = useLanguage();

  const isIncome = category.type === "INCOME";

  return (
    <Card hover>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-display text-product-label font-semibold text-porcelain">
            {category.name}
          </h3>

          <p className="mt-1.5 flex items-center gap-2 text-body text-ash">
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${isIncome ? "bg-income" : "bg-expense"}`}
            />
            {isIncome
              ? language === "id"
                ? "Pemasukan"
                : "Income"
              : language === "id"
                ? "Pengeluaran"
                : "Expense"}
          </p>
        </div>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            aria-label={language === "id" ? "Edit kategori" : "Edit category"}
            className="w-8 px-0"
            onClick={() => onEdit(category)}
          >
            <Pencil size={15} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            aria-label={language === "id" ? "Hapus kategori" : "Delete category"}
            className="w-8 px-0 hover:text-expense"
            onClick={() => onDelete(category.id)}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default CategoryCard;

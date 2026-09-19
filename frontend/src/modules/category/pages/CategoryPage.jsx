import { useState } from "react";
import toast from "react-hot-toast";

import useCategory from "../hooks/useCategory";

import CategoryHeader from "../components/CategoryHeader";
import CategoryGrid from "../components/CategoryGrid";
import AddCategoryModal from "../components/AddCategoryModal";

import ConfirmModal from "@/components/common/ConfirmModal";
import Skeleton from "@/components/ui/Skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

function CategoryPage() {
  const {
    categories,
    loading,
    createCategory,
    updateCategory,
    removeCategory,
  } = useCategory();

  const { language } = useLanguage();

  const [openModal, setOpenModal] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  };

  const handleDeleteCategory = async () => {
    try {
      setDeleteLoading(true);

      await removeCategory(selectedCategory.id);

      toast.success(
        language === "id" ? "Kategori berhasil dihapus" : "Category deleted successfully",
      );

      setDeleteOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error(error);
      toast.error(language === "id" ? "Gagal menghapus kategori" : "Failed to delete category");
    } finally {
      setDeleteLoading(false);
    }
  };

  const loadingLabel = language === "id" ? "Memuat kategori" : "Loading categories";

  if (loading) {
    return (
      <div role="status" aria-live="polite" aria-label={loadingLabel} className="space-y-6">
        <span className="sr-only">{loadingLabel}…</span>
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </div>
    );
  }

  return (
    <>
      <CategoryHeader
        onAddCategory={() => setOpenModal(true)}
      />

      <CategoryGrid
        categories={categories}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <AddCategoryModal
        open={openModal || editOpen}
        onClose={() => {
          setOpenModal(false);
          setEditOpen(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
        createCategory={createCategory}
        updateCategory={updateCategory}
      />

      <ConfirmModal
        open={deleteOpen}
        title={language === "id" ? "Hapus Kategori" : "Delete Category"}
        description={
          language === "id"
            ? `Apakah Anda yakin ingin menghapus kategori "${selectedCategory?.name}"?`
            : `Are you sure you want to delete the category "${selectedCategory?.name}"?`
        }
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteCategory}
        loading={deleteLoading}
      />
    </>
  );
}

export default CategoryPage;
import { useEffect, useState } from "react";
import * as CategoryService from "../services/categoryService";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await CategoryService.getCategories();

      setCategories(data);
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    await CategoryService.createCategory(categoryData);
    await fetchCategories();
  };

  const updateCategory = async (id, categoryData) => {
    await CategoryService.updateCategory(id, categoryData);
    await fetchCategories();
  };

  const removeCategory = async (id) => {
    await CategoryService.deleteCategory(id);
    await fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, fetchCategories, createCategory, updateCategory, removeCategory, };
}
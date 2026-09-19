import CategoryService from "../services/categoryService.js";

class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const userId = req.user.id;

      const categories = await CategoryService.findAllCategoriesByUser(userId);

      return res.status(200).json({
        success: true,

        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      const category = await CategoryService.findCategoryById(id, userId);

      if (!category) {
        return res.status(404).json({
          success: false,

          message: "Kategori tidak ditemukan",
        });
      }

      return res.status(200).json({
        success: true,

        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async createCategory(req, res) {
    try {
      const { name, type, icon } = req.body;

      const userId = req.user.id;

      const existingCategory = await CategoryService.findCategoryByName(
        userId,
        name,
      );

      if (existingCategory) {
        return res.status(400).json({
          success: false,

          message: `Kategori ${name} sudah ada.`,
        });
      }

      const category = await CategoryService.createCategory({
        name,

        type,

        icon,

        userId,
      });

      return res.status(201).json({
        success: true,

        message: "Kategori berhasil dibuat",

        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;

      const { name, type, icon } = req.body;

      const userId = req.user.id;

      const category = await CategoryService.findCategoryById(id, userId);

      if (!category) {
        return res.status(404).json({
          success: false,

          message: "Kategori tidak ditemukan",
        });
      }

      if (name && name !== category.name) {
        const existingCategory = await CategoryService.findCategoryByName(
          userId,
          name,
        );

        if (existingCategory) {
          return res.status(400).json({
            success: false,

            message: `Kategori ${name} sudah ada.`,
          });
        }
      }

      await CategoryService.updateCategory(id, userId, {
        name,
        type,
        icon,
      });

      const updatedCategory = await CategoryService.findCategoryById(
        id,
        userId,
      );

      return res.status(200).json({
        success: true,

        message: "Kategori berhasil diperbarui",

        data: updatedCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      const category = await CategoryService.findCategoryById(id, userId);

      if (!category) {
        return res.status(404).json({
          success: false,

          message: "Kategori tidak ditemukan",
        });
      }

      await CategoryService.deleteCategory(id, userId);

      return res.status(200).json({
        success: true,

        message: "Kategori berhasil dihapus",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }
}

export default CategoryController;

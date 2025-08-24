import {
  fetchAllProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductCategories,
  fetchAvailableProductsByFranchise
} from '../api/productApi';

export const ProductService = {
  getAll: fetchAllProducts,
  getById: fetchProductById,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
  getCategories: fetchProductCategories,
  getAvailableByFranchise: fetchAvailableProductsByFranchise
};

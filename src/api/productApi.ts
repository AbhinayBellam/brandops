import axiosInstance from './axiosInstance';


export const fetchAllProducts = async (filters?: { search?: string; category?: string }) => {
  const response = await axiosInstance.get('/products', { params: filters });
  return response.data;
};

export const fetchAvailableProductsByFranchise = async (franchiseId: string) => {
  if (!franchiseId) throw new Error('Franchise ID is required');
  const response = await axiosInstance.get(`/products/available/${franchiseId}`);
  return response.data;
};

export const fetchProductCategories = async () => {
  const response = await axiosInstance.get('/products/categories/list');
  return response.data; // Should return array like ["Electronics", "Fashion"]
};


export const fetchProductById = async (id: string) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData: any) => {
  const response = await axiosInstance.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id: string, productData: any) => {
  const response = await axiosInstance.put(`/products/${id}`, productData);
  return response.data;
};


export const deleteProduct = async (id: string) => {
  if (!id) throw new Error('Product ID is missing');
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};

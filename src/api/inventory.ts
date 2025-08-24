import axios from './axiosInstance';

// GET: All inventory grouped by franchise
export const getAllInventoryGrouped = () => axios.get('/inventory');

// export const getMyInventory = () => axios.get('/inventory/my');

// GET: Inventory by a specific franchise ID
export const getInventoryByFranchise = (franchiseId: string) =>
  axios.get(`/inventory/${franchiseId}`);



// POST: Add new stock or update existing
export const addOrUpdateStock = (data: {
  franchiseId: string;
  productId: string;
  quantity: number;
}) => axios.post('/inventory', data);

// PUT: Update quantity of specific stock item
export const updateStock = (
  stockId: string,
  data: { quantity: number }
) => axios.put(`/inventory/${stockId}`, data);

// DELETE: Delete stock by ID (if needed)
export const deleteStock = (stockId: string) =>
  axios.delete(`/inventory/${stockId}`);

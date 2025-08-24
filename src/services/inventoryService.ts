import {
  getAllInventoryGrouped,
  getInventoryByFranchise,
  addOrUpdateStock,
  updateStock,
  deleteStock,
} from '../api/inventory';

// Fetch all inventory grouped by franchise
export const fetchAllInventory = async () => {
  try {
    const response = await getAllInventoryGrouped();
    return response.data;
  } catch (error: any) {
    console.error('Error fetching all inventory:', error?.response?.data || error.message);
    throw error;
  }
};

// Fetch inventory for a specific franchise
export const fetchInventoryByFranchise = async (franchiseId: string) => {
  try {
    const response = await getInventoryByFranchise(franchiseId);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching franchise inventory:', error?.response?.data || error.message);
    throw error;
  }
};



// Create or update stock (Franchisor)
export const createOrUpdateStock = async (data: {
  franchiseId: string;
  productId: string;
  quantity: number;
}) => {
  try {
    const response = await addOrUpdateStock(data);
    return response.data;
  } catch (error: any) {
    console.error('Error adding/updating stock:', error?.response?.data || error.message);
    throw error;
  }
};

// Update quantity of existing stock (Franchisor)
export const modifyStock = async (
  stockId: string,
  data: { quantity: number }
) => {
  try {
    const response = await updateStock(stockId, data);
    return response.data;
  } catch (error: any) {
    console.error('Error updating stock quantity:', error?.response?.data || error.message);
    throw error;
  }
};

// Delete a stock record (Franchisee)
export const removeStock = async (stockId: string) => {
  try {
    const response = await deleteStock(stockId);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting stock:', error?.response?.data || error.message);
    throw error;
  }
};

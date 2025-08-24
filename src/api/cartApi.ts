import axiosInstance from "./axiosInstance";

// Get cart for current user
export const getCart = async () => {
  const response = await axiosInstance.get("/cart");
  return response.data;
};

// Add item to cart
export const addToCart = async (franchiseId: string, productId: string, quantity: number) => {
  const body = { franchiseId, productId, quantity }
  const response = await axiosInstance.post("/cart/", body );
  return response.data;
};

// Update item quantity in cart
export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await axiosInstance.put(`/cart/${productId}`, { productId, quantity });
  return response.data;
};

// Remove item from cart
export const removeCartItem = async (productId: string) => {
  const response = await axiosInstance.delete(`/cart/${productId}`);
  return response.data;
};

// Clear entire cart
export const clearCart = async () => {
  const response = await axiosInstance.delete("/cart/");
  return response.data;
};

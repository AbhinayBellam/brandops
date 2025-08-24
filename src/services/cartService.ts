import { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeCartItem, 
  clearCart 
} from "../api/cartApi";


export const fetchCart = async () => {
  try {
    return await getCart();
  } catch (error: any) {
    console.error("Error fetching cart:", error?.response?.data || error.message);
    throw error;
  }
};


export const addProductToCart = async (franchiseId: string, productId: string, quantity: number) => {
  try {
    return await addToCart(franchiseId, productId, quantity);
  } catch (error: any) {
    console.error("Error adding product to cart:", error?.response?.data || error.message);
    throw error;
  }
};


export const updateProductQuantity = async (productId: string, quantity: number) => {
  try {
    return await updateCartItem(productId, quantity);
  } catch (error: any) {
    console.error("Error updating product in cart:", error?.response?.data || error.message);
    throw error;
  }
};

export const removeProductFromCart = async (productId: string) => {
  try {
    return await removeCartItem(productId);
  } catch (error: any) {
    console.error("Error removing product from cart:", error?.response?.data || error.message);
    throw error;
  }
};


export const emptyCart = async () => {
  try {
    return await clearCart();
  } catch (error: any) {
    console.error("Error clearing cart:", error?.response?.data || error.message);
    throw error;
  }
};

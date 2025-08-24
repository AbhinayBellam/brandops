// src/types/orderTypes.ts
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderPayload {
  customerId: string;
  franchiseId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
}

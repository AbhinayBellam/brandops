// src/api/orderApi.ts
import axiosInstance from './axiosInstance';
import { OrderPayload } from '../types/orderTypes'// define this type based on your data

export const createOrder = async (orderData: OrderPayload) => {
  const response = await axiosInstance.post('/orders', orderData);
  return response.data;
};

export const getOrdersByCustomer = async (customerId: string) => {
  const response = await axiosInstance.get(`/orders/customer/${customerId}`);
  return response.data;
};

export const getOrderById = async (orderId: string) => {
  const response = await axiosInstance.get(`/orders/${orderId}`);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axiosInstance.get(`/orders`);
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await axiosInstance.put(`/orders/${orderId}/status`, { status });
  return response.data;
};

export const deleteOrder = async (orderId: string) => {
  const response = await axiosInstance.delete(`/orders/${orderId}`);
  return response.data;
};

// src/services/orderService.ts
import {
  createOrder,
  getOrdersByCustomer,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from '../api/orderApi';

export const OrderService = {
  create: createOrder,
  getByCustomer: getOrdersByCustomer,
  getById: getOrderById,
  getAll: getAllOrders,
  updateStatus: updateOrderStatus,
  delete: deleteOrder,
};

import axiosInstance from './axiosInstance';
import { StockRequestPayload, QuickAddPayload } from '../types/stockRequestTypes';

/**
 * Safely unwrap API responses:
 * - { data: { data: ... } }
 * - { data: ... }
 * - Fallback to raw res if nothing matches
 */
const unwrap = <T>(res: any): T => {
  if (res?.data?.data !== undefined) return res.data.data as T;
  if (res?.data !== undefined) return res.data as T;
  return res as T;
};

const stockRequestApi = {
  createStockRequest: async (payload: StockRequestPayload) =>
    unwrap(await axiosInstance.post('/stock-requests', payload)),

  quickAddStockRequest: async (payload: QuickAddPayload) =>
    unwrap(await axiosInstance.post('/stock-requests/quick-add', payload)),

  getAllStockRequests: async () =>
    unwrap(await axiosInstance.get('/stock-requests')),

  getStockRequestsByFranchise: async (franchiseId: string) =>
    unwrap(await axiosInstance.get(`/stock-requests/franchise/${franchiseId}`)),

  getStockRequestById: async (id: string) =>
    unwrap(await axiosInstance.get(`/stock-requests/${id}`)),

  updateStockRequestStatus: async (
    id: string,
    status: 'Pending' | 'Approved' | 'Rejected'
  ) =>
    unwrap(await axiosInstance.put(`/stock-requests/${id}/status`, { status })),

  deleteStockRequest: async (id: string) =>
    unwrap(await axiosInstance.delete(`/stock-requests/${id}`)),
};

export default stockRequestApi;

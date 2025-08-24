import stockRequestApi from '../api/stockRequestApi';
import { StockRequestPayload, QuickAddPayload } from '../types/stockRequestTypes';

const handleError = (err: any, fallback: string) => {
  const msg = err?.response?.data?.message || err?.message || fallback;
  throw new Error(msg);
};

const stockRequestService = {
  createStockRequest: async (payload: StockRequestPayload) => {
    try {
      return await stockRequestApi.createStockRequest(payload);
    } catch (err) {
      handleError(err, 'Failed to create stock request');
    }
  },

  quickAddStockRequest: async (payload: QuickAddPayload) => {
    try {
      return await stockRequestApi.quickAddStockRequest(payload);
    } catch (err) {
      handleError(err, 'Failed to add product to stock request');
    }
  },

  getAllStockRequests: async () => {
    try {
      return await stockRequestApi.getAllStockRequests();
    } catch (err) {
      handleError(err, 'Failed to fetch stock requests');
    }
  },

  getStockRequestsByFranchise: async (franchiseId: string) => {
    try {
      const data = await stockRequestApi.getStockRequestsByFranchise(franchiseId);
      return Array.isArray(data) ? data : []; // Always return an array
    } catch (err) {
      handleError(err, 'Failed to fetch franchise stock requests');
    }
  },

  getStockRequestById: async (id: string) => {
    try {
      return await stockRequestApi.getStockRequestById(id);
    } catch (err) {
      handleError(err, 'Failed to fetch stock request');
    }
  },

  updateStockRequestStatus: async (
    id: string,
    status: 'Pending' | 'Approved' | 'Rejected'
  ) => {
    try {
      return await stockRequestApi.updateStockRequestStatus(id, status);
    } catch (err) {
      handleError(err, 'Failed to update stock request status');
    }
  },

  deleteStockRequest: async (id: string) => {
    try {
      return await stockRequestApi.deleteStockRequest(id);
    } catch (err) {
      handleError(err, 'Failed to delete stock request');
    }
  },
};

export default stockRequestService;

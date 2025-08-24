export interface StockRequestItem {
  productId: string;
  quantity: number;
}

export interface StockRequestPayload {
  franchiseId: string;
  items: StockRequestItem[];
  comments?: string;
}

export interface QuickAddPayload {
  franchiseId: string;
  productId: string;
  quantity: number;
}

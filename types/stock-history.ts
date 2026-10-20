export type StockHistoryResponse = {
  success: boolean;
  count: number;
  next: boolean;
  previous: boolean;
  data: StockHistory[];
  message: string;
};

export type StockHistory = {
  company_uid: string;
  stock_operation: string;
  stock_quantity: number;
  previous_stock: number;
  current_stock: number;
  previous_in_open: number;
  current_in_open: number;
  updated_by: UpdatedBy;
  created_at: Date;
  updated_at: Date;
  local_sku: string;
};

export type UpdatedBy = "SYSTEM" | "USER";

export type InventoryRequestHistoryResponse = {
  success: boolean;
  data: InventoryRequestHistoryData[];
};

export type InventoryRequestHistoryData = {
  channel_uid: string;
  created_at: Date;
  id: number;
  item_id: string;
  quantity: number;
  request_id: string | number;
  sku: string;
  status: string;
  updated_at: Date;
  request_metadata: { stock_operation: string; invoked_by: string };
};

export type InventorySync = {
  success: boolean;
  data: InventorySyncMarketPlace[];
  sync_status: string;
};

export type InventorySyncMarketPlace = {
  marketplace: string;
  sync_status: string;
  data: SyncDetails[];
};

export type SyncDetails = {
  id: number;
  channel_uid: string;
  sku: string;
  item_id: string;
  quantity: number;
  status: Status;
  request_id: string;
  feed_id?: string;
  created_at: Date;
  updated_at: Date;
  request_metadata?: RequestMetadata;
  variation_id?: number;
};

export type RequestMetadata = {
  stock_operation: StockOperation;
  invoked_by: InvokedBy;
};

export type InvokedBy = "USER" | "SYSTEM";

export type StockOperation = "FULL_STOCK" | "NEW_ORDER_ITEM";

export type Status = "IN_AMAZON_QUEUE" | "REDUNDANT" | "PENDING" | "DONE";

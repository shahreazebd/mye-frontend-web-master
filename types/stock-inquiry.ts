import { Inventory } from "./inventory";

export type StockInquiryResponse = {
  success: boolean;
  count: number;
  next: boolean;
  previous: boolean;
  data: StockInquiryData;
};

export type StockInquiryData = {
  local_sku: string;
  stock: Inventory[];
  order_details: StockInquiryOrderDeatils[];
};

export type StockInquiryOrderDeatils = {
  channel_max_stock: number;
  channel_name: string;
  channel_order_id: string;
  channel_uid: string;
  company_uid: string;
  createdAt: string;
  dispatch_status: string;
  dispatched_at: null | string | Date;
  price: number;
  quantity: number;
  remote_sku: string;
  updatedAt: string;
};

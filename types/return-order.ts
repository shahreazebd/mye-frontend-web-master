import { Channel } from "@/schema/channel";

export type ReturnOrderResponse = {
  success: boolean;
  message: string;
  data: ReturnOrder[];
};

export type ReturnOrder = {
  id: number;
  channel_uid: string;
  order_id: string;
  return_id: string;
  sku: null | string;
  asin: null | string;
  item_id: string;
  item_name: null | string;
  ordered_quantity: null;
  return_quantity: number;
  reason: string;
  status: string;
  order_date: null;
  return_request_date: Date;
  tracking_id: null | string;
  carrier: null | string;
  refund_amount: string;
  currency: "GBP";
  comments: null | string;
  metadata: Metadata;
};

export type Metadata = {
  channel_name?: string;
  state?: string;
  buyer_name?: string;
  reason_type?: string;
  seller_name?: string;
  current_type?: string;
  transaction_id?: string;
  delivery_status?: string;
  buyer_response_due?: Date;
  seller_response_due?: Date;
};

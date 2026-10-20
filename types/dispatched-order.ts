export type DispatchOrdersResponse = {
  success: boolean;
  data: DispatchOrders[];
};

export type DispatchOrders = {
  dispatched_at: string;
  dispatched_by: string;
  channel_uid: string;
  dispatch_id: string;
  order_count: number;
  time: Date;
  channel_name: string;
  channel_type: string;
};

export type DispatchedOrderDetailsResponse = {
  success: boolean;
  data: DispatchedOrderDetails[];
};

export type DispatchedOrderDetails = {
  id: number;
  dispatch_identifier: string;
  dispatched_at: string;
  dispatched_by: string;
  channel_order_id: string;
  market_place: string;
  total: string;
  items: Item[];
  shipping_address: ShippingAddress;
};

export type Item = {
  order_id: number;
  remote_sku: string;
  quantity: number;
  price: string;
  total_amount: string;
};

export type ShippingAddress = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  reference_id: string;
  buyer_name: string;
  post_code: string;
};

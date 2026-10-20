export type CustomerDetailsResponse = {
  success: boolean;
  data: CustomerDetails;
  favourite_items: FavouriteItem[];
};

export type CustomerDetails = {
  buyer_name: string;
  phone: string;
  total_number_of_orders: number;
  total_quantity: number;
  total_spend: number;
  last_order_id: string;
  last_order_date: Date;
  first_order_id: string;
  first_order_date: Date;
  email: null;
  order_details: OrderDetail[];
};

export type OrderDetail = {
  city: string;
  state: string;
  total: number;
  country: string;
  address1: string;
  address2: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  order_items: OrderItem[];
  channel_uuid: string;
  market_place: string;
  purchase_date: Date;
  payment_method: string;
  dispatch_status: string;
  channel_order_id: string;
};

export type OrderItem = {
  price: number;
  quantity: number;
  createdAt: Date;
  local_sku: string;
  updatedAt: Date;
  remote_sku: string;
  total_amount: number;
};

export type FavouriteItem = {
  local_sku: string;
  remote_sku: string;
  total_quantity: number;
};

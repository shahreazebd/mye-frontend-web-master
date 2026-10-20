export interface DispatchOrdersResponse {
  success: boolean;
  page: number;
  limit: number;
  total_orders: number;
  orders_on_current_page: number;
  total_pages: number;
  company_uid: string;
  channel_uid: string;
  dispatch_status: string;
  data: Order[];
}

export interface Order {
  id: number;
  channel_order_id: string;
  payment_status: string;
  payment_method: string;
  purchase_date: string;
  currency: string;
  channel_uid: string;
  company_uid: string;
  total: number;
  dispatch_status: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shipping_address: ShippingAddress;
  channel: Channel | null;
  order_meta: OrderMeta;
}

interface Channel {
  channel_type: string;
  channel_uid: string;
  name: string;
}

export interface OrderItem {
  remote_sku: string;
  quantity: number;
  price: number;
  total_amount: number;
  mapped: boolean;
  local_SKU: string;
  local_product_name: string;
  remote_product_title: string;
  weight: number;
  height: number;
  width: number;
  depth: number;
  image: string;
}

export interface ShippingAddress {
  buyer_name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  post_code: string;
  country: string;
  phone: string;
  email: string | null;
  reference_id: string | null;
  createdAt: string;
  updatedAt: string;
  order_count: number | null;
  quantity: number | null;
  total_spend: number | null;
  first_order_date: string | null;
  currency: string | null;
}

export interface OrderMeta {
  is_prime: boolean;
  is_premium: boolean;
  order_type: string;
  is_business: boolean;
  is_replacement: boolean;
  automated_shipping: AutomatedShipping;
}

export interface AutomatedShipping {
  AutomatedCarrier: string;
  AutomatedShipMethod: string;
  HasAutomatedShippingSettings: boolean;
}

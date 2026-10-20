export type CustomerResponse = {
  success: boolean;
  count: number;
  next: boolean;
  previous: boolean;
  data: Customer[];
};

export type Customer = {
  id: number;
  order_id: number;
  buyer_name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  post_code: string;
  country: string;
  phone: string;
  reference_id: null | string;
  email: null | string;
  createdAt: Date;
  updatedAt: Date;
  total_number_of_order: number;
  quantity: number;
  total_spend: number;
  last_order_id: string;
  market_place: string;
};

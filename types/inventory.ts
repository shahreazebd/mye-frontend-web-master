export type InventoryResponse = {
  success: boolean;
  count: number;
  next: boolean;
  previous: boolean;
  data: Inventory[];
  location: Location;
};

export type Inventory = {
  id: number;
  local_product: LocalProduct;
  stock_level: number;
  in_open: number;
  minimum_quantity: number;
  location: number;
  company_uid: string;
  order_threshold: number;
  order_threshold_status: string;
  order_threshold_count: number;
  order_threshold_date: Date;
  inventory_sync: null;
  pending_quantity: number;
  is_mapped: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type LocalProduct = {
  name: string;
  sku: string;
  local_product_id: number;
  is_composite: boolean;
  image: string | null;
};

export type Location = {
  id: number;
  name: string;
  address: string;
  post_code: string;
  country: string;
  company_uid: string;
  createdAt: Date;
  updatedAt: Date;
};

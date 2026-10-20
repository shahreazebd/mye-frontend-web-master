export interface InventoryStockRequestResponse {
  success: boolean;
  data: InventoryStockRequestData[];
  message: string;
}

export interface InventoryStockRequestData {
  uuid: string;
  data: ProductDetails[];
  status: string;
  location:
    | {
        id: number;
        address: string;
        company_uid: string;
        country: string;
        createdAt: string;
        name: string;
        post_code: string;
        updatedAt: string;
      }
    | undefined;
  company_uid: string;
  batch_metadata: null;
  dispatch_by: null;
  stock_procced_at: null;
  created_at: Date;
  updated_at: Date;
  location_data: Location;
}

export type Location = {
  id: number;
  name: string;
  address: string;
  post_code: string;
  country: string;
};

export interface ProductDetails {
  sku: string;
  product_quantity: number;
}

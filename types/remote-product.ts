export type RemoteProductResponse = {
  fba_count: number;
  success: boolean;
  total_mapped_remote_product: number;
  total_remote_product: number;
  unmapped_remote_product: number;
  data: RemoteProduct[];
};

export type RemoteProduct = {
  remote_id: number;
  remote_product_id: string;
  remote_product_sku: string;
  remote_product_title: string;
  channel_uid: string;
  company_uid: string;
  fba_status: boolean;
  mapping: Mapping | null;
  sync_inventory: boolean;
};

export type Mapping = {
  mapped_id: number;
  remote_product: number;
  local_product: number;
  channel_uid: string;
  company_uid: string;
  mapped_local_product: MappedLocalProduct;
};

export type MappedLocalProduct = {
  local_id: number;
  name: string;
  sku: string;
  company_uid: string;
};

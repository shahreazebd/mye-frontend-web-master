export type MappingProductResponse = {
  success: boolean;
  data: MappingProduct[];
};

export type MappingProduct = {
  mapped_id: number;
  remote_product: number;
  local_product: number;
  channel_uid: string;
  company_uid: string;
  mapped_local_product: MappedLocalProduct;
  mapped_remote_product: MappedRemoteProduct;
  channel_details: ChannelDetails;
};

export type ChannelDetails = {
  channel_uid: string;
  name: string;
  channel_type: string;
  country: string;
};

export type MappedLocalProduct = {
  local_id: number;
  name: string;
  sku: string;
  company_uid: string;
};

export type MappedRemoteProduct = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  remote_product_id: string;
  remote_product_name: null;
  remote_product_description: null;
  image: null;
  remote_product_sku: string;
  remote_product_title: string;
  channel_uid: string;
  company_uid: string;
  fba_status: boolean;
  sync_inventory: boolean;
};

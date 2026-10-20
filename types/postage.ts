export type Postage = {
  service: Service;
  _id: string;
  companyUuid: string;
  channelUuid: string;
  channelName: string;
  status: string;
  successOrderIds: string[];
  failedOrderIds: any[];
  orders: PostageOrder[];
  batchLabel: string;
  totalOrderCount?: number;
  progress: number;
  uniqueOrders: PostageOrder[];
  vendorImageSrc: string;
  carriersLogoSrc: string;
  mergeOrderCount: number;
  successOrdersCount: number;
  failedOrdersCount: number;
  totalPostageCount: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  channel: Channel;
};

export type Channel = {
  id: number;
  name: string;
  channel_uid: string;
  company_uid: string;
  channel_type: string;
  channel_state: string;
  shop_url: string;
  country: string;
  channel_max_stock: number;
  report_ref: null;
  report_sorted_by: string;
  is_authorized: boolean;
  created_at: Date;
  updated_at: Date;
  expires_on: null;
  channel_metadata: null;
  channel_inventory_location: number;
  inventory_sync: boolean;
};

export type PostageOrder = {
  _id: string;
  trackingInfo: TrackingInfo;
  orderId: string;
  orderDate: null;
  postageIdentifier: string;
  status: string;
  createdOn: Date;
  labelLink: string;
  trackingNumber: string;
  returnShippmentIdentifier: null;
  positionItemId: any[];
  errors: any[];
  buyerInfo?: BuyerInfo;
  orderItems?: OrderItem[];
};

export type BuyerInfo = {
  name: string;
};

export type OrderItem = {
  localSku: string;
  quantity: number;
};

export type TrackingInfo = {
  description: string;
  deliveredAt: Date;
  status: string;
};

export type Service = {
  type: ServiceType;
  name: string;
  email: string;
  serviceUuid: string;
};

export type ServiceType = "DHL" | "CLICKANDDROP" | "EVRI" | "FEDEX";

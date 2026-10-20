// shipments

export type ShipmentList = {
  id: string;
  marketplace: string;
  storeName: string;
  status: string;
  createdAt: string;
  createdBy: string | null;
  carrier: {
    type: string;
    name: string;
  };
  orders: {
    labelLink: string | null;
    status: string;
  }[];
};

export type ShipmentDetailsResponse = {
  success: boolean;
  data: ShipmentDetails;
};

export type ShipmentDetails = {
  id: string;
  companyId: string;
  storeId: string;
  storeName: string;
  carrierType: string;
  marketplace: string;
  status: Status;
  metadata: ShipmentDetailsMetadata;
  batchLabelLink: null;
  carrierId: string;
  carrier: Carrier;
  orders: Order[];
  createdAt: Date;
  updatedAt: Date;
};

export type Carrier = {
  id: string;
  name: string;
  type: string;
  companyId: string;
  status: string;
  shipperPhone: string;
  credentialType: string;
  isActive: boolean;
  isDefault: boolean;
  addressLine1: null;
  addressLine2: null;
  shipperName: string;
  shipperEmail: string;
  countryCode: string;
  city: null;
  postalCode: null;
  stateOrProvinceCode: null;
  createdBy: null;
  updatedBy: null;
  metadata: CarrierMetadata;
  createdAt: Date;
  updatedAt: Date;
};

export type CarrierMetadata = {};

export type ShipmentDetailsMetadata = {
  serviceCode: string;
  includeReturnsLabel: boolean;
  packageFormatIdentifier: string;
};

export type Order = {
  id: string;
  orderIndex: number;
  marketplaceOrderId: string;
  totalItems: number;
  totalWeight: number;
  weightUnit: WeightUnit;
  dimensionUnit: string;
  currency: string;
  originalSku: string;
  modifiedSku: string;
  address: Address;
  purchaseDate: Date;
  mergedOrderIds: string[];
  shipmentId: string;
  shipment?: ShipmentDetails;
  items: Item[];
  status: Status;
  labelLink: string;
  trackingNumber: string;
  returnTrackingNumber: string | null;
  carrierLabelId: string;
  carrierReturnLabelId: string | null;
  failureReasons: FailureReasons | AmazonFailureReasons | DhlErrorResponse | null;
  trackingDescription: string | null;
  trackingDeliveredAt: string | null;
  trackingStatus: string | null;
  trackingUploadStatus: TrackingUploadStatus;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
};

export type ShipmentOrdersMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  next: boolean;
  previous: boolean;
};

/**
 * Trimmed shipment embedded in list responses.
 * Same four fields the list endpoint returns, not the full ShipmentDetails.
 */
export type ShipmentOrderSummary = Pick<
  ShipmentDetails,
  "id" | "storeId" | "marketplace" | "storeName"
>;

/**
 * A row from `GET /orders` — a *trimmed* Order.
 * The list endpoint omits items/address/carrier fields that `Order` declares, so
 * use `Order` (via `getShipmentOrderById`) for anything needing the full record.
 */
export type ShipmentOrderListItem = Pick<
  Order,
  | "id"
  | "marketplaceOrderId"
  | "originalSku"
  | "modifiedSku"
  | "status"
  | "mergedOrderIds"
  | "shipmentId"
  | "purchaseDate"
  | "trackingNumber"
  | "returnTrackingNumber"
  | "createdAt"
  | "updatedAt"
> & {
  labelLink?: string;
  shipment: ShipmentOrderSummary;
};

/**
 * The parts of an order needed to decide whether a full record must be fetched.
 * Satisfied by both `Order` and `ShipmentOrderListItem`.
 */
export type ShipmentOrderPreview = {
  id: string;
  marketplaceOrderId?: string;
  items?: Item[];
  shipment?: ShipmentOrderSummary;
};

export type ShipmentOrdersResponse = {
  success: boolean;
  data: ShipmentOrderListItem[];
  meta?: ShipmentOrdersMeta;
};

export type Address = {
  city: string;
  email: string;
  phone: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  postCode: string;
  buyerName: string;
  countryCode: string;
};

export type Item = {
  name: string;
  localSku: string;
  quantity: number;
  unitPrice: number;
  marketplaceSku: string;
  positionItemId: string[];
  unitWeightInGrams: number;
  height: number;
  length: number;
  width: number;
  marketplaceOrderId: string;
};

export type Status = "SUCCESS" | "FAILED" | "WAITING" | "PROCESSING";

export type TrackingUploadStatus = "PENDING" | "SUCCESS" | "FAILED";

export type WeightUnit = "G" | "KG" | "OZ" | "LB";

// ---------------------------------------------------------------------------
// Types migrated from shippings.ts
// ---------------------------------------------------------------------------

export type ShippingOrder = {
  id: string;
  companyId: string;
  storeId: string;
  storeName: string;
  carrierType: string;
  marketplace: string;
  status: string;
  metadata: {
    service: string;
    returnShippment: boolean;
    shipment_service_uuid: string;
  };
  labelLink: string | null;
  carrierId: string;
  carrier: Carrier;
  orders: Order[];
  createdAt: string;
  updatedAt: string;
};

export type FailureReasonError = {
  error: string;
  error_paths?: string[];
  error_description?: string;
};

export interface AmazonError {
  code: string;
  message: string;
  details?: string;
}

export interface DhlValidationError {
  property?: string;
  validationState: string;
  validationMessage: string;
}

export interface DhlErrorItem {
  sstatus: {
    title: string;
    status: number;
    statusCode: number;
  };
  validationMessages: DhlValidationError[];
}

export interface DhlErrorResponse {
  items: DhlErrorItem[];
  status: number;
}

export interface AmazonFailureReasons {
  errors: AmazonError[];
  status: number;
}

export type FailureReasons = {
  errors: (FailureReasonError | AmazonError | DhlErrorResponse)[];
  status: number;
  message: string;
};

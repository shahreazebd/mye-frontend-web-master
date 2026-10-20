export type TrackingListResponse = {
  success: boolean;
  message: string;
  data: TrackingListItem[];
};

export type TrackingDetailsResponse = {
  success: boolean;
  message: string;
  data: TrackingDetails;
};

export type TrackingUploadStatus = "PENDING" | "SUCCESS" | "FAILED";

export type TrackingEventType =
  | "INFO"
  | "TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERY_ATTEMPT"
  | "DELIVERED"
  | "EXCEPTION"
  | "DELAY"
  | "HELD_AT_CUSTOMS"
  | "RETURN_INITIATED"
  | "RETURN_DELIVERED"
  | "LOCATION_UPDATE"
  | "AVAILABLE_FOR_PICKUP"
  | "OTHER";

export type Marketplace =
  | "AMAZON"
  | "EBAY"
  | "OTTO"
  | "SHOPIFY"
  | "WOOCOMMERCE"
  | "TIKTOK"
  | "TEMU"
  | "SHEIN"
  | "WALMART";

export type CarrierType =
  | "EVRI"
  | "DHL"
  | "DPD"
  | "UPS"
  | "FEDEX"
  | "ROYAL_MAIL"
  | "AMAZON"
  | "TIKTOK";

export type Address = {
  city: string;
  email?: string;
  phone: string;
  country?: string;
  addressLine1: string;
  addressLine2?: string;
  postCode: string;
  buyerName: string;
  countryCode: string;
};

export type TrackingEvent = {
  id: string;
  trackingInfoId: string;
  eventType: TrackingEventType;
  status?: string | null;
  eventCode?: string | null;
  eventName?: string | null;
  description?: string | null;
  location?: any | null;
  timestamp: Date;
  rawData?: any | null;
  createdAt: Date;
};

export type TrackingBaseInfo = {
  id: string;
  orderId: string;
  carrierId?: string | null;
  shipmentId?: string | null;
  trackingNumber: string;
  returnTrackingNumber?: string | null;
  carrierTrackingUrl?: string | null;
  status?: string | null;
  statusCode?: string | null;
  lastEventAt?: Date | null;
  estimatedDelivery?: Date | null;
  deliveredAt?: Date | null;
  signedBy?: string | null;
  proofOfDeliveryUrl?: string | null;
  syncStatus: TrackingUploadStatus;
  failureReason?: string | null;
  metadata?: any | null;
  nextCheckAt?: Date | null;
  lastCheckAt?: Date | null;
  isArchived: boolean;
  lastKnownStatus?: string | null;
  purchaseDate?: Date | null;
  failedAttempts: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TrackingListItem = TrackingBaseInfo & {
  shipment: {
    marketplace: Marketplace;
    storeName: string;
    carrierType: CarrierType;
  };
  order: {
    address: Address;
  };
};

export type TrackingDetails = TrackingBaseInfo & {
  shipment: {
    marketplace: Marketplace;
    storeName: string;
    carrierType: CarrierType;
  };
  order: {
    id: string;
    orderIndex: number;
    marketplaceOrderId: string;
    totalItems: number;
    totalWeight: number;
    weightUnit: "G" | "KG" | "OZ" | "LB";
    dimensionUnit: "MM" | "CM" | "M" | "INCH";
    currency: string;
    originalSku: string;
    modifiedSku: string;
    address: Address;
    purchaseDate?: Date | null;
    mergedOrderIds: string[];
    shipmentId: string;
    items: any[];
    status: "PROCESSING" | "SUCCESS" | "FAILED";
    labelLink: string;
    trackingNumber: string;
    returnTrackingNumber?: string | null;
    carrierLabelId?: string | null;
    carrierReturnLabelId?: string | null;
    failureReasons?: any | null;
    trackingDescription?: string | null;
    trackingDeliveredAt?: Date | null;
    trackingStatus?: string | null;
    trackingUploadStatus: TrackingUploadStatus;
    metadata?: any | null;
    createdAt: Date;
    updatedAt: Date;
  };
  events?: TrackingEvent[];
};

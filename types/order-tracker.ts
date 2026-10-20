export interface OrderTrackerResponse {
  data: OrderTrackerData[];
}

export interface OrderTrackerData {
  trackingInfo: TrackingInfo;
  orderId: string;
  orderDate: null;
  postageIdentifier: null | string;
  status: string;
  createdOn: Date;
  labelLink: null | string;
  trackingNumber: null | string;
  returnShippmentIdentifier: null;
  positionItemId: any[];
  errors: Error[];
  _id: string;
}

export interface TrackingInfo {
  description: string;
  deliveredAt: string | Date;
  status: string;
}

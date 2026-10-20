export interface ShippingCode {
  ShippingCarrierID: string;
  Description: string;
  ShippingCarrier: string;
  DetailVersion: string;
  UpdateTime: string;
}

export interface ShippingCodesResponse {
  success: boolean;
  message: string;
  data: ShippingCode[];
}

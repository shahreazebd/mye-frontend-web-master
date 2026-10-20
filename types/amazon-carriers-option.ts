export type AmazonCarrierOption = {
  order_id: string;
  eligible_shipping_services: EligibleShippingService[];
  error: any;
};

export type AmazonCarrier = {
  data: EligibleShippingService[];
  error: any;
};

export type EligibleShippingService = {
  ShippingServiceName: string;
  CarrierName: string;
  ShippingServiceId: string;
  ShippingServiceOfferId: string;
  ShipDate: Date;
  EarliestEstimatedDeliveryDate: Date;
  LatestEstimatedDeliveryDate: Date;
  Rate: Rate;
  ShippingServiceOptions: ShippingServiceOptions;
  AvailableLabelFormats: string[];
  AvailableFormatOptionsForLabel: AvailableFormatOptionsForLabel[];
  Benefits: Benefits;
};

export type AmazonRatePayload = {
  requestToken: string;
  rateId: string;
  deliveryDate: Date;
  charge: number;
  unit: string;
  requestedDocumentSpecification: {
    format: string;
    size: {
      width: number;
      length: number;
      unit: string;
    };
    dpi?: number;
    pageLayout: string;
    needFileJoining: boolean;
    requestedDocumentTypes: string[];
  };
  requestedValueAddedServices: {
    id: string;
  }[];
};

export type AvailableFormatOptionsForLabel = {
  LabelFormat: string;
};

export type Benefits = {
  IncludedBenefits: string[];
  ExcludedBenefits: ExcludedBenefit[];
};

export type ExcludedBenefit = {
  Benefit: string;
  ReasonCodes: string[];
};

export type Rate = {
  CurrencyCode: string;
  Amount: number;
};

export type ShippingServiceOptions = {
  DeliveryExperience: string;
  CarrierWillPickUp: boolean;
  LabelFormat: string;
};

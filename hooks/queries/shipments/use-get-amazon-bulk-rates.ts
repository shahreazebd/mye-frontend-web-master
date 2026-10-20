import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { fetchPostage } from "@/config/xior";

export type AmazonBulkRatesResponse = {
  success: boolean;
  data: AmazonBulkRate[];
};

export type AmazonBulkRate = {
  id: string;
  batchId: string;
  marketplaceOrderId: string;
  companyId: string;
  rates: Rates;
  errors: null;
  createdAt: Date;
  updatedAt: Date;
};

export type Rates = {
  rates: Rate[];
  requestToken: string;
};

export type Rate = {
  rateId: string;
  promise: Promise;
  benefits: Benefits;
  carrierId: string;
  serviceId: string;
  carrierName: string;
  paymentType: null;
  serviceName: string;
  totalCharge: TotalCharge;
  billedWeight: null;
  rateItemList: RateItemList[];
  adjustmentItemList: null;
  requiresAdditionalInputs: boolean;
  totalChargeWithAdjustments: TotalCharge;
  supportedDocumentSpecifications: SupportedDocumentSpecification[];
  availableValueAddedServiceGroups: AvailableValueAddedServiceGroup[];
};

export type AvailableValueAddedServiceGroup = {
  groupId: string;
  isRequired: boolean;
  groupDescription: string;
  valueAddedServices: ValueAddedService[];
};

export type ValueAddedService = {
  id: string;
  cost: TotalCharge;
  name: string;
};

export type TotalCharge = {
  unit: string;
  value: number;
};

export type Benefits = {
  excludedBenefits: any[];
  includedBenefits: string[];
};

export type Promise = {
  pickupWindow: Window;
  deliveryWindow: Window;
};

export type Window = {
  end: Date | null;
  start: Date | null;
};

export type RateItemList = {
  rateItemID: string;
  rateItemType: string;
  rateItemCharge: TotalCharge;
  rateItemNameLocalization: string;
};

export type SupportedDocumentSpecification = {
  size: Size;
  format: string;
  printOptions: PrintOption[];
};

export type PrintOption = {
  supportedDPIs: number[];
  supportedPageLayouts: string[];
  supportedDocumentDetails: SupportedDocumentDetail[];
  supportedFileJoiningOptions: boolean[];
};

export type SupportedDocumentDetail = {
  name: string;
  isMandatory: boolean;
};

export type Size = {
  unit: string;
  width: number;
  length: number;
};

export function getAmazonBulkRates({ queryKey }: QueryFunctionContext<[string, string]>) {
  const batchId = queryKey[1];
  return fetchPostage
    .get<AmazonBulkRatesResponse>(`/amazon/rates/${batchId}`)
    .then((res) => res.data.data);
}

export function useGetAmazonBulkRates(batchId: string) {
  return useQuery({
    queryKey: ["amazon-bulk-rates", batchId],
    queryFn: getAmazonBulkRates,
  });
}

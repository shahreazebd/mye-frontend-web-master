export type Carrier = {
  id: string;
  name: string;
  type: "EVRI" | string;
  companyId: string;
  shipperPhone: string;
  credentialType: "BEARER" | string;
  credentials: string | null;
  isActive: boolean;
  isDefault: boolean;
  addressLine1: string | null;
  addressLine2: string | null;
  accountNumber: string | null;
  shipperName: string | null;
  shipperEmail: string | null;
  countryCode: string | null;
  city: string | null;
  postalCode: string | null;
  stateOrProvinceCode: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  metadata: Record<string, any> | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type CarrierResponse = {
  success: boolean;
  data: Carrier[];
};

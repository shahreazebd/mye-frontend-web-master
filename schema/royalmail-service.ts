import * as z from "zod";

export const ParcelSizeSchema = z.enum([
  "Documents",
  "LargeLetter",
  "Letter",
  "MediumParcel",
  "Parcel",
  "SmallParcel",
]);
export type ParcelSize = z.infer<typeof ParcelSizeSchema>;

export const PackagingSchema = z.object({
  id: z.number(),
  name: ParcelSizeSchema,
  maxWeightG: z.number(),
  minWeightG: z.number(),
  flag: z.number(),
});
export type Packaging = z.infer<typeof PackagingSchema>;

export const PackagingDetailSchema = z.object({
  packagingFormatID: z.number(),
  minWeightG: z.number(),
  maxWeightG: z.number(),
});
export type PackagingDetail = z.infer<typeof PackagingDetailSchema>;

export const ValidCountrySchema = z.object({
  id: z.number(),
  packagingDetails: z.array(PackagingDetailSchema),
  packagings: z.union([z.number(), z.null()]).optional(),
});
export type ValidCountry = z.infer<typeof ValidCountrySchema>;

export const ServiceSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Service = z.infer<typeof ServiceSchema>;

export const RoyalMailServiceSchema = z.object({
  shippingServiceID: z.number(),
  carrierID: z.number(),
  carrierShippingServiceID: z.number(),
  carrierTypeID: z.number(),
  externalServiceID: z.number(),
  serviceCode: z.string(),
  deliverySpeedMye: z.string(),
  serviceName: z.string(),
  maxCompensationLevel: z.number(),
  isSignedFor: z.boolean(),
  isEligibleForCollectionPromo: z.boolean(),
  allowsSigning: z.boolean(),
  allowsSMSNotification: z.boolean(),
  allowsEmailNotification: z.boolean(),
  allowsDeliveryDutyPaid: z.boolean(),
  allowsIoss: z.boolean(),
  isPhotoOnDelivery: z.boolean(),
  isLBT: z.boolean(),
  isHighVolume: z.boolean(),
  allowsSaturdayGuaranteed: z.boolean(),
  allowsLocalCollect: z.boolean(),
  requiresContractNumber: z.boolean(),
  contractNumber: z.union([z.null(), z.string()]),
  consequentialLossAmounts: z.array(z.number()),
  serviceEnhancement: ServiceSchema,
  serviceLevel: ServiceSchema,
  validPackagings: z.array(PackagingSchema),
  validCountries: z.array(ValidCountrySchema),
  unsupportedPostingFromCountries: z.array(z.any()),
  isFavourite: z.boolean(),
  isHidden: z.boolean(),
  isReturn: z.boolean(),
  allowsSafePlace: z.boolean(),
  aliases: z.array(z.any()),
  serviceRegisterCode: z.string(),
  isIncludeTrackedReturn: z.boolean(),
  trackedReturnCarrierShippingServiceID: z.null(),
});
export type RoyalMailService = z.infer<typeof RoyalMailServiceSchema>;

export const CountrySchema = z.object({
  "Country Name": z.string(),
  "Country Code": z.number(),
});
export type Country = z.infer<typeof CountrySchema>;

export const WelcomeSchema = z.object({
  data: z.object({
    success: z.boolean(),
    packagings: z.array(PackagingSchema),
    countries: z.array(CountrySchema),
    services: z.array(RoyalMailServiceSchema),
  }),
});
export type RoyalMailServiceResponse = z.infer<typeof WelcomeSchema>;

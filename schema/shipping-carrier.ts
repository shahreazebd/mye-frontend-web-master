import { object, z } from "zod";

export const shippingCarrier = object({
  uuid: z.string(),
  name: z.string(),
  shipping_service_name: z.string(),
  company_uid: z.string(),
  credential_type: z.string(),
  is_default: z.boolean(),
});

export type ShippingCarrier = z.infer<typeof shippingCarrier>;

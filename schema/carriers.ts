import * as z from "zod";

export const CarrierSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  shipping_service_name: z.string(),
  company_uid: z.string(),
  credential_type: z.string(),
});
export type Carrier = z.infer<typeof CarrierSchema>;

export const CarrierResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(CarrierSchema),
});
export type CarrierResponse = z.infer<typeof CarrierResponseSchema>;

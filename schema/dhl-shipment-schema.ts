import { z } from "zod";

export const CountryCode3LetterSchema = z
  .string()
  .length(3, "Must be 3 letters")
  .toUpperCase();

export const ShippingAddressSchema = z.object({
  buyer_name: z.string().min(1, "Buyer name required").max(50, "Max 50 chars"),
  address1: z.string().min(1, "Address line 1 required").max(50),
  address2: z.string().max(60).optional().nullable(),
  city: z.string().min(1, "City required").max(40),
  post_code: z.string().max(10).optional().nullable(),
});

export const MappedOpenOrderSchema = z.object({
  channel_order_id: z.string().min(1, "Order ID required"),
  modified_sku: z.string().optional().nullable(),
  total_weight: z
    .number({ invalid_type_error: "Weight must be a number" })
    .gt(0, "Weight must be greater than 0"),
  shipping_address: ShippingAddressSchema,
});

export const DHLDataSchema = z.array(MappedOpenOrderSchema);

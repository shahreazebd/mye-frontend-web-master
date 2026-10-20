import * as z from "zod";

export const CurrencySchema = z.enum(["GBP"]);
export type Currency = z.infer<typeof CurrencySchema>;

export const CountrySchema = z.enum(["United Kingdom"]);
export type Country = z.infer<typeof CountrySchema>;

export const CountryCodeSchema = z.enum(["GB"]);
export type CountryCode = z.infer<typeof CountryCodeSchema>;

export const OrderShippingAddressSchema = z.object({
  buyer_name: z.string(),
  address_1: z.string(),
  address_2: z.string(),
  phone: z.string(),
  city: z.string(),
  state: z.string(),
  post_code: z.string(),
  country: CountrySchema,
  country_code: CountryCodeSchema,
  email: z.string(),
});
export type OrderShippingAddress = z.infer<typeof OrderShippingAddressSchema>;

export const OrderItemSchema = z.object({
  name: z.string(),
  sku: z.string(),
  quantity: z.number(),
  unit_value: z.number(),
  unit_weight_in_grams: z.number(),
  position_item_id: z.array(z.any()),
});
export type OrderItem = z.infer<typeof OrderItemSchema>;

export const DataSchema = z.object({
  total_items: z.number(),
  total_weight: z.number(),
  currency: CurrencySchema,
  original_sku: z.string(),
  modified_sku: z.string(),
  purchase_date: z.coerce.date(),
  order_id: z.string(),
  merged_order_ids: z.array(z.any()),
  order_shipping_address: OrderShippingAddressSchema,
  order_items: z.array(OrderItemSchema),
});
export type BuyPostagePayload = z.infer<typeof DataSchema>;

export const WelcomeSchema = z.object({
  success: z.boolean(),
  data: z.array(DataSchema),
});
export type BuyPostagePayloadResponse = z.infer<typeof WelcomeSchema>;

import { z } from "zod";

export const orderItem = z.object({
  remote_sku: z.string(),
  quantity: z.number(),
  price: z.number(),
  total_amount: z.number(),
  mapped: z.boolean(),
  local_SKU: z.string(),
  image: z.string(),
  local_product_name: z.string(),
  remote_product_title: z.string(),
  position_item_id: z.array(z.string()),
  weight: z.string(),
  height: z.string(),
  width: z.string(),
  depth: z.string(),
  channel_order_id: z.string(),
});

export type OrderItem = z.infer<typeof orderItem>;

export const address = z.object({
  buyer_name: z.string(),
  email: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  post_code: z.string(),
  country: z.string(),
  phone: z.string(),
  reference_id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  quantity: z.number(),
  total_spend: z.string(),
  currency: z.string(),
  order_count: z.union([z.number(), z.null()]),
});

export const channel = z.object({
  channel_uid: z.string(),
  name: z.string(),
  channel_type: z.string(),
  country: z.string(),
});

export const automatedShippingSchema = z.object({
  AutomatedCarrier: z.string().optional(),
  AutomatedShipMethod: z.string().optional(),
  HasAutomatedShippingSettings: z.boolean(),
});

export const orderMetaSchema = z.object({
  is_prime: z.boolean().optional(),
  is_premium: z.boolean().optional(),
  order_type: z.string().optional(),
  is_business: z.boolean().optional(),
  is_replacement: z.boolean().optional(),
  automated_shipping: automatedShippingSchema.optional(),
  latest_delivery_date: z.string().optional(),
  lineItems: z
    .array(
      z.object({
        lineItemId: z.string(),
        quantity: z.number(),
      })
    )
    .optional(),
});

export const openOrder = z.object({
  id: z.number(),
  channel_order_id: z.string(),
  payment_status: z.string(),
  company_uid: z.string(),
  payment_method: z.string(),
  channel_uid: z.string(),
  purchase_date: z.string(),
  currency: z.string(),
  dispatch_status: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  total: z.number(),
  items: z.array(orderItem),
  channel: channel,
  shipping_address: address,
  merge_order_ids: z.array(z.string()),
  duplicate: z.boolean(),
  quantity: z.string(),
  total_number_of_order: z.number(),
  dimensions: z.string(),
  carriers: z.string(),
  order_meta: orderMetaSchema.nullable(),
});

export type OpenOrder = z.infer<typeof openOrder>;

export type MappedOpenOrder = OpenOrder & {
  total_weight: number;
  oz: number;
  kg: number;
  lb: number;
  gm: number;
  sku: string;
  dimensionsInches: string;
  total_items: number;
  modified_sku: string;
  latestDeliveryDate: string | null;
  /** Stable ID linking this row to its AmazonRate DB record.
   * Assigned once at postage-preview entry; duplicated rows get a fresh UUID. */
  rateRecordId?: string;
};

export const openOrderResponseSchema = z.object({
  success: z.boolean(),
  order_count: z.number(),
  data: z.array(openOrder),
});
export type OpenOrderResponse = z.infer<typeof openOrderResponseSchema>;

export const openOrderDetailsResponse = z.object({
  success: z.boolean(),
  order_count: z.number(),
  data: openOrder,
});
export type OpenOrderDetailsResponse = z.infer<typeof openOrderDetailsResponse>;

export const cancelledOrder = z.object({
  id: z.number(),
  channel_order_id: z.string(),
  payment_status: z.string(),
  payment_method: z.string(),
  purchase_date: z.string(),
  currency: z.string(),
  total: z.number(),
  channel_uid: z.string(),
  company_uid: z.string(),
  market_place: z.string(),
  dispatch_status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  shipping_address: address,
  items: z.array(orderItem),
});

export type CancelledOrder = z.infer<typeof cancelledOrder>;

export const cancelledOrdersResponse = z.object({
  success: z.boolean(),
  order_count: z.number(),
  data: z.array(cancelledOrder),
});

export type CancelledOrdersResponse = z.infer<typeof cancelledOrdersResponse>;

import { z } from "zod";

const reportRefSchema = z.object({
  column_order: z.nullable(z.array(z.string())),
  report_column_name: z.array(
    z.object({
      SKU: z.string(),
      Paid: z.string(),
      Town: z.string(),
      Source: z.string(),
      Status: z.string(),
      street: z.string(),
      Weight: z.string(),
      "Order Id": z.string(),
      Postcode: z.string(),
      Property: z.string(),
      Quantity: z.string(),
      SubSource: z.string(),
      "Item title": z.string(),
      "Dispatch By": z.string(),
      "Order total": z.string(),
      "Received date": z.string(),
      "Original title": z.string(),
      "Shipping country": z.string(),
      "Order Item Number": z.string(),
      "Shipping customer name": z.string(),
      "Customer buyer phone number": z.string(),
    })
  ),
});

export const channel = z.object({
  id: z.number(),
  name: z.string(),
  channel_uid: z.string(),
  company_uid: z.string(),
  channel_type: z.string(),
  channel_state: z.string(),
  shop_url: z.string(),
  country: z.string(),
  channel_max_stock: z.number(),
  report_ref: reportRefSchema,
  report_sorted_by: z.string(),
  is_authorized: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  channel_inventory_location: z.number(),
  inventory_sync: z.boolean(),
  order_sync: z.boolean(),
  expires_on: z.string(),
  max_pending_order_days: z.number(),
  default_carrier: z.string().nullable(),
  channel_metadata: z
    .object({
      username: z.string().optional(),
    })
    .passthrough()
    .nullish(),
});

export type Channel = z.infer<typeof channel>;

import { object, z } from "zod";

export const salesReportSchema = object({
  channel_uid: z.string(),
  local_product_name: z.string(),
  local_product_price: z.number(),
  local_product_sku: z.string(),
  location_id: z.number(),
  location_name: z.string(),
  remote_sku: z.string(),
  remote_sku_order_count: z.number(),
  souce: z.string(),
  sub_source: z.string(),
  total_quantity: z.number(),
  total_sell: z.number(),
});

export type SalesReport = z.infer<typeof salesReportSchema>;

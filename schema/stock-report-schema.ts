import { object, z } from "zod";

export const stockReportSchema = object({
  remote_sku: z.string(),
  channel_uid: z.string(),
  remote_sku_order_count: z.number(),
  total_quantity: z.number(),
  total_sell: z.number(),
  souce: z.string(),
  sub_source: z.string(),
  local_product_name: z.string(),
  local_product_sku: z.string(),
  local_product_price: z.number(),
});

export type StockReport = z.infer<typeof stockReportSchema>;

import { z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  in_open: z.number(),
  is_composite: z.boolean(),
  local_product_id: z.number(),
  location: z.number(),
  location_name: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  sku: z.string(),
  minimum_quantity: z.number(),
  stock_level: z.number(),
});

export type Task = z.infer<typeof taskSchema>;

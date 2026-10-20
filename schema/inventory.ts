import { z } from "zod";

export const inventory = z.object({
  id: z.number(),
  in_open: z.number(),
  is_composite: z.boolean(),
  local_product_id: z.number(),
  location: z.number(),
  location_name: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
  name: z.string(),
  sku: z.string(),
  minimum_quantity: z.number(),
  stock_level: z.number(),
  company_uid: z.string(),
});

export const inventoryDetails = z.object({
  barcode: z.string(),
  company_uid: z.string(),
  createdAt: z.string(),
  depth: z.string(),
  height: z.string(),
  id: z.number(),
  image: z.string().nullable(),
  is_composite: z.boolean(),
  name: z.string(),
  purchase_price: z.string(),
  selling_price: z.string(),
  sku: z.string(),
  updatedAt: z.string(),
  weight: z.string(),
  width: z.string(),
});

const mappedLocalProduct = z.object({
  local_id: z.number(),
  name: z.string(),
  sku: z.string(),
  company_uid: z.string(),
});

const mappedRemoteProduct = z.object({
  id: z.number(),
  remote_product_id: z.string(),
  remote_product_sku: z.string(),
  remote_product_title: z.string(),
  channel_uid: z.string(),
  company_uid: z.string(),
  fba_status: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  sync_inventory: z.boolean(),
});

const channelDetails = z.object({
  channel_type: z.string(),
  channel_uid: z.string(),
  country: z.string(),
  name: z.string(),
});

export const mappingProducts = z.object({
  mapped_id: z.number(),
  remote_product: z.number(),
  local_product: z.number(),
  channel_uid: z.string(),
  company_uid: z.string(),
  mapped_local_product: mappedLocalProduct,
  mapped_remote_product: mappedRemoteProduct,
  channel_details: channelDetails,
});

export const compositeChildProduct = z.object({
  id: z.number(),
  name: z.string(),
  sku: z.string(),
  barcode: z.string(),
  purchase_price: z.string(),
  selling_price: z.string(),
  is_composite: z.boolean(),
  image: z.nullable(z.string()),
  weight: z.string(),
  height: z.string(),
  width: z.string(),
  depth: z.string(),
  company_uid: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Inventory = z.infer<typeof inventory>;
export type InventoryDetails = z.infer<typeof inventoryDetails>;
export type MappingProducts = z.infer<typeof mappingProducts>;
export type CompositeChildProduct = z.infer<typeof compositeChildProduct>;

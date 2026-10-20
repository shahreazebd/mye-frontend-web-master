import * as z from "zod";

export const DataSchema = z.object({
  id: z.number(),
  name: z.string(),
  sku: z.string(),
  barcode: z.string(),
  purchase_price: z.string(),
  selling_price: z.string(),
  is_composite: z.boolean(),
  is_child: z.boolean(),
  stock_notification: z.boolean(),
  image: z.null(),
  weight: z.string(),
  height: z.string(),
  width: z.string(),
  depth: z.string(),
  company_uid: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  composite_quantity: z.number(),
});

export const ProductResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(DataSchema),
});

export type Data = z.infer<typeof DataSchema>;

export type ProductResponse = z.infer<typeof ProductResponseSchema>;

export type CreateProductPayload = {
  name: string;
  sku: string;
  barcode: string;
  purchase_price: string;
  selling_price: string;
  weight: string;
  height: string;
  width: string;
  depth: string;
  company_uid: string;
};

export type CsvFields = Omit<CreateProductPayload, "company_uid">;

export type UpdateCsvFields = {
  previous_sku: string;
  new_sku: string;
  new_name: string;
  height: number;
  width: number;
  length: number;
};

export type UpdateProductPayload = {
  company_uid: string;
  data: UpdateCsvFields[];
};

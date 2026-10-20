import { object, z } from "zod";

const getLocationSchema = object({
  id: z.number(),
  address: z.string(),
  company_uid: z.string(),
  country: z.string(),
  createdAt: z.string(),
  name: z.string(),
  post_code: z.string(),
  updatedAt: z.string(),
});

export type Location = z.infer<typeof getLocationSchema>;

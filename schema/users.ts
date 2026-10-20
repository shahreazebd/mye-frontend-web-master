import { array, boolean, object, string, z } from "zod";

export const features = array(
  object({
    id: string(),
    name: string(),
    url: string(),
    service: string(),
  })
);

export const UserSchema = object({
  user_id: string(),
  phone: string(),
  address: string(),
  type: string(),
  company_uid: string(),
  email: string(),
  firstname: string(),
  lastname: string(),
  avater_url: string(),
  features: features,
  mfa_status: boolean(),
  verified: boolean(),
});

export type User = z.infer<typeof UserSchema>;

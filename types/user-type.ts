export interface User {
  id: string;
  token_type: string;
  user_email: string;
  avater_url: string;
  exp: number;
  Name: string;
  phone: string;
  address: string;
  type: string;
  company_uid: string;
  name: string;
  country: string;
  status: boolean;
  permissions: Permission[];
  restrictions: { restrictions: Restriction[]; subscribed: boolean };
}

export interface Permission {
  id: string;
  name: string;
  url: string;
  service: string;
}

export interface Restriction {
  channels?: number;
  channel_data_limit?: string;
  flag: boolean;
  users?: number;
  user_data_limit?: string;
  orders?: number;
  order_data_limit?: string;
}

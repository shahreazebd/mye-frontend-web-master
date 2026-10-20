export interface Price {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  currency_options: Record<string, CurrencyOption>;
  custom_unit_amount: number | null;
  livemode: boolean;
  lookup_key: string | null;
  metadata: {
    name: string;
    salesChannels: string;
    salesVolume: string;
    users: string;
  };
  nickname: string | null;
  product: Product;
  recurring: Recurring;
  tax_behavior: string;
  tiers_mode: string | null;
  transform_quantity: unknown | null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

interface CurrencyOption {
  custom_unit_amount: number | null;
  tax_behavior: string;
  unit_amount: number | null;
  unit_amount_decimal: string;
}

interface Product {
  id: string;
  object: string;
  active: boolean;
  attributes: string[];
  created: number;
  default_price: string;
  description: string | null;
  features: string[];
  images: string[];
  livemode: boolean;
  marketing_features: string[];
  metadata: Record<string, unknown>;
  name: string;
  package_dimensions: unknown | null;
  shippable: boolean | null;
  statement_descriptor: string | null;
  tax_code: string | null;
  type: string;
  unit_label: string | null;
  updated: number;
  url: string | null;
}

interface Recurring {
  aggregate_usage: string | null;
  interval: string;
  interval_count: number;
  meter: string | null;
  trial_period_days: number | null;
  usage_type: string;
}

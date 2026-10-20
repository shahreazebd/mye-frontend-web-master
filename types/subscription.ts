export interface Subscription {
  id: string;
  companyId: string;
  companyName: string;
  trialDays: number;
  currency: string;
  amount: number;
  paymentStatus: string;
  status: string;
  interval: string;
  website: string;
  trialStartedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  customer: Customer;
  features: Feature[];
  email: Email[];
  history: History[];
}

interface Customer {
  id: string;
  subscriptionId: string;
  name: string;
  phone: string;
  email: string;
  amountPaid: number;
  stripeInvoiceUrl: string;
  stripeInvoicePdf: string;
  stripePriceId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripeInvoiceId: string;
  subtotal: number;
  tax: number;
  subTotalExcludingTax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Feature {
  id: string;
  name: string;
  quantity: number;
  status: boolean;
  companyId: string;
  subscriptionId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Email {
  id: string;
  subscriptionId: string;
  companyId: string;
  sender: string;
  recipient: string;
  subject: string;
  payload: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface History {
  id: string;
  subscriptionId: string;
  companyId: string;
  stripePriceId: string | null;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;
  stripeInvoiceId: string | null;
  amount: number;
  currency: string;
  cancelReason: string | null;
  ip: string;
  userAgent: string;
  payload: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

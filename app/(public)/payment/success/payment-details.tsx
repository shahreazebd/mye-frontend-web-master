"use client";

import { useGetSingleSubscription } from "@/hooks/queries/subscription/use-get-single-subscription";

export function PaymentDetails() {
  const { data } = useGetSingleSubscription();

  const currencySign =
    data?.currency === "USD" ? "$" : data?.currency === "EUR" ? "€" : "£";

  return (
    <>
      <div className="rounded-lg bg-muted p-4">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium">Company Name:</span>
          <span className="text-sm">{data?.companyName}</span>
        </div>

        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium">Email:</span>
          <span className="text-sm">{data?.customer?.email}</span>
        </div>

        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium">Interval:</span>
          <span className="text-sm">{data?.interval}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm font-medium">Invoice Url:</span>
          <a
            className="text-sm"
            href={data?.customer?.stripeInvoiceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Invoice
          </a>
        </div>
      </div>
      <div className="rounded-lg border p-4">
        <div className="flex justify-between font-medium">
          <span>Total Amount:</span>
          <span>
            {currencySign} {(data?.amount ?? 0) / 100}
          </span>
        </div>
      </div>
    </>
  );
}

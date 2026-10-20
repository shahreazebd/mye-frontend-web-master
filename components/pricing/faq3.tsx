const faqs = [
  {
    id: 1,
    question: "Order Tracking and Lost Item Notification",
    answer:
      "Our system proactively monitors order delivery status across marketplaces and swiftly alerts you of any potential issues.",
  },
  {
    id: 2,
    question: "Return Tracking & Visibility",
    answer:
      "Get enhanced oversight and control over returned inventory across all connected sales channels and warehouses.",
  },
  {
    id: 3,
    question: "Seamless Integrations",
    answer:
      "Onboard in minutes with our frictionless Marketplace integrations requiring only basic credentials.",
  },
  {
    id: 4,
    question: "Smart SKU Mapping",
    answer:
      "Instantly and accurately map product SKUs across integrated channels via our intelligent mapping system. Get up and run faster.",
  },
  {
    id: 5,
    question: "Custom Postage Purchases",
    answer:
      "Take control of shipping expenditures through flexible custom postage rules tailored to your business needs.",
  },
  {
    id: 6,
    question: "Third-Party Warehouse Integration",
    answer:
      "Manage Your eCommerce elevates stock management by integrating with Inventory Keeper, a cutting-edge third-party warehouse management software.",
  },
];

export default function Faq3() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-2xl font-bold tracking-tight text-gray-900">
            We understand your needs and work tirelessly to provide you with the right
            tools and resources you need to succeed.
          </p>
        </div>
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

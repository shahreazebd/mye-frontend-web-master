import { MinusIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";

const pricing = {
  tiers: [
    {
      name: "Small",
      id: "tier-small",
      featured: false,
      description: "All your essential requirements and business, taken care of.",
    },
    {
      name: "Medium",
      id: "tier-medium",
      featured: false,
      description: "The best services for your thriving business as always.",
    },
    {
      name: "Enterprise",
      id: "tier-enterprise",
      featured: true,
      description: "Convenient features to take your business to the next level.",
    },
  ],
  sections: [
    {
      name: "Features",
      features: [
        {
          name: "Monthly Sales Volume",
          tiers: {
            Small: "2000",
            Medium: "5000",
            Enterprise: "Unlimited",
          },
        },
        {
          name: "Users",
          tiers: {
            Small: "4",
            Medium: "6",
            Enterprise: "Unlimited users",
          },
        },
        {
          name: "Sales Channels",
          tiers: {
            Small: "5",
            Medium: "20",
            Enterprise: "Unlimited channels",
          },
        },
        {
          name: "Invoicing",
          tiers: {
            Small: "100 invoices",
            Medium: "250 invoices",
            Enterprise: "Unlimited invoices",
          },
        },
        {
          name: "Instant Notifications",
          tiers: { Small: true, Medium: true, Enterprise: true },
        },
        {
          name: "Mobile App Access",
          tiers: { Small: true, Medium: true, Enterprise: true },
        },
      ],
    },
    {
      name: "Support",
      features: [
        {
          name: "24/7 Customer Support",
          tiers: { Small: true, Medium: true, Enterprise: true },
        },
        {
          name: "Expert Customer Support",
          tiers: { Small: true, Medium: true, Enterprise: true },
        },
        {
          name: "2 Months Free Advisor",
          tiers: { Small: false, Medium: true, Enterprise: true },
        },
      ],
    },
  ],
} as const;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function CompareFeature() {
  return (
    <div className="mx-auto my-20 max-w-7xl px-6 lg:px-8">
      <h5 className="text-center text-3xl text-[#171717] lg:text-4xl dark:text-white">
        All Packages
      </h5>
      <p className="mx-auto mb-12 mt-6 text-center text-xs lg:mt-2 lg:w-7/12 xl:text-lg">
        Make online selling easier by linking with popular ecommerce platforms,
        marketplaces, and shipping carriers.
      </p>

      {/* Feature comparison (up to lg) */}
      <section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
        <h2 id="mobile-comparison-heading" className="sr-only">
          Feature comparison
        </h2>

        <div className="mx-auto max-w-2xl space-y-16">
          {pricing.tiers.map((tier) => (
            <div key={tier.id} className="border-t border-gray-900/10">
              <div
                className={classNames(
                  tier.featured ? "border-primary" : "border-transparent",
                  "-mt-px w-72 border-t-2 pt-10 md:w-80"
                )}
              >
                <h3
                  className={classNames(
                    tier.featured ? "text-primary" : "text-gray-900",
                    "text-sm font-semibold leading-6"
                  )}
                >
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">{tier.description}</p>
              </div>

              <div className="mt-10 space-y-10">
                {pricing.sections.map((section) => (
                  <div key={section.name}>
                    <h4 className="text-sm font-semibold leading-6 text-gray-900">
                      {section.name}
                    </h4>
                    <div className="relative mt-6">
                      {/* Fake card background */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-sm sm:block"
                      />

                      <div
                        className={classNames(
                          tier.featured
                            ? "ring-2 ring-primary"
                            : "ring-1 ring-gray-900/10",
                          "relative rounded-lg bg-white shadow-sm sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0"
                        )}
                      >
                        <dl className="divide-y divide-gray-200 text-sm leading-6">
                          {section.features.map((feature) => (
                            <div
                              key={feature.name}
                              className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
                            >
                              <dt className="pr-4 text-gray-600">{feature.name}</dt>
                              <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                {typeof feature.tiers[tier.name] === "string" ? (
                                  <span
                                    className={
                                      tier.featured
                                        ? "font-semibold text-primary"
                                        : "text-gray-900"
                                    }
                                  >
                                    {feature.tiers[tier.name]}
                                  </span>
                                ) : (
                                  <>
                                    {feature.tiers[tier.name] === true ? (
                                      <CheckIcon
                                        className="mx-auto size-5 text-primary"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <MinusIcon
                                        className="mx-auto size-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    )}

                                    <span className="sr-only">
                                      {feature.tiers[tier.name] === true ? "Yes" : "No"}
                                    </span>
                                  </>
                                )}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>

                      {/* Fake card border */}
                      <div
                        aria-hidden="true"
                        className={classNames(
                          tier.featured
                            ? "ring-2 ring-primary"
                            : "ring-1 ring-gray-900/10",
                          "pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block"
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Feature comparison (lg+) */}
      <section aria-labelledby="comparison-heading" className="hidden lg:block">
        <h2 id="comparison-heading" className="sr-only">
          Feature comparison
        </h2>

        <div className="grid grid-cols-4 gap-x-8 border-t border-gray-900/10 before:block">
          {pricing.tiers.map((tier) => (
            <div key={tier.id} aria-hidden="true" className="-mt-px">
              <div
                className={classNames(
                  tier.featured ? "border-primary" : "border-transparent",
                  "border-t-2 pt-10"
                )}
              >
                <p
                  className={classNames(
                    tier.featured ? "text-primary" : "text-gray-900",
                    "text-sm font-semibold leading-6"
                  )}
                >
                  {tier.name}
                </p>
                <p className="mt-1 text-sm leading-6 text-gray-600">{tier.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="-mt-6 space-y-16">
          {pricing.sections.map((section) => (
            <div key={section.name}>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                {section.name}
              </h3>
              <div className="relative -mx-8 mt-10">
                {/* Fake card backgrounds */}
                <div
                  className="absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                  aria-hidden="true"
                >
                  <div className="size-full rounded-lg bg-white shadow-sm" />
                  <div className="size-full rounded-lg bg-white shadow-sm" />
                  <div className="size-full rounded-lg bg-white shadow-sm" />
                </div>

                <table className="relative w-full border-separate border-spacing-x-8">
                  <thead>
                    <tr className="text-left">
                      <th scope="col">
                        <span className="sr-only">Feature</span>
                      </th>
                      {pricing.tiers.map((tier) => (
                        <th key={tier.id} scope="col">
                          <span className="sr-only">{tier.name} tier</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.features.map((feature, featureIdx) => (
                      <tr key={feature.name}>
                        <th
                          scope="row"
                          className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900"
                        >
                          {feature.name}
                          {featureIdx !== section.features.length - 1 ? (
                            <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
                          ) : null}
                        </th>
                        {pricing.tiers.map((tier) => (
                          <td
                            key={tier.id}
                            className="relative w-1/4 px-4 py-0 text-center"
                          >
                            <span className="relative size-full py-3">
                              {typeof feature.tiers[tier.name] === "string" ? (
                                <span
                                  className={classNames(
                                    tier.featured
                                      ? "font-semibold text-primary"
                                      : "text-gray-900",
                                    "text-sm leading-6"
                                  )}
                                >
                                  {feature.tiers[tier.name]}
                                </span>
                              ) : (
                                <>
                                  {feature.tiers[tier.name] === true ? (
                                    <CheckIcon
                                      className="mx-auto size-5 text-primary"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <MinusIcon
                                      className="mx-auto size-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  )}

                                  <span className="sr-only">
                                    {feature.tiers[tier.name] === true ? "Yes" : "No"}
                                  </span>
                                </>
                              )}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Fake card borders */}
                <div
                  className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                  aria-hidden="true"
                >
                  {pricing.tiers.map((tier) => (
                    <div
                      key={tier.id}
                      className={classNames(
                        tier.featured ? "ring-2 ring-primary" : "ring-1 ring-gray-900/10",
                        "rounded-lg"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

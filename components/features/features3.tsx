"use client";

export default function Features3() {
  return (
    <>
      {/************************************* Section 3 *************************************/}
      <section className="py-12 lg:py-20">
        <div className="container items-center">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-2xl font-bold tracking-tight text-gray-900">
              At Manage Your eCommerce, we deeply understand the intricacies and
              challenges of running a flourishing online business.
            </p>
            <h2 className="my-6 text-lg font-semibold leading-8 tracking-tight text-primary">
              Your Success, Our Commitment
            </h2>
            <p className="tracking-tight text-gray-900">
              Our platform extends beyond just software, it’s a commitment to your growth,
              efficiency, and unparalleled success in the digital marketplace.
            </p>
          </div>
        </div>
        <dl className="container mt-12 grid grid-cols-1 gap-5 text-center sm:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-shippingRatesBg p-4 shadow">
            <dd className="text-lg font-semibold tracking-tight text-gray-900 xl:text-xl 2xl:text-2xl">
              Rapid Onboarding Service
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-shippingRatesBg p-4 shadow">
            <dd className="text-lg font-semibold tracking-tight text-gray-900 xl:text-xl 2xl:text-2xl">
              Competitive, Transparent Pricing
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-shippingRatesBg p-4 shadow">
            <dd className="text-lg font-semibold tracking-tight text-gray-900 xl:text-xl 2xl:text-2xl">
              Reliable, Accurate Data
            </dd>
          </div>
        </dl>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-20 text-4xl font-bold tracking-tight text-gray-900">
            Transform Your eCommerce Operations with Manage Your eCommerce
          </h2>
        </div>
      </section>

      {/************************************* Section 4 *************************************/}
    </>
  );
}

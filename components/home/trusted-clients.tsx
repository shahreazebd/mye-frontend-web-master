import Image from "next/image";

export default function TrustedClients() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Be where your customers are, on whichever platform they’re on.
        </h2>
        <div className="flex items-center">
          <div className="mx-auto mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:gap-x-10 lg:grid-cols-6">
            <Image
              className="max-h-12 w-auto object-contain"
              src="/logos/marketplaces/amazon.svg"
              alt="Transistor"
              width={100}
              height={32}
              style={{ width: "auto" }}
            />
            <Image
              className="max-h-12 w-auto object-contain"
              src="/logos/marketplaces/woo.svg"
              alt="Tuple"
              width={100}
              height={32}
              style={{ width: "auto" }}
            />
            <Image
              className="max-h-12 w-auto object-contain"
              src="/logos/marketplaces/otto.svg"
              alt="SavvyCal"
              width={100}
              height={32}
              style={{ width: "auto" }}
            />
            <Image
              className="max-h-12 w-auto object-contain"
              src="/logos/marketplaces/ebay.svg"
              alt="Tuple"
              width={100}
              height={32}
              style={{ width: "auto" }}
            />
            <Image
              className="max-h-12 w-auto object-contain"
              src="/logos/marketplaces/bigcommerce.svg"
              alt="Reform"
              width={100}
              height={32}
              style={{ width: "auto" }}
            />
            <Image
              className="max-h-12 w-auto object-contain"
              src="/logos/marketplaces/shopify.svg"
              alt="Statamic"
              width={100}
              height={32}
              style={{ width: "auto" }}
            />
          </div>
        </div>
      </div>
      {/* <div className="mt-16 flex justify-center">
        <p className="relative rounded-full bg-gray-50 px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/5">
          <span className="hidden md:inline">
            Over 2500 companies use our tools to better their business.
          </span>
          <a href="#" className="font-semibold text-indigo-600">
            <span className="absolute inset-0" aria-hidden="true" /> Read our customer
            stories <span aria-hidden="true">&rarr;</span>
          </a>
        </p>
      </div> */}
    </div>
  );
}

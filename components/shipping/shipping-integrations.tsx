import React from "react";
import Image from "next/image";

export function ShippingIntegrations() {
  return (
    <div className="bg-[#ECECFE] pb-96 pt-20 dark:bg-[#030711] ">
      <div className="container">
        <h5 className="text-center text-3xl text-[#171717] lg:text-4xl dark:text-white">
          Shipping Integrations
        </h5>
        <p className="mx-auto mt-6 text-center text-xs lg:mt-2 lg:w-7/12 xl:text-lg">
          Manage Your eCommerce integrates with popular shipping carriers, allowing you to
          fulfil orders across all sales channels.
        </p>
        <div className="mt-16 grid grid-cols-2">
          <div className="border p-8">
            <h6>Royal Mail</h6>
            <p className="mt-1 text-sm">
              Generate Royal Mail labels for all your orders from each sales channel in
              one place.
            </p>
          </div>
          <div className="flex items-center border p-4">
            <Image
              src="/images/integrations/royal-mail.svg"
              alt="logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <div className="flex items-center border p-4">
            <Image
              src="/images/integrations/evri.svg"
              alt="logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <div className="border p-8">
            <h6>EVRI</h6>
            <p className="mt-1 text-sm">
              Save time by sending shipping data directly to EVRI for all your online
              orders including Amazon, eBay, Etsy and Wish.
            </p>
          </div>
          <div className="border p-8">
            <h6>DPD</h6>
            <p className="mt-1 text-sm">
              Directly integrate your DPD account with Manage Your eCommerce to ship
              domestic and international orders with one of the UK’s leading time-critical
              carriers.
            </p>
          </div>
          <div className="flex items-center border p-4">
            <Image
              src="/images/integrations/dpd.svg"
              alt="logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <div className="flex items-center border p-4">
            <Image
              src="/images/integrations/fedex.svg"
              alt="logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <div className="border p-8">
            <h6>Fedex</h6>
            <p className="mt-1 text-sm">
              Streamline your multi-channel operation by integrating FedEx.
            </p>
          </div>
          <div className=" border p-8">
            <h6>UPS</h6>
            <p className="mt-1 text-sm">
              Integrate online marketplaces and UPS into one platform to quickly print
              shipping labels for all of your orders.
            </p>
          </div>
          <div className="flex items-center border p-4">
            <Image
              src="/images/integrations/ups.svg"
              alt="logo"
              width={90}
              height={90}
              className="mx-auto"
            />
          </div>
          <div className="flex items-center border p-4">
            <Image
              src="/images/integrations/royal-mail.svg"
              alt="logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <div className="border p-8">
            <h6>Royal Mail Click and Drop</h6>
            <p className="mt-1 text-sm">
              Upload orders into Click and Drop to print shipping labels for all of your
              sales channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

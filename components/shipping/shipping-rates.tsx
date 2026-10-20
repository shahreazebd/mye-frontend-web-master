import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

import { Button } from "../ui/button";

function ShippingRates() {
  return (
    <section className="bg-shippingRatesBg py-12 lg:py-20 ">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[28px] font-bold lg:block">
              Empowering Your Ecommerce with Advanced Shipping Features
            </h3>
            <div className="lg:mr-20">
              <p className="mb-8 text-xs lg:text-base">
                <ul className="list-disc">
                  <li className="mb-3">
                    <b>Comprehensive Carrier Connectivity:</b> Connect your preferred
                    shipping carriers effortlessly by simply entering your account
                    credentials to unlock efficient shipping.
                  </li>
                  <li className="mb-3">
                    <b>Real-Time Order Synchronisation:</b> Sync your store orders in
                    real-time, ensuring your shipping process is always up to date.
                  </li>
                  <li className="mb-3">
                    <b>Automated Label Printing:</b> Say goodbye to manual processes. Our
                    system generates labels for you, saving time and reducing errors.
                  </li>
                  <li className="mb-3">
                    <b>Bulk Shipping Options:</b> Manage multiple shipments effortlessly.
                    Our platform is designed to handle bulk shipping, streamlining your
                    operations.
                  </li>
                  <li className="mb-3">
                    <b>Real-Time Tracking Updates:</b> Keep yourself and your customers
                    informed with live tracking updates for every shipment.
                  </li>
                </ul>
              </p>
            </div>

            <Link href="/register">
              <Button variant="secondary" className="text-[11px] md:text-base">
                Get Started{" "}
                <span className="ml-3">
                  <ArrowRightCircle size={15} />
                </span>
              </Button>
            </Link>
          </div>

          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h3 className="mb-1 block text-[20px] font-bold lg:hidden">
              Empowering Your Ecommerce with Advanced Shipping Features
            </h3>
            <Image
              src="/images/home/shippingRates.svg"
              alt="automationShipping"
              width={554}
              height={529}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShippingRates;

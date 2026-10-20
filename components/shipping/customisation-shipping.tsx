import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

import { Button } from "../ui/button";

function CustomisationShipping() {
  return (
    <section className="bg-shippingRatesBg py-12 lg:py-20 ">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[28px] font-bold lg:block">
              User-Friendly Integration for Every User
            </h3>
            <div className="lg:mr-20">
              <p className="mb-8 text-xs lg:text-base">
                <ul className="list-disc">
                  <li className="mb-3">
                    <b>Quick and Easy Setup:</b> Integrating a new shipping carrier is a
                    breeze – it takes just 10 seconds! Just enter your carrier account
                    credentials and you&apos;re set.
                  </li>
                  <li className="mb-3">
                    <b>Designed for Ease of Use:</b> Our platform is built with
                    user-friendliness in mind, making shipping management accessible to
                    everyone.
                  </li>
                </ul>
              </p>
            </div>
            <h3 className="mb-8 hidden text-[28px] font-bold lg:block">
              Customisation at Your Fingertips
            </h3>
            <div className="lg:mr-20">
              <p className="mb-8 text-xs lg:text-base">
                <ul className="list-disc">
                  <li className="mb-3">
                    <b>Choose Your Shipping Methods:</b> Tailor your shipping process with
                    preferred methods.
                  </li>
                  <li className="mb-3">
                    <b>Feed Return Tracking Information:</b> Keep track of return
                    shipments with ease.
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
              User-Friendly Integration for Every User
            </h3>
            <Image
              src="/images/home/power-features.svg"
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

export default CustomisationShipping;

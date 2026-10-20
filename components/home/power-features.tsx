import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

import { Button } from "../ui/button";

function PowerFeatures() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h3 className="mb-7  hidden font-bold lg:block">
              Power features for hassle-free fulfillment
            </h3>
            <p className="mb-8">
              You can learn more about{" "}
              <span className="font-semibold underline">Buy Shipping benefits here.</span>
            </p>
            <div className="mb-4 flex space-x-2 lg:mb-9">
              <div>
                <h6 className="text-sm lg:text-[23px]">
                  The same guarantees offered with Buy Shipping
                </h6>
                <p className="mt-1 text-xs lg:mt-5 lg:text-base">
                  Buy labels for Amazon orders using MYE on time and you’ll be protected
                  against A-Z carrier claims related to late delivery and negative
                  feedback. Just like you find in Buy Shipping.
                </p>
              </div>
            </div>

            <div className="mb-4 flex space-x-2 lg:mb-9">
              <div>
                <h6 className="text-sm lg:text-[23px]">Amazon-discounted rates</h6>
                <p className="mt-1 text-xs lg:mt-5 lg:text-base">
                  Access Amazon sponsored discounts for select carriers on your Amazon
                  orders. Discounts may vary per carrier, ship method, package and transit
                  route, they range up to $4.00 per shipping label.
                </p>
              </div>
            </div>

            <div className="mb-4 flex space-x-2 lg:mb-9">
              <div>
                <h6 className="text-sm lg:text-[23px]">100% Valid Tracking Rates</h6>
                <p className="mt-1 text-xs lg:mt-5 lg:text-base">
                  All labels purchased through mye will include a Valid Tracking ID, and
                  it will automatically sync with your Amazon account extra cost.
                </p>
              </div>
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
            <h3 className="mb-7 block font-bold lg:hidden">
              Power features for hassle-free fulfillment
            </h3>
            <Image
              src="/images/home/power-features.svg"
              alt=".."
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PowerFeatures;

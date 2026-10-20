import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="dark:from- bg-gradient-to-r from-[#99CAFF] via-[#99CAFF] to-[#9797FF] py-8 md:py-14 lg:py-12 dark:bg-gradient-to-r dark:from-[#030711] dark:via-[#030711] dark:to-[#030711]">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center justify-center lg:grid-cols-2 ">
          <div className="order-2 lg:order-1">
            <h1 className="hidden text-[40px] text-white lg:block">
              Seamless Shipping Carrier Integration for Ultimate Efficiency
            </h1>
            <p className="my-6 text-center text-white lg:text-left">
              At Manage Your eCommerce, we understand the complexities and time
              constraints of managing shipments across multiple channels. That&lsquo;s why
              we have developed a powerful shipping solution that seamlessly integrates
              with top carriers such as Royal Mail, DHL, FedEx, UPS, DPD, EVRI, and USPS.
            </p>
            <Link href="/register">
              <Button variant="secondary" className="text-[11px] md:text-base">
                Get Started{" "}
                <span className="ml-3">
                  <ArrowRightCircle size={15} />
                </span>
              </Button>
            </Link>
          </div>
          <div className="order-1 ml-auto lg:order-2">
            <Image
              src="/images/home/shippingHero.svg"
              alt="..."
              height={280}
              width={289.1}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

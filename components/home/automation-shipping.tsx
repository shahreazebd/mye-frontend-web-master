import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import SectionHeader from "../shared/section-header";

export default function AutomationShipping() {
  return (
    <section className="bg-automationShippingBg py-12 lg:py-20">
      <div className="container items-center">
        <SectionHeader
          title="Automation tools that simplify your shipping"
          description="Simplify Your Regular business by using MYE"
        />

        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:mt-16 lg:grid-cols-2">
          <div className="mx-auto lg:mx-0">
            <Image
              src="/images/home/automation-shipping.svg"
              alt=".."
              width={600}
              height={400}
              className="h-auto w-auto"
            />
          </div>

          <div className="rounded-sm bg-background px-8 py-10 lg:py-14">
            <div className="mb-5 flex items-center space-x-2 lg:mb-9">
              <div>
                <h6 className="text-sm lg:text-[20px]">Order management</h6>
                <p className="mt-3 text-xs lg:mt-5 lg:text-base">
                  Reduce complicated manual processes with simple order management
                  software. Connect your sales channels, orders, and shipping on one
                  platform.
                </p>
              </div>
            </div>

            <div className="mb-5 flex items-center space-x-2 lg:mb-9">
              <div>
                <h6 className="text-sm lg:text-[20px]">Inventory management</h6>
                <p className="mt-3 text-xs lg:mt-5 lg:text-base">
                  Improve inventory control with real-time information to avoid stockout
                  to overstocking and increase customer satisfaction. MYE provides quick
                  access to actual time inventory data.
                </p>
              </div>
            </div>

            <div className="mb-5 flex items-center space-x-2 lg:mb-9">
              <div>
                <h6 className="text-sm lg:text-[20px]">Realtime report</h6>
                <p className="mt-3 text-xs lg:mt-5 lg:text-base">
                  Using the barcode scanning MYE automates what inventory goes out, when
                  it is delivered and to whom it is sent; whether it is to a job site, a
                  client, an employee, or a vehicle.
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
        </div>
      </div>
    </section>
  );
}

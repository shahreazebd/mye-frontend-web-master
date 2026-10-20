import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

import { Button } from "../ui/button";

function OrderManagement() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto lg:mx-0 ">
            <h2 className="mb-1 block text-[20px] font-bold lg:hidden">
              Experience the Benefits: Time-Saving, Error-Reducing, and Efficient
            </h2>

            <Image
              src="/images/shipping/order-management.svg"
              alt=".."
              width={600}
              height={400}
              className="mx-auto size-[500px]"
            />
          </div>
          <div>
            <h2 className="mb-8 hidden text-[28px] font-bold lg:block">
              Experience the Benefits: Time-Saving, Error-Reducing, and Efficient
            </h2>

            <p className="mb-8 text-xs lg:text-base">
              <ul className="list-disc">
                <li className="mb-3">
                  <b>Time Efficiency:</b> Our integrated solution significantly reduces
                  the time you spend managing shipments.
                </li>
                <li className="mb-3">
                  <b>Reduced Human Errors:</b> Automation means fewer mistakes, ensuring a
                  smooth shipping experience for you and your customers.
                </li>
                <li className="mb-3">
                  <b>Improved Order Fulfilment:</b> Efficiently manage and ship orders
                  from all your sales channels from a single location, enhancing overall
                  fulfilment efficiency.
                </li>
                <li className="mb-3">
                  <b>Simplified FIFO routing:</b> Make sure older inventory is
                  automatically picked for fulfilling orders for the FIFO (First-in,
                  First-out) inventory model.
                </li>
                <li className="mb-3">
                  <b>Intelligent package assignment:</b> Auto-sync and SKU-filter are the
                  most efficient ways to pack orders to cut down on waste, time and
                  inefficiencies.
                </li>
              </ul>
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
        </div>
      </div>
    </section>
  );
}

export default OrderManagement;

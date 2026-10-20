"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-singleIntegrationBg py-8 md:py-14 lg:py-12">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center justify-center lg:grid-cols-2 ">
          <div className="order-2 lg:order-1">
            <h1 className="hidden text-[40px] leading-[50px] text-white lg:block">
              OTTO Fulfilment and Automated Inventory Management System
            </h1>

            <ul className="mb-7 mt-4 list-disc text-center text-white lg:text-left">
              <li className="mb-2">
                Manage your OTTO inventory from a single easy-to-use dashboard
              </li>
              <li className="mb-2">Shipping integrations with Royal Mail</li>
              <li className="mb-2">
                Save time by seamlessly managing all your OTTO orders from a single
                dashboard
              </li>
              <li className="mb-2">
                Increase your OTTO business with real-time forecasting tools from Manage
                Your eCommerce
              </li>
              <li className="mb-2">
                MYE Mobile App to view all your operations at a glance
              </li>
            </ul>

            <Link href="/register">
              <Button variant="secondary" className="text-[11px] md:text-base">
                Get Started{" "}
                <span className="ml-3">
                  <ArrowRightCircle size={15} />
                </span>
              </Button>
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <Image
              src="/images/integrations/otto.svg"
              alt="..."
              height={280}
              width={335.5}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

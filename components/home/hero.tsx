"use client";

import Image from "next/image";
import Link from "next/link";

import useAuth from "@/hooks/custom/useAuth";
import { Button } from "@/components/ui/button";

import { WatchVideoModal } from "./watch-video-modal";

export default function Hero() {
  const { userInformation } = useAuth();

  return (
    <section className="bg-heroBackground py-8 md:py-14 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center justify-center lg:grid-cols-2 lg:gap-11">
          <div className="order-2 lg:order-1">
            <h1 className="hidden lg:block">
              From Order to Shipping labels, Inventory management to Messaging: Your all
              in one solution
            </h1>
            <p className="mb-10 text-center md:mb-12 lg:my-10 lg:text-left">
              A unique and advanced software solution for companies of all sizes. MYE
              provides from beginning to end business needs with solutions.
            </p>

            {userInformation?.company_uid ? (
              <div className="mb-7 text-center lg:mb-5 lg:text-left">
                <WatchVideoModal />
              </div>
            ) : (
              <div className="mb-7 space-x-4 text-center lg:mb-5 lg:text-left">
                <Link href="/register">
                  <Button className="text-[11px] md:text-base">Start Free Trial</Button>
                </Link>
                <WatchVideoModal />
              </div>
            )}

            <div className="text-center lg:text-left">
              <small>No Credit/Debit Card required</small>
            </div>
          </div>
          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h1 className="mb-6 block text-center lg:hidden">
              From Order to Shipping labels, Inventory management to Messaging: Your all
              in one solution
            </h1>
            <Image
              src="/images/home/hero.svg"
              alt="..."
              height={610}
              width={500}
              className="mx-auto h-auto w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

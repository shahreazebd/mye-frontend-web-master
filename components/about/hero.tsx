import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="about-hero bg-gradient-to-r from-[#9797FF] via-[#9797FF] to-[#99CAFF] py-8 md:py-14 lg:py-12 dark:from-[#030711] dark:via-[#030711] dark:to-[#030711]">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center justify-center lg:grid-cols-2 ">
          <div className="order-2 lg:order-1">
            <h1 className="hidden text-[40px] text-white lg:block">About Us</h1>
            <p className="my-6 text-center text-white lg:text-left">
              MYE is a user-friendly eCommerce management company offering inventory and
              order management, including Smart SKU mapping, for easy business operations.
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
              src="/images/about/hero.svg"
              alt="..."
              height={280}
              width={329.9}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type ExampleProps = {
  children?: ReactNode;
};

export const Example = ({ children }: ExampleProps) => (
  <div>
    <h1>{children}</h1>
  </div>
);

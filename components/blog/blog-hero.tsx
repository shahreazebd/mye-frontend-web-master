import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function BlogHero() {
  return (
    <section className="bg-gradient-to-b from-[#9797FF] via-[#9797FF] to-[#99CAFF] py-8 md:py-14 lg:py-12  dark:bg-gradient-to-r dark:from-[#030711] dark:to-[#030711]">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center justify-center lg:grid-cols-2 ">
          <div className="order-2 lg:order-1">
            <h1 className="hidden text-[40px] text-white lg:block">
              Find Out More about MYE
            </h1>
            <p className="my-6 text-center text-white lg:text-left">
              Discover how MYE simplifies eCommerce management for retailers like you.
              From inventory tracking and order processing to seamless shipping
              integration, MYE brings all the tools you need into one intuitive platform.
              Dive deeper into strategies, insights, and solutions tailored to boost your
              efficiency, cut costs, and enhance your customer experience. Let MYE be your
              trusted partner in transforming your eCommerce journey.
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
              src="/images/blog/blog-hero-image.svg"
              alt="..."
              height={280}
              width={325.9}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

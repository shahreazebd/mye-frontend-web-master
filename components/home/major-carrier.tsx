import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

import { Button } from "../ui/button";

export default function MajorCarrier() {
  return (
    <section className="majorCarrier bg-majorCarrierBg pb-14 pt-12 lg:pb-40 lg:pt-24">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="mx-auto lg:mx-0">
            <h3 className="block text-center font-bold lg:hidden ">
              All of your integrations are in one place
            </h3>
            <Image
              src="/images/home/major-carrier.svg"
              alt="automationShipping"
              width={700}
              height={529}
            />
            <p className="mb-6 mt-8 block lg:hidden">
              MYE provides a smooth connection to hundreds of worldwide marketplaces. MYE
              simplifies, automates, and connects online selling by integrating with the
              world’s most popular retail applications, such as ecommerce platforms,
              marketplaces, shipping providers, and many others.
            </p>
            <Link href="/register">
              <Button
                variant="secondary"
                className="flex text-[11px] md:text-base lg:hidden"
              >
                Get Started{" "}
                <span className="ml-3">
                  <ArrowRightCircle size={15} />
                </span>
              </Button>
            </Link>
          </div>
          <div>
            <h3 className="hidden text-center font-bold lg:block lg:text-left">
              All of your integrations are in one place
            </h3>
            <p className="mb-8 mt-4 hidden lg:block">
              MYE provides a smooth connection to hundreds of worldwide marketplaces. MYE
              simplifies, automates, and connects online selling by integrating with the
              world’s most popular retail applications, such as ecommerce platforms,
              marketplaces, shipping providers, and many others.
            </p>
            <p className="mb-14 hidden lg:block">
              MYE provides your customers a simple and easy-to-use ordering option that
              they can access 24/7, whether through a website or a mobile application.
              This is not only an excellent service for your customers, but it also offers
              sellers to create customer connections, customers on new products, and
              prospect new clients.
            </p>
            <Link href="/register">
              <Button
                variant="secondary"
                className="hidden text-[11px] md:text-base lg:flex"
              >
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

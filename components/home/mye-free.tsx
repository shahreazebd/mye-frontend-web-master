import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle, Check } from "lucide-react";

import { Button } from "../ui/button";

export default function MyeFree() {
  return (
    <div className="myeFree pb-20 pt-32 lg:pb-32 lg:pt-48 xl:pb-56 xl:pt-64 2xl:pt-72">
      <div className="container items-center">
        <div className="relative mx-auto rounded-lg bg-background p-12 md:w-11/12 lg:w-3/4 xl:w-7/12 2xl:w-6/12">
          <div className="absolute -right-6 -top-5 md:-right-10 md:-top-8 lg:-right-12 lg:-top-12">
            <Image
              src="/images/home/myeFree.svg"
              alt="mye-free"
              height={153}
              width={153}
              className="size-16 md:size-24 lg:size-32"
            />
          </div>

          <h3 className="text-2xl lg:text-[36px]">Completely FREE for first 30 Days!</h3>
          <p className="my-6">
            We’re able to provide MYE for free because we benefit from shipping volume
            passed to our partner shipping carriers. It’s all part of our mission to help
            sellers, like you, stay a step ahead.
          </p>
          <ul className="mb-9">
            <li className="mb-2 flex items-center text-sm lg:text-base">
              <Check size={20} /> <span className="ml-2">Unlimited users</span>
            </li>

            <li className="mb-2 flex items-center text-sm lg:text-base">
              <Check size={20} /> <span className="ml-2">Unlimited orders</span>
            </li>

            <li className="mb-2 flex items-center text-sm lg:text-base">
              <Check size={20} /> <span className="ml-2">No shipping label limits</span>
            </li>

            <li className="mb-2 flex items-center text-sm lg:text-base">
              <Check size={20} /> <span className="ml-2">No usages charge</span>
            </li>
          </ul>
          <Link href="/register">
            <Button variant="secondary">
              Get Started{" "}
              <span className="ml-3">
                <ArrowRightCircle size={15} />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

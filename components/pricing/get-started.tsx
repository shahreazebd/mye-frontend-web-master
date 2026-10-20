// import { ArrowRightCircle } from "lucide-react";

import Link from "next/link";

// import { Button } from "@/components/ui/button";

export default function GetStarted() {
  return (
    <section className="relative text-center lg:container">
      {/* <div className="bg-[#8383FF] py-12 dark:bg-black lg:pb-[86px] lg:pt-[93px]">
        <h5 className="text-xl leading-[58px] text-[#fff] lg:pb-6 lg:text-5xl">
          Get started a 15-days free trial
        </h5>
        <p className="pb-5 text-xs text-[#fff] lg:pb-8 lg:text-[18px] lg:leading-[27px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
          in eros elementum tristique.
        </p>

        <Button variant="secondary" className="text-[11px] md:text-base">
          Get Started
          <span className="ml-3">
            <ArrowRightCircle size={15} />
          </span>
        </Button>
        <p className="pt-5 text-[12px] leading-[18px] text-[#fff]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
          in eros elementum tristique.
        </p>
      </div> */}
      <div className="relative isolate overflow-hidden bg-gray-900 sm:rounded-3xl">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get started a 30-days free trial
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              We make good use of your monthly subscription. In addition to free customer
              support, you will receive a 30 days free trial.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}

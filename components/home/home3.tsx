import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import TrustedClients from "./trusted-clients";
import { WatchVideoModal } from "./watch-video-modal";

const projects = [
  { name: "Order Tracking and Lost Item Notification", bgColor: "bg-pink-600" },
  {
    name: "Return Tracking and Visibility",
    bgColor: "bg-purple-600",
  },
  { name: "Seamless Integration", bgColor: "bg-yellow-500" },
  {
    name: "Smart SKU Mapping",
    bgColor: "bg-green-500",
  },
  { name: "Third-Party Warehouse Integration", bgColor: "bg-newPrimary" },
  {
    name: "Custom Postage Rules",
    bgColor: "bg-red-600",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Home3() {
  return (
    <>
      {/************************************* Section 1 *************************************/}
      <section className="bg-heroBackground py-8 md:py-14 lg:py-20">
        <div className="container items-center">
          <div className="grid grid-cols-1 items-center justify-center lg:grid-cols-2 lg:gap-11">
            <div className="order-2 lg:order-1">
              <h2 className="hidden text-lg font-semibold tracking-tight text-primary lg:block">
                The Manage Your Ecommerce
              </h2>
              <h1 className="hidden text-4xl font-bold leading-snug tracking-tight lg:block">
                Multi-channel order management system is meticulously designed for
                eCommerce entrepreneurs like you.
              </h1>
              <p className="mb-10 text-center md:mb-12 lg:my-10 lg:text-left">
                Our platform extends beyond just software, it’s a commitment to your
                growth, efficiency, and unparalleled success in the digital marketplace.
              </p>

              <div className="mb-7 space-x-4 text-center lg:mb-5 lg:text-left">
                <Link href="/register">
                  <Button className="text-[11px] md:text-base">Start Free Trial</Button>
                </Link>
                <WatchVideoModal />
              </div>

              <div className="text-center lg:text-left">
                <small>No Credit/Debit Card required</small>
              </div>
            </div>
            <div className="order-1 mx-auto lg:order-2 lg:mx-0">
              <h2 className="block text-center text-lg font-semibold leading-8 tracking-tight text-primary lg:hidden">
                Your Success, Our Commitment
              </h2>
              <h1 className="mb-6 block text-center text-4xl font-bold leading-snug tracking-tight lg:hidden ">
                Multi-channel order management system is meticulously designed for
                eCommerce entrepreneurs like you.
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
      {/************************************* Section 2 *************************************/}
      <TrustedClients />
      {/************************************* Section 3 *************************************/}
      <section className="pb-12 lg:pb-20">
        <div className="container items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-lg font-semibold leading-8 tracking-tight text-primary">
              Your Success, Our Commitment
            </h2>
            <p className="text-2xl font-bold tracking-tight text-gray-900">
              At Manage Your eCommerce, we deeply understand the intricacies and
              challenges of running a flourishing online business.
            </p>
          </div>
        </div>
        <dl className="container mt-12 grid grid-cols-1 gap-5 text-center sm:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-orange-50 p-4 shadow">
            <dd className="text-lg font-semibold tracking-tight text-gray-900 xl:text-xl 2xl:text-2xl">
              Rapid Onboarding Service
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-orange-50 p-4 shadow">
            <dd className="text-lg font-semibold tracking-tight text-gray-900 xl:text-xl 2xl:text-2xl">
              Competitive, Transparent Pricing
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-orange-50 p-4 shadow">
            <dd className="text-lg font-semibold tracking-tight text-gray-900 xl:text-xl 2xl:text-2xl">
              Reliable, Accurate Data
            </dd>
          </div>
        </dl>
      </section>

      {/************************************* Section 4 *************************************/}

      <section className="bg-orange-50 py-12 lg:py-20">
        <div className="container items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-gray-900">
              Empower Your Online Business with Comprehensive Solutions
            </h3>
          </div>
          <div className="container items-center">
            <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:mt-16 lg:grid-cols-2">
              <div className="mx-auto lg:mx-0">
                <Image
                  src="/images/home/automation-shipping.svg"
                  alt=".."
                  width={500}
                  height={250}
                  className="h-auto w-auto"
                />
              </div>

              <div className="rounded-md bg-background px-8 py-10 lg:py-14">
                <div className="mb-5 flex items-center space-x-2 lg:mb-9">
                  <div>
                    <h3 className="mb-7 hidden font-bold lg:block">
                      Centralized Order Management
                    </h3>
                    <p className="mt-3 text-xs lg:mt-5 lg:text-base">
                      Navigating the complexities of managing orders across various sales
                      channels can be overwhelming. Our Centralized Order Management
                      system consolidates this process, allowing you to oversee all your
                      orders from a single, unified dashboard. No matter where your
                      customers are shopping—whether on Amazon, eBay, WooCommerce, or
                      other platforms—you can easily track the status of each order in
                      real-time, send automated notifications to customers, and ensure
                      prompt fulfillment.
                    </p>
                  </div>
                </div>

                <Link href="/features">
                  <Button variant="secondary" className="text-[11px] md:text-base">
                    Learn More{" "}
                    <span className="ml-3">
                      <ArrowRightCircle size={15} />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/************************************* Section 5 *************************************/}

      <section className="py-12 lg:py-20">
        <div className="container items-center">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="order-2 rounded-md bg-orange-50 px-8 py-10 lg:order-1 lg:py-14">
              <h3 className="mb-7 hidden font-bold lg:block">
                Advanced Inventory Management
              </h3>

              <div className="mb-4 flex space-x-2 lg:mb-9">
                <div>
                  <p className="mt-1 text-xs lg:mt-5 lg:text-base">
                    Maintaining optimal inventory levels is crucial for the success of any
                    e-commerce business. Our Advanced Inventory Management tools give you
                    the power to efficiently manage stock levels, ensuring you never run
                    out or overstock on products. Monitor inventory across multiple
                    locations, forecast demand with precision, and automate restocking
                    processes with ease.
                  </p>
                </div>
              </div>

              <Link href="/features">
                <Button variant="secondary" className="text-[11px] md:text-base">
                  Learn More{" "}
                  <span className="ml-3">
                    <ArrowRightCircle size={15} />
                  </span>
                </Button>
              </Link>
            </div>
            <div className="order-1 mx-auto lg:order-2 lg:mx-0">
              <h3 className="mb-7 block font-bold lg:hidden">
                Advanced Inventory Management
              </h3>

              <Image
                src="/images/home/smartCommunication.svg"
                alt=".."
                width={500}
                height={250}
                className="h-auto w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/************************************* Section 6 *************************************/}

      <section className="majorCarrier bg-purple-50 pb-14 pt-12 lg:pb-40 lg:pt-24">
        <div className="container items-center">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="mx-auto lg:mx-0">
              <h3 className="block text-center font-bold lg:hidden ">
                Integrated Shipping Solutions
              </h3>
              <Image
                src="/images/home/major-carrier.svg"
                alt="automationShipping"
                width={600}
                height={450}
                className="h-auto w-auto"
              />
              <p className="mb-6 mt-8 block lg:hidden">
                Shipping is a pivotal component of the e-commerce experience, and our
                Integrated Shipping Solutions are designed to make it as efficient as
                possible. Connect with many courier services, automate the delivering
                process, and reduce errors to ensure accurate deliveries for your
                customers.
              </p>
            </div>
            <div>
              <h3 className="hidden text-center font-bold lg:block lg:text-left">
                Integrated Shipping Solutions
              </h3>
              <p className="mb-8 mt-4 hidden lg:block">
                Shipping is a pivotal component of the e-commerce experience, and our
                Integrated Shipping Solutions are designed to make it as efficient as
                possible. Connect with many courier services, automate the delivering
                process, and reduce errors to ensure accurate deliveries for your
                customers.
              </p>
              <Link href="/features">
                <Button variant="secondary" className="text-[11px] md:text-base">
                  Learn More{" "}
                  <span className="ml-3">
                    <ArrowRightCircle size={15} />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/************************************* Section 8 *************************************/}

      <section className="pb-12 pt-10 lg:pb-16 lg:pt-10">
        <div className="container items-center">
          <div className="mt-10 grid grid-cols-1 items-center gap-14 lg:mt-24 lg:grid-cols-2 lg:gap-20">
            <div className="order-1 mx-auto lg:order-2 lg:mx-0">
              <Image
                src="/images/home/power-features.svg"
                alt=".."
                width={500}
                height={300}
                className="h-auto w-auto"
              />
            </div>

            <div className="order-2 rounded-sm p-8 shadow-md lg:order-1 lg:py-14">
              <div className="mb-4 flex space-x-2 lg:mb-9">
                <div>
                  <h6 className="text-sm lg:text-[23px]">
                    Powerful Reporting and Analytics
                  </h6>
                  <p className="mt-1 text-xs lg:mt-5 lg:text-base">
                    Gaining a deep understanding of your business’s performance is crucial
                    for making strategic decisions. Our Powerful Reporting and Analytics
                    tools equip you with the data needed to analyze sales trends, monitor
                    inventory, and optimize your operations. With customizable reports and
                    forecasting tools, you’ll always have a clear, real-time view of your
                    business’s performance.
                  </p>
                </div>
              </div>

              <Link href="/features">
                <Button variant="secondary" className="text-[11px] md:text-base">
                  Learn More{" "}
                  <span className="ml-3">
                    <ArrowRightCircle size={15} />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/************************************* Section 9 *************************************/}

      <section className="py-12 lg:py-20">
        <div className="container items-center">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="order-1 rounded-md bg-orange-50 px-8 py-10 lg:order-2 lg:py-14">
              <h3 className="mb-7  hidden font-bold lg:block">
                Multi-Channel Inventory and Order Syncing
              </h3>

              <div className="mb-4 flex space-x-2 lg:mb-9">
                <div>
                  <p className="mt-1 text-xs lg:mt-5 lg:text-base">
                    Managing inventory and orders across multiple platforms can be
                    challenging, but with ManageYourEcommerce, it’s a breeze. Our
                    Multi-Channel Syncing feature ensures your inventory levels and order
                    statuses are consistently updated across all sales channels,
                    preventing overselling and enabling you to fulfill orders without
                    delays.
                  </p>
                </div>
              </div>

              <Link href="/features">
                <Button variant="secondary" className="text-[11px] md:text-base">
                  Learn More{" "}
                  <span className="ml-3">
                    <ArrowRightCircle size={15} />
                  </span>
                </Button>
              </Link>
            </div>
            <div className="order-2 mx-auto lg:order-1 lg:mx-0">
              <h3 className="mb-7 block font-bold lg:hidden">
                Powerful Business Insights
              </h3>
              <Image
                src="/images/home/powerful-business-insights.svg"
                alt=".."
                width={500}
                height={250}
                className="h-auto w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/************************************* Section 6 *************************************/}

      <section className="majorCarrier bg-purple-50 pb-14 pt-12 lg:pb-40 lg:pt-24">
        <div className="container items-center">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="mx-auto lg:mx-0">
              <h3 className="block text-center font-bold lg:hidden ">
                Customizable Automation Rules
              </h3>
              <Image
                src="/images/home/major-carrier.svg"
                alt="automationShipping"
                width={600}
                height={450}
                className="h-auto w-auto"
              />
              <p className="mb-6 mt-8 block lg:hidden">
                Automation is key to scaling your e-commerce business efficiently. Our
                Customizable Automation Rules feature empowers you to automate a variety
                of tasks, from order routing and inventory management to invoicing and
                shipping. Establish rules that align with your business’s unique needs and
                let ManageYourEcommerce take care of the rest.
              </p>
            </div>
            <div>
              <h3 className="hidden text-center font-bold lg:block lg:text-left">
                Customizable Automation Rules
              </h3>
              <p className="mb-8 mt-4 hidden lg:block">
                Automation is key to scaling your e-commerce business efficiently. Our
                Customizable Automation Rules feature empowers you to automate a variety
                of tasks, from order routing and inventory management to invoicing and
                shipping. Establish rules that align with your business’s unique needs and
                let ManageYourEcommerce take care of the rest.
              </p>
              <Link href="/features">
                <Button variant="secondary" className="text-[11px] md:text-base">
                  Learn More{" "}
                  <span className="ml-3">
                    <ArrowRightCircle size={15} />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/************************************* Section 8 *************************************/}

      <section className="pb-12 pt-10 lg:pb-16 lg:pt-10">
        <div className="container items-center">
          <div className="mt-10 grid grid-cols-1 items-center gap-14 lg:mt-24 lg:grid-cols-2 lg:gap-20">
            <div className="order-1 mx-auto lg:order-2 lg:mx-0">
              <Image
                src="/images/home/power-features.svg"
                alt=".."
                width={500}
                height={300}
                className="h-auto w-auto"
              />
            </div>

            <div className="order-2 rounded-sm p-8 shadow-md lg:order-1 lg:py-14">
              <div className="mb-4 flex space-x-2 lg:mb-9">
                <div>
                  <h6 className="text-sm lg:text-[23px]">
                    Mobile App for On-the-Go Management
                  </h6>
                  <p className="mt-1 text-xs lg:mt-5 lg:text-base">
                    E-commerce doesn’t stop when you’re away from your desk. With the
                    ManageYourEcommerce Mobile App, you can stay connected to your
                    business operations no matter where you are. Manage orders, monitor
                    inventory, and access key performance metrics directly from your
                    mobile device, ensuring you’re always in control.
                  </p>
                </div>
              </div>

              <Link href="/features">
                <Button variant="secondary" className="text-[11px] md:text-base">
                  Learn More{" "}
                  <span className="ml-3">
                    <ArrowRightCircle size={15} />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/************************************* Section 9 *************************************/}

      <section className="py-12 lg:py-20">
        <div className="container items-center">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="order-1 rounded-md bg-orange-50 px-8 py-10 lg:order-2 lg:py-14">
              <h3 className="mb-7  hidden font-bold lg:block">
                Seamless Integration with Leading Platforms
              </h3>

              <div className="mb-4 flex space-x-2 lg:mb-9">
                <div>
                  <p className="mt-1 text-xs lg:mt-5 lg:text-base">
                    ManageYourEcommerce integrates effortlessly with top e-commerce
                    platforms, marketplaces, and shipping carriers, ensuring your business
                    runs smoothly. Our platform’s flexibility and compatibility allow you
                    to connect all the tools you need, from product listing to order
                    fulfillment.
                  </p>
                </div>
              </div>

              <Link href="/features">
                <Button variant="secondary" className="text-[11px] md:text-base">
                  Learn More{" "}
                  <span className="ml-3">
                    <ArrowRightCircle size={15} />
                  </span>
                </Button>
              </Link>
            </div>
            <div className="order-2 mx-auto lg:order-1 lg:mx-0">
              <h3 className="mb-7 block font-bold lg:hidden">
                Powerful Business Insights
              </h3>
              <Image
                src="/images/home/powerful-business-insights.svg"
                alt=".."
                width={500}
                height={250}
                className="h-auto w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/************************************* Section 10 *************************************/}

      <div className="myeFree pb-16 pt-24 lg:py-24 lg:pt-32">
        <div className="container items-center">
          <div className="relative mx-auto rounded-lg bg-background p-12 md:w-full xl:w-10/12 2xl:w-9/12">
            <p className="mb-10 text-center text-lg tracking-tight text-gray-900">
              We understand your needs and work tirelessly to provide you with the right
              tools and resources you need to succeed.
            </p>
            <div>
              <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
                {projects.map((project) => (
                  <li key={project.name} className="col-span-1 flex rounded-md shadow-sm">
                    <div
                      className={classNames(
                        project.bgColor,
                        "flex w-2 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
                      )}
                    ></div>
                    <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-y border-r border-gray-200 bg-white">
                      <div className="flex-1 truncate px-4 py-2 text-sm">
                        <p className="font-medium text-gray-900 hover:text-gray-600">
                          {project.name}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/************************************* Section 11 *************************************/}

      <section className="relative text-center">
        <div className="relative isolate overflow-hidden bg-gray-900">
          <div className="px-6 sm:px-6 lg:px-8">
            <div className="mx-auto text-center">
              <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                <div className="mx-auto max-w-4xl divide-y divide-white/10">
                  <h5 className="text-center text-3xl text-white lg:text-4xl">
                    Our Commitment: More Than Just a Platform
                  </h5>
                  <p className="mx-auto mt-6 text-center text-xs text-white lg:mt-2 lg:w-7/12 xl:text-lg">
                    Manage Your eCommerce isn’t just a service provider. We are your
                    strategic partner in achieving success. Our promise includes:
                  </p>
                  <dl className="mt-10 space-y-6 divide-y divide-white/10 text-center text-white">
                    <dt>
                      <span className="text-xl font-semibold">
                        Competitive, Transparent Pricing with No Fixed contract
                      </span>
                    </dt>
                    <dt>
                      <span className="text-xl font-semibold">
                        With reliable, accurate data you can finally trust
                      </span>
                    </dt>
                    <dt>
                      <span className="text-xl font-semibold">
                        AI-Driven Inventory and Sales Optimization
                      </span>
                    </dt>
                    <dt>
                      <span className="text-xl font-semibold">
                        Highly scalable and robust system
                      </span>
                    </dt>
                    <dt>
                      <span className="text-xl font-semibold">
                        No Surprises with sudden price hikes
                      </span>
                    </dt>
                  </dl>
                </div>
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
    </>
  );
}

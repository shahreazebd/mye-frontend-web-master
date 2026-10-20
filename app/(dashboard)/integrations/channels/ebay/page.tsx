"use client";

import Image from "next/image";
import { MoveUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export default function IntegrationEbay() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={cn("w-full bg-gray-100 pb-8")}>
      <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-1 flex-col gap-8 px-4 py-6 text-black md:px-0">
        {/* Main White Card */}

        <div className="rounded-lg bg-white p-14 pt-2 shadow-xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/logos/marketplaces/ebay.svg"
              alt="eBay Logo"
              width={200}
              height={100}
            />
          </div>

          {/* Introduction */}
          <div className="flex flex-col gap-2">
            <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
              Connect eBay Channel Integration
            </h1>
            <p className="text-[1.05rem] text-muted-foreground sm:text-base">
              eBay is a major global e-commerce platform. By integrating your eBay seller
              account with our system, you can sync products, manage stock levels, and
              automate order processing directly from one place.
            </p>
            <p className="mt-3 leading-relaxed">
              This guide will help you set up the eBay integration, connect your seller
              account, and configure essential settings such as channel name, max stock,
              and location.
            </p>
          </div>

          {/* Prerequisites */}
          <h2 className="mt-10 text-xl font-medium tracking-tight">Prerequisites</h2>
          <ul className="my-6 ml-6 list-disc">
            <li className="mt-2">
              You must have an <strong>active eBay Seller account</strong>.
            </li>
            <li className="mt-2">
              Ensure your account has <strong>API access permissions</strong>.
            </li>
            <li className="mt-2">
              Gather your <strong>Seller ID</strong>, <strong>eBay Auth Token</strong>,
              and <strong>Site ID</strong>.
            </li>
            <li className="mt-2">
              Have administrative access to our platform to configure integrations.
            </li>
          </ul>

          {/* Step 1 */}
          <h2 className="mt-10 text-xl font-medium tracking-tight">
            Step 1 — Open eBay Integration Page
          </h2>
          <p className="mt-2 leading-relaxed">
            From your dashboard, navigate to{" "}
            <strong>Integrations → Marketplaces → eBay</strong>. You’ll see a form that
            looks like the following:
          </p>

          <div className="my-8 flex flex-col items-center gap-4">
            <Image
              src="/integrations/ebay/1.png"
              alt="eBay Integration Setup Form"
              width={800}
              height={500}
              className="rounded-2xl border shadow"
            />
            <p className="text-sm italic text-muted-foreground">
              Example eBay integration form with required fields like Channel Name,
              Country, and Location.
            </p>
          </div>

          {/* Step 2 */}
          <h2 className="mt-10 text-xl font-medium tracking-tight">
            Step 2 — Fill in Channel Details
          </h2>
          <p className="mt-2 leading-relaxed">
            Complete the required fields in the eBay integration form:
          </p>

          <ul className="my-6 ml-6 list-disc">
            <li className="mt-2">
              <strong>Channel Name:</strong> Enter a name to identify this eBay channel
              (e.g., “eBay US” or “eBay UK”).
            </li>
            <li className="mt-2">
              <strong>Channel Max Stock:</strong> Define the maximum stock quantity to
              sync with eBay.
            </li>
            <li className="mt-2">
              <strong>Country:</strong> Choose the marketplace country (e.g., United
              States, Canada, UK, etc.).
            </li>
            <li className="mt-2">
              <strong>Location:</strong> Select your inventory location for stock sync.
            </li>
          </ul>

          <div className="my-8 flex flex-col items-center gap-4">
            <Image
              src="/integrations/ebay/2.png"
              alt="eBay Integration Form Example"
              width={800}
              height={500}
              className="rounded-2xl border shadow"
            />
            <p className="text-sm italic text-muted-foreground">
              Fill all the details carefully and click <strong>Submit</strong>.
            </p>
          </div>

          {/* Step 3 */}
          <h2 className="mt-10 text-xl font-medium tracking-tight">
            Step 3 — Connect Your eBay Account
          </h2>
          <p className="mt-2 leading-relaxed">
            After submitting, you’ll be redirected to eBay Seller Central for
            authentication. Log in with your eBay seller credentials and grant necessary
            permissions to link your account.
          </p>

          <div className="my-8 flex flex-col items-center gap-4">
            <Image
              src="/integrations/ebay/3.png"
              alt="eBay Authentication Page"
              width={800}
              height={500}
              className="rounded-2xl border shadow"
            />
            <p className="text-sm italic text-muted-foreground">
              Log in to your eBay Seller account to authorize API access.
            </p>
          </div>

          {/* Step 4 */}
          <h2 className="mt-10 text-xl font-medium tracking-tight">
            Step 4 — Verify Connection
          </h2>
          <p className="mt-2 leading-relaxed">
            Once connected, your eBay channel will appear in the{" "}
            <strong>Active Integrations</strong> list. A green status indicator means your
            connection is live and syncing.
          </p>

          <div className="my-8 flex flex-col items-center gap-4">
            <Image
              src="/integrations/ebay/4.png"
              alt="eBay Integration Success"
              width={800}
              height={500}
              className="rounded-2xl border shadow"
            />
            <p className="text-sm italic text-muted-foreground">
              Successful connection confirmation showing your eBay channel as active.
            </p>
          </div>

          {/* Step 5 */}
          <h2 className="mt-10 text-xl font-medium tracking-tight">
            Step 5 — Manage Products and Orders
          </h2>
          <p className="mt-2 leading-relaxed">
            After a successful connection, product and order synchronization begins
            automatically. You can manage:
          </p>
          <ul className="my-6 ml-6 list-disc">
            <li className="mt-2">
              Product listings and inventory sync between your platform and eBay.
            </li>
            <li className="mt-2">Automatic order imports from eBay.</li>
            <li className="mt-2">Stock updates when an item sells or restocks.</li>
            <li className="mt-2">
              Price synchronization to maintain consistency across channels.
            </li>
          </ul>

          <div className="my-8 flex flex-col items-center gap-4">
            <Image
              src="/integrations/ebay/5.png"
              alt="eBay Product Sync Example"
              width={800}
              height={500}
              className="rounded-2xl border shadow"
            />
            <p className="text-sm italic text-muted-foreground">
              Manage your eBay listings and orders directly from your dashboard.
            </p>
          </div>

          {/* Final Notes */}
          <h2 className="mt-10 text-xl font-medium tracking-tight">
            Tips & Best Practices
          </h2>
          <ul className="my-6 ml-6 list-disc">
            <li className="mt-2">
              Use accurate product SKUs to ensure proper sync between systems.
            </li>
            <li className="mt-2">
              Regularly review your API permissions in eBay Seller Central.
            </li>
            <li className="mt-2">
              Keep your account credentials safe; revoke access if not in use.
            </li>
          </ul>
        </div>
      </div>

      {/* Back to Top Icon */}
      <div className="flex justify-center" title="Back to Top">
        <MoveUpIcon
          onClick={scrollToTop}
          className="size-5 cursor-pointer text-gray-500 hover:text-black"
        />
      </div>
    </div>
  );
}

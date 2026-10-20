"use client";

import Image from "next/image";
import { MoveUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export default function IntegrationDHL() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={cn("w-full pb-8")}>
      <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-1 flex-col gap-8 px-4 py-6 text-black md:px-0">
        <div className="rounded-lg bg-white p-14 pt-2 shadow-xl">
          {/* Logo */}
          <div className="my-6 flex justify-center">
            <Image
              src="/logos/carriers/dhl.svg"
              alt="DHL Logo"
              width={150}
              height={100}
              className="h-auto w-36"
            />
          </div>
          {/* Introduction */}
          <div className="flex flex-col gap-2">
            <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
              Generate WooCommerce REST API Keys (CK & CS)
            </h1>
            <p className="text-balance text-[1.05rem] text-muted-foreground sm:text-base">
              To connect your WooCommerce store with external applications or custom
              integrations, you need to create secure REST API keys. WooCommerce supports
              multiple authentication methods including API Keys, OAuth 1.0a, and Basic
              Auth. For most integrations, API Keys are the simplest and most effective
              option.
            </p>
          </div>
          {/* Consumer Key and Secret Explanation */}
          <div className="flex flex-col gap-2">
            <p className="mt-6 leading-relaxed">
              The WooCommerce REST API uses two keys for authentication: the{" "}
              <strong>Consumer Key</strong> and <strong>Consumer Secret</strong>. These
              keys are used to securely authenticate API requests and grant access to your
              store data.
            </p>
            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                <strong className="font-medium">Consumer Key:</strong> This key identifies
                your store and the API client that will be making the requests. It’s the
                public part of the authentication pair.
              </li>
              <li className="mt-2">
                <strong className="font-medium">Consumer Secret:</strong> This secret key
                is like a password and should be kept confidential. It is used in
                conjunction with the Consumer Key to securely authenticate requests.
              </li>
            </ul>
            <p className="mt-6 leading-relaxed">
              Both keys are generated from the WooCommerce dashboard, and you will only
              see them once. Make sure to store them securely as they grant access to your
              store data.
            </p>
          </div>
          {/* Steps Section */}
          <div className="w-full flex-1">
            <p className="mt-6 leading-relaxed">
              <strong className="font-medium">
                Before generating your API keys, ensure that:
              </strong>
            </p>
            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                WooCommerce is installed and active on your WordPress site.
              </li>
              <li className="mt-2">
                You have administrative privileges to access the settings.
              </li>
              <li className="mt-2">
                Your site uses HTTPS (strongly recommended for security).
              </li>
            </ul>

            <h2
              id="steps"
              className="font-heading [&+]*:[code]:text-xl mt-10 scroll-m-28 text-xl font-medium tracking-tight first:mt-0 lg:mt-16 [&+.steps]:!mt-0"
            >
              Steps to Generate WooCommerce API Keys
            </h2>

            <p className="mt-6 leading-relaxed">
              Follow the steps below to create your API keys from your WordPress
              dashboard:
            </p>

            <ol className="my-6 ml-6 list-decimal">
              <li className="mt-2">
                Log in to your <strong>WordPress Dashboard</strong>.
              </li>
              <li className="mt-2">
                Navigate to <strong>WooCommerce → Settings → Advanced</strong>.
              </li>
              <li className="mt-2">
                Click on the <strong>REST API</strong> tab and select{" "}
                <strong>Add Key</strong> or <strong>Create an API Key</strong>.
              </li>
            </ol>

            {/* Step Image 1 */}
            <div className="my-8 flex flex-col items-center gap-4">
              <Image
                src="/all-channels/integrations/woo-commerce/1.png"
                alt="WooCommerce REST API key creation navigation"
                width={1307}
                height={642}
                className="rounded-2xl border shadow"
              />
              <p className="text-sm italic text-muted-foreground">
                Navigate to <strong>WooCommerce → Settings → Advanced → REST API</strong>{" "}
                and click <strong>Create an API key</strong>.
              </p>
            </div>

            <p className="mt-6 leading-relaxed">
              In the Key details section, you’ll be prompted to add information about your
              new key.
            </p>

            <ol className="my-6 ml-6 list-decimal" start={4}>
              <li className="mt-2">
                Enter a <strong>Description</strong> (e.g., “My App Integration”).
              </li>
              <li className="mt-2">
                Select a <strong>User</strong> who will own the key.
              </li>
              <li className="mt-2">
                Choose the <strong>Permission level</strong> (Read, Write, or Read/Write).
              </li>
              <li className="mt-2">
                Click the <strong>Generate API Key</strong> button.
              </li>
            </ol>

            {/* Step Image 2 */}
            <div className="my-8 flex flex-col items-center gap-4">
              <Image
                src="/all-channels/integrations/woo-commerce/2.png"
                alt="WooCommerce REST API key configuration"
                width={1096}
                height={688}
                className="rounded-2xl border shadow"
              />
              <p className="text-sm italic text-muted-foreground">
                Fill in the key details, select permissions, and click{" "}
                <strong>Generate API Key</strong>.
              </p>
            </div>

            <p className="mt-6 leading-relaxed">
              After generating, WooCommerce will display your{" "}
              <strong>Consumer Key</strong> and <strong>Consumer Secret</strong> along
              with a QR code. <em>You will only see these once.</em> Copy and store them
              securely.
            </p>

            {/* Step Image 3 */}
            <div className="my-8 flex flex-col items-center gap-4">
              <Image
                src="/all-channels/integrations/woo-commerce/3.png"
                alt="WooCommerce API keys generated successfully"
                width={1196}
                height={853}
                className="rounded-2xl border shadow"
              />
              <p className="text-sm italic text-muted-foreground">
                Example of generated <strong>Consumer Key</strong> and{" "}
                <strong>Consumer Secret</strong>. Copy and store them securely — they will
                not be shown again.
              </p>
            </div>

            <h2
              id="store-keys"
              className="font-heading [&+]*:[code]:text-xl mt-10 scroll-m-28 text-xl font-medium tracking-tight lg:mt-16"
            >
              Store Your Keys Safely
            </h2>

            <p className="mt-6 leading-relaxed">
              The generated keys provide access to your store data. Treat them as
              sensitive credentials:
            </p>

            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                Store them in a <strong>secure password manager</strong> or encrypted
                file.
              </li>
              <li className="mt-2">
                Do not share them publicly or include them in source code repositories.
              </li>
              <li className="mt-2">
                If compromised, <strong>revoke and regenerate</strong> new keys
                immediately.
              </li>
              <li className="mt-2">
                <strong>Important!</strong> If you delete the WordPress user linked to an
                API key, the key will stop working. API keys can’t be transferred to other
                users.
              </li>
            </ul>

            <p className="mt-6 leading-relaxed">
              Once stored, use the <strong>Consumer Key</strong> and{" "}
              <strong>Consumer Secret</strong> for authenticating your WooCommerce REST
              API requests. This will allow your integrations or apps to securely interact
              with your store data.
            </p>
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
    </div>
  );
}

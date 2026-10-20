"use client";

import Image from "next/image";
import { MoveUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export default function IntegrationClickAndDrop() {
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
              src="/logos/carriers/clickanddrop.svg"
              alt="Click & Drop Logo"
              width={150}
              height={100}
              className="h-auto w-36"
            />
          </div>

          {/* Introduction */}
          <div className="flex flex-col gap-2">
            <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
              Generate Royal Mail Click & Drop API Authorization Key
            </h1>
            <p className="text-balance text-[1.05rem] text-muted-foreground sm:text-base">
              To connect Click & Drop with external platforms or custom integrations, you
              need to generate a secure API authorization key. This key allows your
              application to authenticate and import orders into Click & Drop
              automatically.
            </p>
          </div>

          {/* Explanation */}
          <div className="mt-6 flex flex-col gap-2">
            <p className="leading-relaxed">
              Click & Drop provides an <strong>API Authorization Key</strong> that is
              required for authenticated API requests. Once generated, this key must be
              included in your API request headers.
            </p>

            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                <strong>API Authorization Key:</strong> The secure key that identifies
                your Click & Drop integration. Treat it like a password.
              </li>
            </ul>

            <p className="mt-4 leading-relaxed">
              You will only need this key once. Store it securely as it enables automated
              access to your Click & Drop account.
            </p>
          </div>

          {/* Requirements */}
          <div className="mt-6 w-full flex-1">
            <p className="leading-relaxed">
              <strong className="font-medium">
                Before generating the API key, ensure:
              </strong>
            </p>

            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                You are logged in as the main Click & Drop account owner.
              </li>
              <li className="mt-2">Integrations are enabled for your account.</li>
              <li className="mt-2">You have permissions to create new integrations.</li>
            </ul>

            <h2
              id="steps"
              className="font-heading mt-10 scroll-m-28 text-xl font-medium tracking-tight lg:mt-16"
            >
              Steps to Generate Click & Drop API Key
            </h2>

            <p className="mt-6 leading-relaxed">
              Follow the steps below to create your API integration inside Royal Mail
              Click & Drop:
            </p>

            {/* STEP 1 */}
            <ol className="my-6 ml-6 list-decimal">
              <li className="mt-2">
                Log in to your <strong>Click & Drop Dashboard</strong>.
              </li>
              <li className="mt-2">
                Go to the top right corner and click <strong>Settings</strong>.
              </li>
            </ol>

            {/* Step Image 1 */}
            <div className="my-8 flex flex-col items-center gap-4">
              <Image
                src="/all-channels/integrations/click-and-drop/cnd_1.png"
                alt="Click & Drop Settings Navigation"
                width={1307}
                height={642}
                className="rounded-2xl border shadow"
              />
              <p className="text-sm italic text-muted-foreground">
                Click on <strong>Settings</strong> in the top navigation bar.
              </p>
            </div>

            {/* STEP 2 */}
            <ol className="my-6 ml-6 list-decimal" start={3}>
              <li className="mt-2">
                Under Settings, click on <strong>Integrations</strong>.
              </li>
            </ol>

            {/* Step Image 2 */}
            <div className="my-8 flex flex-col items-center gap-4">
              <Image
                src="/all-channels/integrations/click-and-drop/cnd_2.png"
                alt="Integrations Menu"
                width={1307}
                height={642}
                className="rounded-2xl border shadow"
              />
              <p className="text-sm italic text-muted-foreground">
                Select <strong>Integrations</strong> from the settings menu.
              </p>
            </div>

            {/* STEP 3 */}
            <ol className="my-6 ml-6 list-decimal" start={4}>
              <li className="mt-2">
                Click <strong>Add a new integration</strong> and select the{" "}
                <strong>Click & Drop API</strong> option.
              </li>
            </ol>

            {/* Step Image 3 */}
            <div className="my-8 flex flex-col items-center gap-4">
              <Image
                src="/all-channels/integrations/click-and-drop/cnd_3.png"
                alt="Select Click & Drop API Integration"
                width={1307}
                height={642}
                className="rounded-2xl border shadow"
              />
              <p className="text-sm italic text-muted-foreground">
                Choose the <strong>Click & Drop API</strong> from the available
                integration options.
              </p>
            </div>

            {/* STEP 4 */}
            <ol className="my-6 ml-6 list-decimal" start={5}>
              <li className="mt-2">
                Fill in the required fields such as <strong>Default Trading Name</strong>{" "}
                and <strong>Integration Name</strong>.
              </li>
              <li className="mt-2">
                Ensure <strong>Use shipping address for billing address</strong> and{" "}
                <strong>Create batches for imported orders</strong> are checked.
              </li>
            </ol>

            {/* Step Image 4 */}
            <div className="my-8 flex flex-col items-center gap-4">
              <Image
                src="/all-channels/integrations/click-and-drop/cnd_4.png"
                alt="Integration Settings Form"
                width={1307}
                height={642}
                className="rounded-2xl border shadow"
              />
              <p className="text-sm italic text-muted-foreground">
                Complete the integration details and click <strong>Save</strong>.
              </p>
            </div>

            {/* STEP 5 */}
            <p className="mt-6 leading-relaxed">
              After saving, your <strong>API Authorization Key</strong> will appear. Copy
              and store this key securely — it is required for all authenticated API
              calls.
            </p>

            {/* Step Image 5 */}
            <div className="my-8 flex flex-col items-center gap-4">
              <Image
                src="/all-channels/integrations/click-and-drop/cnd_5.png"
                alt="API Authorization Key Displayed"
                width={1307}
                height={642}
                className="rounded-2xl border shadow"
              />
              <p className="text-sm italic text-muted-foreground">
                Your <strong>Click & Drop API Authorization Key</strong> — copy and keep
                it safe.
              </p>
            </div>

            {/* Store Keys Section */}
            <h2
              id="store-keys"
              className="font-heading mt-10 scroll-m-28 text-xl font-medium tracking-tight lg:mt-16"
            >
              Store Your API Key Safely
            </h2>

            <p className="mt-6 leading-relaxed">
              Treat your Click & Drop API key as sensitive information:
            </p>

            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">Store it in an encrypted password manager.</li>
              <li className="mt-2">Never share it publicly.</li>
              <li className="mt-2">
                If exposed, <strong>revoke and regenerate</strong> immediately.
              </li>
              <li className="mt-2">
                Removing the integration will invalidate your current API key.
              </li>
            </ul>

            <p className="mt-6 leading-relaxed">
              You are now ready to authenticate your API calls and automate your Click &
              Drop workflows.
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

import Image from "next/image";
import Link from "next/link";

import InventoryBox from "./inventory-box";

export default function EasiestInventory() {
  return (
    <section className="bg-[#ECECFE] dark:bg-[#030711]">
      <div className="container mx-auto pb-72 pt-20">
        <h5 className="text-center text-3xl text-[#171717] lg:text-4xl dark:text-white">
          Easiest Inventory Management Method
        </h5>
        <p className="mx-auto mt-6 text-center text-xs lg:mt-2 lg:w-7/12 xl:text-lg">
          Stay in stock by minimizing the problem with MYE’s easy-to-use features, you can
          easily adjust your inventory problems.
        </p>
        <div className="mb-20 mt-10 flex flex-col justify-between gap-y-8 md:gap-y-8 lg:mt-24 lg:gap-8 xl:flex-row xl:gap-x-0">
          <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-8 xl:flex-col xl:gap-y-8">
            <InventoryBox
              index={1}
              title="Messaging"
              description="Respond to customer questions in real time. Interact with buyers and provide immediate support to clients."
            />
            <InventoryBox
              index={2}
              title="Summary"
              description="Keep track of key performance summaries, such as sales volume, refunds, purchases and stock and maintain all necessary statistics at your fingertips."
            />
          </div>

          <Image
            src="/images/home/easiest-inventory.svg"
            width={300}
            height={400}
            alt="easiest-inventory"
            className="mx-auto hidden size-[300px] md:size-[300px] lg:size-[400px] xl:-mt-5 xl:block xl:h-[400px] xl:w-[700px]"
          />

          <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-8 xl:flex-col xl:gap-y-8">
            <InventoryBox
              index={3}
              title="Return tracking"
              description="Stop wasting time looking for return packages tracking that have already been delivered. Return Tracker monitors packages from the moment they arrive at your door."
            />
            <InventoryBox
              index={4}
              title="Process centralization"
              description="Process centralization allows companies to see the complex order process through a single window. The centralized system displays order, inventory, and shipment information on a single dashboard, allowing it to be controlled and coordinated."
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-x-3">
          <Link
            target="_blank"
            href="https://apps.apple.com/us/app/mye-companion-app/id1636452773"
          >
            <Image
              className="h-10 w-auto lg:h-12"
              src="/images/home/app-store.png"
              height={180}
              width={600}
              alt="App Store Attendance Keeper App"
            />
          </Link>

          <Link
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.evidentbd.mye_companion_app"
          >
            <Image
              className="h-10 w-auto lg:h-12"
              src="/images/home/google-play.png"
              height={180}
              width={600}
              alt="Google Play Attendance Keeper App"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

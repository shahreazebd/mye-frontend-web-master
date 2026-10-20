import { type Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Thank you for contacting us!",
};

export default function ContactUsPage() {
  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-7 px-8 md:w-[560px] md:p-10 lg:px-4 xl:h-[640px] xl:w-5/12 2xl:w-4/12">
          <p className="mt-4 animate-[scaleIn_3s_ease-out] text-center text-[36px] font-extrabold leading-[40px] text-gray-800 lg:text-[49px] lg:leading-[60px]">
            Thank You!
          </p>
          <p className="text-center text-[22px] leading-[28px] text-gray-700 lg:text-[22px] lg:leading-[35px]">
            We appreciate you reaching out. Your message has been successfully sent, and
            we will get back to you shortly.
          </p>
          <p className="text-center text-sm text-gray-400 md:text-lg">
            In the meantime, feel free to explore more about us or return to the homepage.
          </p>

          <Link href="/" className={cn(buttonVariants(), "mb-20")}>
            Back To Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import useGetSearchParams from "@/hooks/custom/use-search-params";

import { Button } from "../ui/button";

export function CallbackOtto() {
  const searchParams = useGetSearchParams();
  const router = useRouter();

  return (
    <div className="-mb-20 -mt-5 flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <Image
        src="/logos/marketplaces/otto.svg"
        alt="eBay"
        width={100}
        height={100}
        className="mb-1 h-12 w-28"
      />
      <Image src="/gif/success.gif" alt="success" width={150} height={150} unoptimized />
      <h4 className="mb-4 mt-7 text-3xl">Channel Integrated Successfully</h4>
      <p className="mx-auto text-center text-sm xl:w-5/12">
        Discover how ecommerce integrations can help you drive greater efficiency and
        multi-channel growth.
      </p>

      <div className="flex gap-4">
        <Button
          className="mt-4"
          variant="dark"
          onClick={() => router.push("/settings/all-channels")}
        >
          Go back to Channels
        </Button>

        <Button className="mt-4" variant="dark" onClick={() => console.log(searchParams)}>
          Print search params
        </Button>
      </div>
    </div>
  );
}

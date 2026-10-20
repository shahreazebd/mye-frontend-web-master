"use client";

import Image from "next/image";
import dayjs from "dayjs";

import type { Postage } from "@/types/postage";

interface Props {
  postage: Postage;
  channelTypeImage: string;
  serviceTypeImage: string;
}

export default function SingleShipment({
  postage,
  channelTypeImage,
  serviceTypeImage,
}: Readonly<Props>) {
  return (
    <div className="mb-3 grid grid-cols-4 items-center rounded-md border px-3 py-6">
      <div className="flex h-full items-center border-r">
        <div>
          <Image
            src={channelTypeImage}
            width={50}
            height={50}
            alt={postage?.channel?.channel_type}
          />
        </div>
        <div className="ml-5">
          <h6>{postage?.channel?.name}</h6>
          <small>{dayjs(postage.createdAt).format("DD MMMM YYYY, h:mm A")}</small>
        </div>
      </div>

      <div className="ml-10 flex h-full items-center border-r">
        <div>
          <Image
            src={serviceTypeImage}
            width={80}
            height={70}
            alt={postage?.service?.name}
          />
        </div>
        <div className="ml-5">
          <h6>{postage?.service?.name}</h6>
          <small>{postage?.service?.email}</small>
        </div>
      </div>

      <div className="grid h-full grid-cols-3 gap-2  border-r">
        <div className="text-center">
          <h6>{postage?.orders?.length}</h6>
          <small> Orders</small>
        </div>

        <div className="text-center">
          <h6>{postage?.successOrderIds?.length}</h6>
          <div className="flex justify-center">
            <Image src="/images/icons/check.svg" width={20} height={20} alt="failed" />
            <small className="ml-2 block">Success </small>
          </div>
        </div>

        <div className="text-center">
          <h6>{postage?.failedOrderIds?.length}</h6>

          <div className="flex justify-center">
            <Image src="/images/icons/cross.svg" width={20} height={20} alt="failed" />
            <small className="ml-2 block">Failed </small>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { useGetPostagePayload } from "@/atoms/postageAtom";
import { getInitials } from "@/utils/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";

// import useGetPostagePayload from "@/hooks/queries/postage/use-get-postage-payload";

export default function CarrierInfo() {
  const { postagePayload } = useGetPostagePayload();

  const searchParams = Object.fromEntries(useSearchParams()?.entries());

  const { data: channelDetails } = useGetChannelDetails(searchParams?.channelId);

  return (
    <aside className="flex h-[340px] flex-col items-center rounded-xl p-6 shadow-lg">
      <section className="space-y-2">
        <Avatar>
          <AvatarImage
            src={`/logos/carriers/round/${searchParams?.carrier}.svg`}
            height={80}
            width={80}
            alt={searchParams?.carrier}
          />
          <AvatarFallback>{getInitials(searchParams?.carrier)}</AvatarFallback>
        </Avatar>
        <p className="text-center text-xs font-normal">
          {searchParams?.carrier?.toUpperCase()}
        </p>
      </section>

      <section className="mt-5 text-center">
        <p className="text-xl font-semibold text-blue-800">{postagePayload?.length}</p>
        <p className="text-sm font-medium text-slate-500">Total Postage</p>
      </section>

      <section className="mt-5 flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={`/logos/marketplaces/round/${channelDetails?.channel_type?.toLowerCase()}.svg`}
            className="size-12"
            alt={searchParams?.carrier}
          />
          <AvatarFallback>{getInitials(searchParams?.carrier)}</AvatarFallback>
        </Avatar>
        <section>
          <p className="text-sm font-medium text-black">{channelDetails?.name}</p>
          <p className="text-xs font-normal text-slate-500">johnsmith@example.com</p>
        </section>
      </section>
    </aside>
  );
}

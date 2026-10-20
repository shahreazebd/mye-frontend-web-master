import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import useGetChannels from "@/hooks/queries/channel/useGetChannels";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NoDataPlaceholder } from "@/components/core/no-data-placeholder";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

dayjs.extend(relativeTime);

export default function ChannelExpiration() {
  const { data } = useGetChannels();
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upcoming Channel Expirations</CardTitle>
        <CardDescription>See when your channels will expire</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[270px] overflow-y-scroll">
          {data && data.length > 0 ? (
            data?.map((e: any, id: number) => (
              <div key={id} className="mb-3 flex items-center gap-4">
                <Avatar className=" size-7 shrink-0 sm:flex">
                  <AvatarImage
                    src={`/logos/marketplaces/round/${e?.channel_type}.svg`}
                    alt="Avatar"
                  />
                  <AvatarFallback className="uppercase">
                    {e?.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid">
                  <p className="pb-0.5 text-xs text-gray-800">{e?.name}</p>
                  <p className="text-[11px] leading-none text-gray-500">
                    {e?.channel_type}
                  </p>
                </div>
                <div className="ml-auto mr-4 text-xs text-rose-700">
                  {!e?.expires_on ? "N/A" : dayjs(e?.expires_on).format("D MMM, YYYY")}
                </div>
              </div>
            ))
          ) : (
            <NoDataPlaceholder title="No upcoming channel expiration" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

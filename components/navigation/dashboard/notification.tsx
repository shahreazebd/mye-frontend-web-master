import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BellRing } from "lucide-react";

import { cn } from "@/lib/utils";
import useGetActivityLogs from "@/hooks/queries/activity-log/useGetActivityLogs";
import { buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkeletonLoader from "@/components/shared/skeleton-loader";

dayjs.extend(relativeTime);

const parentTypes = ["order", "inventory", "user", "drive"];

export function Notification() {
  const [tabValue, setTabValue] = useState<string>("order");
  const { data: activityLogs, isLoading } = useGetActivityLogs(tabValue, undefined, null);

  const handelTabChange = (value: string) => {
    setTabValue(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <BellRing className="cursor-pointer text-gray-400" strokeWidth={1.5} />
      </PopoverTrigger>
      <PopoverContent className="absolute -right-24 top-4 z-[999999] w-96">
        <h5>Notifications</h5>
        <Tabs className="my-3" defaultValue="order" onValueChange={handelTabChange}>
          <div className="flex w-full justify-between gap-10">
            <TabsList>
              {parentTypes?.map((item) => (
                <TabsTrigger key={item} value={item} className="capitalize">
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {parentTypes?.map((item) => (
              <TabsContent className="mt-5" key={item} value={item}>
                <div>
                  {isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <div>
                      {activityLogs?.slice(0, 5)?.map((activityLog) => (
                        <div
                          key={activityLog._id.$oid}
                          className="mb-4 ml-2 grid grid-cols-1 items-start pb-4 last:mb-0 last:pb-0"
                        >
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{activityLog.data}</p>
                            <p className="text-sm text-muted-foreground">
                              {dayjs(activityLog.created_at.$date).fromNow()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        <Link
          href="/settings/activity-logs"
          className={cn(buttonVariants({ variant: "default" }), "w-full text-center")}
        >
          View all
        </Link>
      </PopoverContent>
    </Popover>
  );
}

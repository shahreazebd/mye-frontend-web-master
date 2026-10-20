"use client";

import { useState, type ChangeEvent } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Search } from "lucide-react";

import useGetActivityLogs from "@/hooks/queries/activity-log/useGetActivityLogs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { NoDataPlaceholder } from "../core/no-data-placeholder";
import SkeletonLoader from "../shared/skeleton-loader";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import FileDownload from "./file-download";

dayjs.extend(relativeTime);

export default function ActivityLogsWrapper() {
  const [tabValue, setTabValue] = useState<string>("order");
  const [date, setDate] = useState<Date | undefined>();
  const [searchText, setSearchText] = useState("");
  const { data: activityLogs, isLoading } = useGetActivityLogs(
    tabValue,
    date,
    searchText
  );

  const handelTabChange = (value: string) => {
    setTabValue(value);
  };

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      setSearchText(e.target.value);
    } else {
      setSearchText("");
    }
  }

  // Use a Set to store unique types
  //   const uniqueTypes = new Set();

  //   // Iterate through the array and add each type to the Set
  //   for (const item of activityLogs || []) {
  //     uniqueTypes.add(item.parent_type);
  //   }
  //   const parentTypes = Array.from(uniqueTypes) as string[];

  const parentTypes = ["order", "inventory", "user", "drive"];

  return (
    <div>
      <Tabs defaultValue="order" onValueChange={handelTabChange}>
        <div className="flex w-full justify-between gap-10">
          <TabsList>
            {parentTypes?.map((item) => (
              <TabsTrigger key={item} value={item} className="capitalize">
                {item}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex gap-4">
            <DatePicker date={date} setDate={setDate} />
            <div
              className={
                "flex h-8 w-[300px] items-center rounded-md border bg-white px-3"
              }
              cmdk-input-wrapper=""
            >
              <Search className="mr-2 size-4 shrink-0 opacity-50" />
              <Input
                onChange={onChange}
                placeholder="Search "
                className="flex  w-full rounded-md border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground focus:border-0 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {parentTypes?.map((item) => (
          <TabsContent className="mt-5" key={item} value={item}>
            <div>
              {isLoading ? (
                <SkeletonLoader />
              ) : activityLogs?.length ? (
                <ScrollArea className="h-[70vh] overflow-hidden">
                  {activityLogs?.map((activityLog) => {
                    return (
                      <div
                        key={activityLog?._id?.$oid}
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                      >
                        <span className="flex size-2 translate-y-1 rounded-full bg-primary" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {activityLog?.data}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {dayjs(activityLog?.created_at?.$date).fromNow()}
                          </p>
                        </div>
                        <FileDownload activityLog={activityLog} />
                      </div>
                    );
                  })}
                </ScrollArea>
              ) : (
                <NoDataPlaceholder
                  className="h-[calc(100vh-300px)]"
                  title="No activity log found"
                />
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

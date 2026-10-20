"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ChannelSelect2 from "@/components/shared/channel-select-2";

export default function TableHeader({ setChannelDetails }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const date = searchParams.get("date") || dayjs().format("YYYY-MM-DD");

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "h-8 w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {date ? dayjs(date).format("MMMM DD, YYYY") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={new Date(date)}
            defaultMonth={new Date(date)}
            onSelect={(date) => {
              router.push(`?date=${dayjs(date).format("YYYY-MM-DD")}`);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <ChannelSelect2 setChannelDetails={setChannelDetails} />
    </>
  );
}

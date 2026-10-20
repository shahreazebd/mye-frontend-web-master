"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { amazonShipAddresses } from "@/constants/amazon-ship-addresses";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AmazonOptions() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const searchParams = useSearchParams();

  const channelAddress =
    amazonShipAddresses[
      searchParams.get("channelId") as keyof typeof amazonShipAddresses
    ];

  return (
    <div className="flex gap-x-2">
      <div>
        <label className="block text-sm font-medium text-gray-700">Dispatch from</label>
        <Select
          value="1"
          // onValueChange={(value) => {
          //   console.log(value);
          // }}
        >
          <SelectTrigger className="h-8 w-48 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="top-3" side="top">
            <SelectItem value="1">{channelAddress?.Name}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dispatch date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "h-8 w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
              disabled
            >
              <CalendarIcon className="mr-2 size-4" />
              {date ? dayjs(date).format("MMMM DD, YYYY") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </div>
      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Label print orientation
        </label>
        <Select
          value="4 in x 6 in PNG Default"
          onValueChange={(value) => {
            console.log(value);
          }}
        >
          <SelectTrigger className="h-8 w-48 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="top-3" side="top">
            <SelectItem value="4 in x 6 in PNG Default">
              4 in x 6 in PNG Default
            </SelectItem>
            <SelectItem value="4 in x 8 in PNG Default">
              4 in x 8 in PNG Default
            </SelectItem>
            <SelectItem value="4 in x 10 in PNG Default">
              4 in x 10 in PNG Default
            </SelectItem>
          </SelectContent>
        </Select>
      </div> */}
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { CarrierSelect } from "../order/open-orders/postage-preview/carrier-select";

export function ShipmentFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const date = searchParams.get("date") || dayjs().format("YYYY-MM-DD");
  const carrier = searchParams.get("carrier") || "";

  return (
    <div className="flex gap-4">
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
        <PopoverContent className="w-auto">
          <Calendar
            mode="single"
            selected={new Date(date)}
            defaultMonth={new Date(date)}
            onSelect={(date) => {
              router.push(`?date=${dayjs(date).format("YYYY-MM-DD")}&carrier=${carrier}`);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <CarrierSelect isShowAll={true} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import useGetSearchParams from "@/hooks/custom/use-search-params";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CarrierSelect } from "@/components/order/open-orders/postage-preview/carrier-select";

function TrackOrdersHeader() {
  const searchParams = useGetSearchParams();
  const router = useRouter();

  const startDate =
    searchParams?.startDate || dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const endDate = searchParams?.endDate || dayjs().format("YYYY-MM-DD");

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(startDate),
    to: new Date(endDate),
  });

  function updateParams(updates: Record<string, string>) {
    const combined = { ...searchParams, ...updates };

    // Remove empty strings, nulls, or undefined values
    const filteredEntries = Object.entries(combined).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined
    );

    const params = new URLSearchParams(filteredEntries).toString();
    router.push(`?${params}`);
  }

  function handleDateChange(range: DateRange | undefined) {
    setDateRange(range);
    if (range?.from) {
      updateParams({
        startDate: dayjs(range.from).format("YYYY-MM-DD"),
        endDate: dayjs(range.to || range.from).format("YYYY-MM-DD"),
      });
    }
  }

  return (
    <div className="flex gap-4">
      {/* Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-8 w-[280px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {dateRange?.from && (
              <>
                {dayjs(dateRange.from).format("MMM DD, YYYY")}
                {dateRange.to && ` - ${dayjs(dateRange.to).format("MMM DD, YYYY")}`}
              </>
            )}
            {!dateRange?.from && <span>Pick a date range</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {/* Carrier Select */}
      <CarrierSelect
        isShowAll
        filterFn={(carrier) => carrier.toUpperCase() !== "ROYAL_MAIL"}
      />
    </div>
  );
}

export default TrackOrdersHeader;

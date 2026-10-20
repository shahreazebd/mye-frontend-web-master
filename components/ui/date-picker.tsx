"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { Matcher } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {
  className?: string;
  date?: Date | undefined;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
  /** Shown when no date is selected. */
  placeholder?: string;
  /** Days that cannot be picked, e.g. `{ before: new Date() }`. */
  disabled?: Matcher | Matcher[];
  /** How the selected date is rendered on the trigger. */
  formatString?: string;
  align?: "start" | "center" | "end";
};

export function DatePicker({
  date,
  setDate,
  className,
  placeholder = "Pick a date",
  disabled,
  formatString = "PPP",
  align = "center",
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, formatString) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

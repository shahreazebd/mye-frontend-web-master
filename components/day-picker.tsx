import * as React from "react";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";

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

interface DatePickerProps {
  className?: string;
  date: Date | undefined;
  // eslint-disable-next-line no-unused-vars
  setDate: (date: Date | undefined) => void;
}

export function DatePicker({ date, setDate, className }: DatePickerProps) {
  const [month, setMonth] = React.useState<number>(
    date ? date.getMonth() : new Date().getMonth()
  );

  const [year, setYear] = React.useState<number>(
    date ? date.getFullYear() : new Date().getFullYear()
  );

  const years = React.useMemo(() => {
    const currentYear = dayjs().year();
    return Array.from(
      { length: currentYear - 1900 + 1 + 3 },
      (_, i) => currentYear - i + 3
    );
  }, []);

  const months = React.useMemo(() => {
    if (year) {
      const monthsArray = [];
      const startDate = dayjs().year(year).startOf("year");
      for (let i = 0; i < 12; i++) {
        monthsArray.push(startDate.add(i, "month").toDate());
      }
      return monthsArray;
    }
    return [];
  }, [year]);

  React.useEffect(() => {
    if (date) {
      setMonth(date.getMonth());
      setYear(date.getFullYear());
    }
  }, [date]);

  const handleYearChange = (selectedYear: string) => {
    const newYear = parseInt(selectedYear, 10);
    setYear(newYear);
    if (date) {
      const newDate = new Date(date);
      newDate.setFullYear(newYear);
      setDate(newDate);
    }
  };

  const handleMonthChange = (selectedMonth: string) => {
    const newMonth = parseInt(selectedMonth, 10);
    setMonth(newMonth);
    if (date) {
      const newDate = new Date(date);
      newDate.setMonth(newMonth);
      setDate(newDate);
    } else {
      setDate(new Date(year, newMonth, 1));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild tabIndex={0}>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-full justify-start pl-3 text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          {date ? (
            <span className="text-sm">{dayjs(date).format("DD MMM YYYY")}</span>
          ) : (
            <span className="text-sm lowercase">mm/dd/yyyy</span>
          )}
          <CalendarIcon className="ml-auto size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto ">
        <div className="flex flex-col justify-center">
          <div className="flex justify-between space-x-2">
            <Select onValueChange={handleYearChange} value={year.toString()}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={handleMonthChange} value={month.toString()}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {dayjs(m).format("MMMM")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={new Date(year, month)}
          onMonthChange={(newMonth) => {
            setMonth(newMonth.getMonth());
            setYear(newMonth.getFullYear());
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

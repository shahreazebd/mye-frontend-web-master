import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

export default function useDatePicker() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -10),
    to: new Date(),
  });

  return { date, setDate };
}

export function useDatePicker2() {
  const [fromDate, setFromDate] = useState<Date | undefined>(addDays(new Date(), -10));
  const [toDate, setToDate] = useState<Date | undefined>(new Date());

  return { fromDate, setFromDate, toDate, setToDate };
}

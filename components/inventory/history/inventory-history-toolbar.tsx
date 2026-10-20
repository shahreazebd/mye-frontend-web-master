import { useEffect, useState } from "react";
import { useStockHistoryListFiltersAtom } from "@/atoms/inventoryAtom";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";

import { StockHistory } from "@/types/stock-history";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DownloadReport } from "@/components/core/download-report";
import LocationSelect from "@/components/shared/location-select";

type Props = {
  stockHistoryList: StockHistory[] | undefined;
};

const operations = [
  { id: 1, label: "Addition", value: "ADDITION" },
  { id: 2, label: "Subtraction", value: "SUBTRACTION" },
  { id: 3, label: "Full Stock", value: "FULL_STOCK" },
  { id: 4, label: "New Order Item", value: "NEW_ORDER_ITEM" },
  { id: 5, label: "Cancel Order Item", value: "CANCEL_ORDER_ITEM" },
  { id: 6, label: "Dispatch Order Item", value: "DISPATCH_ORDER_ITEM" },
  { id: 7, label: "Return", value: "RETURN" },
];

export function StockHistoryToolbar(props: Props) {
  const { setStockHistoryListFilters } = useStockHistoryListFiltersAtom();

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    if (date) {
      setStockHistoryListFilters((prev) => ({
        ...prev,
        startDate: date?.from,
        endDate: date?.to,
      }));
    }
  }, [date?.to, date?.from]);

  return (
    <section className="flex gap-2">
      <Select
        onValueChange={(value) => {
          setStockHistoryListFilters((prev) => ({
            ...prev,
            operation: value,
          }));
        }}
      >
        <SelectTrigger className="h-8 w-[180px] bg-white">
          <SelectValue placeholder="Select Operation" />
        </SelectTrigger>
        <SelectContent>
          {operations?.map((operation) => (
            <SelectItem key={operation?.id} value={operation?.value}>
              {operation?.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DatePickerWithRange date={date} setDate={setDate} />

      <LocationSelect
        onValueChange={(value) => {
          setStockHistoryListFilters((prev) => ({
            ...prev,
            locationId: value,
          }));
        }}
      />
      <DownloadReport
        data={
          props?.stockHistoryList?.map((stock) => ({
            SKU: stock?.local_sku,
            Quantity: stock?.stock_quantity,
            Operation: stock?.stock_operation?.split("_")?.join(" "),
            "Current Stock": stock?.current_stock,
            "Current In Open": stock?.current_in_open,
            "Current Available": stock?.current_stock - stock?.current_in_open,
            "Previous Stock": stock?.previous_stock,
            "Previous In Open": stock?.previous_in_open,
            "Previous Available": stock?.previous_stock - stock?.previous_in_open,
            "Update By": stock?.updated_by,
            "Created Time": dayjs(stock?.created_at).format("DD MMM, YYYY hh:mm A"),
          })) || []
        }
      />
    </section>
  );
}

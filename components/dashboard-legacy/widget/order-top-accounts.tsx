import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

import useGetAllAccountTopOrders, {
  Order,
} from "@/hooks/queries/dashboard/use-get-all-account-top-orders";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DataTable } from "@/components/core/data-table/data-table";
import { DataTableColumnHeader } from "@/components/core/data-table/data-table-column-header";

import { Card, CardContent } from "../../ui/card";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div>{row.index + 1}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "channelName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Channel" />,
    cell: ({ row }) => <div>{row.getValue("channelName")}</div>,
  },
  {
    accessorKey: "order",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Order" />,
  },
];

export default function OrderTopAccounts() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const { data, isLoading } = useGetAllAccountTopOrders(date);

  return (
    <Card className="h-full">
      <CardContent className="h-full pt-5">
        <section className="justify-between 2xl:flex">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Top Performing Channels</h2>
            <p className="text-sm text-muted-foreground">
              See your top performing channels
            </p>
          </div>

          <DatePickerWithRange className="mt-2 2xl:mt-0" date={date} setDate={setDate} />
        </section>

        {date?.to ? (
          <DataTable
            header={false}
            data={data ?? []}
            columns={columns}
            search={false}
            loading={isLoading}
            isViewShow={false}
            pagination={false}
            key="_id"
            className="max-h-[250px] overflow-y-scroll"
          />
        ) : (
          <section className="mt-10 flex h-full items-start justify-center">
            <p className="text-base font-medium text-red-500">Please select end date</p>
          </section>
        )}
      </CardContent>
    </Card>
  );
}

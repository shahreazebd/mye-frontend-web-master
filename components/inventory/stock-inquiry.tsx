import { useState } from "react";
import { useStockInquiryPaginationAtom } from "@/atoms/stockInquiryAtom";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";

import { StockInquiryOrderDeatils } from "@/types/stock-inquiry";
import useGetStockInquiry from "@/hooks/queries/inventory/useGetStockInquiry";

import { DataTable2 } from "../core/data-table/data-table-2";
import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { DatePickerWithRange } from "../ui/date-picker-with-range";
import { Skeleton } from "../ui/skeleton";

const columns: ColumnDef<StockInquiryOrderDeatils>[] = [
  {
    accessorKey: "channel_order_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order ID" />,
  },
  {
    accessorKey: "remote_sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Remote SKU" />,
  },
  {
    accessorKey: "channel_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Channel Name" />
    ),
  },
  {
    accessorKey: "dispatch_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dispatch Status" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchase Date" />
    ),
    cell: ({ row }) => (
      <>{dayjs(row?.getValue("createdAt")).format("DD-MM-YYYY hh:mm a")}</>
    ),
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    cell: ({ row }) => (
      <div className="w-[70px] text-center">{row?.original?.quantity}</div>
    ),
  },

  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
  },
];

export default function StockInquiry() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const { pagination, setPagination } = useStockInquiryPaginationAtom();
  const { data: stockInquiry, isLoading } = useGetStockInquiry();

  const totalOrders = stockInquiry?.data?.order_details?.reduce(
    (acc, cur) => acc + cur?.quantity,
    0
  );

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="mt-2">
          {isLoading ? (
            <Skeleton className="h-5 w-[100px]" />
          ) : (
            <p className="text-end text-base font-semibold">
              Total Quantity: {totalOrders}
            </p>
          )}
        </div>

        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <DataTable2
        header={false}
        columns={columns}
        data={stockInquiry?.data?.order_details}
        pageOptions={[10, 50, 100]}
        loading={isLoading}
        count={stockInquiry?.count}
        pagination={pagination}
        setPagination={setPagination}
      />
    </section>
  );
}

import dayjs from "dayjs";

import { useGetStockHistory } from "@/hooks/queries/inventory/use-get-stock-history";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductStockHistory() {
  const { data: stockHistoryList } = useGetStockHistory();

  return (
    <div>
      <p className="mb-3 text-center text-3xl font-semibold text-slate-900">
        Latest Stock
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="font-bold">Quantity</TableHead>
            <TableHead className="font-bold">Operation</TableHead>
            <TableHead className="font-bold">Stock</TableHead>
            <TableHead className="font-bold">In Open</TableHead>
            <TableHead className="font-bold">Available</TableHead>
            <TableHead className="font-bold">Updated by</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockHistoryList?.data?.slice(0, 10)?.map((stockHistory) => {
            return (
              <TableRow className="text-[13px] leading-5">
                <TableCell>
                  {dayjs(stockHistory?.created_at).format("DD-MM-YYYY hh:mma")}
                </TableCell>
                <TableCell>{stockHistory?.stock_quantity}</TableCell>
                <TableCell>
                  {stockHistory?.stock_operation?.split("_")?.join(" ")}
                </TableCell>
                <TableCell>{stockHistory?.current_stock}</TableCell>
                <TableCell>{stockHistory?.current_in_open}</TableCell>
                <TableCell>
                  {stockHistory?.current_stock - stockHistory?.current_in_open}
                </TableCell>
                <TableCell>{stockHistory?.updated_by}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

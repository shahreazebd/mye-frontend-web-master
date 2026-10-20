import { useState } from "react";
import { useDispatchedOrdersAtom } from "@/atoms/dispatched-orders-atom";

import useGetDispatchOrderDetails from "@/hooks/queries/order/use-get-dispatched-order-details";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DataTable } from "@/components/core/data-table/data-table";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import { columns } from "./order-details-table/columns";

export default function DispatchedOrdersInfoModal() {
  const { dispatchedOrdersInfo, setDispatchedOrdersInfo } = useDispatchedOrdersAtom();

  const { data, isLoading } = useGetDispatchOrderDetails(
    dispatchedOrdersInfo?.dispatchedOrdersInfo?.dispatch_id
  );

  const [q, setQ] = useState<any>("");

  return (
    <Dialog
      open={dispatchedOrdersInfo?.isDispatchedOrdersInfoModalOpen}
      onOpenChange={() => {
        setDispatchedOrdersInfo((prev) => ({
          ...prev,
          isDispatchedOrdersInfoModalOpen: !prev?.isDispatchedOrdersInfoModalOpen,
        }));
      }}
    >
      <DialogContent className="sm:max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Dispatched Order Details</DialogTitle>
        </DialogHeader>

        <section>
          <DataTableToolbar q={q} setQ={setQ} search={true} />
          <DataTable
            query={q}
            columns={columns}
            data={data}
            search={false}
            loading={isLoading}
            pagination={false}
          />
        </section>
      </DialogContent>
    </Dialog>
  );
}

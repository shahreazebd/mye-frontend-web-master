import { useRef, useState } from "react";
import { useDispatchedOrdersAtom } from "@/atoms/dispatched-orders-atom";
import { Row } from "@tanstack/react-table";
import { Download, Eye } from "lucide-react";
import { CSVLink } from "react-csv";

import type { DispatchOrders } from "@/types/dispatched-order";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import useGetDispatchOrderDetails from "@/hooks/queries/order/use-get-dispatched-order-details";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ActionColumn({ row }: { row: Row<DispatchOrders> }) {
  const [csvOrders, setCsvOrders] = useState([]);

  const { toast } = useToast();

  const orderCSVLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(
    null
  );

  const { userInformation } = useAuth();
  const { setDispatchedOrdersInfo } = useDispatchedOrdersAtom();
  const { data: dispatchedOrders } = useGetDispatchOrderDetails(
    row?.original?.dispatch_id
  );

  function openModalHandler() {
    setDispatchedOrdersInfo((prev) => ({
      ...prev,
      isDispatchedOrdersInfoModalOpen: true,
      dispatchedOrdersInfo: row?.original,
    }));
  }

  async function downloadSuccessOrderReport() {
    try {
      const orderIds = dispatchedOrders?.map((order: any) => order?.channel_order_id);

      const payload = {
        channel_uid: row?.original?.channel_uid,
        company_uid: userInformation?.company_uid,
        channel_order_id: orderIds,
      };

      const { data } = await fetch.post(
        "/orders/api/v1/orders/get-selected-order-details/",
        payload
      );

      const orders = data?.data?.map((e: any) => {
        return {
          channel_order_id: e?.channel_order_id,
          shipping_address: e?.shipping_address?.address1,
          items: e?.items?.map((item: any) => item?.remote_sku),
          quantity: e?.items?.map((item: any) => item?.quantity),
          unit_total: e?.total,
        };
      });

      setCsvOrders(orders);

      toast({
        title: "Please wait",
        description: "File is downloading...",
      });

      setTimeout(() => orderCSVLink?.current?.link?.click(), 1000);
    } catch (error) {
      //
    }
  }

  return (
    <div className="flex items-center gap-6">
      {row?.original?.dispatch_id && (
        <>
          <Button variant="dark" className="text-xs" onClick={downloadSuccessOrderReport}>
            <Download size={14} className="mr-2" /> Download
          </Button>

          <Button variant="dark" onClick={openModalHandler}>
            <Eye size={18} />
          </Button>
        </>
      )}

      <CSVLink
        data={csvOrders ?? []}
        filename={`${row?.original?.channel_name}.csv`}
        ref={orderCSVLink}
      />
    </div>
  );
}

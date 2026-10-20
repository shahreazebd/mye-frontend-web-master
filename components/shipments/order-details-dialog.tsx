import dayjs from "dayjs";
import { Loader2 } from "lucide-react";

import type { Order } from "@/types/shipments";
import { useGetShipmentOrderById } from "@/hooks/queries/shipments/use-get-shipment-order-by-id";

import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type Props = {
  orderId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function OrderDetailsDialog({ orderId, isOpen, onOpenChange }: Readonly<Props>) {
  const { data: activeOrder, isLoading } = useGetShipmentOrderById(
    orderId || "",
    isOpen && !!orderId
  );

  if (!orderId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] max-w-4xl flex-col justify-start overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            Order Details - {activeOrder?.marketplaceOrderId || ""}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Detailed information about the selected order.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          {isLoading || !activeOrder ? (
            <div className="flex h-48 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <OrderDetailsContent activeOrder={activeOrder} />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function OrderDetailsContent({ activeOrder }: Readonly<{ activeOrder: Order }>) {
  const details = [
    { key: "Order ID", value: activeOrder.id },
    { key: "Marketplace Order ID", value: activeOrder.marketplaceOrderId },
    { key: "Status", value: <Badge variant="outline">{activeOrder.status}</Badge> },
    {
      key: "Purchase Date",
      value: activeOrder.purchaseDate
        ? dayjs(activeOrder.purchaseDate).format("DD MMMM YYYY, h:mm A")
        : "-",
    },
    { key: "Total Items", value: activeOrder.totalItems ?? "-" },
    {
      key: "Total Weight",
      value: activeOrder.totalWeight
        ? `${activeOrder.totalWeight} ${activeOrder.weightUnit || "G"}`
        : "-",
    },
    { key: "Currency", value: activeOrder.currency || "-" },
    { key: "Original SKU", value: activeOrder.originalSku || "-" },
    { key: "Modified SKU", value: activeOrder.modifiedSku || "-" },
  ];

  const address = [
    { key: "Buyer Name", value: activeOrder.address?.buyerName },
    { key: "Email", value: activeOrder.address?.email },
    { key: "Phone", value: activeOrder.address?.phone },
    { key: "Address Line 1", value: activeOrder.address?.addressLine1 },
    { key: "Address Line 2", value: activeOrder.address?.addressLine2 || "-" },
    { key: "City", value: activeOrder.address?.city },
    { key: "Post Code", value: activeOrder.address?.postCode },
    { key: "Country", value: activeOrder.address?.country },
    { key: "Country Code", value: activeOrder.address?.countryCode },
  ];

  const shipment = [
    { key: "Shipment ID", value: activeOrder.shipmentId || "-" },
    { key: "Tracking Number", value: activeOrder.trackingNumber || "-" },
    { key: "Return Tracking Number", value: activeOrder.returnTrackingNumber || "-" },
    { key: "Carrier Label ID", value: activeOrder.carrierLabelId || "-" },
    { key: "Carrier Return Label ID", value: activeOrder.carrierReturnLabelId || "-" },
    {
      key: "Label Link",
      value: activeOrder.labelLink ? (
        <a
          href={activeOrder.labelLink}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          Download Label
        </a>
      ) : (
        "-"
      ),
    },
    {
      key: "Failure Reasons",
      value: activeOrder.failureReasons
        ? JSON.stringify(activeOrder.failureReasons)
        : "-",
    },
  ];

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-5">
        <TabsTrigger value="details">General Info</TabsTrigger>
        <TabsTrigger value="address">Shipping Address</TabsTrigger>
        <TabsTrigger value="items">
          Line Items ({activeOrder.items?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="shipment">Shipment Details</TabsTrigger>
        <TabsTrigger value="carrier">Carrier Info</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-4">
        <div className="grid grid-cols-2 gap-4 rounded-lg border bg-gray-50/50 p-4">
          {details.map((item) => (
            <div key={item.key} className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase text-muted-foreground">
                {item.key}
              </span>
              <span className="text-sm font-medium text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="address" className="space-y-4">
        <div className="grid grid-cols-2 gap-4 rounded-lg border bg-gray-50/50 p-4">
          {address.map((item) => (
            <div key={item.key} className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase text-muted-foreground">
                {item.key}
              </span>
              <span className="text-sm font-medium text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="items" className="space-y-4">
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-100 text-xs font-semibold uppercase text-muted-foreground">
              <tr>
                <th className="p-3">Item Name</th>
                <th className="p-3">SKU</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Unit Price</th>
                <th className="p-3 text-right">Total Price</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {activeOrder.items && activeOrder.items.length > 0 ? (
                activeOrder.items.map((item, idx) => (
                  <tr
                    key={item.localSku || item.marketplaceSku || idx}
                    className="hover:bg-gray-50/50"
                  >
                    <td className="p-3 font-medium text-slate-900">{item.name || "-"}</td>
                    <td className="p-3 text-slate-600">
                      {item.localSku || item.marketplaceSku || "-"}
                    </td>
                    <td className="p-3 text-center text-slate-600">
                      {item.quantity ?? "-"}
                    </td>
                    <td className="p-3 text-right text-slate-600">
                      {item.unitPrice
                        ? `${item.unitPrice} ${activeOrder.currency || ""}`
                        : "-"}
                    </td>
                    <td className="p-3 text-right text-slate-600">
                      {item.unitPrice && item.quantity
                        ? `${(item.unitPrice * item.quantity).toFixed(2)} ${
                            activeOrder.currency || ""
                          }`
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No items available for this order.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </TabsContent>

      <TabsContent value="shipment" className="space-y-4">
        <div className="grid grid-cols-2 gap-4 rounded-lg border bg-gray-50/50 p-4">
          {shipment.map((item) => (
            <div key={item.key} className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase text-muted-foreground">
                {item.key}
              </span>
              <span className="text-sm font-medium text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="carrier" className="space-y-4">
        {activeOrder.shipment ? (
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Shipment
              </h3>
              <div className="grid grid-cols-2 gap-4 rounded-lg border bg-gray-50/50 p-4">
                {[
                  { key: "Shipment ID", value: activeOrder.shipment.id },
                  { key: "Store Name", value: activeOrder.shipment.storeName },
                  { key: "Store ID", value: activeOrder.shipment.storeId },
                  { key: "Marketplace", value: activeOrder.shipment.marketplace },
                  {
                    key: "Carrier Type",
                    value: activeOrder.shipment.carrierType,
                  },
                  { key: "Status", value: activeOrder.shipment.status },
                ].map((item) => (
                  <div key={item.key} className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase text-muted-foreground">
                      {item.key}
                    </span>
                    <span className="text-sm font-medium text-slate-900">
                      {item.value || "-"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {activeOrder.shipment.carrier ? (
              <>
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Carrier Account
                  </h3>
                  <div className="grid grid-cols-2 gap-4 rounded-lg border bg-gray-50/50 p-4">
                    {[
                      {
                        key: "Carrier ID",
                        value: activeOrder.shipment.carrier.id,
                      },
                      { key: "Name", value: activeOrder.shipment.carrier.name },
                      { key: "Type", value: activeOrder.shipment.carrier.type },
                      {
                        key: "Status",
                        value: activeOrder.shipment.carrier.status,
                      },
                      {
                        key: "Credential Type",
                        value: activeOrder.shipment.carrier.credentialType,
                      },
                      {
                        key: "Active",
                        value: activeOrder.shipment.carrier.isActive ? "Yes" : "No",
                      },
                      {
                        key: "Default Account",
                        value: activeOrder.shipment.carrier.isDefault ? "Yes" : "No",
                      },
                      {
                        key: "Shipper Name",
                        value: activeOrder.shipment.carrier.shipperName,
                      },
                      {
                        key: "Shipper Email",
                        value: activeOrder.shipment.carrier.shipperEmail,
                      },
                      {
                        key: "Shipper Phone",
                        value: activeOrder.shipment.carrier.shipperPhone,
                      },
                    ].map((item) => (
                      <div key={item.key} className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase text-muted-foreground">
                          {item.key}
                        </span>
                        <span className="text-sm font-medium text-slate-900">
                          {item.value || "-"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Carrier Address
                  </h3>
                  <div className="grid grid-cols-2 gap-4 rounded-lg border bg-gray-50/50 p-4">
                    {[
                      {
                        key: "Address Line 1",
                        value: activeOrder.shipment.carrier.addressLine1,
                      },
                      {
                        key: "Address Line 2",
                        value: activeOrder.shipment.carrier.addressLine2,
                      },
                      { key: "City", value: activeOrder.shipment.carrier.city },
                      {
                        key: "Postal Code",
                        value: activeOrder.shipment.carrier.postalCode,
                      },
                      {
                        key: "Country Code",
                        value: activeOrder.shipment.carrier.countryCode,
                      },
                      {
                        key: "State / Province",
                        value: activeOrder.shipment.carrier.stateOrProvinceCode,
                      },
                    ].map((item) => (
                      <div key={item.key} className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase text-muted-foreground">
                          {item.key}
                        </span>
                        <span className="text-sm font-medium text-slate-900">
                          {item.value || "-"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No carrier linked to this shipment.
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No shipment information available.
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
}

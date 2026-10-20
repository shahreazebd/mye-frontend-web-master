import Image from "next/image";
import { format } from "date-fns";
import dayjs from "dayjs";
import {
  Archive,
  CalendarCheck,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Package,
  Phone,
  Truck,
} from "lucide-react";

import { useGetTrackingDetails } from "@/hooks/queries/tracking/use-get-tracking-details";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// import SkeletonLoader from "@/components/shared/skeleton-loader";

type Props = { trackingNumber: string; orderId?: string; trackingInfoId: string };

function OrderTrackerTimeline(props: Props) {
  const { data: trackingDetails, isLoading } = useGetTrackingDetails(
    props.trackingInfoId
  );

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "DELIVERED":
        return <CheckCircle className="size-5 text-green-500" />;
      case "OUT_FOR_DELIVERY":
        return <Truck className="size-5 text-blue-500" />;
      case "TRANSIT":
        return <Package className="size-5 text-yellow-500" />;
      case "INFO":
        return <Archive className="size-5 text-gray-400" />;
      default:
        return <MapPin className="size-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "DELIVERED":
        return "bg-green-100 text-green-800 border-green-200";
      case "TRANSIT":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "EXCEPTION":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const events = trackingDetails?.events || [];
  const shipment = trackingDetails?.shipment;
  const orderAddress = trackingDetails?.order?.address;
  const items = trackingDetails?.order?.items || [];

  if (isLoading) {
    return (
      <div className="mt-10 space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-1">
      <>
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Tracking Details</h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="font-medium text-slate-700">{props.trackingNumber}</span>
              <span>•</span>
              <span>Order #{trackingDetails?.order?.marketplaceOrderId}</span>
            </div>
          </div>
          {trackingDetails?.status && (
            <Badge
              className={`border px-3 py-1 text-xs font-semibold uppercase ${getStatusColor(
                trackingDetails.status
              )}`}
            >
              {trackingDetails.status.split("_").join(" ")}
            </Badge>
          )}
        </div>

        <Separator />

        {/* Carrier & Store Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Package className="size-4" />
              Shipment Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Carrier</span>
                <div className="flex items-center gap-2 font-medium">
                  {shipment?.carrierType && (
                    <div className="relative size-5 overflow-hidden rounded bg-slate-50">
                      <Image
                        src={
                          shipment.carrierType === "AMAZON"
                            ? "/logos/marketplaces/round/amazon.svg"
                            : `/logos/carriers/round/${shipment.carrierType.toLowerCase()}.svg`
                        }
                        alt={shipment.carrierType}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                  )}
                  <span className="capitalize">
                    {shipment?.carrierType?.toLowerCase().replace("_", " ")}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Store</span>
                <div className="flex items-center gap-2 font-medium">
                  {shipment?.marketplace && (
                    <div className="relative size-5 overflow-hidden rounded-full bg-slate-50">
                      <Image
                        src={`/logos/marketplaces/round/${shipment.marketplace.toLowerCase()}.svg`}
                        alt={shipment.marketplace}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                  )}
                  <span>{shipment?.storeName}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Est. Delivery</span>
                <span className="font-medium">
                  {trackingDetails?.estimatedDelivery
                    ? dayjs(trackingDetails.estimatedDelivery).format("DD MMM, YYYY")
                    : "-"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <MapPin className="size-4" />
              Delivery Address
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900">{orderAddress?.buyerName}</p>
                <div className="mt-1 text-slate-600">
                  <p className="text-sm">{orderAddress?.addressLine1}</p>
                  {orderAddress?.addressLine2 && (
                    <p className="text-sm">{orderAddress.addressLine2}</p>
                  )}
                  <p className="text-sm">
                    {orderAddress?.city}, {orderAddress?.postCode}
                  </p>
                  <p className="text-sm">
                    {orderAddress?.country || orderAddress?.countryCode}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-2">
                {orderAddress?.email && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail className="size-3.5" />
                    <span>{orderAddress.email}</span>
                  </div>
                )}
                {orderAddress?.phone && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <Phone className="size-3.5" />
                    <span>{orderAddress.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        {items.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Order Items</h3>
              <div className="divide-y">
                {items.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between py-2 text-sm first:pt-0 last:pb-0"
                  >
                    <div>
                      <span className="font-medium text-slate-900">{item.name}</span>
                      <div className="text-xs text-slate-500">SKU: {item.sku}</div>
                    </div>
                    <div className="text-slate-600">x{item.quantity}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timeline Section */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
            <CalendarCheck className="size-4" />
            Tracking History
          </h3>

          {events.length > 0 ? (
            <div className="relative border-l-2 border-slate-200 pb-2 pl-6 dark:border-slate-800">
              {events.map((event, index) => (
                <div key={event.id || index} className="mb-8 last:mb-0">
                  <span className="absolute left-[-9px] flex size-5 items-center justify-center rounded-full bg-white ring-4 ring-white dark:bg-slate-950 dark:ring-slate-950">
                    {getEventIcon(event.eventType)}
                  </span>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-slate-900">
                        {format(new Date(event.timestamp), "EEE, MMM d")}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {format(new Date(event.timestamp), "h:mm a")}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-600">
                      {event.description ||
                        event.eventName ||
                        event.eventType.replace(/_/g, " ")}
                    </p>
                    {event.location && (
                      <p className="text-sm text-slate-500">
                        {typeof event.location === "string"
                          ? event.location
                          : [event.location.city, event.location.country]
                              .filter(Boolean)
                              .join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed text-slate-500">
              <Package className="mb-2 size-8 opacity-50" />
              <p>No tracking events available yet</p>
            </div>
          )}
        </div>
      </>
    </div>
  );
}

export default OrderTrackerTimeline;

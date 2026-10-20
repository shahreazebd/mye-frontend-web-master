import { BuyPostagePayloadResponse } from "@/schema/buy-postage-payload";
import { MappedOpenOrder } from "@/schema/open-order";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const postageAtom = atom({
  selectedPostage: {} as any,
  isPostageDetailsModalOpen: false,
  isBuyPostageModalOpen: false,
  isPostageReviewEditInputShown: false,
  isPostageErrors: [] as any,
  activeDetailsTab: "success",
  filters: {
    date: new Date(),
    channelUuid: "all",
  },
});

const selectedPostageChannelIdAtom = atom("");
const postagePayloadAtom = atom([] as BuyPostagePayloadResponse["data"]);

export function useSelectedPostageChannelId() {
  const [selectedPostageChannelId, setSelectedPostageChannelId] = useAtom(
    selectedPostageChannelIdAtom
  );

  return {
    selectedPostageChannelId,
    setSelectedPostageChannelId,
  };
}

export function usePostageAtom() {
  const [postageInfo, setPostageInfo] = useAtom(postageAtom);
  return {
    postageInfo,
    setPostageInfo,
  };
}

export function useGetPostagePayload() {
  const [postagePayload, setPostagePayload] = useAtom(postagePayloadAtom);

  return {
    postagePayload,
    setPostagePayload,
  };
}

const PostageServiceNameAtom = atom("");

export function usePostageServiceName() {
  const [postageServiceName, setPostageServiceName] = useAtom(PostageServiceNameAtom);

  return { postageServiceName, setPostageServiceName };
}

const postagePreviewAtom = atom({
  filters: {
    weight: "gm" as "gm" | "oz",
    dimensions: "cm" as "cm" | "in",
  },
  CarrierWillPickUpOption: false,
  lastUpdatePostage: {} as MappedOpenOrder,
});
export function usePostagePreviewAtom() {
  const [postagePreviewInfo, setPostagePreviewInfo] = useAtom(postagePreviewAtom);

  const handlePostagePreviewInfo = (value: Partial<typeof postagePreviewInfo>) => {
    setPostagePreviewInfo((prev) => ({ ...prev, ...value }));
  };

  return { postagePreviewInfo, handlePostagePreviewInfo };
}

const ShippingCodeSelect = atom("");

export function useShippingCodeSelectAtom() {
  const [shippingCode, setShippingCode] = useAtom(ShippingCodeSelect);

  return { shippingCode, setShippingCode };
}

const UploadTrackingOrderIDs = atomWithStorage("trackingOrderIds", [] as string[]);

export function useUploadTrackingOrderIDsAtom() {
  const [trackingOrderIds, setTrackingOrderIds] = useAtom(UploadTrackingOrderIDs);

  return { trackingOrderIds, setTrackingOrderIds };
}

const shipmentOrdersFilters = atom({
  q: "",
  status: "SUCCESS",
  trackingUploadStatus: "",
  shipmentId: "",
  carrierType: "",
});

export function useShipmentOrdersFiltersAtom() {
  const [filters, setFilters] = useAtom(shipmentOrdersFilters);
  return { filters, setFilters };
}

const shipmentOrdersPagination = atom({
  pageIndex: 0,
  pageSize: 100,
});

export function useShipmentOrdersPaginationAtom() {
  const [pagination, setPagination] = useAtom(shipmentOrdersPagination);
  return { pagination, setPagination };
}

type ShipmentOrderDialogState = {
  selectedOrderId: string | null;
  isDetailsOpen: boolean;
  isBuyReturnOpen: boolean;
};

const shipmentOrderDialogAtom = atom<ShipmentOrderDialogState>({
  selectedOrderId: null,
  isDetailsOpen: false,
  isBuyReturnOpen: false,
});

export function useShipmentOrderDialogAtom() {
  const [dialogState, setDialogState] = useAtom(shipmentOrderDialogAtom);

  const openDetails = (orderId: string) => {
    setDialogState({
      selectedOrderId: orderId,
      isDetailsOpen: true,
      isBuyReturnOpen: false,
    });
  };

  const openBuyReturn = (orderId: string) => {
    setDialogState({
      selectedOrderId: orderId,
      isDetailsOpen: false,
      isBuyReturnOpen: true,
    });
  };

  const closeDialogs = () => {
    setDialogState((prev) => ({
      ...prev,
      isDetailsOpen: false,
      isBuyReturnOpen: false,
    }));
  };

  return {
    dialogState,
    setDialogState,
    openDetails,
    openBuyReturn,
    closeDialogs,
  };
}

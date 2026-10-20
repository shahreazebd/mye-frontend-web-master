"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAmazonCarrierOptions } from "@/atoms/carriersAtom";
import {
  useOpenOrderAtomWithStorage,
  usePostagePreviewStorage,
} from "@/atoms/openOrderAtom";
import { useGetPostagePayload, usePostagePreviewAtom } from "@/atoms/postageAtom";
import {
  useAmazonRateOptions,
  useAmazonSelectedRates,
} from "@/atoms/shipment-preview-atom";
import { buildAmazonShippingRatePayload } from "@/utils/amazon-postage";
import { countryToCode } from "@/utils/countryToCurrency";
import { useQueryClient } from "@tanstack/react-query";

import { shipmentSocket } from "@/lib/socket";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";
import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import {
  AmazonBulkRate,
  fetchAmazonBulkRates,
} from "@/hooks/queries/shipments/fetchAmazonBulkRates";
import { useBuyAmazonShipment } from "@/hooks/queries/shipments/use-buy-amazon-shipment";
import { useGetAndUpdateAmazonShippingRates } from "@/hooks/queries/shipments/use-get-and-update-amazon-shipping-rates";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { DataTable } from "@/components/core/data-table/data-table";

import { AmazonOptions } from "./amazon-table-normal/amazon-options";
import { AmazonPostagePreviewTable } from "./amazon-table-normal/amazon-table";
import {
  amazonShipmentPayloadBuilder,
  calculateTotalRate,
  getFirstRate,
} from "./amazon-table-normal/amazon-table-helpers";
import { BuyPostageModalNew } from "./buy-postage-modal";
import { postagePreviewColumns } from "./postage-preview-column";
import { PostagePreviewTableToolbar } from "./postage-preview-table-toolbar";

export function PostagePreviewWrapper() {
  const [isOpenBuyPostageModal, setIsOpenBuyPostageModal] = useState(false);

  const { openOrdersWithStorage, setOpenOrdersWithStorage } =
    useOpenOrderAtomWithStorage();

  const openOrdersRef = useRef(openOrdersWithStorage);
  useEffect(() => {
    openOrdersRef.current = openOrdersWithStorage;
  }, [openOrdersWithStorage]);

  const addressFormattedRef = useRef(false);
  const hasFetchedRef = useRef(false);

  const { postagePreviewInfo, handlePostagePreviewInfo } = usePostagePreviewAtom();
  const { selectedRows, setSelectedRows } = usePostagePreviewStorage();
  const { setPostagePayload } = useGetPostagePayload();

  const params = useSearchParams();

  const carrier = params.get("carrier") || "AMAZON";
  const batchId = params.get("batchId") || "";
  const channelId = params.get("channelId") || openOrdersWithStorage[0]?.channel_uid;

  const { userInformation } = useAuth();
  const queryClient = useQueryClient();
  const { data: channelDetails } = useGetChannelDetails(channelId);
  const { mutate: buyAmazonPostage, isLoading } = useBuyAmazonShipment();
  const { setAmazonCarrierOptions } = useAmazonCarrierOptions();
  const { amazonSelectedRates, setAmazonSelectedRates } = useAmazonSelectedRates();

  // new
  const { mutate: amazonSingleShippingRate } =
    useGetAndUpdateAmazonShippingRates(batchId);
  const { setAmazonRateOptions, amazonRateOptions, setAmazonSingleRate } =
    useAmazonRateOptions();

  const { channel_uid } = channelDetails || {};

  const payload = useMemo(() => {
    const selectedIds = new Set(selectedRows?.map((r) => r.channel_order_id));

    const data =
      carrier === "AMAZON"
        ? openOrdersWithStorage
        : openOrdersWithStorage.filter((order) =>
            selectedIds.has(order.channel_order_id)
          );

    return data?.map((order, orderIndex) => {
      // `total_weight` is stored in grams. FedEx is the one carrier that rejects
      // "G" and only accepts "KG" or "LB", so its weight has to be converted to
      // match the unit we declare rather than just relabelled.
      const weightUnit = carrier === "FEDEX" ? "KG" : "G";

      const totalWeight =
        weightUnit === "KG"
          ? Math.round((+order.total_weight / 1000) * 100) / 100
          : +order.total_weight;

      const products = order?.items?.map((product, i) => {
        const quantity = +order?.quantity?.split(",")[i];

        return {
          name: product?.remote_product_title,
          localSku: product?.local_SKU,
          marketplaceSku: product?.remote_sku,
          quantity: quantity,
          unitPrice: product?.price,
          unitWeightInGrams: +product?.weight,
          positionItemId: product?.position_item_id,
          width: Math.round(Number(product?.width || 0)),
          height: Math.round(Number(product?.height || 0)),
          length: Math.round(Number(product?.depth || 0)),
          marketplaceOrderId: product?.channel_order_id,
        };
      });

      const originalSku = order?.modified_sku;

      const modifiedSku =
        order?.total_items > 1 ? `${order?.total_items} ITEMS` : order?.modified_sku;

      return {
        orderIndex,
        totalItems: order?.total_items,
        totalWeight,
        weightUnit,
        dimensionUnit: "CM",
        currency: order?.currency,
        originalSku: originalSku || "ORIGINAL-SKU",
        modifiedSku: modifiedSku || "MODIFIED-SKU",
        purchaseDate: order?.purchase_date,
        marketplaceOrderId: order?.channel_order_id,
        mergedOrderIds: order?.merge_order_ids,
        address: {
          buyerName: order?.shipping_address?.buyer_name?.replaceAll(/\s+/g, " ").trim(),
          addressLine1: order?.shipping_address?.address1?.replaceAll(/\s+/g, " ").trim(),
          addressLine2: order?.shipping_address?.address2?.replaceAll(/\s+/g, " ").trim(),
          phone: order?.shipping_address?.phone,
          city: order.shipping_address.city,
          state: order?.shipping_address?.state,
          postCode: order?.shipping_address?.post_code,
          country: order?.channel?.country,
          countryCode:
            carrier === "FEDEX"
              ? order?.shipping_address?.country
              : countryToCode(order?.channel?.country),
          email: order?.shipping_address?.email || "test@gmail.com",
        },
        items: [...products],
        rowId: order.id,
      };
    });
  }, [
    carrier,
    selectedRows?.length,
    JSON.stringify(selectedRows),
    openOrdersWithStorage,
  ]);

  async function fetchRates() {
    const queryKey = ["amazonBulkRates", batchId];
    try {
      const data = await queryClient.fetchQuery({
        queryKey,
        queryFn: () => fetchAmazonBulkRates(batchId),
      });

      const obj = {} as Record<string, AmazonBulkRate>;

      openOrdersRef.current.forEach((order) => {
        const rateInfo = data?.find(
          (item) => item.marketplaceOrderId === order.channel_order_id
        );
        if (rateInfo) {
          obj[order.id.toString()] = rateInfo;
        }
      });

      setAmazonRateOptions(obj);
    } catch (err) {
      toast({
        title: err instanceof Error ? err?.message : "Failed to fetch Amazon bulk rates",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (
      channel_uid &&
      openOrdersWithStorage?.length > 0 &&
      !addressFormattedRef.current
    ) {
      addressFormattedRef.current = true;
      const orderData = openOrdersWithStorage?.map((order) => {
        if (String(order?.shipping_address?.address2)?.startsWith("Packstation")) {
          const temp = order?.shipping_address?.address2;
          order.shipping_address.address2 = order?.shipping_address?.address1;
          order.shipping_address.address1 = temp;
        }

        const test =
          typeof +order.shipping_address?.address2 === "number" &&
          order?.shipping_address?.address2.length >= 8;

        const fullAddress = `${order?.shipping_address?.address1} ${
          test ? "" : order?.shipping_address?.address2
        }`;

        order.shipping_address.address2 =
          order?.shipping_address?.address2?.length < 8
            ? ""
            : order?.shipping_address?.address2;

        const idx = fullAddress?.search(/\d/);

        const add = fullAddress?.substring(0, idx) + " " + fullAddress?.substring(idx);

        return {
          ...order,
          shipping_address: {
            ...order?.shipping_address,
            address1: add,
          },
        };
      });

      setOpenOrdersWithStorage(orderData);
    }
  }, [channel_uid, openOrdersWithStorage]);

  useEffect(() => {
    if (
      carrier === "AMAZON" &&
      openOrdersWithStorage?.length > 0 &&
      !hasFetchedRef.current
    ) {
      hasFetchedRef.current = true;
      fetchRates();
    }
  }, [carrier, openOrdersWithStorage?.length]);

  useEffect(() => {
    setAmazonCarrierOptions({});
  }, []);

  useEffect(() => {
    if (!postagePreviewInfo.lastUpdatePostage?.id) return;

    const payload = buildAmazonShippingRatePayload(postagePreviewInfo.lastUpdatePostage);

    const body = {
      storeId: channel_uid,
      ...payload,
    };

    const rowIdStr = postagePreviewInfo.lastUpdatePostage.id.toString();

    setAmazonSingleRate({
      isLoading: true,
      orderId: rowIdStr,
    });

    setAmazonSelectedRates((prev) => ({
      ...prev,
      [rowIdStr]: null,
    }));

    amazonSingleShippingRate(body, {
      onSuccess: (data) => {
        const res = data;

        if (res?.marketplaceOrderId) {
          setAmazonRateOptions((prev) => ({
            ...prev,
            [rowIdStr]: {
              id: prev?.[rowIdStr]?.id || "",
              batchId: prev?.[rowIdStr]?.batchId || batchId,
              marketplaceOrderId: res.marketplaceOrderId,
              companyId: prev?.[rowIdStr]?.companyId || "",
              rates: {
                rates: res.rates,
                requestToken: res.requestToken,
              },
              errors: null,
              createdAt: prev?.[rowIdStr]?.createdAt || new Date(),
              updatedAt: new Date(),
            },
          }));

          setAmazonSingleRate((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }
      },
      onError: () => {
        setAmazonSingleRate((prev) => ({
          ...prev,
          isLoading: false,
        }));
      },
    });

    return () => handlePostagePreviewInfo({ lastUpdatePostage: {} as any });
  }, [JSON.stringify(postagePreviewInfo.lastUpdatePostage)]);

  // Socket connection to fetch batch rates
  useEffect(() => {
    if (userInformation?.company_uid) {
      shipmentSocket.emit("company:join", userInformation?.company_uid);

      shipmentSocket.on("amazon:rates", () => {
        fetchRates();

        queryClient.invalidateQueries(["amazonBulkRates", batchId]);
      });
    }
  }, [userInformation?.company_uid]);

  function continueButtonHandler() {
    if (carrier === "AMAZON") {
      const amazonPayload = {
        storeId: channelDetails?.channel_uid,
        storeName: channelDetails?.name,
        marketplace: "AMAZON",
        orders: payload?.map((order) => {
          const { rowId, ...orderData } = order;
          const rate = amazonSelectedRates[rowId]!;
          const token = amazonRateOptions?.[rowId]?.rates?.requestToken;
          return {
            ...orderData,
            metadata: amazonShipmentPayloadBuilder(rate, token),
          };
        }),
      };

      return buyAmazonPostage(amazonPayload, {
        onSuccess: () => {
          globalThis.location.href = "/shipments";
        },
      });
    }

    setIsOpenBuyPostageModal(true);
    setPostagePayload(payload as any);
  }

  const isSelected = selectedRows?.length;
  const isAmazonCarrierSelected =
    openOrdersWithStorage?.length &&
    openOrdersWithStorage?.length === Object.keys(amazonSelectedRates)?.length;
  const status = carrier === "AMAZON" ? isAmazonCarrierSelected : isSelected;
  const title = carrier === "AMAZON" ? "Buy Shipping in bulk" : "Postage Review";

  return (
    <section>
      {carrier === "AMAZON" ? (
        <AmazonPostagePreviewTable />
      ) : (
        <DataTable
          key="id"
          singleRowSelection={false}
          editableColumn={true}
          columns={postagePreviewColumns}
          data={openOrdersWithStorage}
          title={title}
          pagination={false}
          component={<PostagePreviewTableToolbar channelDetails={channelDetails} />}
          selectedRowData={(rows) => setSelectedRows(rows)}
          // search={carrier !== "AMAZON"}
        />
      )}

      {/* Footer */}
      <section
        className={cn(
          "mt-4 flex w-full",
          carrier === "AMAZON" ? "justify-between" : "justify-end"
        )}
      >
        {carrier === "AMAZON" && <AmazonOptions />}

        <div>
          {carrier === "AMAZON" && (
            <p className="text-base font-medium">
              Total: {calculateTotalRate(amazonSelectedRates)}{" "}
              {getFirstRate(amazonSelectedRates)}
            </p>
          )}

          <Button
            size="sm"
            onClick={continueButtonHandler}
            disabled={!status || isLoading}
            loading={isLoading}
          >
            {carrier === "AMAZON" ? "Buy Amazon Postage" : "Continue"}
          </Button>
        </div>
      </section>

      <BuyPostageModalNew
        isOpen={isOpenBuyPostageModal}
        setIsOpen={setIsOpenBuyPostageModal}
      />
    </section>
  );
}

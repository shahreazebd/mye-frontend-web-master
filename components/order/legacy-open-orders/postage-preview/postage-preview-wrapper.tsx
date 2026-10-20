"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAmazonCarrierOptions, useSelectedCarrierKV } from "@/atoms/carriersAtom";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import {
  useGetPostagePayload,
  usePostageAtom,
  usePostagePreviewAtom,
} from "@/atoms/postageAtom";
import { amazonShipAddresses } from "@/constants/amazon-ship-addresses";
import type { MappedOpenOrder } from "@/schema/open-order";
import { countryToCode } from "@/utils/countryToCurrency";
import {
  calculateTotalRate,
  getFirstRate,
  kgAndGramToGrams,
  lbAndOunceToOunces,
} from "@/utils/postage";

import { AmazonCarrierOption } from "@/types/amazon-carriers-option";
import { socket } from "@/lib/socket";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";
import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import { useBuyAmazonPostage } from "@/hooks/queries/postage/use-buy-amazon-postage";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/core/data-table/data-table";

import { BuyPostageModalNew } from "../../open-orders/postage-preview/buy-postage-modal";
import { AmazonOptions } from "./amazon-table/amazon-options";
import { AmazonPostagePreviewTable } from "./amazon-table/amazon-table";
import { BuyPostageModal } from "./buy-postage-modal";
import { postagePreviewColumns } from "./postage-preview-column";
import { OthersTableHeader } from "./table-header";

export function PostagePreviewWrapper() {
  const [isOpenBuyPostageModal, setIsOpenBuyPostageModal] = useState(false);
  const { openOrdersWithStorage, setOpenOrdersWithStorage } =
    useOpenOrderAtomWithStorage();

  const [selectedRows, setSelectedRows] = useState([] as MappedOpenOrder[]);
  const { setPostagePayload } = useGetPostagePayload();
  const params = useSearchParams();
  const carrier = params.get("carrier") || "evri";
  const channelId = params.get("channelId") || openOrdersWithStorage[0]?.channel_uid;
  const country = params.get("country") || "";

  const { data: channelDetails } = useGetChannelDetails(channelId as string);
  const { userInformation } = useAuth();
  const { setAmazonCarrierOptions } = useAmazonCarrierOptions();
  const { selectedCarrierKV, setSelectedCarrierKV } = useSelectedCarrierKV();
  const { setPostageInfo } = usePostageAtom();
  const { postagePreviewInfo } = usePostagePreviewAtom();
  const { mutate: buyAmazonPostage, isLoading: isBuyAmazonPostageLoading } =
    useBuyAmazonPostage();

  const { channel_uid, name: channelName } = channelDetails || {};
  const address = amazonShipAddresses[channel_uid as keyof typeof amazonShipAddresses];

  const payload = useMemo(() => {
    return selectedRows?.map((order) => {
      const products = order?.items?.map((product, i) => {
        const quantity = +order?.quantity?.split(",")[i];

        return {
          name: product?.local_product_name,
          sku: product?.local_SKU,
          quantity: quantity,
          unit_value: product?.price,
          unit_weight_in_grams: +product?.weight,
          position_item_id: product?.position_item_id,
        };
      });

      const modifiedSku =
        order?.total_items > 1 ? `${order?.total_items} ITEMS` : order?.modified_sku;

      return {
        total_items: order?.total_items,
        total_weight: +order?.total_weight,
        currency: order?.currency,
        original_sku: order?.sku,
        modified_sku: modifiedSku,
        purchase_date: order?.purchase_date,
        order_id: order?.channel_order_id,
        merged_order_ids: order?.merge_order_ids,
        order_shipping_address: {
          buyer_name: order?.shipping_address?.buyer_name?.replace(/\s+/g, " ")?.trim(),
          address_1: order?.shipping_address?.address1?.replace(/\s+/g, " ")?.trim(),
          address_2: order?.shipping_address?.address2?.replace(/\s+/g, " ")?.trim(),
          phone: order?.shipping_address?.phone,
          city: order.shipping_address.city,
          state: order?.shipping_address?.state,
          post_code: order?.shipping_address?.post_code,
          country: order?.channel?.country,
          country_code:
            order?.shipping_address?.country === "DE"
              ? "DEU"
              : order?.shipping_address?.country,
          email: order?.shipping_address?.email,
        },
        order_items: [...products],
      };
    });
  }, [selectedRows?.length, JSON.stringify(selectedRows), openOrdersWithStorage]);

  const newPayload = useMemo(() => {
    return (carrier === "AMAZON" ? openOrdersWithStorage : selectedRows)?.map(
      (order, orderIndex) => {
        const products = order?.items?.map((product, i) => {
          const quantity = +order?.quantity?.split(",")[i];

          return {
            name: product?.local_product_name,
            localSku: product?.local_SKU,
            marketplaceSku: product?.remote_sku,
            quantity: quantity,
            unitPrice: product?.price,
            unitWeightInGrams: +product?.weight,
            positionItemId: product?.position_item_id,
            width: Math.round(Number(product?.width || 0)),
            height: Math.round(Number(product?.height || 0)),
            length: Math.round(Number(product?.depth || 0)),
          };
        });

        const originalSku = order?.modified_sku;

        const modifiedSku =
          order?.total_items > 1 ? `${order?.total_items} ITEMS` : order?.modified_sku;

        return {
          orderIndex,
          totalItems: order?.total_items,
          totalWeight: +order?.total_weight,
          weightUnit: carrier === "FEDEX" ? "KG" : "G",
          dimensionUnit: "CM",
          currency: order?.currency,
          originalSku: originalSku || "TEST-SKU",
          modifiedSku: modifiedSku || "TEST-SKU",
          purchaseDate: order?.purchase_date,
          marketplaceOrderId: order?.channel_order_id,
          mergedOrderIds: order?.merge_order_ids,
          address: {
            buyerName:
              order?.shipping_address?.buyer_name?.replace(/\s+/g, " ")?.trim() || "Test",
            addressLine1:
              order?.shipping_address?.address1?.replace(/\s+/g, " ")?.trim() || "test",
            addressLine2:
              order?.shipping_address?.address2?.replace(/\s+/g, " ")?.trim() || "Test",
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
        };
      }
    );
  }, [selectedRows?.length, JSON.stringify(selectedRows), openOrdersWithStorage]);

  const amazonPayload = useMemo(
    () =>
      openOrdersWithStorage?.map((order) => {
        const itemList = order?.items?.map((product) => {
          return {
            OrderItemId: product?.position_item_id?.[0],
            Quantity: product?.quantity,
            sku: product?.local_SKU,
          };
        });

        const [hCM, wCM, lCM] = (order?.dimensions || "")?.split(", ") || [0, 0, 0];
        const [hI, wI, lI] = (order?.dimensionsInches || "")?.split(", ") || [0, 0, 0];
        let packageDimensions = {};

        if (["united states of america", "bangladesh"]?.includes(country)) {
          packageDimensions = {
            Height: +hI,
            Width: +wI,
            Length: +lI,
            Unit: "inches",
          };
        } else {
          packageDimensions = {
            Height: +hCM,
            Width: +wCM,
            Length: +lCM,
            Unit: "centimeters",
          };
        }

        return {
          AmazonOrderId: order?.channel_order_id,
          ItemList: itemList,
          PackageDimensions: packageDimensions,
          BuyerInfo: {
            name: order.shipping_address.buyer_name,
          },
          Weight: {
            Value:
              country === "united states of america"
                ? lbAndOunceToOunces(+order?.lb, +order?.oz)
                : kgAndGramToGrams(+order?.kg, +order?.gm),

            Unit: country === "united states of america" ? "oz" : "grams",
          },
        };
      }),

    [JSON.stringify(openOrdersWithStorage), carrier]
  );

  useEffect(() => {
    if (channel_uid) {
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
          !test ? order?.shipping_address?.address2 : ""
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
  }, [channel_uid]);

  // generate carrier selector for single row change
  useEffect(() => {
    if (carrier === "amazon") {
      generateAmazonPayload(postagePreviewInfo?.lastUpdatePostage);

      setAmazonCarrierOptions((prev) => {
        // eslint-disable-next-line no-unused-vars
        const { [postagePreviewInfo?.lastUpdatePostage?.channel_order_id]: _, ...rest } =
          prev;

        return rest;
      });

      setSelectedCarrierKV((prev) => {
        // eslint-disable-next-line no-unused-vars
        const { [postagePreviewInfo?.lastUpdatePostage?.channel_order_id]: _, ...rest } =
          prev;

        return rest;
      });

      generateCarrierSelectForAmazon(postagePreviewInfo?.lastUpdatePostage);
    }
  }, [JSON.stringify(postagePreviewInfo?.lastUpdatePostage)]);

  // initialize ws for amazon channel type
  useEffect(() => {
    if (carrier === "amazon" && typeof window !== "undefined") {
      socket.emit("join_room", {
        room: channelId,
      });

      socket.on("room_message", (event: AmazonCarrierOption) => {
        console.log("response from socket", event);

        setAmazonCarrierOptions((prev) => ({
          ...prev,
          [event?.order_id]: {
            data: event?.eligible_shipping_services,
            error: event?.error,
          },
        }));
      });
    }
  }, [carrier, socket?.connected]);

  useEffect(() => {
    if (address && socket?.connected && carrier === "amazon") {
      const p = {
        channelUUID: channelId,
        carrierWillPickUp: postagePreviewInfo?.CarrierWillPickUpOption,
        ShipFromAddress: address,
        data: amazonPayload,
      };

      socket.emit("join_room", {
        room: channelId,
      });

      console.log("request payload", p);

      console.log("======================> bulk sent");
      socket.emit("get_eligible_shipping_service", JSON.stringify(p));
    }
  }, [address, socket.connected, postagePreviewInfo?.CarrierWillPickUpOption, carrier]);

  function continueButtonHandler() {
    if (carrier === "amazon") {
      const payload = {
        companyUuid: userInformation?.company_uid,
        channelUuid: channel_uid,
        channelName: channelName,
        carrierWillPickUp: postagePreviewInfo?.CarrierWillPickUpOption,
        ShipFromAddress: address,
        data: amazonPayload?.map((order) => {
          const carrierOptions = selectedCarrierKV[order.AmazonOrderId];

          return {
            ...order,
            ShippingServiceId: carrierOptions?.ShippingServiceId,
            ShippingServiceName: carrierOptions?.ShippingServiceName,
            ShippingServiceOfferId: carrierOptions?.ShippingServiceOfferId,
          };
        }),
      };

      // console.log(payload);

      buyAmazonPostage(payload, {
        onSuccess: () => {
          window.location.href = "/postage";
        },
      });

      return;
    }

    if (carrier && channelId) {
      setPostageInfo((prev) => {
        return {
          ...prev,
          isBuyPostageModalOpen: true,
        };
      });

      setPostagePayload(payload as any);
    }
  }

  const handleOpenBuyPostageModal = () => {
    setIsOpenBuyPostageModal(true);

    setPostagePayload(newPayload as any);
  };

  function generateCarrierSelectForAmazon(updatedOrder: MappedOpenOrder) {
    const sp = generateAmazonPayload(updatedOrder);

    const p = {
      channelUUID: channelId,
      carrierWillPickUp: postagePreviewInfo?.CarrierWillPickUpOption,
      ShipFromAddress: address,
      data: [sp],
    };

    console.log("request payload", p);
    console.log("======================> single sent");
    socket.emit("get_eligible_shipping_service", JSON.stringify(p));
  }

  function generateAmazonPayload(order: MappedOpenOrder) {
    const itemList = order?.items?.map((product) => {
      return {
        OrderItemId: product?.position_item_id?.[0],
        Quantity: product?.quantity,
      };
    });

    const [wCM, lCM, hCM] = (order?.dimensions || "")?.split(", ") || [0, 0, 0];
    const [wI, lI, hI] = (order?.dimensionsInches || "")?.split(", ") || [0, 0, 0];
    let packageDimensions = {};

    if (carrier === "amazon" && country === "united states of america") {
      packageDimensions = {
        Length: +lI,
        Width: +wI,
        Height: +hI,
        Unit: "inches",
      };
    } else if (carrier === "amazon") {
      packageDimensions = {
        Length: +lCM,
        Width: +wCM,
        Height: +hCM,
        Unit: "centimeters",
      };
    }

    const payload = {
      channelUUID: channelId,
      carrierWillPickUp: postagePreviewInfo?.CarrierWillPickUpOption,
      ShipFromAddress: address,
      AmazonOrderId: order?.channel_order_id,
      ItemList: itemList,
      PackageDimensions: packageDimensions,
      Weight: {
        Value:
          carrier === "amazon" && country === "united states of america"
            ? lbAndOunceToOunces(+order?.lb, +order?.oz)
            : kgAndGramToGrams(+order?.kg, +order?.gm),
        Unit: country === "united states of america" ? "oz" : "grams",
      },
    };

    // setSingleOrderPayload(payload);

    return payload;
  }

  const isSelected = selectedRows?.length;

  const isAmazonCarrierSelected =
    openOrdersWithStorage?.length &&
    Object.keys(selectedCarrierKV)?.length &&
    openOrdersWithStorage?.length === Object.keys(selectedCarrierKV)?.length;

  const status = carrier === "amazon" ? isAmazonCarrierSelected : isSelected;

  const title = carrier === "amazon" ? "Buy Shipping in bulk" : "Postage Review";

  return (
    <section>
      {carrier === "amazon" ? (
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
          component={<OthersTableHeader channelDetails={channelDetails} />}
          selectedRowData={(rows) => {
            setSelectedRows(rows);
          }}
        />
      )}

      <section
        className={cn(
          "mt-4 flex w-full",
          carrier === "amazon" ? "justify-between" : "justify-end"
        )}
      >
        {carrier === "amazon" && <AmazonOptions />}

        {["evri", "clickanddrop"].includes(carrier) && (
          <Button
            className="mr-4"
            size="sm"
            onClick={handleOpenBuyPostageModal}
            disabled={!status}
          >
            Continue with New
          </Button>
        )}

        <div>
          {carrier === "amazon" && (
            <p className="text-base font-medium">
              Total: {calculateTotalRate(selectedCarrierKV)}{" "}
              {getFirstRate(selectedCarrierKV)}
            </p>
          )}

          <Button
            size="sm"
            onClick={continueButtonHandler}
            disabled={!status || isBuyAmazonPostageLoading}
          >
            {carrier === "amazon" ? "Buy Amazon Postage" : "Continue"}
          </Button>
        </div>
      </section>
      <BuyPostageModal />
      <BuyPostageModalNew
        isOpen={isOpenBuyPostageModal}
        setIsOpen={setIsOpenBuyPostageModal}
      />
    </section>
  );
}

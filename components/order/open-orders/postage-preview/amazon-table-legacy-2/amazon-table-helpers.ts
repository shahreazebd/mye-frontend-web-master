import { AmazonRatePayload } from "@/types/amazon-carriers-option";
import { Rate } from "@/hooks/queries/shipments/fetchAmazonBulkRates";

export function calculateTotalRate(data: Record<string, Rate | null>) {
  let total = 0;
  for (let key in data)
    total +=
      data[key]?.rateItemList.reduce(
        (acc, rate) => acc + rate?.rateItemCharge.value,
        0
      ) || 0;
  return total?.toFixed(2);
}

export function getFirstRate(data: Record<string, Rate | null>) {
  const firstKey = Object.keys(data)[0];
  return data[firstKey]?.totalCharge?.unit;
}

function removeEmptyFields<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => [
        k,
        typeof v === "object" && !Array.isArray(v) ? removeEmptyFields(v) : v,
      ])
  ) as T;
}

export function amazonShipmentPayloadBuilder(carrier: Rate, requestToken: string) {
  const docSpec =
    carrier.supportedDocumentSpecifications?.find((doc) => doc.format === "PDF") ||
    carrier.supportedDocumentSpecifications?.find((doc) => doc.format === "PNG") ||
    carrier.supportedDocumentSpecifications?.find((doc) => doc.format === "ZPL") ||
    carrier.supportedDocumentSpecifications[0];

  const printOptions = docSpec.printOptions[0];

  const valueAddedServices =
    carrier.availableValueAddedServiceGroups
      .map((group) => group.valueAddedServices[0])
      .map((e) => ({ id: e.id })) || [];

  // const requestedValueAddedServices = [
  //   {
  //     id: "SIGNATURE_CONFIRMATION",
  //   },
  //   {
  //     id: "CARRIER_PICKUP_CHARGE",
  //   },
  // ];

  const requestedDocumentSpecification = {
    format: docSpec.format,
    size: docSpec.size,
    pageLayout: printOptions.supportedPageLayouts[0],
    needFileJoining: printOptions.supportedFileJoiningOptions[0],
    requestedDocumentTypes: printOptions.supportedDocumentDetails.map(
      (detail) => detail.name
    ),

    // optional
    ...(printOptions.supportedDPIs?.[0] && {
      dpi: printOptions.supportedDPIs[0],
    }),
  };

  const rawPayload: AmazonRatePayload = {
    requestToken: requestToken,
    rateId: carrier.rateId,
    deliveryDate: carrier.promise?.deliveryWindow?.end || new Date(),
    charge: carrier.totalCharge?.value,
    unit: carrier.totalCharge?.unit,
    requestedDocumentSpecification,
    requestedValueAddedServices: valueAddedServices,
  };

  const payload = removeEmptyFields(rawPayload);

  const finalPayload = {
    buyAmazonLabelPayload: payload,
    carrierId: carrier.carrierId,
    carrierName: carrier.carrierName,
  };

  return finalPayload;
}

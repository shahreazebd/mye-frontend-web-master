import type { Channel } from "@/schema/channel";
import dayjs from "dayjs";

import type { DispatchOrders, DispatchedOrderDetails } from "@/types/dispatched-order";
import type { Address, Item, Order } from "@/types/shipments";

export type InvoiceTranslations = {
  // Common / General
  title: string;
  paid: string;
  orderId: string;
  orderDate: string;
  invoiceDate: string;
  deliveryDate: string;
  /** Amazon prints these as one label; EN stays on one line, DE wraps. */
  invoiceAndDeliveryDate: string;
  invoiceNumber: string;
  paymentReference: string;
  soldBy: string;
  vatId: string;
  amountDue: string;
  contactCustomerService: (domain: string) => string;
  billingAddress: string;
  shippingAddress: string;
  senderAddress: string;
  buyerRegisteredAddress: string;
  username: string;
  salesRecordNumber: string;
  orderInfo: string;
  orderPlacedBy: string;
  invoiceDetails: string;
  pageNumber: (page: number, total: number) => string;

  // Table
  itemDescription: string;
  sku: string;
  quantity: string;
  unitPriceExclTax: string;
  unitPriceInclTax: string;
  unitPrice: string;
  taxRate: string;
  taxRateColumn: string;
  subtotalInclTax: string;
  itemTotal: string;
  shippingCosts: string;

  // Totals
  subtotalExclTax: string;
  shippingExclTax: string;
  discount: string;
  tax: string;
  totalTax: string;
  totalAmount: string;
  totalPrice: string;

  // Split section / notes
  selectedShippingService: string;
  messageFrom: (storeName: string) => string;
  thankYouNote: string;
  storeLinkText: string;
};

export const germanTranslations: InvoiceTranslations = {
  title: "Rechnung",
  paid: "Bezahlt",
  orderId: "Bestellung",
  orderDate: "Bestelldatum",
  invoiceDate: "Rechnungsdatum",
  deliveryDate: "Lieferdatum",
  invoiceAndDeliveryDate: "Rechnungsdatum\n/Lieferdatum",
  invoiceNumber: "Rechnung Nr.",
  paymentReference: "Zahlungsreferenznummer",
  soldBy: "Verkauft von",
  vatId: "USt-IDNr.",
  amountDue: "Zahlbetrag",
  contactCustomerService: (domain) =>
    `Um unseren Kundenservice zu kontaktieren, besuche www.${domain}/contact-us`,
  billingAddress: "Rechnungsadresse",
  shippingAddress: "Lieferadresse",
  senderAddress: "Absenderadresse",
  buyerRegisteredAddress: "Anmeldeadresse des Käufers",
  username: "Nutzername",
  salesRecordNumber: "Verkaufsprotokoll Nr.",
  orderInfo: "Bestellinformationen",
  orderPlacedBy: "Bestellung aufgegeben von",
  invoiceDetails: "Rechnungsdetails",
  pageNumber: (page, total) => `Seite ${page} von ${total}`,

  itemDescription: "Artikel",
  sku: "Artikelnr.",
  quantity: "Stückzahl",
  unitPriceExclTax: "Stückpreis (ohne USt.)",
  unitPriceInclTax: "Stückpreis (inkl. USt.)",
  unitPrice: "Artikelpreis",
  taxRate: "MwSt.",
  taxRateColumn: "MwSt.\n-Satz",
  subtotalInclTax: "Zwischensumme (inkl. USt.)",
  itemTotal: "Artikel\ninsgesamt",
  shippingCosts: "Versandkosten",

  subtotalExclTax: "Zwischensumme (ohne MwSt.)",
  shippingExclTax: "Versand (ohne MwSt.)",
  discount: "Rabatt",
  tax: "MwSt.",
  totalTax: "MwSt. Gesamt",
  totalAmount: "Gesamtbetrag",
  totalPrice: "Gesamtpreis",

  selectedShippingService: "Vom Käufer ausgewählter Versandservice :",
  messageFrom: (storeName) => `Eine Nachricht von ${storeName}`,
  thankYouNote: "Vielen Dank für Ihren Einkauf! Ich wünsche Ihnen viel Freude damit!",
  storeLinkText: "Link zu Shop-QR-\nCode",
};

export const englishTranslations: InvoiceTranslations = {
  title: "INVOICE/PACKING SLIP",
  paid: "Paid",
  orderId: "Order",
  orderDate: "Order date",
  invoiceDate: "Invoice Date",
  deliveryDate: "Delivery Date",
  invoiceAndDeliveryDate: "Invoice date / Delivery date",
  invoiceNumber: "Invoice No.",
  paymentReference: "Payment Reference",
  soldBy: "Sold by",
  vatId: "VAT ID",
  amountDue: "Amount Due",
  contactCustomerService: (domain) =>
    `To contact customer service, visit www.${domain}/contact-us`,
  billingAddress: "Billing Address",
  shippingAddress: "Post to",
  senderAddress: "Post from",
  buyerRegisteredAddress: "Buyer registration address",
  username: "Username",
  salesRecordNumber: "Sales Record No.",
  orderInfo: "Order Information",
  orderPlacedBy: "Order placed by",
  invoiceDetails: "Invoice Details",
  pageNumber: (page, total) => `Page ${page} of ${total}`,

  itemDescription: "Item",
  sku: "SKU",
  quantity: "Quantity",
  unitPriceExclTax: "Unit Price (excl. VAT)",
  unitPriceInclTax: "Unit Price (incl. VAT)",
  unitPrice: "Item\nprice",
  taxRate: "VAT",
  taxRateColumn: "VAT\nrate",
  subtotalInclTax: "Subtotal (incl. VAT)",
  itemTotal: "Item\ntotal",
  shippingCosts: "Shipping Costs",

  subtotalExclTax: "Subtotal (excl. VAT)",
  shippingExclTax: "Postage (excl. VAT)",
  discount: "Discount",
  tax: "VAT amount",
  totalTax: "Total VAT",
  totalAmount: "Order total",
  totalPrice: "Total Price",

  selectedShippingService: "Buyer selected postage service :",
  messageFrom: (storeName) => `A message from ${storeName}`,
  thankYouNote: "Thanks for your purchase! I hope you love it!",
  storeLinkText: "Shop QR code link",
};

// ---------------------------------------------------------------------------
// Amazon uses its own wording, which collides with eBay on several shared keys
// (title, shippingAddress, totalPrice, ...). These sets are for the Amazon
// template only; the eBay sets above are left untouched.
// ---------------------------------------------------------------------------

export const amazonEnglishTranslations: InvoiceTranslations = {
  ...englishTranslations,
  title: "Invoice",
  paid: "Paid",
  orderId: "Order #",
  orderDate: "Order date",
  invoiceDate: "Invoice date",
  deliveryDate: "Delivery date",
  invoiceNumber: "Invoice #",
  paymentReference: "Payment reference ID",
  soldBy: "Sold by",
  vatId: "VAT #",
  amountDue: "Total payable",
  contactCustomerService: (domain) =>
    `For questions about your order, visit www.${domain}/contact-us`,
  billingAddress: "Billing address",
  shippingAddress: "Delivery address",
  orderInfo: "Order information",
  orderPlacedBy: "Order placed by",
  invoiceDetails: "Invoice details",
  itemDescription: "Description",
  quantity: "Qty",
  unitPriceExclTax: "Unit price\n(excl. VAT)",
  taxRate: "VAT rate",
  unitPriceInclTax: "Unit price (incl. VAT)",
  subtotalInclTax: "Item subtotal\n(incl. VAT)",
  subtotalExclTax: "Item subtotal\n(excl. VAT)",
  shippingCosts: "Shipping Charges",
  tax: "VAT subtotal",
  totalTax: "Total",
  totalPrice: "Invoice total",
  pageNumber: (page, total) => `Page ${page} of ${total}`,
};

export const amazonGermanTranslations: InvoiceTranslations = {
  ...germanTranslations,
  title: "Rechnung",
  paid: "Bezahlt",
  orderId: "Bestellnummer",
  orderDate: "Bestelldatum",
  invoiceDate: "Rechnungsdatum",
  deliveryDate: "Lieferdatum",
  invoiceNumber: "Rechnungsnummer",
  paymentReference: "Zahlungsreferenznummer",
  soldBy: "Verkauft von",
  vatId: "USt-IdNr.:",
  amountDue: "Zahlbetrag",
  contactCustomerService: (domain) =>
    `Um unseren Kundenservice zu kontaktieren, besuche www.${domain}/contact-us`,
  billingAddress: "Rechnungsadresse",
  shippingAddress: "Lieferadresse",
  orderInfo: "Bestellinformationen",
  orderPlacedBy: "Bestellung aufgegeben von",
  invoiceDetails: "Rechnungsdetails",
  itemDescription: "Bezeichnung",
  quantity: "Menge",
  unitPriceExclTax: "Stückpreis\n(ohne USt.)",
  taxRate: "USt. %",
  unitPriceInclTax: "Stückpreis (inkl. USt.)",
  subtotalInclTax: "Zwischensumme\n(inkl. USt.)",
  subtotalExclTax: "Zwischensumme\n(ohne USt.)",
  shippingCosts: "Versandkosten",
  tax: "USt.",
  totalTax: "Gesamt",
  totalPrice: "Gesamtpreis",
  pageNumber: (page, total) => `Seite ${page} von ${total}`,
};

const regionNameCache: Record<string, Intl.DisplayNames> = {};

function regionNames(locale: string) {
  if (!regionNameCache[locale]) {
    regionNameCache[locale] = new Intl.DisplayNames([locale], { type: "region" });
  }
  return regionNameCache[locale];
}

/**
 * Expands a 2-letter country code to a display name, e.g. GB -> "United Kingdom"
 * and DE -> "Deutschland". Falls back to the raw code for anything Intl can't
 * resolve, so a bad value prints as-is instead of "Unknown Region".
 */
export function countryName(code?: string | null, fallback = "", locale = "en") {
  if (!code) return fallback;
  const upper = code.trim().toUpperCase();
  try {
    const name = regionNames(locale).of(upper);
    if (name && name !== "Unknown Region") return name;
  } catch {
    // Not a resolvable region — fall through to the raw code.
  }
  return upper;
}

/** Amazon prints the seller country as a full name on DE invoices, as a code elsewhere. */
export function sellerCountryLabel(
  code: string | undefined,
  isGerman: boolean,
  fallback = ""
) {
  return isGerman ? countryName(code, fallback, "de") : code || fallback;
}

/** amazon.de / amazon.co.uk / amazon.com, derived from where the order shipped. */
export function amazonContactDomain(order: Order): string {
  const code = (order?.address?.countryCode || "").toUpperCase();
  if (code === "DE" || code === "DEU" || code === "AT") return "amazon.de";
  if (code === "GB" || code === "UK") return "amazon.co.uk";
  return "amazon.com";
}

/** German and Austrian standard rate is 19%; the UK rate is 20%. */
export function defaultVatRate(order: Order): number {
  if (
    typeof order.metadata?.vatPercentage === "number" &&
    !Number.isNaN(order.metadata.vatPercentage)
  ) {
    return order.metadata.vatPercentage;
  }
  const code = (order?.address?.countryCode || "").toUpperCase();
  return code === "DE" || code === "DEU" || code === "AT" ? 19 : 20;
}

/** Amazon renders invoice dates as "13 April 2026" in every language. */
export function formatAmazonDate(date?: string | Date | null): string {
  if (!date) return "-";
  const d = dayjs(date);
  return d.isValid() ? d.format("DD MMMM YYYY") : "-";
}

/** Amazon numbers invoices per country, e.g. GB008WAYG0BJLZ11 / DE00051G5WCVF1. */
export function amazonInvoiceNumber(order: Order): string {
  const code = (order?.address?.countryCode || "GB").toUpperCase();
  const prefix = code === "DE" || code === "DEU" || code === "AT" ? "DE" : "GB";
  const source = (order.marketplaceOrderId || order.id || "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();
  return `${prefix}${source.slice(-12) || "000000000000"}`;
}

export function isGermanOrder(order: Order): boolean {
  const countryCode = order?.address?.countryCode?.toUpperCase();
  const country = order?.address?.country?.toLowerCase() || "";
  return (
    countryCode === "DE" ||
    countryCode === "DEU" ||
    country.includes("germany") ||
    country.includes("deutschland")
  );
}

export function formatInvoiceDate(date?: string | Date | null, isGerman = false): string {
  if (!date) return "-";
  const d = dayjs(date);
  if (!d.isValid()) return "-";
  if (isGerman) {
    const monthNamesDE = [
      "Jan",
      "Feb",
      "Mär",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez",
    ];
    return `${d.date()}. ${monthNamesDE[d.month()]} ${d.year()}`;
  }
  return d.format("DD MMMM YYYY");
}

/** Locale that matches how each currency is written on a printed invoice. */
function currencyLocale(currency: string, isGerman: boolean) {
  switch (currency) {
    case "GBP":
      return "en-GB";
    case "USD":
    case "CAD":
    case "AUD":
      return "en-US";
    default:
      return isGerman ? "de-DE" : "de-DE";
  }
}

export function formatCurrency(
  amount: number,
  currency = "EUR",
  isGerman = false,
  formatStyle: "symbol" | "code" | "auto" = "symbol"
): string {
  const value = Number.isNaN(amount) ? 0 : amount;
  const curr = (currency || "EUR").toUpperCase();
  const locale = currencyLocale(curr, isGerman);
  const decimals = { minimumFractionDigits: 2, maximumFractionDigits: 2 } as const;

  const plain = new Intl.NumberFormat(locale, decimals).format(Math.abs(value));
  const sign = value < 0 ? "-" : "";

  // "code" prints the ISO code first ("EUR 23,35"). eBay's "symbol" style also
  // keeps EUR as a code, matching its own packing slips, while Amazon's "auto"
  // style lets Intl put the symbol where the locale wants it ("19,90 €").
  if (formatStyle === "code" || (formatStyle === "symbol" && curr === "EUR")) {
    return `${sign}${curr} ${plain}`;
  }

  try {
    return (
      new Intl.NumberFormat(locale, {
        ...decimals,
        style: "currency",
        currency: curr,
      })
        .format(value)
        // Intl inserts a non-breaking space before the symbol in some locales;
        // Helvetica in the PDF has no glyph for it, so use a plain space.
        .replace(/[\u00A0\u202F]/g, " ")
    );
  } catch {
    // Unknown or malformed currency code — fall back to the ISO code form.
    return `${sign}${curr} ${plain}`;
  }
}

export function calculateOrderFinancials(order: Order, customVatRate?: number) {
  const vatRate =
    typeof customVatRate === "number" && !Number.isNaN(customVatRate)
      ? customVatRate
      : typeof order.metadata?.vatPercentage === "number" &&
        !Number.isNaN(order.metadata.vatPercentage)
      ? order.metadata.vatPercentage
      : defaultVatRate(order);

  const items = (
    order.items && order.items.length > 0
      ? order.items
      : [
          {
            name: order.originalSku || "Item",
            localSku: order.originalSku,
            marketplaceSku: order.originalSku,
            quantity: order.totalItems || 1,
            unitPrice: 0,
          },
        ]
  ).map((item) => {
    const qty = item.quantity || 1;
    const unitPriceGross = item.unitPrice || 0;
    const unitPriceNet = unitPriceGross / (1 + vatRate / 100);
    const itemTotalGross = unitPriceGross * qty;
    const itemTotalNet = unitPriceNet * qty;
    const itemVatAmount = itemTotalGross - itemTotalNet;

    return {
      ...item,
      qty,
      unitPriceGross,
      unitPriceNet,
      itemTotalGross,
      itemTotalNet,
      itemVatAmount,
      vatRate,
    };
  });

  const totalGross = items.reduce((sum, item) => sum + item.itemTotalGross, 0);
  const totalNet = items.reduce((sum, item) => sum + item.itemTotalNet, 0);
  const totalVat = totalGross - totalNet;

  return {
    items,
    vatRate,
    totalGross,
    totalNet,
    totalVat,
  };
}

export function parseAddressInfo(rawAddr: any): {
  buyerName: string;
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postCode: string;
  countryCode: string;
  phone: string;
  email: string;
} | null {
  if (!rawAddr) return null;

  const rawName =
    (rawAddr.name || rawAddr.buyerName || rawAddr.buyer_name || "")
      .split(":")
      .filter(Boolean)
      .reverse()
      .join(" ")
      .trim() ||
    (rawAddr.name || rawAddr.buyerName || rawAddr.buyer_name || "")
      .replace(/:/g, " ")
      .trim();

  let line1 = (rawAddr.addressLine1 || rawAddr.address1 || "").trim();
  let line2 = (rawAddr.addressLine2 || rawAddr.address2 || "").trim();
  const line3 = (rawAddr.addressLine3 || rawAddr.address3 || "").trim();

  // If line1 is just a building/door number (e.g. "13", "13A", "No. 13") and line2 is street name:
  if (/^\d+[\w\s,-]*$/.test(line1) && line1.length <= 6 && line2) {
    line1 = `${line1.replace(/,$/, "")}, ${line2}`;
    line2 = line3;
  }

  const company = (rawAddr.companyName || rawAddr.company_name || "").trim();
  const buyerName = rawName || company || "Customer";

  return {
    buyerName,
    companyName: company,
    addressLine1: line1,
    addressLine2: line2,
    city: (rawAddr.city || "").trim(),
    postCode: (rawAddr.postalCode || rawAddr.postCode || rawAddr.post_code || "").trim(),
    countryCode: (rawAddr.countryCode || rawAddr.country || "").trim().toUpperCase(),
    phone: (rawAddr.phone || "").trim(),
    email: (rawAddr.email || "").trim(),
  };
}

export function createInvoiceOrder({
  dispatchedOrder,
  fullOrder,
  channelDetails,
  batchInfo,
}: {
  dispatchedOrder: DispatchedOrderDetails;
  fullOrder?: any;
  channelDetails?: Channel | null;
  batchInfo?: Partial<DispatchOrders> | null;
}): Order {
  const marketplace = (
    fullOrder?.salesChannel?.channelName ||
    dispatchedOrder.market_place ||
    fullOrder?.channel?.channel_type ||
    batchInfo?.channel_type ||
    channelDetails?.channel_type ||
    "AMAZON"
  ).toUpperCase();

  const storeName =
    channelDetails?.name ||
    batchInfo?.channel_name ||
    fullOrder?.channel?.name ||
    "Amazon Seller";

  const orderId =
    fullOrder?.orderId ||
    dispatchedOrder.channel_order_id ||
    fullOrder?.channel_order_id ||
    String(dispatchedOrder.id || "");

  // Support both Amazon API (recipient.deliveryAddress) and legacy fullOrder / dispatchedOrder address
  const amazonDelivery =
    fullOrder?.recipient?.deliveryAddress || fullOrder?.data?.recipient?.deliveryAddress;

  const legacyAddr = fullOrder?.shipping_address || dispatchedOrder.shipping_address;

  const deliveryParsed = parseAddressInfo(amazonDelivery) || parseAddressInfo(legacyAddr);

  const rawBilling =
    fullOrder?.billingAddress ||
    fullOrder?.recipient?.billingAddress ||
    fullOrder?.buyerTaxInfo?.billingAddress ||
    fullOrder?.buyer?.billingAddress ||
    fullOrder?.invoiceData?.buyerSelectedInvoiceAddress ||
    fullOrder?.buyerInvoiceAddress ||
    (fullOrder as any)?.billing_address ||
    (dispatchedOrder as any)?.billing_address ||
    null;

  const billingParsed = parseAddressInfo(rawBilling);

  const buyerName = deliveryParsed?.buyerName || "Customer";
  const addressLine1 = deliveryParsed?.addressLine1 || "";
  const addressLine2 = deliveryParsed?.addressLine2 || "";
  const city = deliveryParsed?.city || "";
  const postCode = deliveryParsed?.postCode || "";
  const countryCode = deliveryParsed?.countryCode || "";
  const phone = deliveryParsed?.phone || "";
  const email = deliveryParsed?.email || "";

  const isUK =
    countryCode === "GB" ||
    countryCode === "UK" ||
    countryCode.toLowerCase().includes("united kingdom");

  const isGerman =
    countryCode === "DE" ||
    countryCode === "DEU" ||
    countryCode.toLowerCase().includes("germany") ||
    countryCode.toLowerCase().includes("deutschland");

  const displayCountry =
    countryName(countryCode, countryCode, isGerman ? "de" : "en") || countryCode;

  const address: Address = {
    buyerName,
    addressLine1,
    addressLine2,
    city,
    postCode,
    country: displayCountry,
    countryCode: countryCode || (isUK ? "GB" : isGerman ? "DE" : ""),
    phone,
    email,
  };

  const currency =
    fullOrder?.proceeds?.grandTotal?.currencyCode ||
    fullOrder?.orderItems?.[0]?.product?.price?.unitPrice?.currencyCode ||
    fullOrder?.currency ||
    legacyAddr?.currency ||
    (isUK ? "GBP" : "EUR");

  const purchaseDate = fullOrder?.createdTime
    ? new Date(fullOrder.createdTime)
    : fullOrder?.purchase_date
    ? new Date(fullOrder.purchase_date)
    : dispatchedOrder.dispatched_at
    ? new Date(dispatchedOrder.dispatched_at)
    : new Date();

  let items: Item[] = [];
  if (
    fullOrder?.orderItems &&
    Array.isArray(fullOrder.orderItems) &&
    fullOrder.orderItems.length > 0
  ) {
    items = fullOrder.orderItems.map((it: any) => {
      const qty = Number(it.quantityOrdered) || 1;
      const proceedsTotal = Number(it.proceeds?.proceedsTotal?.amount);
      const unitPriceGross =
        !Number.isNaN(proceedsTotal) && proceedsTotal > 0
          ? proceedsTotal / qty
          : Number(it.product?.price?.unitPrice?.amount) || 0;

      return {
        name: it.product?.title || it.product?.sellerSku || it.product?.asin || "Item",
        localSku: it.product?.sellerSku || "",
        marketplaceSku: it.product?.asin || it.product?.sellerSku || "",
        quantity: qty,
        unitPrice: unitPriceGross,
        positionItemId: it.orderItemId ? [it.orderItemId] : [],
        unitWeightInGrams: 0,
        height: 0,
        length: 0,
        width: 0,
        marketplaceOrderId: orderId,
      };
    });
  } else if (
    fullOrder?.items &&
    Array.isArray(fullOrder.items) &&
    fullOrder.items.length > 0
  ) {
    items = fullOrder.items.map((it: any) => ({
      name:
        it.remote_product_title ||
        it.local_product_name ||
        it.remote_sku ||
        it.local_SKU ||
        "Item",
      localSku: it.local_SKU || it.remote_sku || "",
      marketplaceSku: it.remote_sku || it.local_SKU || "",
      quantity: Number(it.quantity) || 1,
      unitPrice: Number(it.price) || 0,
      positionItemId: it.position_item_id || [],
      unitWeightInGrams: 0,
      height: 0,
      length: 0,
      width: 0,
      marketplaceOrderId: orderId,
    }));
  } else if (
    dispatchedOrder.items &&
    Array.isArray(dispatchedOrder.items) &&
    dispatchedOrder.items.length > 0
  ) {
    items = dispatchedOrder.items.map((it) => ({
      name: it.remote_sku || "Item",
      localSku: it.remote_sku || "",
      marketplaceSku: it.remote_sku || "",
      quantity: Number(it.quantity) || 1,
      unitPrice: Number(it.price) || 0,
      positionItemId: [],
      unitWeightInGrams: 0,
      height: 0,
      length: 0,
      width: 0,
      marketplaceOrderId: orderId,
    }));
  }

  const totalAmount =
    Number(fullOrder?.proceeds?.grandTotal?.amount) ||
    Number(dispatchedOrder.total) ||
    Number(fullOrder?.total) ||
    0;
  if (items.length === 1 && items[0].unitPrice === 0 && totalAmount > 0) {
    items[0].unitPrice = totalAmount / items[0].quantity;
  }

  const vatPercentage =
    typeof fullOrder?.vat_percentage === "number"
      ? fullOrder.vat_percentage
      : typeof (dispatchedOrder as any)?.vat_percentage === "number"
      ? (dispatchedOrder as any).vat_percentage
      : typeof fullOrder?.vat_percentage === "string" &&
        !Number.isNaN(Number(fullOrder.vat_percentage))
      ? Number(fullOrder.vat_percentage)
      : typeof (dispatchedOrder as any)?.vat_percentage === "string" &&
        !Number.isNaN(Number((dispatchedOrder as any).vat_percentage))
      ? Number((dispatchedOrder as any).vat_percentage)
      : undefined;

  const shipment: any = {
    id: dispatchedOrder.dispatch_identifier || "",
    storeId: batchInfo?.channel_uid || channelDetails?.channel_uid || "",
    storeName,
    marketplace,
    carrierType: fullOrder?.carriers || "Standard",
    status: "SUCCESS",
    metadata: {
      serviceCode: "Standard",
    },
    carrier: {
      shipperName: storeName,
      addressLine1:
        (channelDetails as any)?.address || (channelDetails as any)?.address1 || "",
      addressLine2:
        (channelDetails as any)?.address2 ||
        (channelDetails as any)?.address_line_2 ||
        "",
      city: (channelDetails as any)?.city || "",
      postalCode:
        (channelDetails as any)?.postal_code || (channelDetails as any)?.postcode || "",
      countryCode: channelDetails?.country || "",
      metadata: {
        vatId:
          (channelDetails as any)?.vat_id ||
          (channelDetails as any)?.vat_number ||
          (channelDetails as any)?.metadata?.vat_id ||
          (channelDetails as any)?.metadata?.vat_number ||
          (fullOrder as any)?.vat_id ||
          (fullOrder as any)?.vat_number ||
          "",
      },
    },
  };

  return {
    id: String(dispatchedOrder.id || orderId),
    orderIndex: 0,
    marketplaceOrderId: orderId,
    totalItems: items.reduce((sum, it) => sum + it.quantity, 0) || 1,
    totalWeight: 0,
    weightUnit: "G",
    dimensionUnit: "cm",
    currency,
    originalSku: items[0]?.marketplaceSku || "",
    modifiedSku: items[0]?.localSku || "",
    address,
    purchaseDate,
    mergedOrderIds: [],
    shipmentId: dispatchedOrder.dispatch_identifier || "",
    shipment,
    items,
    status: "SUCCESS",
    labelLink: "",
    trackingNumber: "",
    returnTrackingNumber: null,
    carrierLabelId: "",
    carrierReturnLabelId: null,
    failureReasons: null,
    trackingDescription: null,
    trackingDeliveredAt: null,
    trackingStatus: null,
    trackingUploadStatus: "SUCCESS",
    metadata: {
      vatPercentage,
      orderPlacedBy:
        fullOrder?.buyer?.buyerName ||
        fullOrder?.buyer?.buyerCompanyName ||
        deliveryParsed?.companyName ||
        (fullOrder as any)?.channel_buyer_user_id ||
        (fullOrder as any)?.buyer_name ||
        (dispatchedOrder as any)?.recipient_name ||
        "",
      billingAddress: billingParsed,
      paymentReferenceId:
        fullOrder?.paymentExecutionDetail?.[0]?.payment?.paymentMethodDetail ||
        fullOrder?.paymentReferenceId ||
        (fullOrder as any)?.payment_reference_id ||
        "",
    },
    createdAt: purchaseDate,
    updatedAt: purchaseDate,
  };
}

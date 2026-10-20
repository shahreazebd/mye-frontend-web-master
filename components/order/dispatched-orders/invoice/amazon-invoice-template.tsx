import React from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import type { Order } from "@/types/shipments";

import {
  amazonContactDomain,
  amazonEnglishTranslations,
  amazonGermanTranslations,
  amazonInvoiceNumber,
  calculateOrderFinancials,
  formatAmazonDate,
  formatCurrency,
  isGermanOrder,
  sellerCountryLabel,
} from "./invoice-utils";

const styles = StyleSheet.create({
  page: {
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: 28,
    fontSize: 7.5,
    fontFamily: "Helvetica",
    color: "#0f1111",
    position: "relative",
  },
  topBlackBar: {
    height: 11,
    backgroundColor: "#232f3e",
    width: "100%",
    marginBottom: 16,
  },
  contentContainer: {
    paddingHorizontal: 34,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  buyerSummaryContainer: {
    width: "48%",
    marginTop: 86, // Aligns top line with y=684 across from the infoCard divider
  },
  buyerSummaryText: {
    fontSize: 9,
    lineHeight: 1.45,
    textTransform: "uppercase",
    color: "#000000",
  },
  rightBoxContainer: {
    width: "48%",
    alignItems: "flex-end",
  },
  mainTitle: {
    fontSize: 14.25,
    marginBottom: 8,
    textAlign: "right",
    color: "#000000",
  },
  infoCard: {
    width: 236,
    backgroundColor: "#edf8fd",
    borderWidth: 0.75,
    borderColor: "#cce8f5",
    padding: 8,
    borderRadius: 1,
  },
  infoCardTop: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#cce8f5",
    paddingBottom: 5,
    marginBottom: 5,
  },
  infoCardPaid: {
    fontSize: 11.25,
    color: "#000000",
    marginBottom: 4,
  },
  infoCardText: {
    fontSize: 7.5,
    lineHeight: 1.35,
    color: "#0f1111",
  },
  infoCardGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2.5,
  },
  infoCardKey: {
    fontSize: 7.5,
    color: "#0f1111",
    width: "55%",
    lineHeight: 1.25,
  },
  infoCardValue: {
    fontSize: 7.5,
    color: "#0f1111",
    width: "45%",
    textAlign: "right",
  },
  customerServiceLink: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 7.5,
    color: "#0f1111",
  },
  linkBlue: {
    color: "#0066c0",
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#c2c2c2",
    marginVertical: 6,
  },
  columns3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  col3: {
    width: "31%",
  },
  colTitle: {
    fontSize: 9.75,
    marginBottom: 3,
    color: "#000000",
  },
  colText: {
    fontSize: 7.5,
    lineHeight: 1.35,
    color: "#0f1111",
  },
  sectionHeading: {
    fontSize: 9.75,
    marginBottom: 3,
    color: "#000000",
  },
  invoiceDetailsHeading: {
    fontSize: 11.25,
    marginBottom: 4,
    color: "#000000",
  },
  orderInfoRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  orderInfoLabel: {
    width: 120,
    color: "#0f1111",
    fontSize: 7.5,
  },
  orderInfoValue: {
    fontSize: 7.5,
    color: "#0f1111",
  },
  table: {
    width: "100%",
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#c2c2c2",
    alignItems: "flex-end",
  },
  th: {
    fontSize: 7.5,
    color: "#000000",
    lineHeight: 1.2,
  },
  tableRowItem: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "flex-start",
  },
  tableRowShipping: {
    flexDirection: "row",
    paddingVertical: 4,
    alignItems: "center",
  },
  tableBottomDivider: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#d5d9d9",
    marginVertical: 4,
  },
  td: {
    fontSize: 7.5,
    color: "#0f1111",
    lineHeight: 1.3,
  },
  asinText: {
    fontSize: 7.5,
    color: "#767676",
    marginTop: 2,
  },
  grandTotalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    width: "50%",
    marginLeft: "auto",
  },
  grandTotalLabel: {
    fontSize: 11.25,
    color: "#000000",
  },
  grandTotalValue: {
    fontSize: 11.25,
    color: "#000000",
  },
  rightDivider: {
    width: "50%",
    marginLeft: "auto",
    borderBottomWidth: 0.5,
    borderBottomColor: "#d5d9d9",
    marginVertical: 3,
  },
  vatTableContainer: {
    width: "50%",
    marginLeft: "auto",
    marginTop: 2,
  },
  vatTableHeader: {
    flexDirection: "row",
    paddingBottom: 3,
  },
  vatTableRow: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  vatTableTotalRow: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  vatTh: {
    fontSize: 7.5,
    color: "#0f1111",
    lineHeight: 1.2,
  },
  vatTd: {
    fontSize: 7.5,
    color: "#0f1111",
  },
  footerDivider: {
    position: "absolute",
    bottom: 34,
    left: 34,
    right: 34,
    borderBottomWidth: 0.5,
    borderBottomColor: "#c2c2c2",
  },
  footer: {
    position: "absolute",
    bottom: 18,
    right: 34,
    fontSize: 9,
    color: "#565959",
  },
});

function formatCityPostal(city?: string, postal?: string) {
  if (city && postal) return `${city}, ${postal}`;
  return city || postal || "";
}

export function AmazonInvoiceTemplate({
  order,
  customVatRate,
}: Readonly<{
  order: Order;
  customVatRate?: number;
}>) {
  const isGerman = isGermanOrder(order);
  const t = isGerman ? amazonGermanTranslations : amazonEnglishTranslations;
  const currency = order?.currency || "EUR";

  const { items, vatRate, totalGross, totalNet, totalVat } = calculateOrderFinancials(
    order,
    customVatRate
  );

  const formattedOrderDate = formatAmazonDate(order?.purchaseDate);
  const formattedInvoiceDate = formatAmazonDate(order?.createdAt || order?.purchaseDate);

  const invoiceNumber = amazonInvoiceNumber(order);

  const contactUrl = `www.${amazonContactDomain(order)}/contact-us`;
  const contactPrefix = t
    .contactCustomerService(amazonContactDomain(order))
    .replace(contactUrl, "");

  const paymentRef =
    (order.metadata as any)?.paymentReferenceId ||
    order.trackingNumber ||
    order.carrierLabelId ||
    (order.id ? `3mKAv${order.id.slice(0, 10)}` : "3mKAvTZwAuhMckkuMFl2");

  const vatId =
    order.shipment?.carrier?.metadata &&
    typeof order.shipment.carrier.metadata === "object" &&
    (order.shipment.carrier.metadata as any).vatId
      ? (order.shipment.carrier.metadata as any).vatId
      : "";

  const sellerName =
    order.shipment?.carrier?.shipperName || order.shipment?.storeName || "Amazon Seller";
  const sellerAddress1 = order.shipment?.carrier?.addressLine1 ?? "";
  const sellerAddress2 = (order.shipment?.carrier as any)?.addressLine2 ?? "";
  const sellerCity = order.shipment?.carrier?.city ?? "";
  const sellerPostal = order.shipment?.carrier?.postalCode ?? "";
  const sellerCountry = sellerCountryLabel(
    order.shipment?.carrier?.countryCode,
    isGerman,
    isGerman ? "Deutschland" : "GB"
  );

  const billingAddr = (order.metadata as any)?.billingAddress;

  const billingName =
    billingAddr?.buyerName || billingAddr?.name || order?.address?.buyerName || "-";
  const billingAddress1 =
    billingAddr?.addressLine1 || order?.address?.addressLine1 || "-";
  const billingAddress2 = billingAddr?.addressLine2 || order?.address?.addressLine2 || "";
  const billingCity = billingAddr?.city || order?.address?.city || "-";
  const billingPostal =
    billingAddr?.postCode || billingAddr?.postalCode || order?.address?.postCode || "-";
  const billingCountry = isGerman
    ? "Deutschland"
    : (billingAddr?.countryCode || order?.address?.countryCode || "GB").toUpperCase();

  const deliveryName = order?.address?.buyerName || "-";
  const deliveryAddress1 = order?.address?.addressLine1 || "-";
  const deliveryAddress2 = order?.address?.addressLine2 || "";
  const deliveryCity = order?.address?.city || "-";
  const deliveryPostal = order?.address?.postCode || "-";
  const deliveryCountry = isGerman
    ? "Deutschland"
    : (order?.address?.countryCode || "GB").toUpperCase();

  const orderPlacedBy =
    (order.metadata as any)?.orderPlacedBy || order?.address?.buyerName || "-";

  return (
    <Document title={`Amazon-Invoice-${order.marketplaceOrderId || order.id}`}>
      <Page size="A4" style={styles.page}>
        {/* Top Dark Bar */}
        <View style={styles.topBlackBar} />

        <View style={styles.contentContainer}>
          {/* Top Header Row */}
          <View style={styles.headerRow}>
            {/* Top Left Buyer Preview */}
            <View style={styles.buyerSummaryContainer}>
              <Text style={styles.buyerSummaryText}>{billingName}</Text>
              <Text style={styles.buyerSummaryText}>{billingAddress1}</Text>
              {billingAddress2 ? (
                <Text style={styles.buyerSummaryText}>{billingAddress2}</Text>
              ) : null}
              <Text style={styles.buyerSummaryText}>
                {formatCityPostal(billingCity, billingPostal)}
              </Text>
              <Text style={styles.buyerSummaryText}>{billingCountry}</Text>
            </View>

            {/* Top Right Card */}
            <View style={styles.rightBoxContainer}>
              <Text style={styles.mainTitle}>{t.title}</Text>
              <View style={styles.infoCard}>
                <Text style={styles.infoCardPaid}>{t.paid}</Text>
                <View style={styles.infoCardTop}>
                  <Text style={styles.infoCardText}>
                    {t.paymentReference} {paymentRef}
                  </Text>
                  <Text style={styles.infoCardText}>
                    {t.soldBy} {sellerName}
                  </Text>
                  {vatId ? (
                    <Text style={styles.infoCardText}>
                      {t.vatId} {vatId}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.infoCardGrid}>
                  <Text style={styles.infoCardKey}>{t.invoiceAndDeliveryDate}</Text>
                  <Text style={styles.infoCardValue}>{formattedInvoiceDate}</Text>
                </View>
                <View style={styles.infoCardGrid}>
                  <Text style={styles.infoCardKey}>{t.invoiceNumber}</Text>
                  <Text style={styles.infoCardValue}>{invoiceNumber}</Text>
                </View>
                <View style={styles.infoCardGrid}>
                  <Text style={styles.infoCardKey}>{t.amountDue}</Text>
                  <Text style={styles.infoCardValue}>
                    {formatCurrency(totalGross, currency, isGerman, "auto")}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Customer Service Notice */}
          <Text style={styles.customerServiceLink}>
            {contactPrefix}
            <Text style={styles.linkBlue}>{contactUrl}</Text>
          </Text>

          <View style={styles.divider} />

          {/* 3 Columns: Billing address, Delivery address, Sold by */}
          <View style={styles.columns3}>
            <View style={styles.col3}>
              <Text style={styles.colTitle}>{t.billingAddress}</Text>
              <Text style={styles.colText}>{billingName}</Text>
              <Text style={styles.colText}>{billingAddress1}</Text>
              {billingAddress2 ? (
                <Text style={styles.colText}>{billingAddress2}</Text>
              ) : null}
              <Text style={styles.colText}>
                {formatCityPostal(billingCity, billingPostal)}
              </Text>
              <Text style={styles.colText}>{billingCountry}</Text>
            </View>

            <View style={styles.col3}>
              <Text style={styles.colTitle}>{t.shippingAddress}</Text>
              <Text style={styles.colText}>{deliveryName}</Text>
              <Text style={styles.colText}>{deliveryAddress1}</Text>
              {deliveryAddress2 ? (
                <Text style={styles.colText}>{deliveryAddress2}</Text>
              ) : null}
              <Text style={styles.colText}>
                {formatCityPostal(deliveryCity, deliveryPostal)}
              </Text>
              <Text style={styles.colText}>{deliveryCountry}</Text>
            </View>

            <View style={styles.col3}>
              <Text style={styles.colTitle}>{t.soldBy}</Text>
              <Text style={styles.colText}>{sellerName}</Text>
              {sellerAddress1 ? (
                <Text style={styles.colText}>{sellerAddress1}</Text>
              ) : null}
              {sellerAddress2 ? (
                <Text style={styles.colText}>{sellerAddress2}</Text>
              ) : null}
              {sellerCity || sellerPostal ? (
                <Text style={styles.colText}>
                  {formatCityPostal(sellerCity, sellerPostal)}
                </Text>
              ) : null}
              <Text style={styles.colText}>{sellerCountry}</Text>
              {vatId ? (
                <Text style={styles.colText}>
                  {t.vatId} {vatId}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Order information */}
          <Text style={styles.sectionHeading}>{t.orderInfo}</Text>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>{t.orderDate}</Text>
            <Text style={styles.orderInfoValue}>{formattedOrderDate}</Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>{t.orderId}</Text>
            <Text style={styles.orderInfoValue}>
              {order.marketplaceOrderId || order.id}
            </Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>{t.orderPlacedBy}</Text>
            <Text style={styles.orderInfoValue}>{orderPlacedBy}</Text>
          </View>

          <View style={styles.divider} />

          {/* Invoice details */}
          <Text style={styles.invoiceDetailsHeading}>{t.invoiceDetails}</Text>

          <View style={styles.table}>
            {/* 5 Column Header matching Amazon exactly */}
            <View style={styles.tableHeader}>
              <Text style={[styles.th, { width: "48%", textAlign: "left" }]}>
                {t.itemDescription}
              </Text>
              <Text style={[styles.th, { width: "10%", textAlign: "center" }]}>
                {t.quantity}
              </Text>
              <Text style={[styles.th, { width: "14%", textAlign: "right" }]}>
                {t.unitPriceExclTax}
              </Text>
              <Text style={[styles.th, { width: "14%", textAlign: "right" }]}>
                {t.taxRate}
              </Text>
              <Text style={[styles.th, { width: "14%", textAlign: "right" }]}>
                {t.subtotalInclTax}
              </Text>
            </View>

            {/* Line Items */}
            {items.map((item, idx) => (
              <View key={idx} style={styles.tableRowItem}>
                <View style={{ width: "48%" }}>
                  <Text style={styles.td}>{item.name}</Text>
                  {item.marketplaceSku || item.localSku ? (
                    <Text style={styles.asinText}>
                      ASIN: {item.marketplaceSku || item.localSku}
                    </Text>
                  ) : null}
                </View>
                <Text style={[styles.td, { width: "10%", textAlign: "center" }]}>
                  {item.qty}
                </Text>
                <Text style={[styles.td, { width: "14%", textAlign: "right" }]}>
                  {formatCurrency(item.unitPriceNet, currency, isGerman, "auto")}
                </Text>
                <Text style={[styles.td, { width: "14%", textAlign: "right" }]}>
                  {item.vatRate}%
                </Text>
                <Text style={[styles.td, { width: "14%", textAlign: "right" }]}>
                  {formatCurrency(item.itemTotalGross, currency, isGerman, "auto")}
                </Text>
              </View>
            ))}

            {/* Shipping Charges Row */}
            <View style={styles.tableRowShipping}>
              <Text style={[styles.td, { width: "48%", textAlign: "left" }]}>
                {t.shippingCosts}
              </Text>
              <Text style={[styles.td, { width: "10%", textAlign: "center" }]}> </Text>
              <Text style={[styles.td, { width: "14%", textAlign: "right" }]}>
                {formatCurrency(0, currency, isGerman, "auto")}
              </Text>
              <Text style={[styles.td, { width: "14%", textAlign: "right" }]}> </Text>
              <Text style={[styles.td, { width: "14%", textAlign: "right" }]}>
                {formatCurrency(0, currency, isGerman, "auto")}
              </Text>
            </View>
          </View>

          <View style={styles.tableBottomDivider} />

          {/* Invoice Total */}
          <View style={styles.grandTotalSection}>
            <Text style={styles.grandTotalLabel}>{t.totalPrice}</Text>
            <Text style={styles.grandTotalValue}>
              {formatCurrency(totalGross, currency, isGerman, "auto")}
            </Text>
          </View>

          <View style={styles.rightDivider} />

          {/* VAT Breakdown Table */}
          <View style={styles.vatTableContainer}>
            <View style={styles.vatTableHeader}>
              <Text style={[styles.vatTh, { width: "28%", textAlign: "left" }]}>
                {t.taxRate}
              </Text>
              <Text style={[styles.vatTh, { width: "36%", textAlign: "right" }]}>
                {t.subtotalExclTax}
              </Text>
              <Text style={[styles.vatTh, { width: "36%", textAlign: "right" }]}>
                {t.tax}
              </Text>
            </View>

            <View style={styles.vatTableRow}>
              <Text style={[styles.vatTd, { width: "28%", textAlign: "left" }]}>
                {vatRate}%
              </Text>
              <Text style={[styles.vatTd, { width: "36%", textAlign: "right" }]}>
                {formatCurrency(totalNet, currency, isGerman, "auto")}
              </Text>
              <Text style={[styles.vatTd, { width: "36%", textAlign: "right" }]}>
                {formatCurrency(totalVat, currency, isGerman, "auto")}
              </Text>
            </View>

            <View style={styles.vatTableTotalRow}>
              <Text style={[styles.vatTd, { width: "28%", textAlign: "left" }]}>
                {t.totalTax}
              </Text>
              <Text style={[styles.vatTd, { width: "36%", textAlign: "right" }]}>
                {formatCurrency(totalNet, currency, isGerman, "auto")}
              </Text>
              <Text style={[styles.vatTd, { width: "36%", textAlign: "right" }]}>
                {formatCurrency(totalVat, currency, isGerman, "auto")}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerDivider} />
        <Text style={styles.footer}>{t.pageNumber(1, 1)}</Text>
      </Page>
    </Document>
  );
}

const carrierData = [
  {
    id: 1,
    name: "Evri",
    type: "EVRI",
    logo: "/logos/carriers/evri.svg",
    description: "Connect Evri to generate shipping labels and manage parcel deliveries.",
    href: "/integrations/carriers/evri",
  },
  {
    id: 2,
    name: "Click and drop",
    type: "CLICK_AND_DROP",
    logo: "/logos/carriers/clickanddrop.svg",
    description: "Click and drop is an open-source e-commerce plugin for WordPress.",
    href: "/integrations/carriers/clickanddrop",
  },
  {
    id: 3,
    name: "FEDEX",
    type: "FEDEX",
    logo: "/logos/carriers/fedex.svg",
    description: "Fedex is a German multi national e-commerce company.",
    href: "/integrations/carriers/fedex",
  },
  {
    id: 4,
    name: "AMAZON",
    type: "AMAZON",
    logo: "/logos/marketplaces/amazon.svg",
    description: "Amazon an multi vendor ecommerce",
    href: "/integrations/carriers/amazon",
  },
  {
    id: 5,
    name: "DHL",
    type: "DHL",
    logo: "/logos/carriers/dhl.svg",
    description: "DHL an American multi national technology company",
    href: "/integrations/carriers/dhl",
  },
  {
    id: 6,
    name: "DPD",
    type: "DPD",
    logo: "/logos/carriers/dpd.svg",
    description: "DPD is a Canadian multi national e-commerce company.",
    href: "/integrations/carriers/dpd",
  },
];

const serviceTypes = [
  { label: "Priority Overnight", value: "PRIORITY_OVERNIGHT" },
  { label: "FedEx First", value: "FEDEX_FIRST" },
  { label: "FedEx Priority Express", value: "FEDEX_PRIORITY_EXPRESS" },
  { label: "FedEx Priority", value: "FEDEX_PRIORITY" },
  { label: "FedEx Priority Express Freight", value: "FEDEX_PRIORITY_EXPRESS_FREIGHT" },
  { label: "FedEx Priority Freight", value: "FEDEX_PRIORITY_FREIGHT" },
  { label: "FedEx Economy (Only U.K.)", value: "FEDEX_ECONOMY_SELECT" },
];

const packageTypes = [
  {
    label: "FedEx® Letters ( 1 lbs/0.5 KG )",
    value: "FEDEX_ENVELOPE",
  },
  {
    label: "FedEx® Box ( 20 lbs/9 KG )",
    value: "FEDEX_BOX",
  },
  {
    label: "FedEx® Small Box ( 20 lbs/9 KG )",
    value: "FEDEX_SMALL_BOX",
  },
  {
    label: "FedEx® Medium Box ( 20 lbs/9 KG )",
    value: "FEDEX_MEDIUM_BOX",
  },
  {
    label: "FedEx® Large Box ( 20 lbs/9 KG )",
    value: "FEDEX_LARGE_BOX",
  },
  {
    label: "FedEx® Extra Large Box ( 20 lbs/9 KG )",
    value: "FEDEX_EXTRA_LARGE_BOX",
  },
  {
    label: "FedEx® 10kg Box ( 22 lbs/10 KG )",
    value: "FEDEX_10KG_BOX",
  },
  {
    label: "FedEx® 25kg Box ( 55 lbs/25 KG )",
    value: "FEDEX_25KG_BOX",
  },
  {
    label: "FedEx® Pak ( 20 lbs/9 KG )",
    value: "FEDEX_PAK",
  },
  {
    label: "FedEx® Tube ( 20 lbs/9 KG )",
    value: "FEDEX_TUBE",
  },
];

const pickupTypes = [
  {
    label: "Indicates FedEx will be contacted to request a pickup.",
    value: "CONTACT_FEDEX_TO_SCHEDULE",
  },
  {
    label: "Indicates Shipment will be dropped off at a FedEx Location.",
    value: "DROPOFF_AT_FEDEX_LOCATION",
  },
  {
    label: "Indicates Shipment will be picked up as part of a regular scheduled pickup.",
    value: "USE_SCHEDULED_PICKUP",
  },
];

export { carrierData, serviceTypes, packageTypes, pickupTypes };
export type Carrier = (typeof carrierData)[number];

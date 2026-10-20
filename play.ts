import { OpenOrder } from "./schema/open-order";
import { processAddress2 } from "./utils/helpers";

export const orders = [
  {
    id: 1058361,
    channel_order_id: "01-14149-82180",
    payment_status: "PAID",
    payment_method: "EBAY",
    purchase_date: "2026-01-22T21:58:28Z",
    currency: "GBP",
    channel_uid: "eQx7wnHNzwRkqCk",
    company_uid: "95002bb0-d182-4b1e-aa80-94080d4befc6",
    total: 7.99,
    dispatch_status: "OPEN_ORDER",
    createdAt: "2026-01-22T22:00:07.406510Z",
    updatedAt: "2026-01-22T22:00:07.406532Z",
    items: [
      {
        remote_sku: "GBS17-M-SWIMM-HP-BLK-L",
        quantity: 1,
        price: 7.99,
        total_amount: 7.99,
        position_item_id: ["10078074160501"],
        mapped: true,
        local_SKU: "M-SWIM-BLK-L-SS17",
        local_product_name: "Men's Swim Shorts",
        remote_product_title:
          "Mens Swimming Shorts Board Swim Shorts Trunks Swimwear Beach Summer Running Gym[Black, L]",
        weight: "170.00",
        height: "2.50",
        width: "25.00",
        depth: "35.00",
        image:
          "https://sgp1.digitaloceanspaces.com/evidentbd/rnt/Mens-swim-trunks-westAce-17.jpg",
      },
    ],
    shipping_address: {
      buyer_name: "Richard Paine ",
      address1: "5 The Oasis",
      address2: "ebayap7q4yc",
      city: "Magherafelt",
      state: "Londonderry",
      post_code: "BT45 6FD",
      country: "GB",
      phone: "07740048090",
      email: "0110a5700cd407391a1b@members.ebay.com",
      reference_id: null,
      createdAt: "2026-01-22T22:00:07.428842Z",
      updatedAt: "2026-01-22T22:00:07.428881Z",
      order_count: null,
      quantity: null,
      total_spend: null,
      first_order_date: null,
    },
    channel: {
      channel_uid: "eQx7wnHNzwRkqCk",
      name: "Rough&Tough eBay",
      channel_type: "ebay",
      country: "United Kingdom",
    },
    order_meta: {
      lineItems: [
        {
          quantity: 1,
          lineItemId: "10078074160501",
        },
      ],
    },
  },
  {
    id: 1058362,
    channel_order_id: "01-14149-82181",
    payment_status: "PAID",
    payment_method: "EBAY",
    purchase_date: "2026-01-22T21:58:28Z",
    currency: "GBP",
    channel_uid: "eQx7wnHNzwRkqCk",
    company_uid: "95002bb0-d182-4b1e-aa80-94080d4befc6",
    total: 7.99,
    dispatch_status: "OPEN_ORDER",
    createdAt: "2026-01-22T22:00:07.406510Z",
    updatedAt: "2026-01-22T22:00:07.406532Z",
    items: [
      {
        remote_sku: "GBS17-M-SWIMM-HP-BLK-L-merged",
        quantity: 1,
        price: 9.99,
        total_amount: 7.99,
        position_item_id: ["10078074160501"],
        mapped: true,
        local_SKU: "M-SWIM-BLK-L-SS17-merged",
        local_product_name: "Men's Swim Shorts merged",
        remote_product_title:
          "Mens Swimming Shorts Board Swim Shorts Trunks Swimwear Beach Summer Running Gym[Black, L] merged",
        weight: "170.00",
        height: "2.50",
        width: "25.00",
        depth: "35.00",
        image:
          "https://sgp1.digitaloceanspaces.com/evidentbd/rnt/Mens-swim-trunks-westAce-17.jpg",
      },
    ],
    shipping_address: {
      buyer_name: "Richard Paine ",
      address1: "5 The Oasis",
      address2: "ebayap7q4yc",
      city: "Magherafelt",
      state: "Londonderry",
      post_code: "BT45 6FD",
      country: "GB",
      phone: "07740048090",
      email: "0110a5700cd407391a1b@members.ebay.com",
      reference_id: null,
      createdAt: "2026-01-22T22:00:07.428842Z",
      updatedAt: "2026-01-22T22:00:07.428881Z",
      order_count: null,
      quantity: null,
      total_spend: null,
      first_order_date: null,
    },
    channel: {
      channel_uid: "eQx7wnHNzwRkqCk",
      name: "Rough&Tough eBay",
      channel_type: "ebay",
      country: "United Kingdom",
    },
    order_meta: {
      lineItems: [
        {
          quantity: 1,
          lineItemId: "10078074160501",
        },
      ],
    },
  },
];

export function mergeDuplicateOrders(arr: OpenOrder[]) {
  const map = new Map<string, OpenOrder>();

  for (const row of arr) {
    const channel = row?.channel?.channel_type;
    const buyer = row?.shipping_address?.buyer_name?.toLowerCase();

    const isRestricted =
      ["otto", "amazon"].includes(channel) || buyer === "pitney bowes warehouse";

    const baseKey = [
      row?.shipping_address?.buyer_name?.toLowerCase(),
      row?.shipping_address?.address1?.toLowerCase(),
      processAddress2(row?.shipping_address?.address2),
    ].join("|");

    const key = isRestricted ? `${baseKey}|${row.channel_order_id}` : baseKey;

    // first order for this key
    if (!map.has(key)) {
      map.set(key, {
        ...row,
        items: row.items.map((item) => ({
          ...item,
          channel_order_id: row.channel_order_id, // ✅ always set
        })),
        merge_order_ids: [],
      });
      continue;
    }

    // merge only happens for NON-restricted
    const existing = map.get(key)!;

    const newItems = row.items.map((item) => ({
      ...item,
      channel_order_id: row.channel_order_id, // ✅ FIXED
    }));

    existing.items.push(...newItems);

    if (
      row.channel_order_id !== existing.channel_order_id &&
      !existing.merge_order_ids.includes(row.channel_order_id)
    ) {
      existing.merge_order_ids.push(row.channel_order_id);
    }
  }

  return Array.from(map.values());
}

const mergedOrders = mergeDuplicateOrders(orders as any);
console.log(JSON.stringify(mergedOrders));

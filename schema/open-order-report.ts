// {
//     "id": 368333,
//     "channel_order_id": "304-1965547-0981938",
//     "payment_status": "Unshipped",
//     "payment_method": "Standard",
//     "purchase_date": "2023-07-16T08:02:19Z",
//     "currency": "EUR",
//     "channel_uid": "7J0ZCwzPnQnoOyu",
//     "company_uid": "375104a9-8bf8-4bee-af94-2f2f739e9016",
//     "total": 17.99,
//     "dispatch_status": "OPEN_ORDER",
//     "createdAt": "2023-07-16T08:36:44.315013Z",
//     "updatedAt": "2023-07-16T08:36:44.315026Z",
//     "items": [
//         {
//             "remote_sku": "BHF-SSA20-SLIM-TR-SCHWARZ-36-30",
//             "quantity": 1,
//             "price": 17.99,
//             "total_amount": 17.99,
//             "mapped": true,
//             "local_SKU": "BHF-SSA20-SLIM-TR-SCHWARZ-36-30",
//             "local_product_name": "BHF-SSA20-SLIM-TR-SCHWARZ-36-30",
//             "remote_product_title": "BlauerHafen Herren Designer Chino Hose Stretch Stoff Chinohose Slim Fit Casual Trousers (36W / 30L, Schwarz)",
//             "weight": "482.00",
//             "height": "35.00",
//             "width": "25.00",
//             "depth": "3.00"
//         }
//     ],
//     "shipping_address": {
//         "buyer_name": " ",
//         "address1": "",
//         "address2": "",
//         "city": "",
//         "state": "",
//         "post_code": "",
//         "country": "",
//         "phone": "",
//         "reference_id": null,
//         "createdAt": "2023-07-16T08:36:44.317114Z",
//         "updatedAt": "2023-07-16T08:36:44.317138Z"
//     },
//     "channel": {
//         "channel_uid": "7J0ZCwzPnQnoOyu",
//         "name": "Blauer Hafen Amazon",
//         "channel_type": "amazon",
//         "country": "Germany"
//     }
// },

import { z } from "zod";

export const openOrderReportSchema = z.object({
  id: z.number(),
  channel_order_id: z.string(),
  payment_status: z.string(),
  payment_method: z.string(),
  purchase_date: z.string(),
  currency: z.string(),
  channel_uid: z.string(),
  company_uid: z.string(),
  total: z.number(),
  dispatch_status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  items: z.array(
    z.object({
      remote_sku: z.string(),
      quantity: z.number(),
      price: z.number(),
      total_amount: z.number(),
      mapped: z.boolean(),
      local_SKU: z.string(),
      local_product_name: z.string(),
      remote_product_title: z.string(),
      weight: z.string(),
      height: z.string(),
      width: z.string(),
      depth: z.string(),
    })
  ),
  shipping_address: z.object({
    buyer_name: z.string(),
    address1: z.string(),
    address2: z.string(),
    city: z.string(),
    state: z.string(),
    post_code: z.string(),
    country: z.string(),
    phone: z.string(),
    reference_id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  channel: z.object({
    channel_uid: z.string(),
    name: z.string(),
    channel_type: z.string(),
    country: z.string(),
  }),
});

export type OpenOrderReport = z.infer<typeof openOrderReportSchema>;

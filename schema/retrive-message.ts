import * as z from "zod";

export const IdSchema = z.object({
  oid: z.string(),
});
export type Id = z.infer<typeof IdSchema>;

// {
//   "Sender": "tanvir_1989",
//   "Subject": "Re: tanvir_1989 sent a message about New Mens Stretch Skinny Slim Fit Flex Jeans Pant Stretchable Denim Trousers #192916282217",
//   "MessageID": "179028230540",
//   "ExternalMessageID": "2895752008012",
//   "Flagged": "false",
//   "Read": "false",
//   "ReceiveDate": "2023-11-28T05:20:25.000Z",
//   "ExpirationDate": "2024-11-27T05:20:25.000Z",
//   "ItemID": "192916282217",
//   "ResponseDetails": {
//     "ResponseEnabled": "true",
//     "ResponseURL": "https://contact.ebay.co.uk/ws/eBayISAPI.dll?M2MContact&item=192916282217&requested=tanvir_1989&qid=2895752008012&redirect=0&messageid=m179028230540"
//   },
//   "MessageType": "ResponseToASQQuestion",
//   "Replied": "false",
//   "ItemEndTime": "2023-12-14T07:42:13.000Z",
//   "ItemTitle": "New Mens Stretch Skinny Slim Fit Flex Jeans Pant Stretchable Denim Trousers"
// }

export const EbayMessageDataSchema = z.object({
  Sender: z.string(),
  Subject: z.string(),
  MessageID: z.string(),
  ExternalMessageID: z.string(),
  Flagged: z.string(),
  Read: z.string(),
  ReceiveDate: z.string(),
  ExpirationDate: z.string(),
  ItemID: z.string(),
  ResponseDetails: z.object({
    ResponseEnabled: z.string(),
    ResponseURL: z.string(),
  }),
  MessageType: z.string(),
  Replied: z.string(),
  ItemEndTime: z.string(),
  ItemTitle: z.string(),
  MessageMedia: z.any(),
  SendToName: z.string(),
});
export type EbayMessageData = z.infer<typeof EbayMessageDataSchema>;

export const AtedAtSchema = z.object({
  date: z.string(),
});
export type AtedAt = z.infer<typeof AtedAtSchema>;

export const WelcomeElementSchema = z.object({
  channel_uid: z.string(),
  created_at: AtedAtSchema,
  ebay_message_data: EbayMessageDataSchema,
  message_id: z.string(),
  mye_priority_status: z.boolean(),
  mye_read_status: z.string(),
  type: z.string(),
  updated_at: AtedAtSchema,
  _id: IdSchema,
});
export type RetriveMessage = z.infer<typeof WelcomeElementSchema>;

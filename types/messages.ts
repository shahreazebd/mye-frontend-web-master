export type MessageMediaType = "IMAGE" | "PDF" | "DOC" | "TXT";

export type MessageMedia = {
  mediaName?: string;
  mediaUrl: string;
  mediaType?: MessageMediaType;
};

export type EbayMessageItem = {
  messageId: string;
  messageBody: string;
  senderUsername: string;
  recipientUsername: string;
  readStatus: boolean;
  createdDate: string;
  subject?: string;
  messageMedia?: MessageMedia[];
};

export type ConversationType = "FROM_MEMBERS" | "FROM_EBAY";

export type ConversationItem = {
  conversationId: string;
  conversationTitle?: string;
  conversationStatus: string;
  conversationType: string;
  createdDate: string;
  referenceId?: string;
  referenceType?: string;
  unreadCount: number;
  latestMessage?: EbayMessageItem;
};

export type ConversationsResponseData = {
  total: number;
  limit: number;
  offset: number;
  next_offset: number | null;
  prev_offset: number | null;
  conversations: ConversationItem[];
};

export type ConversationsApiResponse = {
  success: boolean;
  message: string;
  data: ConversationsResponseData;
};

export type ConversationDetailResponseData = {
  conversation_id: string;
  conversation_type: string;
  conversation_status: string;
  conversation_title?: string;
  total: number;
  limit: number;
  offset: number;
  next_offset: number | null;
  prev_offset: number | null;
  messages: EbayMessageItem[];
};

export type ConversationDetailApiResponse = {
  success: boolean;
  message: string;
  data: ConversationDetailResponseData;
};

export type ConversationStatus = "ACTIVE" | "UNREAD" | "READ" | "ARCHIVED" | "DELETED";

export type GetConversationsParams = {
  channel_uid?: string;
  conversation_type?: ConversationType | (string & {});
  conversation_status?: ConversationStatus | (string & {});
  limit?: number;
  offset?: number;
  start_date?: string;
  end_date?: string;
};

export type GetConversationMessagesParams = {
  conversation_id: string;
  channel_uid?: string;
  conversation_type?: ConversationType | (string & {});
  limit?: number;
  offset?: number;
};

export type SendMessagePayload = {
  channel_uid: string;
  conversation_id: string;
  message_text: string;
  sender_username?: string;
  email_copy_to_sender?: boolean;
  reference_id?: string;
  reference_type?: string;
  message_media?: Required<MessageMedia>[];
};

export type SendMessageApiResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export type UpdateConversationPayload = {
  channel_uid: string;
  conversation_id: string;
  read: boolean;
};

export type UpdateConversationApiResponse = {
  success: boolean;
  message: string;
  data?: {
    message?: string;
  };
};

export type MessageTurn = {
  id: string;
  senderName: string;
  senderRole: "buyer" | "seller" | "system";
  text: string;
  timestamp: string;
  subject?: string;
  recipientUsername?: string;
  mediaUrl?: string;
  mediaList?: MessageMedia[];
  status?: "sent" | "delivered" | "read";
};

export type Conversation = {
  id: string;
  channelId: string;
  channelName: string;
  channelType: "ebay" | "amazon" | "shopify" | (string & {});
  conversationType?: ConversationType | (string & {});
  sender: {
    name: string;
    username: string;
    avatar?: string;
  };
  recipientUsername?: string;
  subject: string;
  lastMessageSnippet: string;
  timestamp: string;
  conversationStatus?: string;
  isUnread: boolean;
  isStarred?: boolean;
  direction: "RECEIVED" | "SENT";
  hasAttachment: boolean;
  replied: boolean;
  item?: {
    id: string;
    title: string;
    sku?: string;
    price: string;
    currency: string;
    imageUrl?: string;
  };
  order?: {
    orderId: string;
    total: string;
    currency: string;
    paymentStatus: string;
    dispatchedAt?: string;
    items: {
      title: string;
      remote_sku?: string;
      price: string;
      quantity: number;
      total_amount: string;
    }[];
    shippingAddress: {
      buyer_name: string;
      address1: string;
      address2?: string;
      city: string;
      state?: string;
      post_code: string;
      country: string;
      phone?: string;
    };
  };
  messages: MessageTurn[];
};

export type OrderItem = {
  remote_sku?: string;
  title?: string;
  price?: string | number;
  quantity?: number;
  total_amount?: string | number;
  image_url?: string;
};

export type ShippingAddress = {
  buyer_name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  post_code?: string;
  country?: string;
  phone?: string;
};

export type OrderInfo = {
  channel_order_id: string;
  tracking_info_id?: string;
  dispatched_at?: string | Date;
  total?: string | number;
  currency?: string;
  payment_status?: string;
  shipping_address?: ShippingAddress;
  items?: OrderItem[];
};

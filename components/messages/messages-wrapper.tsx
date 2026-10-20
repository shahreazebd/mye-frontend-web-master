"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";

import {
  Conversation,
  ConversationDetailApiResponse,
  ConversationType,
  ConversationsApiResponse,
  MessageTurn,
  SendMessagePayload,
} from "@/types/messages";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";
import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import useGetChannels from "@/hooks/queries/channel/useGetChannels";
import { useGetInfiniteConversationMessages } from "@/hooks/queries/messages/ebay/use-get-conversation-messages";
import { useGetInfiniteConversations } from "@/hooks/queries/messages/ebay/use-get-conversations";
import { useSendMessage } from "@/hooks/queries/messages/ebay/use-send-message";
import { useUpdateConversation } from "@/hooks/queries/messages/ebay/use-update-conversation";
import { Card } from "@/components/ui/card";

import { ChatConversation } from "./chat-conversation";
import { ChatList } from "./chat-list";
import { EbayMessageView } from "./ebay-message-view";
import { getMessageAvatarSrc } from "./message-avatar-utils";

function stripHtmlToSnippet(text: string, maxLength = 100): string {
  return text
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function MessagesWrapper() {
  const { userInformation } = useAuth();
  const searchParams = useSearchParams();

  // --- URL-persisted state (survives refresh & navigation) ---
  const [selectedChannelId, setSelectedChannelId] = useQueryState(
    "channel",
    parseAsString.withDefault("")
  );
  const [conversationType, setConversationType] = useQueryState(
    "type",
    parseAsStringLiteral(["FROM_MEMBERS", "FROM_EBAY"] as const).withDefault(
      "FROM_MEMBERS"
    )
  );
  const [conversationStatus, setConversationStatus] = useQueryState(
    "status",
    parseAsStringLiteral([
      "ACTIVE",
      "UNREAD",
      "READ",
      "ARCHIVED",
      "DELETED",
    ] as const).withDefault("ACTIVE")
  );

  // --- Local-only state ---
  const [selectedConversationId, setSelectedConversationId] = useState<string>("");
  const [localConversations, setLocalConversations] = useState<Conversation[]>([]);
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const { data: channels } = useGetChannels();

  // Auto-select the first eBay channel when the page is loaded with no channel in the URL.
  // useGetChannelDetails needs an ID to fetch, so we must resolve the ID here first.
  useEffect(() => {
    if (!channels || channels.length === 0 || selectedChannelId) return;
    const firstEbay = channels.find((c) => c.channel_type === "ebay");
    const fallback = firstEbay || channels[0];
    if (fallback) setSelectedChannelId(fallback.channel_uid);
  }, [channels, selectedChannelId, setSelectedChannelId]);

  const effectiveChannelId = selectedChannelId || searchParams.get("channel") || "";

  // Channel details hook provides exact channel info including channel_metadata
  const { data: channelDetails } = useGetChannelDetails(effectiveChannelId);

  // Seller username from channel_metadata
  const sellerUsername = useMemo(() => {
    const rawUsername = channelDetails?.channel_metadata?.username;
    return typeof rawUsername === "string" ? rawUsername.toLowerCase().trim() : "";
  }, [channelDetails?.channel_metadata?.username]);

  const sellerName = channelDetails?.name || userInformation?.name || "You (Seller)";

  const isSellerMatch = useCallback(
    (username?: string | null): boolean => {
      if (!username || !sellerUsername) return false;
      return username.toLowerCase().trim() === sellerUsername;
    },
    [sellerUsername]
  );

  // Mutation for sending replies to member messages
  const { mutate: sendReply, isLoading: isSendingMessage } = useSendMessage();

  // Mutation for updating conversation read/unread status
  const { mutate: updateConversation } = useUpdateConversation();

  // Paginated infinite conversations query
  const {
    data: infiniteConversationsData,
    isLoading: isLoadingConversations,
    isFetching: isFetchingConversations,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch: refetchConversations,
  } = useGetInfiniteConversations({
    channel_uid: selectedChannelId || undefined,
    conversation_type: conversationType,
    conversation_status: conversationStatus,
    limit: 50,
  });

  // Flatten all pages of conversations
  const allConversationsFromPages = useMemo(() => {
    if (
      !infiniteConversationsData?.pages ||
      infiniteConversationsData.pages.length === 0
    ) {
      return [];
    }
    return infiniteConversationsData.pages.flatMap(
      (page: ConversationsApiResponse) => page?.data?.conversations || []
    );
  }, [infiniteConversationsData]);

  const firstPage = infiniteConversationsData?.pages?.[0] as
    | ConversationsApiResponse
    | undefined;
  const totalCount = firstPage?.data?.total ?? allConversationsFromPages.length;

  // Transform API conversations into UI model
  const apiConversations = useMemo<Conversation[]>(() => {
    if (allConversationsFromPages.length === 0) {
      return [];
    }

    return allConversationsFromPages.map((c) => {
      const channelName = channelDetails?.name || "Store";
      const channelType = channelDetails?.channel_type || "ebay";

      const convType = (c.conversationType || conversationType) as ConversationType;
      const isEbay = convType === "FROM_EBAY" || conversationType === "FROM_EBAY";

      const latestMsg = c.latestMessage;
      const senderUsername = latestMsg?.senderUsername || "";
      const recipientUsername = latestMsg?.recipientUsername || "";
      const messageBody = latestMsg?.messageBody || "";
      const createdDate = c.createdDate || latestMsg?.createdDate || "";
      const readStatus = latestMsg?.readStatus ?? c.unreadCount === 0;
      const messageMedia = latestMsg?.messageMedia;

      const isSenderSeller = isSellerMatch(senderUsername);
      const isRecipientSeller = isSellerMatch(recipientUsername);

      let otherUser = senderUsername;
      if (isSenderSeller && recipientUsername) {
        otherUser = recipientUsername;
      } else if (isRecipientSeller && senderUsername) {
        otherUser = senderUsername;
      } else if (isSenderSeller) {
        otherUser = recipientUsername || "Customer";
      }

      const cleanSubject =
        (isEbay ? c.conversationTitle : c.conversationTitle || latestMsg?.subject) ||
        (isEbay ? "eBay Notification" : "Message");

      let plainSnippet = cleanSubject;
      if (!isEbay && messageBody) {
        plainSnippet = stripHtmlToSnippet(messageBody) || cleanSubject;
      }

      return {
        id: c.conversationId,
        channelId: selectedChannelId || channelDetails?.channel_uid || "ebay",
        channelName,
        channelType,
        conversationType: convType,
        conversationStatus: c.conversationStatus || conversationStatus,
        sender: {
          name: isEbay ? "eBay" : otherUser || "User",
          username: isEbay ? "eBay" : otherUser || "user",
          avatar: isEbay
            ? "/images/message/ebay-circle.svg"
            : getMessageAvatarSrc({ displayName: otherUser || "User" }),
        },
        recipientUsername,
        subject: cleanSubject,
        lastMessageSnippet: plainSnippet,
        timestamp: createdDate,
        isUnread: c.unreadCount > 0 || !readStatus,
        direction: isSenderSeller ? "SENT" : "RECEIVED",
        hasAttachment: Boolean(messageMedia?.length),
        replied: isSenderSeller,
        item: c.referenceId
          ? {
              id: c.referenceId,
              title: `Item Listing #${c.referenceId}`,
              price: "",
              currency: "",
            }
          : undefined,
        messages: [],
      };
    });
  }, [
    allConversationsFromPages,
    selectedChannelId,
    channelDetails,
    conversationType,
    conversationStatus,
    isSellerMatch,
  ]);

  // Sync API conversations to local state
  useEffect(() => {
    if (apiConversations.length > 0) {
      setLocalConversations((prev) => {
        const prevMap = new Map(prev.map((c) => [c.id, c]));
        return apiConversations.map((c) => {
          const existing = prevMap.get(c.id);
          if (!existing) return c;
          const isExistingNewer = Boolean(
            existing.timestamp &&
              c.timestamp &&
              new Date(existing.timestamp).getTime() > new Date(c.timestamp).getTime()
          );

          return {
            ...c,
            isUnread: existing.isUnread ?? c.isUnread,
            lastMessageSnippet: isExistingNewer
              ? existing.lastMessageSnippet
              : c.lastMessageSnippet,
            timestamp: isExistingNewer ? existing.timestamp : c.timestamp,
            replied: existing.replied ?? c.replied,
          };
        });
      });

      // Auto-select first conversation if none selected or if previously selected conversation is no longer in list
      setSelectedConversationId((prevId) => {
        const stillExists = apiConversations.some((c) => c.id === prevId);
        return stillExists ? prevId : apiConversations[0]?.id || "";
      });
    } else {
      setLocalConversations([]);
      setSelectedConversationId("");
    }
  }, [apiConversations]);

  // Active conversation's conversation_type
  const activeConversationType = useMemo<ConversationType>(() => {
    const activeLocal = localConversations.find((c) => c.id === selectedConversationId);
    return (
      (activeLocal?.conversationType as ConversationType) ||
      conversationType ||
      "FROM_MEMBERS"
    );
  }, [localConversations, selectedConversationId, conversationType]);

  // Fetch paginated messages for active conversation
  const {
    data: messageDetailInfiniteData,
    isLoading: isLoadingMessages,
    isFetching: isFetchingMessages,
    refetch: refetchMessages,
  } = useGetInfiniteConversationMessages({
    conversation_id: selectedConversationId,
    channel_uid: selectedChannelId || undefined,
    conversation_type: activeConversationType,
    limit: 50,
  });

  // Flatten messages from all pages
  const allMessagesFromPages = useMemo(() => {
    if (
      !messageDetailInfiniteData?.pages ||
      messageDetailInfiniteData.pages.length === 0
    ) {
      return [];
    }
    return messageDetailInfiniteData.pages.flatMap(
      (page: ConversationDetailApiResponse) => page?.data?.messages || []
    );
  }, [messageDetailInfiniteData]);

  // Map messages from API
  const activeConversationMessages = useMemo<MessageTurn[]>(() => {
    if (allMessagesFromPages.length > 0) {
      const sorted = [...allMessagesFromPages].sort((a, b) => {
        const rawA = a as unknown as Record<string, any>;
        const rawB = b as unknown as Record<string, any>;
        const rawDateA = a.createdDate || rawA.created_date;
        const rawDateB = b.createdDate || rawB.created_date;
        const timeA = rawDateA ? new Date(rawDateA).getTime() : 0;
        const timeB = rawDateB ? new Date(rawDateB).getTime() : 0;
        const safeA = Number.isNaN(timeA) ? 0 : timeA;
        const safeB = Number.isNaN(timeB) ? 0 : timeB;
        return safeA - safeB;
      });

      return sorted.map((m) => {
        const rawM = m as unknown as Record<string, any>;
        const sender = m.senderUsername || rawM.sender_username || "";
        const recipient = m.recipientUsername || rawM.recipient_username || "";
        const msgId = m.messageId || rawM.message_id;
        const body = m.messageBody || rawM.message_body || rawM.body || "";
        const created = m.createdDate || rawM.created_date || new Date().toISOString();
        const media = m.messageMedia || rawM.message_media;
        const msgSubject = m.subject || rawM.subject;

        const isSeller = isSellerMatch(sender);

        const messageType = activeConversationType === "FROM_EBAY" ? "eBay" : "Buyer";

        return {
          id: msgId,
          senderName: isSeller ? sellerName : sender || messageType,
          senderRole: isSeller ? "seller" : "buyer",
          text: body,
          timestamp: created,
          subject: msgSubject,
          recipientUsername: recipient,
          mediaList: media?.map((med: any) => ({
            mediaName: med.mediaName || med.media_name,
            mediaUrl: med.mediaUrl || med.media_url,
            mediaType: med.mediaType || med.media_type || "IMAGE",
          })),
          mediaUrl: media?.[0]?.mediaUrl || media?.[0]?.media_url,
          status: "read",
        };
      });
    }

    // Fallback to local conversation messages
    const local = localConversations.find((c) => c.id === selectedConversationId);
    return local?.messages || [];
  }, [
    allMessagesFromPages,
    selectedConversationId,
    localConversations,
    sellerName,
    activeConversationType,
    isSellerMatch,
  ]);

  const detailFirstPage = messageDetailInfiniteData?.pages?.[0] as
    | ConversationDetailApiResponse
    | undefined;

  // Construct active conversation with live messages
  const selectedConversation = useMemo<Conversation | null>(() => {
    const base = localConversations.find((c) => c.id === selectedConversationId);
    if (!base) return null;

    const detailData = detailFirstPage?.data;
    const conversationTitle =
      detailData?.conversation_title ||
      (detailData as any)?.conversationTitle ||
      activeConversationMessages[0]?.subject;

    const convType =
      detailData?.conversation_type || base.conversationType || activeConversationType;

    const recipient =
      activeConversationMessages[0]?.recipientUsername ||
      detailData?.messages?.[0]?.recipientUsername ||
      base.recipientUsername;

    const detailReferenceId =
      (detailData as any)?.reference_id ||
      (detailData as any)?.referenceId ||
      (detailData as any)?.legacy_item_id ||
      (detailData as any)?.itemId;

    // Ensure sender is the buyer for member conversations
    let sender = base.sender;
    if (convType !== "FROM_EBAY") {
      if (!sender?.username || isSellerMatch(sender.username)) {
        const buyerTurn = activeConversationMessages.find(
          (t) => t.senderRole === "buyer" && !isSellerMatch(t.senderName)
        );
        const sellerTurn = activeConversationMessages.find(
          (t) =>
            t.senderRole === "seller" &&
            t.recipientUsername &&
            !isSellerMatch(t.recipientUsername)
        );
        const detectedBuyer = buyerTurn?.senderName || sellerTurn?.recipientUsername;
        if (detectedBuyer) {
          sender = {
            name: detectedBuyer,
            username: detectedBuyer,
          };
        }
      }
    }

    return {
      ...base,
      sender,
      item: detailReferenceId
        ? {
            id: String(detailReferenceId),
            title: base.item?.title || `Item Listing #${detailReferenceId}`,
            price: base.item?.price || "",
            currency: base.item?.currency || "",
          }
        : base.item,
      subject: conversationTitle || base.subject,
      conversationType: convType,
      recipientUsername: recipient,
      messages: activeConversationMessages,
    };
  }, [
    localConversations,
    selectedConversationId,
    activeConversationMessages,
    detailFirstPage,
    activeConversationType,
    isSellerMatch,
  ]);

  // Sync the latest message snippet from activeConversationMessages to localConversations
  useEffect(() => {
    if (!selectedConversationId || activeConversationMessages.length === 0) return;

    // For eBay messages, do not sync HTML body text into lastMessageSnippet; preserve conversation title
    if (activeConversationType === "FROM_EBAY") {
      const bestTitle =
        detailFirstPage?.data?.conversation_title ||
        (detailFirstPage?.data as any)?.conversationTitle ||
        activeConversationMessages[0]?.subject;

      if (bestTitle) {
        setLocalConversations((prev) => {
          let hasChanges = false;
          const updated = prev.map((c) => {
            if (
              c.id === selectedConversationId &&
              (c.subject !== bestTitle || c.lastMessageSnippet !== bestTitle)
            ) {
              hasChanges = true;
              return {
                ...c,
                subject: bestTitle,
                lastMessageSnippet: bestTitle,
              };
            }
            return c;
          });
          return hasChanges ? updated : prev;
        });
      }
      return;
    }

    const latestTurn = activeConversationMessages.at(-1);
    if (!latestTurn?.text) return;

    const plainSnippet = stripHtmlToSnippet(latestTurn.text);

    // Check if we also have a corrected buyer username
    const buyerTurn = activeConversationMessages.find(
      (t) => t.senderRole === "buyer" && !isSellerMatch(t.senderName)
    );
    const sellerTurn = activeConversationMessages.find(
      (t) =>
        t.senderRole === "seller" &&
        t.recipientUsername &&
        !isSellerMatch(t.recipientUsername)
    );
    const detectedBuyer = buyerTurn?.senderName || sellerTurn?.recipientUsername;

    setLocalConversations((prev) => {
      let hasChanges = false;
      const updated = prev.map((c) => {
        if (c.id === selectedConversationId) {
          const shouldFixSender = detectedBuyer && isSellerMatch(c.sender.username);
          if (
            c.lastMessageSnippet === plainSnippet &&
            c.timestamp === latestTurn.timestamp &&
            !shouldFixSender
          ) {
            return c;
          }
          hasChanges = true;
          return {
            ...c,
            sender: shouldFixSender
              ? {
                  name: detectedBuyer,
                  username: detectedBuyer,
                  avatar: getMessageAvatarSrc({ displayName: detectedBuyer }),
                }
              : c.sender,
            lastMessageSnippet: plainSnippet,
            timestamp: latestTurn.timestamp || c.timestamp,
            replied: latestTurn.senderRole === "seller" ? true : c.replied,
          };
        }
        return c;
      });
      return hasChanges ? updated : prev;
    });
  }, [
    selectedConversationId,
    activeConversationMessages,
    activeConversationType,
    detailFirstPage,
    isSellerMatch,
  ]);

  // Handlers
  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    setMobileShowChat(true);

    const targetConv = localConversations.find((c) => c.id === id);
    if (targetConv?.isUnread) {
      const channelUid =
        targetConv.channelId && targetConv.channelId !== "ebay"
          ? targetConv.channelId
          : selectedChannelId || channelDetails?.channel_uid;

      if (channelUid) {
        updateConversation({
          channel_uid: channelUid,
          conversation_id: id,
          read: true,
        });
      }

      setLocalConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isUnread: false } : c))
      );
    }
  };

  const handleToggleRead = (id: string) => {
    const targetConv = localConversations.find((c) => c.id === id);
    if (!targetConv) return;

    const newRead = targetConv.isUnread; // If unread, mark read (true). If read, mark unread (false).
    const channelUid =
      targetConv.channelId && targetConv.channelId !== "ebay"
        ? targetConv.channelId
        : selectedChannelId || channelDetails?.channel_uid;

    if (channelUid) {
      updateConversation({
        channel_uid: channelUid,
        conversation_id: id,
        read: newRead,
      });
    }

    setLocalConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isUnread: !newRead } : c))
    );
  };

  const handleSendMessage = (
    conversationId: string,
    text: string,
    _emailCopyToSender?: boolean,
    messageMedia?: SendMessagePayload["message_media"]
  ) => {
    const channelUid = selectedChannelId || channelDetails?.channel_uid;
    if (!channelUid) return;

    sendReply({
      channel_uid: channelUid,
      conversation_id: conversationId,
      message_text: text,
      sender_username: sellerUsername || sellerName,
      email_copy_to_sender: false,
      ...(messageMedia && messageMedia.length > 0 && { message_media: messageMedia }),
    });
  };

  const isRefreshing =
    (isFetchingConversations && !isLoadingConversations) ||
    (isFetchingMessages && !isLoadingMessages);

  const handleRefresh = async () => {
    await Promise.all([
      refetchConversations(),
      selectedConversationId ? refetchMessages() : Promise.resolve(),
    ]);
  };

  return (
    <Card className="relative h-full w-full overflow-hidden rounded-md border bg-card text-card-foreground shadow-sm">
      <div className="flex h-full w-full divide-x">
        {/* Left Sidebar: Chat List */}
        <div
          className={cn(
            "flex h-full w-full min-w-0 shrink-0 flex-col bg-card md:w-80 lg:w-96",
            mobileShowChat ? "hidden md:flex" : "flex"
          )}
        >
          <ChatList
            selectedChannelId={selectedChannelId}
            onSelectChannel={setSelectedChannelId}
            conversationType={conversationType}
            onSelectConversationType={setConversationType}
            conversationStatus={conversationStatus}
            onSelectConversationStatus={setConversationStatus}
            conversations={localConversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
            onToggleRead={handleToggleRead}
            isLoading={isLoadingConversations}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
            totalCount={totalCount}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={() => fetchNextPage()}
          />
        </div>

        {/* Right Area: Conversation / eBay Message View */}
        <div
          className={cn(
            "flex h-full min-w-0 flex-1 flex-col bg-background",
            !mobileShowChat && !selectedConversationId ? "hidden md:flex" : "flex"
          )}
        >
          {selectedConversation?.conversationType === "FROM_EBAY" ||
          conversationType === "FROM_EBAY" ? (
            <EbayMessageView
              conversation={selectedConversation}
              isLoading={isLoadingMessages}
              isRefreshing={isRefreshing}
              onRefresh={handleRefresh}
              onBackMobile={() => setMobileShowChat(false)}
            />
          ) : (
            <ChatConversation
              conversation={selectedConversation}
              isLoading={isLoadingMessages}
              isRefreshing={isRefreshing}
              onRefresh={handleRefresh}
              isSending={isSendingMessage}
              onBackMobile={() => setMobileShowChat(false)}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </div>
    </Card>
  );
}

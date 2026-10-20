"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ArrowLeft,
  CheckCheck,
  FileText,
  Loader2,
  Mail,
  MailOpen,
  MessageSquare,
  Package,
  Paperclip,
  RotateCw,
  Send,
  UploadCloud,
  X,
} from "lucide-react";

import {
  Conversation,
  MessageMedia,
  MessageTurn,
  SendMessagePayload,
} from "@/types/messages";
import { cn } from "@/lib/utils";
import {
  UploadedMessageMedia,
  useUploadMessageMedia,
} from "@/hooks/queries/messages/ebay/use-upload-message-media";
import { useGetOrdersByFilter } from "@/hooks/queries/order/use-get-orders-by-filter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Marker, MarkerContent } from "@/components/ui/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

import { getMessageAvatarSrc, getMessageInitials } from "./message-avatar-utils";
import { ImageViewerItem, MessageImageViewer } from "./message-image-viewer";
import { MessageMediaGrid, isImageMedia } from "./message-media-grid";
import { OrderDetailsDrawer } from "./order-details-drawer";

dayjs.extend(relativeTime);

function getMediaItems(turn: MessageTurn): MessageMedia[] {
  if (turn.mediaList && turn.mediaList.length > 0) {
    return turn.mediaList;
  }
  if (turn.mediaUrl) {
    return [
      {
        mediaUrl: turn.mediaUrl,
        mediaName: "Attachment",
        mediaType: "IMAGE",
      },
    ];
  }
  return [];
}

function resolveBuyerUsername(conversation: Conversation | null): string | undefined {
  if (conversation?.conversationType === "FROM_EBAY") return undefined;
  const directBuyer = conversation?.sender?.username;
  if (directBuyer && directBuyer.toLowerCase() !== "seller") {
    return directBuyer;
  }
  const buyerTurn = conversation?.messages?.find((t) => t.senderRole === "buyer");
  if (buyerTurn?.senderName) return buyerTurn.senderName;
  const sellerTurn = conversation?.messages?.find(
    (t) => t.senderRole === "seller" && t.recipientUsername
  );
  return sellerTurn?.recipientUsername || directBuyer;
}

function extractConversationImages(messages?: MessageTurn[]): ImageViewerItem[] {
  if (!messages) return [];
  const list: ImageViewerItem[] = [];
  for (const t of messages) {
    const items = getMediaItems(t);
    for (const m of items) {
      if (isImageMedia(m)) {
        list.push({
          url: m.mediaUrl,
          name:
            m.mediaName ||
            (t.senderRole === "seller" ? "Seller attachment" : "Buyer attachment"),
          type: m.mediaType,
        });
      }
    }
  }
  return list;
}

function extractFilesFromClipboard(items: DataTransferItem[]): File[] {
  const files: File[] = [];
  for (const item of items) {
    if (item.kind === "file") {
      const file = item.getAsFile();
      if (file) files.push(file);
    }
  }
  return files;
}

function ConversationEmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-muted-foreground">
      <div className="bg-muted/60 rounded-full p-4">
        <MessageSquare className="size-8 stroke-[1.5]" />
      </div>
      <div>
        <p className="text-base font-semibold text-foreground">
          No conversation selected
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Choose a message from the left sidebar to start reading and replying
        </p>
      </div>
    </div>
  );
}

interface ConversationHeaderSubtitleProps {
  conversation: Conversation;
  isFromMembers: boolean;
  isFetchingOrders: boolean;
  hasOrderDetails: boolean;
  resolvedOrderId?: string;
  resolvedTotal?: string;
  resolvedCurrency?: string;
  resolvedStatus?: string;
  apiOrdersCount: number;
  onOpenDrawer: () => void;
}

function ConversationHeaderSubtitle({
  conversation,
  isFromMembers,
  isFetchingOrders,
  hasOrderDetails,
  resolvedOrderId,
  resolvedTotal,
  resolvedCurrency,
  resolvedStatus,
  apiOrdersCount,
  onOpenDrawer,
}: Readonly<ConversationHeaderSubtitleProps>) {
  if (!isFromMembers) {
    return (
      <p className="text-foreground/75 truncate text-xs font-normal">
        {conversation.subject}
      </p>
    );
  }

  if (isFetchingOrders) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 className="size-3 animate-spin text-muted-foreground" />
        <span>Loading order details...</span>
      </div>
    );
  }

  if (hasOrderDetails) {
    return (
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <button
          type="button"
          onClick={onOpenDrawer}
          className="group inline-flex cursor-pointer items-center gap-1.5 font-medium text-foreground transition-colors hover:text-primary"
          title="Click to view order details"
        >
          <Package className="size-3 text-muted-foreground transition-colors group-hover:text-primary" />
          <span className="text-muted-foreground">Order ID:</span>
          <span className="font-mono text-xs font-medium text-primary underline-offset-4 group-hover:underline">
            #{resolvedOrderId}
          </span>
        </button>

        {resolvedTotal && (
          <>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-muted-foreground">
              Total:{" "}
              <span className="font-medium text-foreground">
                {resolvedTotal} {resolvedCurrency}
              </span>
            </span>
          </>
        )}

        {resolvedStatus && (
          <>
            <span className="text-muted-foreground/40">•</span>
            <Badge className="h-5">{resolvedStatus}</Badge>
          </>
        )}

        {apiOrdersCount > 1 && (
          <button
            type="button"
            onClick={onOpenDrawer}
            className="cursor-pointer text-[11px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            title="View all matching orders"
          >
            (+{apiOrdersCount - 1} more)
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span>No order details found</span>
      {conversation.item?.id && (
        <>
          <span className="text-muted-foreground/40">•</span>
          <span className="font-mono text-[11px]">Item #{conversation.item.id}</span>
        </>
      )}
    </div>
  );
}

interface ChatMessageTurnItemProps {
  turn: MessageTurn;
  displayName: string;
  avatarSrc?: string;
  initials: string;
  isEbayOfficial: boolean;
  allConversationImages: ImageViewerItem[];
  onOpenImageViewer: (images: ImageViewerItem[], startIndex?: number) => void;
}

function ChatMessageTurnItem({
  turn,
  displayName,
  avatarSrc,
  initials,
  isEbayOfficial,
  allConversationImages,
  onOpenImageViewer,
}: Readonly<ChatMessageTurnItemProps>) {
  const isSeller = turn.senderRole === "seller";
  const mediaItems = getMediaItems(turn);
  const turnSenderName = turn.senderName || displayName;
  const turnAvatarSrc =
    turnSenderName === displayName
      ? avatarSrc
      : getMessageAvatarSrc({
          displayName: turnSenderName,
          isEbay: isEbayOfficial,
        });
  const turnInitials = getMessageInitials(turnSenderName);

  const handleOpenViewer = useCallback(
    (clickedIdx: number) => {
      const imageItemsInTurn = mediaItems.filter(isImageMedia);
      const targetImage = imageItemsInTurn[clickedIdx];
      if (!targetImage) return;

      const globalIdx = allConversationImages.findIndex(
        (img) => img.url === targetImage.mediaUrl
      );

      if (globalIdx !== -1 && allConversationImages.length > 0) {
        onOpenImageViewer(allConversationImages, globalIdx);
      } else {
        const fallbackList = imageItemsInTurn.map((m) => ({
          url: m.mediaUrl,
          name: m.mediaName,
          type: m.mediaType,
        }));
        onOpenImageViewer(fallbackList, clickedIdx);
      }
    },
    [mediaItems, allConversationImages, onOpenImageViewer]
  );

  return (
    <MessageScrollerItem messageId={turn.id}>
      <Message align={isSeller ? "end" : "start"} className="gap-2.5">
        {!isSeller && (
          <MessageAvatar className="self-start">
            <Avatar className="size-8">
              <AvatarImage src={turnAvatarSrc} alt={turnSenderName} />
              <AvatarFallback className="text-xs font-semibold">
                {turnInitials || initials}
              </AvatarFallback>
            </Avatar>
          </MessageAvatar>
        )}

        <MessageContent
          className={cn("max-w-[80%]", isSeller ? "ml-auto items-end" : "items-start")}
        >
          <MessageHeader className="gap-2 px-1 text-xs">
            {isSeller ? (
              <>
                <span className="text-[11px] text-muted-foreground">
                  {dayjs(turn.timestamp).format("h:mm A")}
                </span>
                <span className="font-semibold text-foreground">
                  {turn.senderName || "You (Seller)"}
                </span>
              </>
            ) : (
              <>
                <span className="font-semibold text-foreground">
                  {turn.senderName || displayName}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {dayjs(turn.timestamp).format("h:mm A")}
                </span>
              </>
            )}
          </MessageHeader>

          {/* Text message bubble (rendered only if text exists) */}
          {turn.text && turn.text.trim() && (
            <Bubble
              variant={isSeller ? "default" : "muted"}
              align={isSeller ? "end" : "start"}
              className="shadow-xs"
            >
              <BubbleContent>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{turn.text}</p>
              </BubbleContent>
            </Bubble>
          )}

          {/* Modern Media Attachments Gallery / Lightbox trigger */}
          {mediaItems.length > 0 && (
            <MessageMediaGrid
              mediaItems={mediaItems}
              isSeller={isSeller}
              onOpenViewer={handleOpenViewer}
            />
          )}

          <MessageFooter className="gap-1 px-1 text-[11px]">
            {isSeller ? (
              <>
                <span className="flex items-center gap-0.5 font-medium text-primary">
                  <CheckCheck className="size-3" /> Sent
                </span>
                <span>• {dayjs(turn.timestamp).fromNow()}</span>
              </>
            ) : (
              <span>{dayjs(turn.timestamp).fromNow()}</span>
            )}
          </MessageFooter>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  );
}

interface ComposerMediaAttachmentsProps {
  attachedMedia: UploadedMessageMedia[];
  pendingUploads: { id: string; name: string; previewUrl?: string }[];
  onOpenViewer: (images: ImageViewerItem[], startIndex: number) => void;
  onRemoveMedia: (mediaUrl: string) => void;
}

function ComposerMediaAttachments({
  attachedMedia,
  pendingUploads,
  onOpenViewer,
  onRemoveMedia,
}: Readonly<ComposerMediaAttachmentsProps>) {
  if (attachedMedia.length === 0 && pendingUploads.length === 0) {
    return null;
  }

  return (
    <div className="mb-2.5 flex flex-wrap gap-2 duration-150 animate-in fade-in">
      {/* Successfully uploaded media */}
      {attachedMedia.map((media, idx) => {
        const isImage = isImageMedia(media);
        return (
          <div
            key={media.mediaUrl}
            className="group/chip border-border/70 bg-background/80 shadow-xs hover:border-primary/40 relative flex items-center gap-2 rounded-xl border p-1.5 pr-2.5 text-xs transition-all hover:shadow-sm"
          >
            {isImage ? (
              <button
                type="button"
                onClick={() => {
                  const imageList = attachedMedia.filter(isImageMedia).map((m) => ({
                    url: m.mediaUrl,
                    name: m.mediaName,
                    type: m.mediaType,
                  }));
                  const targetIdx = imageList.findIndex((m) => m.url === media.mediaUrl);
                  onOpenViewer(imageList, Math.max(0, targetIdx));
                }}
                className="group/thumb relative size-10 shrink-0 cursor-zoom-in overflow-hidden rounded-lg bg-muted"
                title="Preview image"
              >
                <img
                  src={media.mediaUrl}
                  alt={media.mediaName}
                  className="size-full object-cover transition-transform group-hover/thumb:scale-110"
                />
              </button>
            ) : (
              <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg text-primary">
                <FileText className="size-5" />
              </div>
            )}
            <div className="flex min-w-0 flex-col">
              <span className="max-w-[140px] truncate font-medium leading-tight text-foreground">
                {media.mediaName}
              </span>
              <span className="text-[10px] font-semibold uppercase text-muted-foreground">
                {media.mediaType || "IMAGE"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onRemoveMedia(media.mediaUrl)}
              className="hover:bg-destructive/10 ml-1 rounded-full p-1 text-muted-foreground transition-colors hover:text-destructive"
              aria-label={`Remove ${media.mediaName}`}
              title="Remove attachment"
            >
              <X className="size-3.5" />
            </button>
          </div>
        );
      })}

      {/* Optimistic pending uploads */}
      {pendingUploads.map((pending) => (
        <div
          key={pending.id}
          className="border-primary/40 bg-primary/5 flex animate-pulse items-center gap-2 rounded-xl border border-dashed p-1.5 pr-2.5 text-xs"
        >
          {pending.previewUrl ? (
            <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-muted">
              <img
                src={pending.previewUrl}
                alt={pending.name}
                className="size-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Loader2 className="size-4 animate-spin text-white" />
              </div>
            </div>
          ) : (
            <div className="bg-primary/15 flex size-10 shrink-0 items-center justify-center rounded-lg text-primary">
              <Loader2 className="size-4 animate-spin" />
            </div>
          )}
          <div className="flex min-w-0 flex-col">
            <span className="max-w-[130px] truncate font-medium leading-tight text-foreground">
              {pending.name}
            </span>
            <span className="text-[10px] font-medium text-primary">Uploading…</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export type ChatConversationProps = {
  conversation: Conversation | null;
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  isSending?: boolean;
  onBackMobile?: () => void;
  onSendMessage: (
    conversationId: string,
    text: string,
    emailCopyToSender?: boolean,
    messageMedia?: SendMessagePayload["message_media"]
  ) => void;
  onToggleRead?: (id: string) => void;
};

export function ChatConversation({
  conversation,
  isLoading = false,
  isRefreshing = false,
  onRefresh,
  isSending = false,
  onBackMobile,
  onSendMessage,
  onToggleRead,
}: Readonly<ChatConversationProps>) {
  const [inputVal, setInputVal] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [attachedMedia, setAttachedMedia] = useState<UploadedMessageMedia[]>([]);
  const [pendingUploads, setPendingUploads] = useState<
    { id: string; name: string; previewUrl?: string }[]
  >([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Lightbox Image Viewer state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<ImageViewerItem[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutateAsync: uploadMedia, isLoading: isUploading } = useUploadMessageMedia();

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
  }, []);

  // Reset composer when switching conversations
  useEffect(() => {
    if (conversation) {
      setInputVal("");
      setAttachedMedia([]);
      setPendingUploads([]);
    }
  }, [conversation?.id]);

  const openImageViewer = useCallback(
    (images: ImageViewerItem[], startIndex: number = 0) => {
      if (images.length === 0) return;
      setViewerImages(images);
      setViewerIndex(startIndex);
      setViewerOpen(true);
    },
    []
  );

  const handleUploadFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      for (const file of files) {
        const tempId = `${Date.now()}-${Math.random()}`;
        const previewUrl = file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined;

        setPendingUploads((prev) => [
          ...prev,
          { id: tempId, name: file.name, previewUrl },
        ]);

        try {
          const uploaded = await uploadMedia(file);
          setAttachedMedia((prev) => [...prev, uploaded]);
        } catch {
          // error notification already handled in the hook
        } finally {
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }
          setPendingUploads((prev) => prev.filter((p) => p.id !== tempId));
        }
      }
    },
    [uploadMedia]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;
      // Reset input so the same file can be re-selected
      e.target.value = "";
      handleUploadFiles(files);
    },
    [handleUploadFiles]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = Array.from(e.clipboardData?.items || []);
      const files = extractFilesFromClipboard(items);
      if (files.length > 0) {
        e.preventDefault();
        handleUploadFiles(files);
      }
    },
    [handleUploadFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const files = Array.from(e.dataTransfer?.files || []);
    if (files.length > 0) {
      handleUploadFiles(files);
    }
  };

  const handleRemoveMedia = useCallback((mediaUrl: string) => {
    setAttachedMedia((prev) => prev.filter((m) => m.mediaUrl !== mediaUrl));
  }, []);

  // Keep view pinned to bottom on conversation load or when messages change
  useEffect(() => {
    scrollToBottom("auto");
  }, [conversation?.id, conversation?.messages?.length, scrollToBottom]);

  const handleSend = useCallback(
    (e?: React.SubmitEvent) => {
      if (e) e.preventDefault();
      if (!conversation || isSending) return;
      if (!inputVal.trim() && attachedMedia.length === 0) return;

      const mediaPayload =
        attachedMedia.length > 0
          ? attachedMedia.map((m) => ({
              mediaName: m.mediaName,
              mediaType: m.mediaType,
              mediaUrl: m.mediaUrl,
            }))
          : undefined;

      onSendMessage(conversation.id, inputVal.trim(), false, mediaPayload);
      setInputVal("");
      setAttachedMedia([]);

      // Instantly scroll smoothly to the new message at the bottom
      requestAnimationFrame(() => {
        scrollToBottom("smooth");
      });
    },
    [conversation, isSending, inputVal, attachedMedia, onSendMessage, scrollToBottom]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isSending) {
        handleSend();
      }
    }
  };

  const channelUid = conversation?.channelId;
  const buyerUsername = useMemo(() => resolveBuyerUsername(conversation), [conversation]);
  const legacyItemId = conversation?.item?.id;

  // Collect all images in the conversation for smooth lightbox browsing across the entire thread
  const allConversationImages = useMemo<ImageViewerItem[]>(
    () => extractConversationImages(conversation?.messages),
    [conversation?.messages]
  );

  const dateObj = conversation?.timestamp ? dayjs(conversation.timestamp) : dayjs();
  const safeDate = dateObj.isValid() ? dateObj : dayjs();
  const computedDateFrom = safeDate.subtract(3, "months").format("YYYY-MM-DD");
  const computedDateTo = safeDate.format("YYYY-MM-DD");

  const isFromMembers = conversation?.conversationType !== "FROM_EBAY";

  // Query order by filter when it's a member conversation and filter params are present
  const shouldFetchOrder = Boolean(
    conversation && isFromMembers && channelUid && buyerUsername && legacyItemId
  );

  const {
    data: apiOrdersResponse,
    isLoading: isQueryLoadingOrders,
    refetch: refetchOrders,
  } = useGetOrdersByFilter(
    {
      channel_uid: channelUid,
      buyer_username: buyerUsername,
      legacy_item_id: legacyItemId,
      date_from: computedDateFrom,
      date_to: computedDateTo,
    },
    shouldFetchOrder
  );

  // isQueryLoadingOrders is true even when the query is disabled (no legacyItemId).
  // Only treat it as loading when we actually intend to fetch.
  const isFetchingOrders = shouldFetchOrder && isQueryLoadingOrders;

  const apiOrders = useMemo(
    () => apiOrdersResponse?.data ?? [],
    [apiOrdersResponse?.data]
  );
  const primaryApiOrder = apiOrders[0];

  const resolvedOrderId =
    conversation?.order?.orderId ||
    primaryApiOrder?.channel_order_id ||
    (primaryApiOrder?.id ? String(primaryApiOrder.id) : undefined);

  const resolvedTotal = conversation?.order?.total || primaryApiOrder?.total;
  const resolvedCurrency =
    conversation?.order?.currency || primaryApiOrder?.currency || "";
  const resolvedStatus =
    primaryApiOrder?.dispatch_status ||
    conversation?.order?.paymentStatus ||
    primaryApiOrder?.payment_status;

  const hasOrderDetails = Boolean(resolvedOrderId);

  const handleRefresh = useCallback(() => {
    if (shouldFetchOrder) {
      refetchOrders();
    }
    onRefresh?.();
  }, [shouldFetchOrder, refetchOrders, onRefresh]);

  if (!conversation) {
    return <ConversationEmptyState />;
  }

  const displayName =
    conversation.sender.name || conversation.sender.username || "Customer";
  const isEbayOfficial = conversation.conversationType === "FROM_EBAY";
  const avatarSrc = getMessageAvatarSrc({
    avatar: conversation.sender.avatar,
    displayName,
    isEbay: isEbayOfficial,
  });
  const initials = getMessageInitials(displayName);
  const isEbay = conversation.channelType === "ebay";

  return (
    <div className="relative flex h-full flex-col bg-background">
      {/* Top Header */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b bg-card px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          {onBackMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackMobile}
              className="size-8 shrink-0 md:hidden"
            >
              <ArrowLeft className="size-4" />
              <span className="sr-only">Back to conversations</span>
            </Button>
          )}

          <Avatar className="size-9 shrink-0">
            <AvatarImage src={avatarSrc} alt={displayName} />
            <AvatarFallback className="text-xs font-semibold">{initials}</AvatarFallback>
          </Avatar>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {displayName}
              </span>
              {isEbay && (
                <Badge
                  variant="secondary"
                  className="h-5 bg-muted px-1.5 text-[10px] font-semibold uppercase tracking-wider text-foreground"
                >
                  eBay
                </Badge>
              )}
              {!isFromMembers && conversation.order?.orderId && (
                <Badge
                  variant="outline"
                  className="bg-primary/5 border-primary/20 h-5 px-2 font-mono text-[11px] font-medium text-primary"
                >
                  Order #{conversation.order.orderId}
                </Badge>
              )}
            </div>

            <ConversationHeaderSubtitle
              conversation={conversation}
              isFromMembers={isFromMembers}
              isFetchingOrders={isFetchingOrders}
              hasOrderDetails={hasOrderDetails}
              resolvedOrderId={resolvedOrderId}
              resolvedTotal={resolvedTotal}
              resolvedCurrency={resolvedCurrency}
              resolvedStatus={resolvedStatus}
              apiOrdersCount={apiOrders.length}
              onOpenDrawer={() => setDrawerOpen(true)}
            />
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex shrink-0 items-center gap-1">
          {onToggleRead && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleRead(conversation.id)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              title={conversation.isUnread ? "Mark as read" : "Mark as unread"}
            >
              {conversation.isUnread ? (
                <MailOpen className="size-3.5" />
              ) : (
                <Mail className="size-3.5" />
              )}
              <span className="sr-only">
                {conversation.isUnread ? "Mark as read" : "Mark as unread"}
              </span>
            </Button>
          )}

          {onRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              title="Refresh conversation"
            >
              <RotateCw className={cn("size-3.5", isRefreshing && "animate-spin")} />
              <span className="sr-only">Refresh conversation</span>
            </Button>
          )}

          {(Boolean(conversation.order) ||
            Boolean(conversation.item?.id) ||
            Boolean(conversation.sender?.username)) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              className="h-8 gap-1.5 px-2.5 text-xs font-normal"
            >
              <Package className="size-3.5" />
              <span>Order Details</span>
            </Button>
          )}
        </div>
      </div>

      {/* Message Scroller Transcript */}
      <div className="relative flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center text-muted-foreground">
            <Loader2 className="size-6 animate-spin text-primary" />
            <p className="text-xs">Loading messages...</p>
          </div>
        ) : (
          <MessageScrollerProvider autoScroll={true} defaultScrollPosition="end">
            <MessageScroller className="h-full">
              <MessageScrollerViewport className="h-full">
                <MessageScrollerContent className="flex flex-col gap-4 p-4 sm:p-6">
                  {/* Date Marker */}
                  <div className="my-1 flex justify-center">
                    <Marker>
                      <MarkerContent className="text-[11px] font-medium text-muted-foreground">
                        {dayjs(conversation.timestamp).format("dddd, MMMM D, YYYY")}
                      </MarkerContent>
                    </Marker>
                  </div>

                  {/* Item Context Card */}
                  {conversation.item && (
                    <MessageScrollerItem messageId={`item-${conversation.item.id}`}>
                      <div className="shadow-xs flex items-center justify-between gap-3 rounded-md border bg-card p-3 text-xs">
                        <div className="min-w-0 space-y-1">
                          <p className="truncate font-semibold text-foreground">
                            Item: {conversation.item.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {conversation.item.price && (
                              <>
                                Price:{" "}
                                <span className="font-semibold text-foreground">
                                  {conversation.item.price} {conversation.item.currency}
                                </span>{" "}
                                •{" "}
                              </>
                            )}
                            Listing ID:{" "}
                            <span className="font-mono">{conversation.item.id}</span>
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-muted/40 shrink-0 px-2 py-0.5 font-mono text-xs"
                        >
                          #{conversation.item.id}
                        </Badge>
                      </div>
                    </MessageScrollerItem>
                  )}

                  {/* Messages */}
                  {conversation.messages.map((turn: MessageTurn) => (
                    <ChatMessageTurnItem
                      key={turn.id}
                      turn={turn}
                      displayName={displayName}
                      avatarSrc={avatarSrc}
                      initials={initials}
                      isEbayOfficial={isEbayOfficial}
                      allConversationImages={allConversationImages}
                      onOpenImageViewer={openImageViewer}
                    />
                  ))}

                  {/* Bottom scroll target */}
                  <div
                    ref={messagesEndRef}
                    className="h-px w-full shrink-0"
                    aria-hidden="true"
                  />
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        )}
      </div>

      {/* Composer Bottom Area with InputGroup & Dropzone */}
      <div
        className={cn(
          "relative border-t bg-card p-3 transition-colors",
          isDraggingOver && "bg-primary/5 ring-primary/40 ring-2 ring-inset"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drag and Drop Overlay */}
        {isDraggingOver && (
          <div className="bg-primary/10 backdrop-blur-xs pointer-events-none absolute inset-0 z-30 flex items-center justify-center gap-2 text-xs font-medium text-primary">
            <UploadCloud className="size-5 animate-bounce" />
            <span>Drop image files here to attach</span>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Attached-media preview & pending upload states */}
        <ComposerMediaAttachments
          attachedMedia={attachedMedia}
          pendingUploads={pendingUploads}
          onOpenViewer={openImageViewer}
          onRemoveMedia={handleRemoveMedia}
        />

        <form onSubmit={handleSend} className="flex w-full flex-col gap-2">
          {/* Unified shadcn InputGroup */}
          <InputGroup className="bg-background">
            <InputGroupTextarea
              ref={textareaRef}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder="Write a reply... (Enter to send, Shift+Enter for new line, or paste an image)"
              rows={2}
              className="min-h-[50px] text-xs"
            />

            <InputGroupAddon align="block-end" className="justify-between">
              <div className="flex items-center gap-2">
                {/* Attach file button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || pendingUploads.length > 0}
                  className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                  title="Attach image (or drag & drop / paste)"
                >
                  {isUploading || pendingUploads.length > 0 ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Paperclip className="size-3.5" />
                  )}
                  <span>
                    {isUploading || pendingUploads.length > 0 ? "Uploading…" : "Attach"}
                  </span>
                </button>
              </div>

              <InputGroupButton
                size="icon-sm"
                variant="default"
                type="submit"
                disabled={
                  (!inputVal.trim() && attachedMedia.length === 0) ||
                  isSending ||
                  isUploading ||
                  pendingUploads.length > 0
                }
              >
                {isSending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                <span className="sr-only">Send Message</span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>

      {/* Slide-out Order Details Drawer */}
      <OrderDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        channelUid={conversation.channelId}
        buyerUsername={conversation.sender.username}
        legacyItemId={conversation.item?.id}
        timestamp={conversation.timestamp}
        orderDetails={
          conversation.order
            ? {
                channel_order_id: conversation.order.orderId,
                total: conversation.order.total,
                currency: conversation.order.currency,
                payment_status: conversation.order.paymentStatus,
                dispatched_at: conversation.order.dispatchedAt,
                items: conversation.order.items,
                shipping_address: conversation.order.shippingAddress,
              }
            : null
        }
      />

      {/* Lightbox Image Viewer */}
      {viewerOpen && (
        <MessageImageViewer
          images={viewerImages}
          initialIndex={viewerIndex}
          open={viewerOpen}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
}

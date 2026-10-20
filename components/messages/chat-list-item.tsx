"use client";

import { useMemo } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Mail, MailOpen, Paperclip, Reply } from "lucide-react";

import { Conversation } from "@/types/messages";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { getMessageAvatarSrc, getMessageInitials } from "./message-avatar-utils";

dayjs.extend(relativeTime);

export type ChatListItemProps = {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleRead: (id: string) => void;
};

export function ChatListItem({
  conversation,
  isSelected,
  onSelect,
  onToggleRead,
}: Readonly<ChatListItemProps>) {
  const {
    id,
    sender,
    subject,
    lastMessageSnippet,
    timestamp,
    isUnread,
    hasAttachment,
    replied,
  } = conversation;

  const displayName = sender.name || sender.username;
  const isEbay = conversation.conversationType === "FROM_EBAY";

  const avatarSrc = useMemo(() => {
    return getMessageAvatarSrc({
      avatar: sender.avatar,
      displayName,
      isEbay,
    });
  }, [sender.avatar, displayName, isEbay]);

  const initials = useMemo(() => getMessageInitials(displayName), [displayName]);

  const formattedDate = useMemo(() => {
    if (!timestamp) return "";
    const date = dayjs(timestamp);
    const now = dayjs();
    if (now.isSame(date, "day")) {
      return date.format("h:mm A");
    }
    if (now.diff(date, "day") < 7) {
      return date.format("ddd");
    }
    return date.format("MMM D");
  }, [timestamp]);

  return (
    <Item
      onClick={() => onSelect(id)}
      onDoubleClick={() => onToggleRead(id)}
      className={cn(
        "group relative cursor-pointer select-none rounded-md border border-transparent p-2.5 transition-colors",
        "hover:bg-muted",
        isSelected && "border-border bg-muted font-medium",
        isUnread && !isSelected && "bg-background font-semibold"
      )}
    >
      {/* Avatar */}
      <ItemMedia variant="default" className="relative mr-1 shrink-0">
        <Avatar className="size-8">
          <AvatarImage src={avatarSrc} alt={displayName} />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        {isUnread && (
          <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary" />
        )}
      </ItemMedia>

      {/* Content */}
      <ItemContent className="min-w-0 flex-1 gap-0.5">
        <div className="flex items-center justify-between gap-1">
          <ItemTitle className="truncate text-xs font-semibold text-foreground">
            <span className={cn(isUnread && "font-bold text-primary")}>
              {displayName}
            </span>
          </ItemTitle>

          <div className="flex shrink-0 items-center gap-1.5">
            <span
              className={cn(
                "text-[11px] text-muted-foreground",
                isUnread && "font-medium text-primary"
              )}
            >
              {formattedDate}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleRead(id);
              }}
              title={isUnread ? "Mark as read" : "Mark as unread"}
              className="flex size-4 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
            >
              {isUnread ? (
                <Mail className="size-3.5" />
              ) : (
                <MailOpen className="size-3.5" />
              )}
              <span className="sr-only">
                {isUnread ? "Mark as read" : "Mark as unread"}
              </span>
            </button>
          </div>
        </div>

        <ItemDescription className="line-clamp-1 text-xs text-muted-foreground">
          {isEbay ? subject || lastMessageSnippet : lastMessageSnippet || subject}
        </ItemDescription>

        <div className="mt-1 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {hasAttachment && <Paperclip className="size-3 text-muted-foreground" />}

            {replied && (
              <span className="inline-flex items-center text-[10px] text-muted-foreground">
                <Reply className="mr-0.5 size-3" /> Replied
              </span>
            )}
          </div>
        </div>
      </ItemContent>
    </Item>
  );
}

"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  Inbox,
  Loader2,
  RotateCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";

import { Conversation, ConversationStatus, ConversationType } from "@/types/messages";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ItemGroup, ItemSeparator } from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChannelSelect2 from "@/components/shared/channel-select-2";

import { ChatListItem } from "./chat-list-item";

export type ChatListProps = {
  selectedChannelId: string;
  onSelectChannel: (channelId: string) => void;
  conversationType: ConversationType;
  onSelectConversationType: (type: ConversationType) => void;
  conversationStatus: ConversationStatus;
  onSelectConversationStatus: (status: ConversationStatus) => void;
  conversations: Conversation[];
  selectedConversationId: string;
  onSelectConversation: (id: string) => void;
  onToggleRead: (id: string) => void;
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  totalCount?: number;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
};

export function ChatList({
  selectedChannelId,
  onSelectChannel,
  conversationType,
  onSelectConversationType,
  conversationStatus,
  onSelectConversationStatus,
  conversations,
  selectedConversationId,
  onSelectConversation,
  onToggleRead,
  isLoading = false,
  isRefreshing = false,
  onRefresh,
  totalCount,
  hasNextPage = false,
  isFetchingNextPage = false,
  onLoadMore,
}: Readonly<ChatListProps>) {
  const [searchInput, setSearchInput] = useState("");
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver for automatic on-scroll pagination
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "150px" }
    );

    const currentEl = sentinelRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  // Filter conversations
  const filteredConversations = useMemo(() => {
    if (!searchInput.trim()) return conversations;
    const query = searchInput.toLowerCase();
    return conversations.filter((conv) => {
      const matchesSender = (conv.sender.name || conv.sender.username)
        .toLowerCase()
        .includes(query);
      const matchesSubject = conv.subject.toLowerCase().includes(query);
      const matchesSnippet = conv.lastMessageSnippet.toLowerCase().includes(query);
      return matchesSender || matchesSubject || matchesSnippet;
    });
  }, [conversations, searchInput]);

  const totalUnreadCount = filteredConversations.filter((c) => c.isUnread).length;
  const activeFiltersCount = conversationStatus !== "ACTIVE" ? 1 : 0;

  const renderContent = () => {
    if (isLoading && filteredConversations.length === 0) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground">
          <Loader2 className="size-6 animate-spin text-primary" />
          <p className="text-xs">Loading conversations...</p>
        </div>
      );
    }

    if (filteredConversations.length === 0) {
      let emptyMessage = "No member conversations found.";
      if (searchInput) {
        emptyMessage = `No results for "${searchInput}"`;
      } else if (conversationType === "FROM_EBAY") {
        emptyMessage = "No eBay messages found.";
      }

      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground">
          <Inbox className="size-8 stroke-[1.5]" />
          <p className="text-sm font-medium">No messages</p>
          <p className="text-xs">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <ScrollArea className="h-full">
        <ItemGroup className="gap-1 p-1.5">
          {filteredConversations.map((item, index) => (
            <Fragment key={item.id}>
              {index > 0 && <ItemSeparator />}
              <ChatListItem
                conversation={item}
                isSelected={item.id === selectedConversationId}
                onSelect={onSelectConversation}
                onToggleRead={onToggleRead}
              />
            </Fragment>
          ))}

          {/* Infinite Scroll Sentinel */}
          {hasNextPage && (
            <div
              ref={sentinelRef}
              className="flex items-center justify-center py-3 text-xs text-muted-foreground"
            >
              {isFetchingNextPage ? (
                <div className="flex items-center gap-1.5">
                  <Loader2 className="size-3.5 animate-spin text-primary" />
                  <span className="text-xs">Loading more conversations...</span>
                </div>
              ) : (
                <span className="text-muted-foreground/60 text-[10px]">
                  Loading more on scroll...
                </span>
              )}
            </div>
          )}
        </ItemGroup>
      </ScrollArea>
    );
  };

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Channel Picker & Filters */}
      <div className="flex flex-col gap-2 border-b p-3">
        <ChannelSelect2
          className="h-8 w-full justify-between text-xs"
          value={selectedChannelId}
          onValueChange={(channel) => {
            if (channel?.channel_uid) {
              onSelectChannel(channel.channel_uid);
            }
          }}
          showAllChannel={false}
          filterByChannelTypes={["amazon", "tiktok", "all", "woocommerce"]}
        />

        {/* Conversation Type Switcher */}
        <Tabs
          value={conversationType}
          onValueChange={(val) => onSelectConversationType(val as ConversationType)}
          className="w-full"
        >
          <TabsList className="bg-muted/60 grid h-8 w-full grid-cols-2 p-0.5">
            <TabsTrigger
              value="FROM_MEMBERS"
              className="flex h-7 items-center gap-1.5 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Users className="size-3.5" />
              <span>Members</span>
            </TabsTrigger>
            <TabsTrigger
              value="FROM_EBAY"
              className="flex h-7 items-center gap-1.5 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <ShieldCheck className="size-3.5" />
              <span>From eBay</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search Bar & Filter Menu */}
        <div className="flex items-center gap-2">
          <InputGroup className="h-8 flex-1 bg-background">
            <InputGroupInput
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search messages..."
              className="text-xs"
            />
            <InputGroupAddon align="inline-start">
              <Search className="size-3.5" />
            </InputGroupAddon>
            {searchInput && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-xs" onClick={() => setSearchInput("")}>
                  <X className="size-3" />
                  <span className="sr-only">Clear search</span>
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>

          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="h-8 w-8 shrink-0 p-0 text-muted-foreground hover:text-foreground"
              title="Refresh messages"
            >
              <RotateCw className={cn("size-3.5", isRefreshing && "animate-spin")} />
              <span className="sr-only">Refresh messages</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 gap-1.5 px-2.5 transition-colors",
                  activeFiltersCount > 0 &&
                    "bg-primary/10 border-primary/30 hover:bg-primary/15 text-primary hover:text-primary"
                )}
              >
                <SlidersHorizontal className="size-3.5" />
                {activeFiltersCount > 0 && (
                  <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {activeFiltersCount}
                  </span>
                )}
                <span className="sr-only">Filter messages</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-1">
              <DropdownMenuLabel className="px-2 py-1 text-xs font-semibold">
                Conversation Type
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={conversationType}
                onValueChange={(val) => onSelectConversationType(val as ConversationType)}
              >
                <DropdownMenuRadioItem
                  value="FROM_MEMBERS"
                  className="cursor-pointer text-xs"
                >
                  Members
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="FROM_EBAY"
                  className="cursor-pointer text-xs"
                >
                  From eBay
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />

              <DropdownMenuLabel className="px-2 py-1 text-xs font-semibold">
                Conversation Status
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={conversationStatus}
                onValueChange={(val) =>
                  onSelectConversationStatus(val as ConversationStatus)
                }
              >
                <DropdownMenuRadioItem value="ACTIVE" className="cursor-pointer text-xs">
                  Active
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="UNREAD" className="cursor-pointer text-xs">
                  Unread
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="READ" className="cursor-pointer text-xs">
                  Read
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="ARCHIVED"
                  className="cursor-pointer text-xs"
                >
                  Archived
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="DELETED" className="cursor-pointer text-xs">
                  Deleted
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>

              {activeFiltersCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      onSelectConversationStatus("ACTIVE");
                    }}
                    className="cursor-pointer text-xs font-medium text-destructive focus:text-destructive"
                  >
                    Reset Status to Active
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Status Badge if not default ACTIVE */}
        {conversationStatus !== "ACTIVE" && (
          <div className="bg-muted/60 flex items-center justify-between rounded-md px-2 py-1 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground">Status:</span>
              <span className="font-medium capitalize text-foreground">
                {conversationStatus.toLowerCase()}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSelectConversationStatus("ACTIVE")}
              className="h-4 w-4 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" />
              <span className="sr-only">Reset status to Active</span>
            </Button>
          </div>
        )}

        {/* Count summary */}
        <div className="flex items-center justify-between px-0.5 text-xs text-muted-foreground">
          <span>
            {totalCount !== undefined && totalCount > filteredConversations.length
              ? `Showing ${filteredConversations.length} of ${totalCount}`
              : `${filteredConversations.length} conversations`}
          </span>
          {totalUnreadCount > 0 && (
            <Badge variant="secondary" className="h-4.5 px-1.5 text-[10px]">
              {totalUnreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      {/* List content with scroll */}
      <div className="flex-1 overflow-hidden">{renderContent()}</div>
    </div>
  );
}

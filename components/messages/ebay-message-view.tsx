"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Loader2,
  Mail,
  MailOpen,
  RotateCw,
  ShieldAlert,
} from "lucide-react";

import { Conversation } from "@/types/messages";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

dayjs.extend(relativeTime);

export type EbayMessageViewProps = {
  conversation: Conversation | null;
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  onBackMobile?: () => void;
  onToggleRead?: (id: string) => void;
};

/**
 * Renders HTML email content inside a sandboxed iframe.
 * This ensures that CSS styles (such as global font-family, body resets, etc.)
 * in eBay message bodies do NOT leak into and pollute the host application.
 */
function IsolatedHtmlView({ html }: Readonly<{ html: string }>) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [height, setHeight] = useState<number>(400);

  const updateHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      const doc = iframe.contentDocument;
      if (!doc?.body) return;
      const scrollHeight = Math.max(
        doc.body.scrollHeight,
        doc.documentElement.scrollHeight,
        200
      );
      setHeight(scrollHeight);
    } catch {
      // Cross-origin fallback
    }
  }, []);

  // Format srcDoc to ensure isolated styles, responsive media, and links opening in new tabs
  const srcDoc = useMemo(() => {
    if (!html) return "";

    const hasHtmlTag = /<html[\s>]/i.test(html);
    const hasHeadTag = /<head[\s>]/i.test(html);

    const baseAndReset = `
  <base target="_blank">
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow-x: auto;
      word-break: break-word;
    }
    img { max-width: 100%; height: auto; }
    table { max-width: 100% !important; }
  </style>`;

    if (hasHeadTag) {
      return html.replace(/<head[\s>]/i, (match) => `${match}${baseAndReset}`);
    } else if (hasHtmlTag) {
      return html.replace(
        /<html[\s>]/i,
        (match) => `${match}<head>${baseAndReset}</head>`
      );
    }

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${baseAndReset}
</head>
<body>${html}</body>
</html>`;
  }, [html]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let observer: ResizeObserver | null = null;

    const setupObserver = () => {
      updateHeight();
      try {
        if (iframe.contentDocument?.body && typeof ResizeObserver !== "undefined") {
          observer = new ResizeObserver(() => {
            updateHeight();
          });
          observer.observe(iframe.contentDocument.body);
        }
      } catch {
        // Fallback
      }
    };

    iframe.addEventListener("load", setupObserver);
    setupObserver();

    return () => {
      iframe.removeEventListener("load", setupObserver);
      observer?.disconnect();
    };
  }, [srcDoc, updateHeight]);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={srcDoc}
      title="eBay Message Content"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin"
      className="w-full border-0 transition-[height] duration-150"
      style={{ height: `${height}px`, minHeight: "300px" }}
      onLoad={updateHeight}
    />
  );
}

export function EbayMessageView({
  conversation,
  isLoading = false,
  isRefreshing = false,
  onRefresh,
  onBackMobile,
  onToggleRead,
}: Readonly<EbayMessageViewProps>) {
  if (!conversation) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-muted-foreground">
        <div className="bg-muted/60 rounded-full p-4">
          <Mail className="size-8 stroke-[1.5]" />
        </div>
        <div>
          <p className="text-base font-semibold text-foreground">No message selected</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Select an eBay message from the list to view its contents
          </p>
        </div>
      </div>
    );
  }

  const latestMessage = conversation.messages.at(-1) || conversation.messages[0];

  const htmlBody = latestMessage?.text || conversation.lastMessageSnippet || "";

  const subject =
    latestMessage?.subject || conversation.subject || "eBay Official Message";

  const recipient =
    conversation.recipientUsername || latestMessage?.recipientUsername || "";

  const timestamp = latestMessage?.timestamp || conversation.timestamp;

  const renderMessageContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-72 flex-col items-center justify-center gap-2 text-center text-muted-foreground">
          <Loader2 className="size-6 animate-spin text-primary" />
          <p className="text-xs">Loading message...</p>
        </div>
      );
    }

    if (htmlBody) {
      return <IsolatedHtmlView html={htmlBody} />;
    }

    return (
      <div className="py-12 text-center text-xs text-muted-foreground">
        No message body available.
      </div>
    );
  };

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
              <span className="sr-only">Back to messages</span>
            </Button>
          )}

          <Avatar className="size-9 shrink-0">
            <AvatarImage src="/images/message/ebay-circle.svg" alt="eBay" />
            <AvatarFallback className="text-xs font-semibold">EB</AvatarFallback>
          </Avatar>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-foreground">
                eBay
              </span>
              <Badge
                variant="secondary"
                className="h-5 bg-muted px-1.5 text-[10px] font-semibold uppercase tracking-wider text-foreground"
              >
                Official Message
              </Badge>
            </div>

            <p className="text-foreground/75 truncate text-xs font-normal">{subject}</p>
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
              onClick={onRefresh}
              disabled={isRefreshing}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              title="Refresh message"
            >
              <RotateCw className={cn("size-3.5", isRefreshing && "animate-spin")} />
              <span className="sr-only">Refresh message</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Email Body (Scrollable) */}
      <div className="bg-muted/20 flex-1 overflow-y-auto p-3 sm:p-6">
        <div className="mx-auto flex max-w-4xl flex-col rounded-lg border bg-card shadow-sm">
          {/* Email Header */}
          <div className="space-y-3 border-b bg-card p-4 sm:p-6">
            <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              {subject}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-foreground">eBay</span>
                <span className="text-muted-foreground/70">&lt;ebay@ebay.com&gt;</span>
                {recipient && (
                  <>
                    <span>•</span>
                    <span>
                      To: <span className="font-medium text-foreground">{recipient}</span>
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Clock className="size-3.5" />
                <span>{dayjs(timestamp).format("ddd, MMM D, YYYY [at] h:mm A")}</span>
              </div>
            </div>
          </div>

          {/* Rendered HTML Content inside isolated iframe (prevents style/font leakage to host app) */}
          <div className="min-h-[400px] overflow-x-auto rounded-b-lg bg-white p-4 text-gray-900 sm:p-6">
            {renderMessageContent()}
          </div>
        </div>
      </div>

      {/* Bottom Info Banner (No reply input) */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-t bg-card px-4 py-2.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-muted-foreground/80 size-4 shrink-0" />
          <span>
            This is an automated notification from eBay. Replies are not supported.
          </span>
        </div>
        <a
          href="https://www.ebay.com/sh/ovw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <span>Seller Hub</span>
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  );
}

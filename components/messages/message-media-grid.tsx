"use client";

import { Download, FileText, Maximize2 } from "lucide-react";

import { MessageMedia } from "@/types/messages";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function isImageMedia(media: MessageMedia): boolean {
  if (!media?.mediaUrl) return false;
  return (
    media.mediaType === "IMAGE" ||
    (/\.(jpg|jpeg|png|webp|gif|svg)($|\?)/i.test(media.mediaUrl) &&
      media.mediaType !== "DOC" &&
      media.mediaType !== "TXT" &&
      media.mediaType !== "PDF") ||
    media.mediaUrl.includes("ebayimg.com")
  );
}

export interface MessageMediaGridProps {
  mediaItems: MessageMedia[];
  onOpenViewer?: (index: number) => void;
  isSeller?: boolean;
  className?: string;
}

export function MessageMediaGrid({
  mediaItems,
  onOpenViewer,
  isSeller = false,
  className,
}: MessageMediaGridProps) {
  if (!mediaItems || mediaItems.length === 0) return null;

  const imageItems = mediaItems.filter(isImageMedia);
  const fileItems = mediaItems.filter((m) => !isImageMedia(m));

  return (
    <div
      className={cn(
        "mt-1.5 flex flex-col gap-2",
        isSeller ? "items-end" : "items-start",
        className
      )}
    >
      {/* Images Gallery */}
      {imageItems.length > 0 && (
        <div
          className={cn("w-full", isSeller ? "flex justify-end" : "flex justify-start")}
        >
          {/* Single Image */}
          {imageItems.length === 1 && (
            <div
              onClick={() => onOpenViewer?.(0)}
              className="group/img border-border/60 bg-muted/30 shadow-xs hover:border-primary/40 relative max-w-[340px] cursor-zoom-in overflow-hidden rounded-2xl border transition-all hover:shadow-md sm:max-w-[400px]"
            >
              <img
                src={imageItems[0].mediaUrl}
                alt={imageItems[0].mediaName || "Attachment"}
                className="max-h-[320px] w-auto max-w-full rounded-2xl object-cover transition-transform duration-300 group-hover/img:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent p-2.5 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100">
                <div className="self-end">
                  <span className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-md">
                    <Maximize2 className="size-3" />
                    Preview
                  </span>
                </div>
                {imageItems[0].mediaName && (
                  <p className="truncate text-xs font-medium text-white/90 drop-shadow-sm">
                    {imageItems[0].mediaName}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Exactly 2 Images */}
          {imageItems.length === 2 && (
            <div className="grid w-full max-w-[380px] grid-cols-2 gap-1.5 sm:max-w-[420px]">
              {imageItems.map((img, idx) => (
                <div
                  key={`${img.mediaUrl}-${idx}`}
                  onClick={() => onOpenViewer?.(idx)}
                  className="group/img border-border/60 bg-muted/30 shadow-xs hover:border-primary/40 relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-xl border transition-all hover:shadow-md"
                >
                  <img
                    src={img.mediaUrl}
                    alt={img.mediaName || `Attachment ${idx + 1}`}
                    className="size-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100">
                    <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                      <Maximize2 className="size-3" />
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Exactly 3 Images: 1 large left, 2 stacked right */}
          {imageItems.length === 3 && (
            <div className="grid aspect-[16/10] w-full max-w-[400px] grid-cols-2 gap-1.5 sm:max-w-[440px]">
              {/* First Image - Large Column */}
              <div
                onClick={() => onOpenViewer?.(0)}
                className="group/img border-border/60 bg-muted/30 shadow-xs hover:border-primary/40 relative h-full cursor-zoom-in overflow-hidden rounded-xl border transition-all hover:shadow-md"
              >
                <img
                  src={imageItems[0].mediaUrl}
                  alt={imageItems[0].mediaName || "Attachment 1"}
                  className="size-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100">
                  <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                    <Maximize2 className="size-3" />
                    View
                  </span>
                </div>
              </div>

              {/* Next Two Images - Stacked Column */}
              <div className="flex h-full flex-col gap-1.5">
                {imageItems.slice(1, 3).map((img, idx) => (
                  <div
                    key={`${img.mediaUrl}-${idx + 1}`}
                    onClick={() => onOpenViewer?.(idx + 1)}
                    className="group/img border-border/60 bg-muted/30 shadow-xs hover:border-primary/40 relative flex-1 cursor-zoom-in overflow-hidden rounded-xl border transition-all hover:shadow-md"
                  >
                    <img
                      src={img.mediaUrl}
                      alt={img.mediaName || `Attachment ${idx + 2}`}
                      className="size-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100">
                      <span className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                        <Maximize2 className="size-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4 or More Images (2x2 Grid with +N Overlay) */}
          {imageItems.length >= 4 && (
            <div className="grid w-full max-w-[400px] grid-cols-2 gap-1.5 sm:max-w-[440px]">
              {imageItems.slice(0, 4).map((img, idx) => {
                const isFourth = idx === 3;
                const remaining = imageItems.length - 4;

                return (
                  <div
                    key={`${img.mediaUrl}-${idx}`}
                    onClick={() => onOpenViewer?.(idx)}
                    className="group/img border-border/60 bg-muted/30 shadow-xs hover:border-primary/40 relative aspect-square cursor-zoom-in overflow-hidden rounded-xl border transition-all hover:shadow-md"
                  >
                    <img
                      src={img.mediaUrl}
                      alt={img.mediaName || `Attachment ${idx + 1}`}
                      className="size-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                      loading="lazy"
                    />

                    {isFourth && remaining > 0 ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 text-white backdrop-blur-[2px] transition-colors hover:bg-black/75">
                        <span className="text-xl font-bold tracking-tight sm:text-2xl">
                          +{remaining}
                        </span>
                        <span className="text-[10px] font-medium text-white/80">
                          More
                        </span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100">
                        <span className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-md">
                          <Maximize2 className="size-3" />
                          View
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Non-Image File Attachments (PDF, DOC, TXT) */}
      {fileItems.length > 0 && (
        <div
          className={cn(
            "flex w-full flex-col gap-1.5",
            isSeller ? "items-end" : "items-start"
          )}
        >
          {fileItems.map((file, idx) => (
            <a
              key={`${file.mediaUrl}-${idx}`}
              href={file.mediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border/70 bg-card/90 hover:bg-muted/70 hover:border-primary/40 shadow-xs group/file flex max-w-xs items-center gap-2.5 rounded-xl border px-3 py-2 text-xs text-foreground transition-all"
            >
              <div className="bg-primary/10 rounded-lg p-1.5 text-primary transition-colors group-hover/file:bg-primary group-hover/file:text-primary-foreground">
                <FileText className="size-4 shrink-0" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium leading-tight">
                  {file.mediaName || "Attachment"}
                </p>
                {file.mediaType && (
                  <Badge
                    variant="outline"
                    className="mt-0.5 px-1 py-0 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {file.mediaType}
                  </Badge>
                )}
              </div>
              <Download className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover/file:text-foreground" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

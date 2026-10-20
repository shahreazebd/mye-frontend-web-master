"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Loader2,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

export interface ImageViewerItem {
  url: string;
  name?: string;
  type?: string;
}

export interface MessageImageViewerProps {
  images: ImageViewerItem[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

export function MessageImageViewer({
  images,
  initialIndex = 0,
  open,
  onClose,
}: MessageImageViewerProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageLoading, setImageLoading] = useState(true);

  const thumbnailContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleImageRef = useCallback((node: HTMLImageElement | null) => {
    imageRef.current = node;
    if (node && node.complete && node.naturalWidth > 0) {
      setImageLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update current index when opened or initialIndex changes
  useEffect(() => {
    if (open) {
      setCurrentIndex(Math.max(0, Math.min(initialIndex, images.length - 1)));
      setZoom(1);
      setPan({ x: 0, y: 0 });
      if (
        imageRef.current &&
        imageRef.current.complete &&
        imageRef.current.naturalWidth > 0
      ) {
        setImageLoading(false);
      } else {
        setImageLoading(true);
      }
    }
  }, [open, initialIndex, images.length]);

  // Reset zoom & pan when switching images and check cache
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    if (
      imageRef.current &&
      imageRef.current.complete &&
      imageRef.current.naturalWidth > 0
    ) {
      setImageLoading(false);
    } else {
      setImageLoading(true);
    }
  }, [currentIndex]);

  const currentImage = images[currentIndex];
  const hasMultiple = images.length > 1;

  const handlePrev = useCallback(() => {
    if (!hasMultiple) return;
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [hasMultiple, images.length]);

  const handleNext = useCallback(() => {
    if (!hasMultiple) return;
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [hasMultiple, images.length]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleToggleZoom = useCallback(() => {
    setZoom((prev) => {
      if (prev > 1) {
        setPan({ x: 0, y: 0 });
        return 1;
      }
      return 2;
    });
  }, []);

  // Keyboard navigation & Esc to close
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-") {
        handleZoomOut();
      } else if (e.key === "0") {
        handleResetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [
    open,
    onClose,
    handlePrev,
    handleNext,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
  ]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!open || !thumbnailContainerRef.current) return;
    const activeThumb = thumbnailContainerRef.current.children[
      currentIndex
    ] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex, open]);

  // Mouse pan handlers when zoomed in
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = async () => {
    if (!currentImage?.url) return;
    try {
      const res = await fetch(currentImage.url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = currentImage.name || `image-${currentIndex + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(currentImage.url, "_blank");
    }
  };

  if (!mounted || !open || images.length === 0 || !currentImage) {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-50 flex select-none flex-col bg-black/95 backdrop-blur-md duration-200 animate-in fade-in"
      onMouseUp={handleMouseUp}
    >
      {/* Top Header Controls Bar */}
      <div className="z-20 flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-black/40 px-4 text-white/90">
        <div className="flex min-w-0 items-center gap-3">
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-white">
            {currentIndex + 1} / {images.length}
          </span>
          <span className="max-w-[200px] truncate text-xs font-medium text-white/80 sm:max-w-md">
            {currentImage.name || `Image ${currentIndex + 1}`}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Zoom controls */}
          <div className="flex items-center rounded-lg bg-white/10 p-0.5 text-white/90">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="rounded p-1.5 transition-colors hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Zoom out (-)"
              aria-label="Zoom out"
            >
              <ZoomOut className="size-4" />
            </button>
            <span className="w-12 px-2 text-center font-mono text-[11px] font-medium">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="rounded p-1.5 transition-colors hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Zoom in (+)"
              aria-label="Zoom in"
            >
              <ZoomIn className="size-4" />
            </button>
            {zoom > 1 && (
              <button
                type="button"
                onClick={handleResetZoom}
                className="ml-0.5 rounded border-l border-white/10 p-1.5 transition-colors hover:bg-white/15"
                title="Reset zoom (0)"
                aria-label="Reset zoom"
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}
          </div>

          {/* Download button */}
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            title="Download image"
            aria-label="Download image"
          >
            <Download className="size-4" />
          </button>

          {/* Open original in new tab */}
          <a
            href={currentImage.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            title="Open original"
            aria-label="Open original image"
          >
            <ExternalLink className="size-4" />
          </a>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="ml-1 rounded-lg p-2 text-white/90 transition-colors hover:bg-white/15 hover:text-white"
            title="Close (Esc)"
            aria-label="Close image viewer"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Main Image Display Area */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget && zoom <= 1) {
            onClose();
          }
        }}
      >
        {/* Loading Spinner */}
        {imageLoading && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        )}

        {/* Previous Button */}
        {hasMultiple && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/90 active:scale-95"
            title="Previous (Arrow Left)"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>
        )}

        {/* Active Image */}
        <div
          className={cn(
            "relative flex max-h-full max-w-full select-none items-center justify-center transition-transform duration-100 ease-out",
            zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
          )}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onDoubleClick={handleToggleZoom}
        >
          <img
            ref={handleImageRef}
            key={currentImage.url}
            src={currentImage.url}
            alt={currentImage.name || "Preview"}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            draggable={false}
            className={cn(
              "max-h-[calc(100vh-140px)] max-w-[calc(100vw-40px)] rounded-lg object-contain shadow-2xl transition-opacity duration-200",
              imageLoading ? "opacity-0" : "opacity-100"
            )}
          />
        </div>

        {/* Next Button */}
        {hasMultiple && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/90 active:scale-95"
            title="Next (Arrow Right)"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip (if multiple images) */}
      {hasMultiple && (
        <div className="z-20 shrink-0 border-t border-white/10 bg-black/60 px-4 py-2.5 backdrop-blur-md">
          <div
            ref={thumbnailContainerRef}
            className="scrollbar-thin scrollbar-thumb-white/20 flex max-w-full items-center justify-center gap-2 overflow-x-auto py-0.5"
          >
            {images.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={`${img.url}-${idx}`}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "relative size-12 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:size-14",
                    isActive
                      ? "ring-primary/40 scale-105 border-primary opacity-100 shadow-md ring-2"
                      : "border-white/20 opacity-50 hover:border-white/40 hover:opacity-90"
                  )}
                  title={img.name || `Image ${idx + 1}`}
                >
                  <img
                    src={img.url}
                    alt={img.name || `Thumb ${idx + 1}`}
                    className="size-full object-cover"
                  />
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}

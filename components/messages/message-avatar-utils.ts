export type MessageAvatarOptions = {
  avatar?: string | null;
  displayName?: string;
  isEbay?: boolean;
};

/**
 * Returns a consistent avatar URL for conversations and messages.
 * Uses custom avatar if present, official eBay SVG for eBay messages,
 * or generates a deterministic Dicebear initials avatar matching the sidebar.
 */
export function getMessageAvatarSrc({
  avatar,
  displayName = "User",
  isEbay = false,
}: MessageAvatarOptions): string {
  if (avatar) {
    return avatar;
  }
  if (isEbay) {
    return "/images/message/ebay-circle.svg";
  }
  const safeName = displayName.trim() || "User";
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    safeName
  )}&radius=50&backgroundColor=0284c7,2563eb,4f46e5,7c3aed,059669&textColor=ffffff&fontSize=42&fontWeight=600`;
}

/**
 * Returns initials (up to 2 uppercase characters) matching the Dicebear avatar format.
 */
export function getMessageInitials(name?: string): string {
  if (!name) return "";
  const trimmed = name.trim();
  if (!trimmed) return "";

  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

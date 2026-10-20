import { Metadata } from "next";

import { MessagesWrapper } from "@/components/messages/messages-wrapper";

export const metadata: Metadata = {
  title: "Messages | MYE",
  description: "Unified messenger for customer and channel communication",
};

export default function MessagesPage() {
  return (
    <div className="-mx-8 -mb-2.5 -mt-3.5 h-[calc(100vh-64px)] w-[calc(100%+64px)] overflow-hidden p-6">
      <MessagesWrapper />
    </div>
  );
}

import { Metadata } from "next";

import AllChannelsWrapper from "@/components/settings/all-channels/all-channels-wrapper";

export const metadata: Metadata = {
  title: "All Channels",
  description: "Authentication forms built using the components.",
};

export default function AllChannels() {
  return <AllChannelsWrapper />;
}

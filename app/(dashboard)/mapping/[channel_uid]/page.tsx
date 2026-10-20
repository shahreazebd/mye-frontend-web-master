import { Metadata } from "next";

import MappingWrapper from "@/components/mapping/mapping-wrapper";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mapping",
    description: `Path: app/(dashboard)/settings/all-channels/[channel_uid]/page.tsx`,
  };
}

export default function Mapping() {
  return <MappingWrapper />;
}

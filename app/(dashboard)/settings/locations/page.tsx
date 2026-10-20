import type { Metadata } from "next";

import LocationWrapper from "@/components/settings/locations/locations-wrapper";

export const metadata: Metadata = {
  title: "All Locations",
  description: "Authentication forms built using the components.",
};

export default function Location() {
  return <LocationWrapper />;
}

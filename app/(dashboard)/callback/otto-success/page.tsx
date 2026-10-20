import { Metadata } from "next";

import { CallbackOtto } from "@/components/callback/otto";

export const metadata: Metadata = {
  title: "Otto",
  description: "Otto",
};

export default function OttoSuccess() {
  return <CallbackOtto />;
}

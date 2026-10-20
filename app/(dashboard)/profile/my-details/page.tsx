import { Metadata } from "next";

import { ProfileMainWrapper } from "./profile-main-wrapper";

export const metadata: Metadata = {
  title: "My Details",
  description: "My Details",
};

export default function MyDetails() {
  return <ProfileMainWrapper />;
}

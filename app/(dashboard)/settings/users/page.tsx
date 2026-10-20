import { Metadata } from "next";

import UsersWrapper from "@/components/settings/users/users-wrapper";

export const metadata: Metadata = {
  title: "All users",
};

export default function Users() {
  return <UsersWrapper />;
}

import { Metadata } from "next";

import Dashboard from "@/components/dashboard-legacy/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Hand-picked themes that you can copy and paste into your apps.",
};

export default function DashboardPage() {
  return <Dashboard />;
}

import { Metadata } from "next";

import Dashboard from "@/components/dashboard/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage Your Ecommerce",
};

export default function DashboardPage() {
  return <Dashboard />;
}

"use client";

import DashboardNavigation from "@/components/navigation/dashboard/dashboard-navigation";

import "@/styles/globals.css";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <DashboardNavigation />

      <div className="px-8 pb-2.5 pt-3.5">{children}</div>
    </div>
  );
}

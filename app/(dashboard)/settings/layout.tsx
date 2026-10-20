import { Metadata } from "next";

import Sidebar from "@/components/settings/sidebar";

export const metadata: Metadata = {
  title: "Settings",
  description: "Advanced form example using react-hook-form and Zod.",
};

export default function SettingsLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="hidden md:block">
      <div className="hidden lg:fixed lg:flex lg:w-60 lg:flex-col">
        <Sidebar />
      </div>
      <div className="lg:pl-60">
        <main className="mx-auto w-full px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

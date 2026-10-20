import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/profile/sidebar";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your profile settings",
};

export default function SettingsLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <section className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your profile settings.</p>
      </section>
      <Separator className="my-8" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-32 lg:space-y-0">
        <aside className="lg:w-[200px]">
          <Sidebar />
        </aside>
        <div className="pr-2 lg:w-full">{children}</div>
      </div>
    </>
  );
}

"use client";

import { DashboardNav } from "./dashboard-nav";
import { MobileMenu } from "./mobile-menu";
import { Notification } from "./notification";
import { UserNav } from "./user-nav";

export default function DashboardNavigation() {
  return (
    <>
      <header className="sticky top-0 z-10 w-full bg-[#1E2024]">
        <div className="mx-8 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <DashboardNav />

          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-6">
              <Notification />
              <UserNav />
              <MobileMenu />
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

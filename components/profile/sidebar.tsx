"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AtSign, Bell, KeyRound, Receipt, User2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";

const sidebarNavItems = [
  {
    icon: <User2 size={20} />,
    title: "My Details",
    href: "/profile/my-details",
  },
  {
    icon: <KeyRound size={20} />,
    title: "Password",
    href: "#",
  },
  {
    icon: <AtSign size={20} />,
    title: "Email",
    href: "#",
  },
  {
    icon: <Bell size={20} />,
    title: "Notifications",
    href: "#",
  },
  {
    icon: <Receipt size={20} />,
    title: "Billing",
    href: "#",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1")}>
      {sidebarNavItems?.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.icon}
          <span className="ml-3 inline-block"> {item.title}</span>
        </Link>
      ))}
    </nav>
  );
}

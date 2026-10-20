"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  BellIcon,
  Lock,
  MapPin,
  Orbit,
  Shirt,
  Subscript,
  Truck,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";

import { buttonVariants } from "../ui/button";

const sidebarNavItems = [
  {
    icon: <Orbit size={24} />,
    title: "Channels",
    href: "/settings/all-channels",
  },
  {
    icon: <Shirt size={24} />,
    title: "Products",
    href: "/settings/products",
  },
  {
    icon: <Truck size={24} />,
    title: "Carriers",
    href: "/settings/carriers",
  },
  {
    icon: <MapPin size={24} />,
    title: "Locations",
    href: "/settings/locations",
  },
  {
    icon: <Subscript size={24} />,
    title: "Subscription",
    href: "/settings/subscription",
  },

  {
    icon: <User size={24} />,
    title: "Users",
    href: "/settings/users",
  },
  {
    icon: <BellIcon size={24} />,
    title: "Activity Logs",
    href: "/settings/activity-logs",
  },
  {
    icon: <BarChart2 size={24} />,
    title: "Reports",
    href: "/settings/reports/sales",
  },
  {
    icon: <User size={24} />,
    title: "Profile",
    href: "/settings/profile",
  },

  {
    icon: <Lock size={24} />,
    title: "Change Password",
    href: "/settings/change-password",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { userInformation } = useAuth();

  return (
    <>
      <h2 className="text-2xl font-semibold text-slate-800">Settings</h2>
      <p className="mb-7 text-left text-xs text-gray-500">
        Account settings & email preferences
      </p>

      <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1")}>
        {sidebarNavItems
          ?.filter((item) => {
            if (
              userInformation?.type === "temu_test" &&
              item.href === "/settings/products"
            ) {
              return true;
            } else if (
              userInformation?.type === "child" &&
              item.href === "/settings/reports/sales"
            ) {
              return true;
            } else if (
              userInformation?.type === "parent" ||
              userInformation?.type === "owner"
            ) {
              return true;
            }
          })
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href ? "bg-white" : "hover:bg-white",
                "justify-start"
              )}
            >
              {item.icon}
              <span className="ml-3 inline-block"> {item.title}</span>
            </Link>
          ))}
      </nav>
    </>
  );
}

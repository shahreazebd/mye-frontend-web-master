"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BaggageClaim,
  LayoutGrid,
  MessageSquare,
  Package,
  Settings,
  Ticket,
} from "lucide-react";

import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icons } from "@/components/icons";

const orderComponents = [
  {
    title: "Open Orders",
    href: "/order/open-orders",
    description: "Manage your open orders",
  },
  {
    title: "Pending Orders",
    href: "/order/pending-orders",
    description: "Manage your pending orders",
  },
  {
    title: "Dispatched Orders",
    href: "/order/dispatched-orders",
    description: "Manage your dispatched orders",
  },
  {
    title: "Cancelled Orders",
    href: "/order/cancelled-orders",
    description: "Manage your cancelled orders",
  },
  {
    title: "Track Orders",
    href: "/order/track-orders",
    description: "Manage your track orders",
  },

  {
    title: "Return Order",
    href: "/order/return-order",
    description: "Track your return order",
  },
  {
    title: "Old Open Orders",
    href: "/order/legacy-open-orders",
    description: "Manage your open orders",
  },
  {
    title: "Old Postage",
    href: "/postage",
    description: "Manage your postage",
  },
  // {
  //   title: "New Carriers (SQA TEAM ONLY)",
  //   href: "/carriers",
  //   description: "Manage your carriers",
  // },
];

const inventoryChilds = [
  {
    title: "Inventory",
    href: "/inventory",
    description: "Manage your inventory",
  },
  {
    title: "History",
    href: "/inventory/history",
    description: "Manage your inventory history",
  },
];

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    child: [],
    icon: <LayoutGrid size={18} />,
  },
  {
    title: "Inventory",
    href: "/inventory",
    child: inventoryChilds,
    icon: <Package size={18} />,
  },
  {
    title: "Return Order",
    href: "/order/return-order",
    child: [],
    icon: <BaggageClaim size={18} />,
  },
  {
    title: "Orders",
    href: "/order",
    child: orderComponents,
    icon: <BaggageClaim size={18} />,
  },

  {
    title: "Shipments",
    href: "/shipments",
    child: [],
    icon: <Ticket size={18} />,
  },

  {
    title: "Messages",
    href: "/messages",
    child: [],
    icon: <MessageSquare size={18} />,
  },
  {
    title: "Settings",
    href: "/settings/all-channels",
    child: [],
    icon: <Settings size={18} />,
  },
  // {
  //   title: "Pdf Renderer",
  //   href: "/pdf-renderer",
  //   child: [],
  //   icon: <FileText size={18} />,
  // },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { userInformation } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const userType = userInformation?.type;
  const isParentOrOwner = userType === "parent" || userType === "owner";
  const isChild = userType === "child";
  const hasInventoryViewOnly = Boolean(
    userInformation?.permissions?.some((p) => p.name === "inventory-view-only")
  );

  const visibleMenuItems = React.useMemo(() => {
    return menu
      .filter((item) => {
        if (isParentOrOwner) {
          return item.title !== "Return Order";
        }

        if (isChild) {
          if (hasInventoryViewOnly) {
            return ["Inventory", "Dashboard", "Return Order"].includes(item.title);
          }
          return true;
        }

        if (userType === "temu_test") {
          return false;
        }

        return ["Inventory", "Orders"].includes(item.title);
      })
      .map((item) => {
        const isSettings = item.title === "Settings";
        const href = isSettings && isChild ? "/settings/reports/sales" : item.href;
        const isActive = isSettings
          ? pathname.startsWith("/settings")
          : item.child.length > 0
          ? pathname.startsWith(item.href)
          : pathname === href;

        return {
          ...item,
          href,
          isActive,
        };
      });
  }, [isParentOrOwner, isChild, hasInventoryViewOnly, userType, pathname]);

  if (!mounted || !userType) return <></>;

  return (
    <div className="flex gap-4 2xl:gap-28">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="size-6" />
        <span className="inline-block font-bold text-newPrimary">MYE</span>
      </Link>

      <div className="hidden lg:block">
        <NavigationMenu>
          <NavigationMenuList>
            {visibleMenuItems.map((item) => {
              const activeClassName = cn({
                "text-gray-400": !item.isActive,
                "border-y-[6px] border-b-newPrimary border-t-transparent": item.isActive,
              });

              return item.child.length === 0 ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "gap-2 font-bold text-newPrimary",
                        activeClassName
                      )}
                    >
                      {item.icon} {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger
                    className={cn(
                      "flex items-center gap-2 text-sm font-bold text-newPrimary",
                      activeClassName
                    )}
                  >
                    {item.icon} {item.title}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.child.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}

            {userInformation?.user_email === "info@longislandcity.co.uk" && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/supports"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "gap-2 font-bold text-newPrimary",
                      {
                        "text-gray-400": pathname !== "supports",
                        "border-y-[6px] border-b-newPrimary border-t-transparent":
                          pathname === "/supports",
                      }
                    )}
                  >
                    Supports
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, href, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href as string}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <span className="block text-sm font-medium leading-none">{title}</span>
          <span className="line-clamp-2 block text-sm leading-snug text-muted-foreground">
            {children}
          </span>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

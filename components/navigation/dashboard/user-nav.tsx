import { useEffect, useState } from "react";
import { getInitials, logout } from "@/utils/helpers";
import { Bell, LogOut } from "lucide-react";

import useAuth from "@/hooks/custom/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  const { userInformation } = useAuth();
  const [mounted, setMounted] = useState(false);

  const handelLogOut = () => {
    logout();
  };

  const [notificationPermission, setNotificationPermission] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if ("Notification" in window && Notification.permission) {
      setNotificationPermission(Notification.permission);
    }
  }, [notificationPermission]);

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <section className="flex cursor-pointer items-center gap-2">
          <Avatar className="size-10">
            <AvatarFallback>
              {getInitials(userInformation?.Name as string)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col  space-y-1">
            <p className="text-left text-sm font-medium leading-none text-white">
              {userInformation?.Name}
            </p>
            <p className="text-left  text-xs leading-none text-muted-foreground">
              {userInformation?.user_email}
            </p>
          </div>
        </section>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="absolute right-0  top-2 w-56"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userInformation?.Name as string}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userInformation?.user_email as string}
            </p>
          </div>
        </DropdownMenuLabel>

        {notificationPermission === "default" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => Notification.requestPermission()}>
              <Bell className="mr-2 size-4" />
              Want Notification?
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handelLogOut}>
          <LogOut className="mr-2 size-4" />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

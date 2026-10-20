import { Send, Share } from "lucide-react";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import useAddActivityLog from "@/hooks/queries/activity-log/useAddActivityLog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  //   DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useToast } from "../../ui/use-toast";

export function ShareDropdown({ channel }: any) {
  const { toast } = useToast();

  const { userInformation } = useAuth();
  const { mutate: addActivityLog } = useAddActivityLog();

  const userFullName = userInformation?.Name;

  const handleDropboxFileUpload = async (
    name: string,
    companyUid: string,
    channelUid: string
  ) => {
    try {
      const URL = `/dropbox/api/v1/dropbox/file-upload/${companyUid}/${channelUid}/`;

      await fetch.post(URL);

      const activityPayload = {
        website_name: "mye",
        company_uid: userInformation?.company_uid,
        notification_data: {
          data: `${name}'s open order report sent in Dropbox`,
          user: userFullName,
          type: "dropbox",
          parent_type: "drive",
          avatar_url: `https://api.dicebear.com/9.x/micah/svg?seed=${userFullName}&translateY=5&background=%23dddddd`,
        },
      };

      addActivityLog(activityPayload);

      toast({
        title: "Success",
        description: "Open order report sent in Dropbox",
      });
    } catch (error: any) {
      if (error?.response) {
        if (error?.response?.status === 500) {
          toast({
            title: "Error",
            description: "Something went wrong, please try again later.",
            variant: "destructive",
          });
        }

        if (error?.response?.status === 400) {
          toast({
            title: "Error",
            description: error?.response?.data?.message,
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="sm" className="flex h-[32px] items-center gap-2">
          <Share size={14} /> Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}

        <DropdownMenuItem
          onClick={() =>
            handleDropboxFileUpload(
              channel?.name as string,
              channel?.company_uid as string,
              channel?.channel_uid as string
            )
          }
        >
          <Send className="mr-2 size-4" />
          <span>Send to Dropbox</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

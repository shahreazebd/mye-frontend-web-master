"use client";

import { useState } from "react";
import { Channel } from "@/schema/channel";
import { openSuccessNotification } from "@/utils/notification";
import { useQueryClient } from "@tanstack/react-query";
import { Settings } from "lucide-react";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ChannelSelect2 from "@/components/shared/channel-select-2";

export function AttributesUpdate() {
  const queryClient = useQueryClient();
  const [attribute, setAttribute] = useState({
    image: false,
    title: false,
    price: false,
    channel: "",
  });
  const [loading, setLoading] = useState(false);
  const [, setChannelDetails] = useState({} as Channel | null);

  const { userInformation } = useAuth();

  const handelClick = () => {
    setLoading(true);
    fetch
      .get(
        `/miams/api/v1/mapping/mapping-product-sync-with-channel/${userInformation?.company_uid}/${attribute?.channel}/`
      )
      .then(() => {
        queryClient.invalidateQueries(["fetch-product-data"]);
        openSuccessNotification({ description: "success" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Settings className="h-4 text-gray-800 hover:text-black" />
      </SheetTrigger>
      <SheetContent className="w-[500px]">
        <SheetHeader>
          <SheetTitle>Select channel first to update product attributes</SheetTitle>
          <SheetDescription className="grid w-60 gap-4">
            <ChannelSelect2
              className="w-full"
              onValueChange={(value) => {
                setAttribute((prev: any) => ({
                  ...prev,
                  channel: value?.channel_uid as string,
                }));
              }}
              setChannelDetails={setChannelDetails}
              showAllChannel={false}
            />

            <div className="flex items-center gap-2">
              <Checkbox
                id="image"
                onCheckedChange={(v: boolean) =>
                  setAttribute((prev) => ({ ...prev, image: v }))
                }
              />
              <Label htmlFor="image">Image</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="title"
                onCheckedChange={(v: boolean) =>
                  setAttribute((prev) => ({ ...prev, title: v }))
                }
              />
              <Label htmlFor="title">Title</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="price"
                onCheckedChange={(v: boolean) =>
                  setAttribute((prev) => ({ ...prev, price: v }))
                }
              />
              <Label htmlFor="price">Price</Label>
            </div>

            <Button disabled={loading} onClick={handelClick} type="submit" variant="dark">
              Update
            </Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

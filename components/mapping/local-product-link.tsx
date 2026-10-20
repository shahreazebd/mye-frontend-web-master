import React from "react";
import mappingAtom from "@/atoms/mappingAtom";
import { useAtom } from "jotai";

import useAuth from "@/hooks/custom/useAuth";
import useAddMapping from "@/hooks/queries/mapping/useAddMapping";

import { useToast } from "../ui/use-toast";

export default function LocalProductLink() {
  const { toast } = useToast();
  const { mutate: addMap } = useAddMapping();
  const { userInformation } = useAuth();
  const [mapping] = useAtom(mappingAtom);

  const handelClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const payload = {
      channel_uid: mapping?.channelUUid,
      company_uid: userInformation?.company_uid as string,
      data: {
        remote_product_database_id: mapping?.remoteProductId,
        local_product_database_id: mapping?.localProductId,
      },
    };

    if (mapping?.remoteProductId > 0) {
      addMap(payload);
    } else {
      toast({
        title: "Please select a remote product",
        variant: "destructive",
        description: "Please select a remote product",
      });
    }
  };

  return (
    <div
      className="flex h-6 cursor-pointer items-center justify-center rounded-md bg-primary px-2 text-center text-[13px] font-bold text-white hover:bg-[#065089]/80"
      onClick={(e) => handelClick(e)}
    >
      Link
    </div>
  );
}

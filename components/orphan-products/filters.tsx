import React, { Dispatch, SetStateAction, useState } from "react";

import useAuth from "@/hooks/custom/useAuth";
import useDeleteOrphanProducts from "@/hooks/queries/product/useDeleteOrphanProducts";
import ChannelSelect2 from "@/components/shared/channel-select-2";

import DeleteAlert from "../delete-alert";
import { Button } from "../ui/button";

// import { ShareDropdown } from "./share-dropdown";

type Props = {
  selectedTableRows?: any;
  dataCount?: number;
  setSelectedChannelId?: Dispatch<SetStateAction<string>>;
  selectedChannelId: string;
};

export function Filters({
  selectedTableRows,
  dataCount,
  setSelectedChannelId,
  selectedChannelId,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isLoading } = useDeleteOrphanProducts(selectedChannelId);
  const { userInformation } = useAuth();

  const handleDeleteOrphanProducts = () => {
    const ids = selectedTableRows?.map((e: any) => e?.id);

    mutate({
      company_uid: userInformation?.company_uid,
      channel_uid: selectedChannelId,
      remote_product_ids: ids,
    });
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          className="flex h-[32px] items-center gap-2 bg-red-600 font-medium"
          disabled={!selectedTableRows?.length || isLoading}
          onClick={() => setIsOpen(true)}
        >
          Delete
        </Button>
        <ChannelSelect2
          onValueChange={(value) => {
            setSelectedChannelId?.(value?.channel_uid as string);
          }}
          dataCount={dataCount}
          selectedDataCount={selectedTableRows?.length}
        />
      </div>

      <DeleteAlert
        open={isOpen}
        setOpen={setIsOpen}
        deletedItemName="products"
        isLoading={isLoading}
        removeFunction={handleDeleteOrphanProducts}
      />
    </>
  );
}

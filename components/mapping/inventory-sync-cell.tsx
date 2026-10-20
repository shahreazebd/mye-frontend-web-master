"use client";

import { Row } from "@tanstack/react-table";

import { RemoteProduct } from "@/types/remote-product";
import useAuth from "@/hooks/custom/useAuth";
import useUpdateRemoteProduct from "@/hooks/queries/inventory/use-update-remote-product";

import { Switch } from "../ui/switch";

type Props = {
  row: Row<RemoteProduct>;
};

export function InventorySyncCell({ row }: Props) {
  const { userInformation } = useAuth();

  const { mutate: updateRemoteProduct, isLoading } = useUpdateRemoteProduct();

  return (
    <Switch
      disabled={isLoading}
      checked={row.original.sync_inventory}
      onCheckedChange={(value) => {
        const payload = {
          company_uid: userInformation?.company_uid as string,
          data: [
            {
              channel_uid: row.original.channel_uid,
              remote_product: row.original.remote_id,
              sync_inventory: value,
            },
          ],
        };
        updateRemoteProduct(payload);
      }}
    />
  );
}

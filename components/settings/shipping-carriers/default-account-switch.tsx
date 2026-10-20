import React from "react";

import { useUpdateCarrier } from "@/hooks/queries/carriers/use-update-carrier";
import { Switch } from "@/components/ui/switch";

export default function DefaultAccountSwitch({
  uuid,
  isDefault,
}: {
  uuid: string;
  isDefault: boolean;
}) {
  const { mutate, isLoading } = useUpdateCarrier();

  return (
    <Switch
      checked={isDefault}
      disabled={isLoading}
      onCheckedChange={() => {
        mutate({ uuid: uuid, is_default: !isDefault });
      }}
    />
  );
}

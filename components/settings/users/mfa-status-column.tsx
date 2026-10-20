import React from "react";
import { User } from "@/schema/users";

import useUpdateUser from "@/hooks/queries/user/use-update-user";
import { Switch } from "@/components/ui/switch";

export default function MfaStatusColumn({ data }: { data: User }) {
  const { mutate } = useUpdateUser();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        disabled={!data?.verified}
        defaultChecked={data?.mfa_status}
        onCheckedChange={(e) => {
          mutate({
            uuid: data?.user_id,
            data: {
              mfa_status: e,
            },
          });
        }}
      />
    </div>
  );
}

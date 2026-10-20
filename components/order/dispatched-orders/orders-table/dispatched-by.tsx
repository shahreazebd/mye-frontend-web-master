import { getInitials } from "@/utils/helpers";

import useAuth from "@/hooks/custom/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DispatchedBy() {
  const { userInformation } = useAuth();

  const fullName = `${userInformation?.Name}`;

  return (
    <div className="hidden xl:block">
      <div className="flex items-center gap-4">
        <Avatar className="size-10">
          <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
        </Avatar>
        <div>
          <h6 className="text-sm">{fullName}</h6>
          <small className="text-xs text-slate-500">
            {userInformation?.user_email as string}
          </small>
        </div>
      </div>
    </div>
  );
}

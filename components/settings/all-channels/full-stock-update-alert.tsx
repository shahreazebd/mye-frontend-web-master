import { useState } from "react";

import useAuth from "@/hooks/custom/useAuth";
import useUpdateStockByChannel from "@/hooks/queries/inventory/use-update-stock-by-channel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

type Props = {
  isOpenFullStockAlert: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpenFullStockAlert: (value: boolean) => void;
  channelUid: string;
  name: string;
};

export function FullStockUpdateALert({
  isOpenFullStockAlert,
  setIsOpenFullStockAlert,
  channelUid,
  name,
}: Props) {
  const { userInformation } = useAuth();
  const { mutate, isLoading } = useUpdateStockByChannel();
  const [value, setValue] = useState("");

  const handleTriggerUpdateStock = () => {
    mutate(
      {
        company_uid: userInformation?.company_uid as string,
        channel_uid: channelUid,
        body: {
          skus: [],
        },
      },
      {
        onSuccess: () => {
          setIsOpenFullStockAlert(false);
        },
      }
    );
  };

  return (
    <AlertDialog open={isOpenFullStockAlert} onOpenChange={setIsOpenFullStockAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Stock?</AlertDialogTitle>
          <AlertDialogDescription>
            This will trigger a full stock update for the selected channel. The process
            may take a few minutes and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <p className="mb-1 text-sm">
            Please Type &quot;<strong>{name}</strong>&quot; for confirmation
          </p>
          <Input placeholder="type the name" onChange={(e) => setValue(e.target.value)} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading || value !== name}
            onClick={handleTriggerUpdateStock}
          >
            {isLoading ? "Updating..." : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
